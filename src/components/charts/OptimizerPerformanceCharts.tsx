import React, { useEffect, useRef, useState } from 'react';
import {
  Chart,
  registerables,
} from 'chart.js';
import { Modal } from '../Modal';

Chart.register(...registerables);

type MetricResult = {
  dataset: string;
  method: string;
  model: string;
  kappa: number;
  accuracy: number;
  rocAuc: number;
  f1Score: number;
  sensitivity: number;
  specificity: number;
  precision: number;
};

const parseCSV = (csvText: string): MetricResult[] => {
  const lines = csvText.trim().split('\n');
  return lines.slice(1).map(line => {
    const values = line.split(',');
    return {
      dataset: values[0],
      method: values[1],
      model: values[2],
      kappa: parseFloat(values[3]),
      accuracy: parseFloat(values[4]),
      rocAuc: parseFloat(values[5]),
      f1Score: parseFloat(values[6]),
      sensitivity: parseFloat(values[7]),
      specificity: parseFloat(values[8]),
      precision: parseFloat(values[9])
    } as MetricResult;
  });
};

const useResults = () => {
  const [data, setData] = useState<MetricResult[]>([]);
  useEffect(() => {
    fetch('/results.csv')
      .then(r => r.text())
      .then(t => setData(parseCSV(t)))
      .catch(console.error);
  }, []);
  return data;
};

// Available metrics for selection
const availableMetrics = [
  { key: 'accuracy', label: 'Accuracy', color: '#3498db' },
  { key: 'rocAuc', label: 'ROC-AUC', color: '#1abc9c' },
  { key: 'f1Score', label: 'F1-Score', color: '#2ecc71' },
  { key: 'sensitivity', label: 'Sensitivity', color: '#f39c12' },
  { key: 'specificity', label: 'Specificity', color: '#9b59b6' },
  { key: 'precision', label: 'Precision', color: '#e67e22' },
  { key: 'kappa', label: 'Kappa', color: '#34495e' }
];

// Function to find best performing model for each optimizer
const findBestModel = (data: MetricResult[], optimizer: string, metric: string = 'accuracy') => {
  const optimizerData = data.filter(d => d.model === optimizer);
  if (optimizerData.length === 0) return { model: 'N/A', value: 0, dataset: 'N/A' };
  
  const bestEntry = optimizerData.reduce((best, current) => 
    (current[metric as keyof MetricResult] as number) > (best[metric as keyof MetricResult] as number) ? current : best
  );
  
  return {
    model: bestEntry.method,
    value: bestEntry[metric as keyof MetricResult] as number,
    dataset: bestEntry.dataset
  };
};

export const OptimizerPerformanceCharts: React.FC = () => {
  const data = useResults();
  const gaChartRef = useRef<HTMLCanvasElement | null>(null);
  const psoChartRef = useRef<HTMLCanvasElement | null>(null);
  const allChartRef = useRef<HTMLCanvasElement | null>(null);
  const comparisonChartRef = useRef<HTMLCanvasElement | null>(null);
  
  // Selected metric state
  const [selectedMetric, setSelectedMetric] = useState<string>('accuracy');
  
  // Modal canvas refs
  const modalGARef = useRef<HTMLCanvasElement | null>(null);
  const modalPSORef = useRef<HTMLCanvasElement | null>(null);
  const modalAllRef = useRef<HTMLCanvasElement | null>(null);
  const modalComparisonRef = useRef<HTMLCanvasElement | null>(null);
  
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedChart, setSelectedChart] = useState<{
    title: string;
    type: 'ga' | 'pso' | 'all' | 'comparison';
  } | null>(null);
  
  // Chart click handler
  const handleChartClick = (title: string, type: 'ga' | 'pso' | 'all' | 'comparison') => {
    setSelectedChart({ title, type });
    setModalOpen(true);
  };
  
  // Close modal handler
  const closeModal = () => {
    setModalOpen(false);
    setSelectedChart(null);
  };
  
  // Create optimizer performance chart
  const createOptimizerChart = (ctx: CanvasRenderingContext2D, optimizer: string, color: string, isModal: boolean = false) => {
    const optimizerData = data.filter(d => d.model === optimizer);
    const currentMetric = availableMetrics.find(m => m.key === selectedMetric) || availableMetrics[0];
    
    if (optimizerData.length === 0) {
      return new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['No Data'],
          datasets: [{
            label: 'No Data Available',
            data: [0],
            backgroundColor: '#ecf0f1'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: { display: true, text: `${optimizer}: No Data Available` }
          }
        }
      });
    }
    
    // Get average performance by dataset
    const datasets = [...new Set(optimizerData.map(d => d.dataset))];
    const avgPerformance = datasets.map(dataset => {
      const datasetEntries = optimizerData.filter(d => d.dataset === dataset);
      const avgMetric = datasetEntries.reduce((sum, entry) => sum + (entry[selectedMetric as keyof MetricResult] as number), 0) / datasetEntries.length;
      return { dataset, avgMetric };
    }).sort((a, b) => b.avgMetric - a.avgMetric);
    
    const topDatasets = avgPerformance.slice(0, 6); // Show top 6 datasets
    
    return new Chart(ctx, {
      type: 'bar',
      data: {
        labels: topDatasets.map(d => isModal ? d.dataset.replace(/-/g, ' vs ') : d.dataset.split('-').join('\n')),
        datasets: [{
          label: `${optimizer === 'ALL' ? 'No Optimization' : optimizer + ' Optimization'} Average ${currentMetric.label}`,
          data: topDatasets.map(d => d.avgMetric),
          backgroundColor: color,
          borderColor: color.replace('0.7', '1'),
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: { 
            display: true, 
            text: `${optimizer === 'ALL' ? 'No Optimization' : optimizer + ' Optimization'} - ${currentMetric.label}`,
            font: { size: isModal ? 16 : 12 }
          },
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (context: any) => {
                const value = context.parsed.y;
                const formatted = selectedMetric === 'kappa' ? value.toFixed(3) : `${(value * 100).toFixed(1)}%`;
                return `Average ${currentMetric.label}: ${formatted}`;
              }
            }
          }
        },
        scales: {
          y: { 
            beginAtZero: true, 
            max: selectedMetric === 'kappa' ? 1 : 1,
            min: selectedMetric === 'kappa' ? -0.2 : 0,
            title: { 
              display: isModal, 
              text: `Average ${currentMetric.label}`,
              font: { size: 12 }
            },
            ticks: {
              callback: (value: any) => {
                if (selectedMetric === 'kappa') {
                  return (value as number).toFixed(2);
                }
                return `${(value * 100).toFixed(0)}%`;
              }
            }
          },
          x: { 
            title: { 
              display: isModal, 
              text: 'Datasets',
              font: { size: 12 }
            },
            ticks: { font: { size: isModal ? 10 : 8 } }
          }
        }
      },
    });
  };
  
  // Create comparison chart
  const createComparisonChart = (ctx: CanvasRenderingContext2D, isModal: boolean = false) => {
    const gaData = data.filter(d => d.model === 'GA');
    const psoData = data.filter(d => d.model === 'PSO');
    const allData = data.filter(d => d.model === 'ALL');
    const currentMetric = availableMetrics.find(m => m.key === selectedMetric) || availableMetrics[0];
    
    // Get overall average performance for each optimizer
    const gaAvg = gaData.length > 0 ? gaData.reduce((sum, d) => sum + (d[selectedMetric as keyof MetricResult] as number), 0) / gaData.length : 0;
    const psoAvg = psoData.length > 0 ? psoData.reduce((sum, d) => sum + (d[selectedMetric as keyof MetricResult] as number), 0) / psoData.length : 0;
    const allAvg = allData.length > 0 ? allData.reduce((sum, d) => sum + (d[selectedMetric as keyof MetricResult] as number), 0) / allData.length : 0;
    
    return new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['GA Optimization', 'PSO Optimization', 'No Optimization'],
        datasets: [{
          label: `Overall Average ${currentMetric.label}`,
          data: [gaAvg, psoAvg, allAvg],
          backgroundColor: ['rgba(52,152,219,0.7)', 'rgba(231,76,60,0.7)', 'rgba(46,204,113,0.7)'],
          borderColor: ['#3498db', '#e74c3c', '#2ecc71'],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: { 
            display: true, 
            text: `Optimization Strategies: ${currentMetric.label} Comparison`,
            font: { size: isModal ? 16 : 12 }
          },
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (context: any) => {
                const value = context.parsed.y;
                const formatted = selectedMetric === 'kappa' ? value.toFixed(3) : `${(value * 100).toFixed(1)}%`;
                return `Overall Average: ${formatted}`;
              }
            }
          }
        },
        scales: {
          y: { 
            beginAtZero: true, 
            max: selectedMetric === 'kappa' ? 1 : 1,
            min: selectedMetric === 'kappa' ? -0.2 : 0,
            title: { 
              display: isModal, 
              text: `Overall Average ${currentMetric.label}`,
              font: { size: 12 }
            },
            ticks: {
              callback: (value: any) => {
                if (selectedMetric === 'kappa') {
                  return (value as number).toFixed(2);
                }
                return `${(value * 100).toFixed(0)}%`;
              }
            }
          },
          x: { 
            title: { 
              display: isModal, 
              text: 'Optimization Strategies',
              font: { size: 12 }
            }
          }
        }
      },
    });
  };
  
  // Main charts effect
  useEffect(() => {
    if (!data.length) return;
    
    const dispose: Array<() => void> = [];
    
    // GA Chart
    if (gaChartRef.current) {
      const ctx = gaChartRef.current.getContext('2d');
      if (ctx) {
        const chart = createOptimizerChart(ctx, 'GA', 'rgba(52,152,219,0.7)');
        dispose.push(() => chart.destroy());
      }
    }
    
    // PSO Chart
    if (psoChartRef.current) {
      const ctx = psoChartRef.current.getContext('2d');
      if (ctx) {
        const chart = createOptimizerChart(ctx, 'PSO', 'rgba(231,76,60,0.7)');
        dispose.push(() => chart.destroy());
      }
    }
    
    // ALL Chart
    if (allChartRef.current) {
      const ctx = allChartRef.current.getContext('2d');
      if (ctx) {
        const chart = createOptimizerChart(ctx, 'ALL', 'rgba(46,204,113,0.7)');
        dispose.push(() => chart.destroy());
      }
    }
    
    // Comparison Chart
    if (comparisonChartRef.current) {
      const ctx = comparisonChartRef.current.getContext('2d');
      if (ctx) {
        const chart = createComparisonChart(ctx);
        dispose.push(() => chart.destroy());
      }
    }
    
    return () => dispose.forEach(fn => fn());
  }, [data, selectedMetric]);
  
  // Modal chart effect
  useEffect(() => {
    if (!modalOpen || !selectedChart || !data.length) return;
    
    let chart: Chart | null = null;
    
    if (selectedChart.type === 'ga' && modalGARef.current) {
      const ctx = modalGARef.current.getContext('2d');
      if (ctx) {
        chart = createOptimizerChart(ctx, 'GA', 'rgba(52,152,219,0.7)', true);
      }
    } else if (selectedChart.type === 'pso' && modalPSORef.current) {
      const ctx = modalPSORef.current.getContext('2d');
      if (ctx) {
        chart = createOptimizerChart(ctx, 'PSO', 'rgba(231,76,60,0.7)', true);
      }
    } else if (selectedChart.type === 'all' && modalAllRef.current) {
      const ctx = modalAllRef.current.getContext('2d');
      if (ctx) {
        chart = createOptimizerChart(ctx, 'ALL', 'rgba(46,204,113,0.7)', true);
      }
    } else if (selectedChart.type === 'comparison' && modalComparisonRef.current) {
      const ctx = modalComparisonRef.current.getContext('2d');
      if (ctx) {
        chart = createComparisonChart(ctx, true);
      }
    }
    
    return () => {
      if (chart) chart.destroy();
    };
  }, [modalOpen, selectedChart, data, selectedMetric]);
  
  // Calculate best models for display
  const currentMetric = availableMetrics.find(m => m.key === selectedMetric) || availableMetrics[0];
  const bestGA = data.length > 0 ? findBestModel(data, 'GA', selectedMetric) : { model: 'N/A', value: 0, dataset: 'N/A' };
  const bestPSO = data.length > 0 ? findBestModel(data, 'PSO', selectedMetric) : { model: 'N/A', value: 0, dataset: 'N/A' };
  const bestALL = data.length > 0 ? findBestModel(data, 'ALL', selectedMetric) : { model: 'N/A', value: 0, dataset: 'N/A' };
  
  return (
    <>
      {/* Metric Selector */}
      <div className="bg-white rounded-lg p-4 shadow-lg mb-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold" style={{ color: 'var(--breast-cancer-accent)' }}>Metric:</h3>
          <div className="flex flex-wrap gap-2">
            {availableMetrics.map((metric) => (
              <button
                key={metric.key}
                onClick={() => setSelectedMetric(metric.key)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                  selectedMetric === metric.key
                    ? 'text-white shadow-lg'
                    : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                }`}
                style={{
                  backgroundColor: selectedMetric === metric.key ? metric.color : undefined
                }}
              >
                {metric.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Best Models Summary */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg p-4 shadow-lg border-l-4" style={{ borderColor: '#3498db' }}>
          <h4 className="font-bold text-lg mb-2" style={{ color: '#3498db' }}>GA Best Performance</h4>
          <p className="text-sm"><strong>Model:</strong> {bestGA.model}</p>
          <p className="text-sm"><strong>{currentMetric.label}:</strong> {selectedMetric === 'kappa' ? bestGA.value.toFixed(3) : `${(bestGA.value * 100).toFixed(1)}%`}</p>
          <p className="text-sm"><strong>Dataset:</strong> {bestGA.dataset.replace(/-/g, ' vs ')}</p>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-lg border-l-4" style={{ borderColor: '#e74c3c' }}>
          <h4 className="font-bold text-lg mb-2" style={{ color: '#e74c3c' }}>PSO Best Performance</h4>
          <p className="text-sm"><strong>Model:</strong> {bestPSO.model}</p>
          <p className="text-sm"><strong>{currentMetric.label}:</strong> {selectedMetric === 'kappa' ? bestPSO.value.toFixed(3) : `${(bestPSO.value * 100).toFixed(1)}%`}</p>
          <p className="text-sm"><strong>Dataset:</strong> {bestPSO.dataset.replace(/-/g, ' vs ')}</p>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-lg border-l-4" style={{ borderColor: '#2ecc71' }}>
          <h4 className="font-bold text-lg mb-2" style={{ color: '#2ecc71' }}>No Optimization Best</h4>
          <p className="text-sm"><strong>Model:</strong> {bestALL.model}</p>
          <p className="text-sm"><strong>{currentMetric.label}:</strong> {selectedMetric === 'kappa' ? bestALL.value.toFixed(3) : `${(bestALL.value * 100).toFixed(1)}%`}</p>
          <p className="text-sm"><strong>Dataset:</strong> {bestALL.dataset.replace(/-/g, ' vs ')}</p>
        </div>
      </div>
      
      {/* Performance Charts Grid */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* GA Performance */}
        <div 
          className="bg-white rounded-lg p-4 shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
          onClick={() => handleChartClick('GA Optimization Performance', 'ga')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleChartClick('GA Optimization Performance', 'ga')}
        >
          <div className="h-64">
            <canvas ref={gaChartRef} className="w-full h-full" />
          </div>
        </div>
        
        {/* PSO Performance */}
        <div 
          className="bg-white rounded-lg p-4 shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
          onClick={() => handleChartClick('PSO Optimization Performance', 'pso')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleChartClick('PSO Optimization Performance', 'pso')}
        >
          <div className="h-64">
            <canvas ref={psoChartRef} className="w-full h-full" />
          </div>
        </div>
        
        {/* ALL Performance */}
        <div 
          className="bg-white rounded-lg p-4 shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
          onClick={() => handleChartClick('No Optimization Performance', 'all')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleChartClick('No Optimization Performance', 'all')}
        >
          <div className="h-64">
            <canvas ref={allChartRef} className="w-full h-full" />
          </div>
        </div>
        
        {/* Comparison Chart */}
        <div 
          className="bg-white rounded-lg p-4 shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
          onClick={() => handleChartClick('Optimization Strategies Comparison', 'comparison')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleChartClick('Optimization Strategies Comparison', 'comparison')}
        >
          <div className="h-64">
            <canvas ref={comparisonChartRef} className="w-full h-full" />
          </div>
        </div>
      </div>
      
      {/* Modal for enlarged chart view */}
      <Modal 
        isOpen={modalOpen} 
        onClose={closeModal} 
        title={selectedChart?.title || ''}
      >
        {selectedChart && (
          <div className="w-full" style={{ minWidth: '700px', minHeight: '500px' }}>
            {selectedChart.type === 'ga' && (
              <canvas 
                ref={modalGARef}
                className="w-full h-full"
                style={{ maxWidth: '100%', maxHeight: '70vh' }}
              />
            )}
            {selectedChart.type === 'pso' && (
              <canvas 
                ref={modalPSORef}
                className="w-full h-full"
                style={{ maxWidth: '100%', maxHeight: '70vh' }}
              />
            )}
            {selectedChart.type === 'all' && (
              <canvas 
                ref={modalAllRef}
                className="w-full h-full"
                style={{ maxWidth: '100%', maxHeight: '70vh' }}
              />
            )}
            {selectedChart.type === 'comparison' && (
              <canvas 
                ref={modalComparisonRef}
                className="w-full h-full"
                style={{ maxWidth: '100%', maxHeight: '70vh' }}
              />
            )}
          </div>
        )}
      </Modal>
    </>
  );
};
