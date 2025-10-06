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

// Dataset configurations with their display names
const datasetConfigs = [
  { 
    id: 'HEALTHY MT-HEALTHY WT-BRCA', 
    title: 'HEALTHY-MT-WT-BRCA', 
    subtitle: 'Healthy With × Healthy Without × BRCA',
    color: '#e74c3c'
  },
  { 
    id: 'HEALTHY WT-BRCA', 
    title: 'HEALTHY-WT-BRCA', 
    subtitle: 'Healthy Without × BRCA',
    color: '#3498db'
  },
  { 
    id: 'HEALTHY MT-BRCA', 
    title: 'HEALTHY-MT-BRCA', 
    subtitle: 'Healthy With × BRCA',
    color: '#2ecc71'
  },
  { 
    id: 'HEALTHY-BRCA', 
    title: 'HEALTHY-BRCA', 
    subtitle: 'Healthy × BRCA',
    color: '#f39c12'
  },
  { 
    id: 'HEALTHY-PRE BRCA', 
    title: 'HEALTHY-PRE-BRCA', 
    subtitle: 'Healthy × PRE-BRCA',
    color: '#9b59b6'
  },
  { 
    id: 'HEALTHY-PRE BRCA-BRCA', 
    title: 'HEALTHY-PRE-BRCA-BRCA', 
    subtitle: 'Healthy × PRE-BRCA × BRCA',
    color: '#1abc9c'
  },
  { 
    id: 'PRE BRCA-BRCA', 
    title: 'PRE-BRCA-BRCA', 
    subtitle: 'PRE-BRCA × BRCA',
    color: '#34495e'
  },
  { 
    id: 'PRE BRCA-BRCA WT', 
    title: 'PRE-BRCA-BRCA-WT', 
    subtitle: 'PRE-BRCA × BRCA-Without',
    color: '#e67e22'
  },
  { 
    id: 'PRE BRCA-BRCA MT', 
    title: 'PRE-BRCA-BRCA-MT', 
    subtitle: 'PRE-BRCA × BRCA-With',
    color: '#95a5a6'
  }
];

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

export const ModelPerformanceCharts: React.FC = () => {
  const data = useResults();
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const modalCanvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  
  // Selected metric state
  const [selectedMetric, setSelectedMetric] = useState<string>('accuracy');
  
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDataset, setSelectedDataset] = useState<{
    title: string;
    subtitle: string;
    index: number;
  } | null>(null);
  
  // Chart click handler
  const handleChartClick = (datasetConfig: typeof datasetConfigs[0], index: number) => {
    setSelectedDataset({
      title: datasetConfig.title,
      subtitle: datasetConfig.subtitle,
      index
    });
    setModalOpen(true);
  };
  
  // Close modal handler
  const closeModal = () => {
    setModalOpen(false);
    setSelectedDataset(null);
  };
  
  // Create individual dataset model performance chart
  const createDatasetModelChart = (ctx: CanvasRenderingContext2D, datasetName: string, isModal: boolean = false) => {
    const datasetData = data.filter(d => d.dataset === datasetName);
    const currentMetric = availableMetrics.find(m => m.key === selectedMetric) || availableMetrics[0];
    
    if (datasetData.length === 0) {
      // Create empty chart placeholder
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
            title: { 
              display: true, 
              text: `${datasetName}: No Data Available`,
              font: { size: isModal ? 16 : 12 }
            },
            legend: { display: false }
          },
          scales: {
            y: { beginAtZero: true, max: selectedMetric === 'kappa' ? 1 : 1 }
          }
        }
      });
    }
    
    // Define ML models
    const models = ['Random Forest', 'XGBoost', 'Light GBM', 'Gradient Boosting', 'Ada Boost'];
    
    // Create datasets for each optimizer
    const optimizers = ['GA', 'PSO', 'ALL'];
    const datasets = optimizers.map((optimizer, optIdx) => {
      const optimizerData = datasetData.filter(d => d.model === optimizer);
      
      return {
        label: `${optimizer === 'ALL' ? 'No Optimization' : optimizer + ' Optimization'}`,
        data: models.map(model => {
          const modelEntry = optimizerData.find(d => d.method === model);
          return modelEntry ? modelEntry[selectedMetric as keyof MetricResult] as number : 0;
        }),
        backgroundColor: optIdx === 0 ? 'rgba(52,152,219,0.7)' : optIdx === 1 ? 'rgba(231,76,60,0.7)' : 'rgba(46,204,113,0.7)',
        borderColor: optIdx === 0 ? '#3498db' : optIdx === 1 ? '#e74c3c' : '#2ecc71',
        borderWidth: 2
      };
    });
    
    return new Chart(ctx, {
      type: 'bar',
      data: {
        labels: models.map(m => isModal ? m : m.replace(' ', '\n')),
        datasets: datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: { 
            display: true, 
            text: `${datasetName.replace(/-/g, ' vs ')} - ${currentMetric.label}`,
            font: { size: isModal ? 16 : 10 }
          },
          legend: { 
            display: true, 
            position: 'top',
            labels: { font: { size: isModal ? 12 : 8 } }
          },
          tooltip: {
            callbacks: {
              label: (context: any) => {
                const value = context.parsed.y;
                const percentage = selectedMetric === 'kappa' ? value.toFixed(3) : `${(value * 100).toFixed(1)}%`;
                return `${context.dataset.label}: ${percentage} ${currentMetric.label}`;
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
              text: currentMetric.label,
              font: { size: isModal ? 12 : 10 }
            },
            ticks: {
              font: { size: isModal ? 10 : 8 },
              callback: (value: any) => {
                if (selectedMetric === 'kappa') {
                  return (value as number).toFixed(2);
                }
                return isModal ? `${(value * 100).toFixed(0)}%` : (value as number).toFixed(1);
              }
            }
          },
          x: { 
            title: { 
              display: isModal, 
              text: 'ML Models',
              font: { size: isModal ? 12 : 10 }
            },
            ticks: { font: { size: isModal ? 10 : 8 } }
          }
        }
      },
    });
  };
  
  // Main charts effect
  useEffect(() => {
    if (!data.length) return;
    
    const dispose: Array<() => void> = [];
    
    // Create charts for all 9 datasets
    datasetConfigs.forEach((config, index) => {
      const canvas = canvasRefs.current[index];
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const chart = createDatasetModelChart(ctx, config.id);
          dispose.push(() => chart.destroy());
        }
      }
    });
    
    return () => dispose.forEach(fn => fn());
  }, [data, selectedMetric]);
  
  // Modal chart effect
  useEffect(() => {
    if (!modalOpen || !selectedDataset || !data.length) return;
    
    const config = datasetConfigs[selectedDataset.index];
    const canvas = modalCanvasRefs.current[selectedDataset.index];
    
    if (canvas && config) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const chart = createDatasetModelChart(ctx, config.id, true);
        return () => chart.destroy();
      }
    }
  }, [modalOpen, selectedDataset, data, selectedMetric]);
  
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
      
      {/* 3x3 Grid of Dataset Charts */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {datasetConfigs.map((config, index) => (
          <div 
            key={config.id}
            className="bg-white rounded-lg p-4 shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
            onClick={() => handleChartClick(config, index)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleChartClick(config, index)}
          >
            <div className="text-center mb-3">
              <h4 className="font-bold text-sm mb-1" style={{ color: config.color }}>
                Dataset {index + 1}
              </h4>
            </div>
            <div className="h-64">
              <canvas 
                ref={(el) => canvasRefs.current[index] = el}
                className="w-full h-full"
              />
            </div>
          </div>
        ))}
      </div>
      
      {/* Modal for enlarged chart view */}
      <Modal 
        isOpen={modalOpen} 
        onClose={closeModal}         
      >
        {selectedDataset && (
          <div className="w-full" style={{ minWidth: '700px', minHeight: '500px' }}>
            <canvas 
              ref={(el) => modalCanvasRefs.current[selectedDataset.index] = el}
              className="w-full h-full"
              style={{ maxWidth: '100%', maxHeight: '70vh' }}
            />
          </div>
        )}
      </Modal>
    </>
  );
};
