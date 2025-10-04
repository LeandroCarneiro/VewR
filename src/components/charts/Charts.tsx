import React, { useEffect, useRef, useState } from 'react';
import {
  Chart,
  registerables,
} from 'chart.js';
import type { ChartConfiguration } from 'chart.js';
import { BoxPlotController, ViolinController, BoxAndWiskers, Violin } from '@sgratzl/chartjs-chart-boxplot';
import { Modal } from '../Modal';

Chart.register(...registerables, BoxPlotController, ViolinController, BoxAndWiskers, Violin);

type MetricResult = {
  method: string;
  featureSelection: string;
  accuracy: number;
  f1Score: number;
  rocAuc: number;
  sensitivity: number;
  specificity: number;
  precision: number;
  kappa: number;
};

const parseCSV = (csvText: string): MetricResult[] => {
  const lines = csvText.trim().split('\n');
  return lines.slice(1).map(line => {
    const values = line.split(',');
    return {
      featureSelection: values[0],
      method: values[1],
      accuracy: parseFloat(values[2]),
      f1Score: parseFloat(values[3]),
      rocAuc: parseFloat(values[4]),
      sensitivity: parseFloat(values[5]),
      specificity: parseFloat(values[6]),
      precision: parseFloat(values[7]),
      kappa: parseFloat(values[8])
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

const getChartOptions = (): ChartConfiguration['options'] => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: true, position: 'top', labels: { boxWidth: 12, padding: 15, font: { size: 11 } } },
    tooltip: {
      backgroundColor: 'rgba(44, 62, 80, 0.9)',
      titleColor: '#ffffff',
      bodyColor: '#ffffff',
      borderColor: '#3498db',
      borderWidth: 1,
      callbacks: {
        label: (context: any) => `${context.dataset.label}: ${context.parsed.y.toFixed(3)}`,
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 1,
      title: { display: true, text: 'Metric Score (0-1)', color: '#2c3e50', font: { size: 12, weight: 'bold' } },
      grid: { color: '#ecf0f1' },
      ticks: { color: '#7f8c8d', stepSize: 0.1 },
    },
    x: {
      title: { display: true, text: 'Machine Learning Methods', color: '#2c3e50', font: { size: 12, weight: 'bold' } },
      grid: { display: true },
      ticks: { color: '#7f8c8d' },
    },
  },
});

export const Charts: React.FC = () => {
  const allRef = useRef<HTMLCanvasElement | null>(null);
  const violinRef = useRef<HTMLCanvasElement | null>(null);
  const boxplotRef = useRef<HTMLCanvasElement | null>(null);
  
  // Modal canvas refs (separate from main view)
  const modalAllRef = useRef<HTMLCanvasElement | null>(null);
  const modalViolinRef = useRef<HTMLCanvasElement | null>(null);
  const modalBoxplotRef = useRef<HTMLCanvasElement | null>(null);
  
  // Modal state for chart popup
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedChart, setSelectedChart] = useState<{
    title: string;
    type: 'all' | 'violin' | 'boxplot';
  } | null>(null);
  
  const data = useResults();
  
  // Chart click handler
  const handleChartClick = (title: string, type: 'all' | 'violin' | 'boxplot') => {
    setSelectedChart({ title, type });
    setModalOpen(true);
  };
  
  // Close modal handler
  const closeModal = () => {
    setModalOpen(false);
    setSelectedChart(null);
  };
  
  // Function to create chart configurations
  const createBarChart = (ctx: CanvasRenderingContext2D, metrics: MetricResult[]) => {
    return new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Light GBM', 'XGBoost', 'G. Boosting', 'R. Forest'],
        datasets: [
          { label: 'Kappa', data: metrics.map(m => m.kappa), backgroundColor: '#3498db', borderColor: '#2980b9', borderWidth: 1 },
          { label: 'Accuracy', data: metrics.map(m => m.accuracy), backgroundColor: '#e74c3c', borderColor: '#c0392b', borderWidth: 1 },
          { label: 'F1-Score', data: metrics.map(m => m.f1Score), backgroundColor: '#2ecc71', borderColor: '#27ae60', borderWidth: 1 },
          { label: 'Specificity', data: metrics.map(m => m.specificity), backgroundColor: '#f39c12', borderColor: '#e67e22', borderWidth: 1 },
          { label: 'Sensitivity', data: metrics.map(m => m.sensitivity), backgroundColor: '#9b59b6', borderColor: '#8e44ad', borderWidth: 1 },
          { label: 'ROC-AUC', data: metrics.map(m => m.rocAuc), backgroundColor: '#1abc9c', borderColor: '#16a085', borderWidth: 1 },
        ],
      },
      options: getChartOptions(),
    });
  };
  
  const createViolinChart = (ctx: CanvasRenderingContext2D, ga: MetricResult[], pso: MetricResult[], ml: MetricResult[]) => {
    const toSeries = (m: MetricResult[]) => ({
      accuracy: m.map(x => x.accuracy), f1: m.map(x => x.f1Score), roc: m.map(x => x.rocAuc), 
      sens: m.map(x => x.sensitivity), spec: m.map(x => x.specificity), kappa: m.map(x => x.kappa)
    });
    const gaS = toSeries(ga);
    const psoS = toSeries(pso);
    const mlS = toSeries(ml);
    
    return new Chart(ctx, {
      type: 'violin' as any,
      data: {
        labels: ['Accuracy', 'F1-Score', 'ROC-AUC', 'Sensitivity', 'Specificity', 'Kappa'],
        datasets: [
          { label: 'GA + ML Methods', backgroundColor: 'rgba(52,152,219,0.7)', borderColor: '#3498db', borderWidth: 2, data: [gaS.accuracy, gaS.f1, gaS.roc, gaS.sens, gaS.spec, gaS.kappa] as any },
          { label: 'PSO + ML Methods', backgroundColor: 'rgba(231,76,60,0.7)', borderColor: '#e74c3c', borderWidth: 2, data: [psoS.accuracy, psoS.f1, psoS.roc, psoS.sens, psoS.spec, psoS.kappa] as any },
          { label: 'Only ML Methods', backgroundColor: 'rgba(46,204,113,0.7)', borderColor: '#2ecc71', borderWidth: 2, data: [mlS.accuracy, mlS.f1, mlS.roc, mlS.sens, mlS.spec, mlS.kappa] as any },
        ],
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { tooltip: { callbacks: { label: (c: any) => {
        const violinStats = (arr: number[]) => {
          const sorted = [...arr].sort((a, b) => a - b);
          const n = sorted.length;
          const mean = sorted.reduce((s, v) => s + v, 0) / n;
          const median = n % 2 === 0 ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2 : sorted[Math.floor(n / 2)];
          return { mean, median };
        };
        const stats = violinStats(c.dataset.data[c.dataIndex]);
        return [`Median: ${stats.median.toFixed(3)}`, `Mean: ${stats.mean.toFixed(3)}`];
      }}}}},
    });
  };
  
  const createBoxplotChart = (ctx: CanvasRenderingContext2D, ga: MetricResult[], pso: MetricResult[], ml: MetricResult[]) => {
    const toSeries = (m: MetricResult[]) => ({
      accuracy: m.map(x => x.accuracy), f1: m.map(x => x.f1Score), roc: m.map(x => x.rocAuc), 
      sens: m.map(x => x.sensitivity), spec: m.map(x => x.specificity), kappa: m.map(x => x.kappa)
    });
    const gaS = toSeries(ga);
    const psoS = toSeries(pso);
    const mlS = toSeries(ml);
    
    return new Chart(ctx, {
      type: 'boxplot' as any,
      data: {
        labels: ['Accuracy', 'F1-Score', 'ROC-AUC', 'Sensitivity', 'Specificity', 'Kappa'],
        datasets: [
          { label: 'GA + ML Methods', backgroundColor: 'rgba(52,152,219,0.8)', borderColor: '#3498db', borderWidth: 2, data: [gaS.accuracy, gaS.f1, gaS.roc, gaS.sens, gaS.spec, gaS.kappa] as any },
          { label: 'PSO + ML Methods', backgroundColor: 'rgba(231,76,60,0.8)', borderColor: '#e74c3c', borderWidth: 2, data: [psoS.accuracy, psoS.f1, psoS.roc, psoS.sens, psoS.spec, psoS.kappa] as any },
          { label: 'Only ML Methods', backgroundColor: 'rgba(46,204,113,0.8)', borderColor: '#2ecc71', borderWidth: 2, data: [mlS.accuracy, mlS.f1, mlS.roc, mlS.sens, mlS.spec, mlS.kappa] as any },
        ],
      },
      options: { responsive: true, maintainAspectRatio: false },
    });
  };

  // Main charts effect for the grid view
  useEffect(() => {
    if (!data.length) return;

    const getByFS = (fs: string) => data.filter(d => d.featureSelection === fs);
    const ga = getByFS('GA');
    const pso = getByFS('PSO');
    const ml = getByFS('NONE');

    const dispose: Array<() => void> = [];

    // Create main view charts
    if (allRef.current) {
      const ctx = allRef.current.getContext('2d');
      if (ctx) {
        const chart = createBarChart(ctx, ml);
        dispose.push(() => chart.destroy());
      }
    }

    if (violinRef.current) {
      const ctx = violinRef.current.getContext('2d');
      if (ctx) {
        const chart = createViolinChart(ctx, ga, pso, ml);
        dispose.push(() => chart.destroy());
      }
    }

    if (boxplotRef.current) {
      const ctx = boxplotRef.current.getContext('2d');
      if (ctx) {
        const chart = createBoxplotChart(ctx, ga, pso, ml);
        dispose.push(() => chart.destroy());
      }
    }

    return () => dispose.forEach(fn => fn());
  }, [data]);
  
  // Modal charts effect
  useEffect(() => {
    if (!modalOpen || !selectedChart || !data.length) return;

    const getByFS = (fs: string) => data.filter(d => d.featureSelection === fs);
    const ga = getByFS('GA');
    const pso = getByFS('PSO');
    const ml = getByFS('NONE');

    let chart: Chart | null = null;

    // Create modal chart based on selected type
    if (selectedChart.type === 'all' && modalAllRef.current) {
      const ctx = modalAllRef.current.getContext('2d');
      if (ctx) {
        chart = createBarChart(ctx, ml);
      }
    } else if (selectedChart.type === 'violin' && modalViolinRef.current) {
      const ctx = modalViolinRef.current.getContext('2d');
      if (ctx) {
        chart = createViolinChart(ctx, ga, pso, ml);
      }
    } else if (selectedChart.type === 'boxplot' && modalBoxplotRef.current) {
      const ctx = modalBoxplotRef.current.getContext('2d');
      if (ctx) {
        chart = createBoxplotChart(ctx, ga, pso, ml);
      }
    }

    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [modalOpen, selectedChart, data]);

  return (
    <>
      {/* Charts in responsive grid layout (3-4 columns depending on screen size) */}
      <div className="charts-grid">
        <div 
          className="chart-item h-72"
          onClick={() => handleChartClick('Machine Learning Methods Comparison', 'all')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleChartClick('Machine Learning Methods Comparison', 'all')}
        >
          <h4 className="mb-2 font-semibold text-center">ML Methods Performance</h4>
          <canvas ref={allRef} className="w-full h-full" />
        </div>
        
        <div 
          className="chart-item h-72"
          onClick={() => handleChartClick('Multi-Metric Violin Plot Analysis', 'violin')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleChartClick('Multi-Metric Violin Plot Analysis', 'violin')}
        >
          <h4 className="mb-2 font-semibold text-center">Violin Plot Analysis</h4>
          <canvas ref={violinRef} className="w-full h-full" />
        </div>
        
        <div 
          className="chart-item h-72"
          onClick={() => handleChartClick('Multi-Metric Boxplot Analysis', 'boxplot')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleChartClick('Multi-Metric Boxplot Analysis', 'boxplot')}
        >
          <h4 className="mb-2 font-semibold text-center">Boxplot Analysis</h4>
          <canvas ref={boxplotRef} className="w-full h-full" />
        </div>
        
        {/* Add more placeholder charts to demonstrate the grid */}
        <div className="chart-item h-72 flex items-center justify-center" style={{ backgroundColor: '#f8f9fa' }}>
          <div className="text-center">
            <h4 className="font-semibold mb-2">Feature Selection Impact</h4>
            <p className="text-sm text-gray-600">Chart placeholder</p>
          </div>
        </div>
      </div>

      {/* Modal for enlarged chart view */}
      <Modal 
        isOpen={modalOpen} 
        onClose={closeModal} 
        title={selectedChart?.title}
      >
        {selectedChart && (
          <div className="w-full" style={{ minWidth: '700px', minHeight: '500px' }}>
            {selectedChart.type === 'all' && (
              <canvas 
                ref={modalAllRef}
                className="w-full h-full"
                style={{ maxWidth: '100%', maxHeight: '70vh' }}
              />
            )}
            {selectedChart.type === 'violin' && (
              <canvas 
                ref={modalViolinRef}
                className="w-full h-full"
                style={{ maxWidth: '100%', maxHeight: '70vh' }}
              />
            )}
            {selectedChart.type === 'boxplot' && (
              <canvas 
                ref={modalBoxplotRef}
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
