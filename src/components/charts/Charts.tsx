import React, { useEffect, useRef, useState } from 'react';
import {
  Chart,
  registerables,
} from 'chart.js';
import { BoxPlotController, ViolinController, BoxAndWiskers, Violin } from '@sgratzl/chartjs-chart-boxplot';
import { Modal } from '../Modal';

Chart.register(...registerables, BoxPlotController, ViolinController, BoxAndWiskers, Violin);

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


export const Charts: React.FC = () => {
  // Chart refs for main grid view
  const gaPerformanceRef = useRef<HTMLCanvasElement | null>(null);
  const psoPerformanceRef = useRef<HTMLCanvasElement | null>(null);
  const datasetComparisonRef = useRef<HTMLCanvasElement | null>(null);
  const modelComparisonRef = useRef<HTMLCanvasElement | null>(null);
  const metricDistributionRef = useRef<HTMLCanvasElement | null>(null);
  
  // Individual dataset model comparison refs
  const dataset1ModelRef = useRef<HTMLCanvasElement | null>(null);
  const dataset2ModelRef = useRef<HTMLCanvasElement | null>(null);
  const dataset3ModelRef = useRef<HTMLCanvasElement | null>(null);
  
  // Modal canvas refs
  const modalGARef = useRef<HTMLCanvasElement | null>(null);
  const modalPSORef = useRef<HTMLCanvasElement | null>(null);
  const modalDatasetRef = useRef<HTMLCanvasElement | null>(null);
  const modalModelRef = useRef<HTMLCanvasElement | null>(null);
  const modalMetricRef = useRef<HTMLCanvasElement | null>(null);
  const modalDataset1Ref = useRef<HTMLCanvasElement | null>(null);
  const modalDataset2Ref = useRef<HTMLCanvasElement | null>(null);
  const modalDataset3Ref = useRef<HTMLCanvasElement | null>(null);
  
  // Modal state for chart popup
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedChart, setSelectedChart] = useState<{
    title: string;
    type: 'ga-performance' | 'pso-performance' | 'dataset-comparison' | 'model-comparison' | 'metric-distribution' | 'dataset-model-1' | 'dataset-model-2' | 'dataset-model-3';
  } | null>(null);
  
  const data = useResults();
  
  // Chart click handler
  const handleChartClick = (title: string, type: 'ga-performance' | 'pso-performance' | 'dataset-comparison' | 'model-comparison' | 'metric-distribution' | 'dataset-model-1' | 'dataset-model-2' | 'dataset-model-3') => {
    setSelectedChart({ title, type });
    setModalOpen(true);
  };
  
  // Close modal handler
  const closeModal = () => {
    setModalOpen(false);
    setSelectedChart(null);
  };
  
  // Helper functions to organize data
  const getTopDatasets = (data: MetricResult[], count: number = 5) => {
    const datasetAvgPerformance = data.reduce((acc, curr) => {
      if (!acc[curr.dataset]) {
        acc[curr.dataset] = { total: 0, count: 0 };
      }
      acc[curr.dataset].total += curr.accuracy;
      acc[curr.dataset].count += 1;
      return acc;
    }, {} as Record<string, { total: number; count: number }>);
    
    return Object.entries(datasetAvgPerformance)
      .map(([dataset, stats]) => ({ dataset, avgAccuracy: stats.total / stats.count }))
      .sort((a, b) => b.avgAccuracy - a.avgAccuracy)
      .slice(0, count)
      .map(d => d.dataset);
  };
  
  // GA Performance Chart
  const createGAChart = (ctx: CanvasRenderingContext2D, gaData: MetricResult[]) => {
    const topDatasets = getTopDatasets(gaData);
    const filteredData = gaData.filter(d => topDatasets.includes(d.dataset));
    
    const datasets = ['Accuracy', 'ROC-AUC', 'F1-Score', 'Sensitivity', 'Specificity', 'Precision', 'Kappa'].map((metric, idx) => {
      const colors = ['#3498db', '#1abc9c', '#2ecc71', '#f39c12', '#9b59b6', '#e67e22', '#34495e'];
      const metricKey = metric === 'ROC-AUC' ? 'rocAuc' : metric === 'F1-Score' ? 'f1Score' : metric.toLowerCase();
      const dataByDataset = topDatasets.map(dataset => {
        const datasetMetrics = filteredData.filter(d => d.dataset === dataset);
        const avgValue = datasetMetrics.reduce((sum, d) => {
          const value = d[metricKey as keyof MetricResult];
          return sum + (typeof value === 'number' ? value : 0);
        }, 0) / datasetMetrics.length;
        return avgValue;
      });
      
      return {
        label: metric,
        data: dataByDataset,
        backgroundColor: colors[idx],
        borderColor: colors[idx],
        borderWidth: 1
      };
    });
    
    return new Chart(ctx, {
      type: 'bar',
      data: {
        labels: topDatasets.map(d => d.replace('-', '\n')),
        datasets: datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: { display: true, text: 'GA Optimization Performance by Dataset' },
          legend: { display: true, position: 'top' }
        },
        scales: {
          y: { beginAtZero: true, max: 1 },
          x: { title: { display: true, text: 'Datasets' } }
        }
      },
    });
  };
  
  // PSO Performance Chart
  const createPSOChart = (ctx: CanvasRenderingContext2D, psoData: MetricResult[]) => {
    const topDatasets = getTopDatasets(psoData);
    const filteredData = psoData.filter(d => topDatasets.includes(d.dataset));
    
    const datasets = ['Accuracy', 'ROC-AUC', 'F1-Score', 'Sensitivity', 'Specificity', 'Precision', 'Kappa'].map((metric, idx) => {
      const colors = ['#3498db', '#1abc9c', '#2ecc71', '#f39c12', '#9b59b6', '#e67e22', '#34495e'];
      const metricKey = metric === 'ROC-AUC' ? 'rocAuc' : metric === 'F1-Score' ? 'f1Score' : metric.toLowerCase();
      const dataByDataset = topDatasets.map(dataset => {
        const datasetMetrics = filteredData.filter(d => d.dataset === dataset);
        const avgValue = datasetMetrics.reduce((sum, d) => {
          const value = d[metricKey as keyof MetricResult];
          return sum + (typeof value === 'number' ? value : 0);
        }, 0) / datasetMetrics.length;
        return avgValue;
      });
      
      return {
        label: metric,
        data: dataByDataset,
        backgroundColor: colors[idx],
        borderColor: colors[idx],
        borderWidth: 1
      };
    });
    
    return new Chart(ctx, {
      type: 'bar',
      data: {
        labels: topDatasets.map(d => d.replace('-', '\n')),
        datasets: datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: { display: true, text: 'PSO Optimization Performance by Dataset' },
          legend: { display: true, position: 'top' }
        },
        scales: {
          y: { beginAtZero: true, max: 1 },
          x: { title: { display: true, text: 'Datasets' } }
        }
      },
    });
  };
  
  // Dataset Comparison Chart (GA vs PSO vs ALL)
  const createDatasetComparisonChart = (ctx: CanvasRenderingContext2D, allData: MetricResult[]) => {
    const topDatasets = getTopDatasets(allData, 4);
    
    const gaData = allData.filter(d => d.model === 'GA' && topDatasets.includes(d.dataset));
    const psoData = allData.filter(d => d.model === 'PSO' && topDatasets.includes(d.dataset));
    const allModelData = allData.filter(d => d.model === 'ALL' && topDatasets.includes(d.dataset));
    
    const datasets = [
      {
        label: 'GA Optimization',
        data: topDatasets.map(dataset => {
          const metrics = gaData.filter(d => d.dataset === dataset);
          return metrics.length > 0 ? metrics.reduce((sum, d) => sum + d.accuracy, 0) / metrics.length : 0;
        }),
        backgroundColor: '#3498db',
        borderColor: '#2980b9',
        borderWidth: 2
      },
      {
        label: 'PSO Optimization', 
        data: topDatasets.map(dataset => {
          const metrics = psoData.filter(d => d.dataset === dataset);
          return metrics.length > 0 ? metrics.reduce((sum, d) => sum + d.accuracy, 0) / metrics.length : 0;
        }),
        backgroundColor: '#e74c3c',
        borderColor: '#c0392b', 
        borderWidth: 2
      },
      {
        label: 'All Features',
        data: topDatasets.map(dataset => {
          const metrics = allModelData.filter(d => d.dataset === dataset);
          return metrics.length > 0 ? metrics.reduce((sum, d) => sum + d.accuracy, 0) / metrics.length : 0;
        }),
        backgroundColor: '#2ecc71',
        borderColor: '#27ae60',
        borderWidth: 2
      }
    ];
    
    return new Chart(ctx, {
      type: 'bar',
      data: {
        labels: topDatasets.map(d => d.split('-').join('\n')),
        datasets: datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: { display: true, text: 'Metaheuristic Comparison: Average Accuracy' },
          legend: { display: true, position: 'top' }
        },
        scales: {
          y: { beginAtZero: true, max: 1 },
          x: { title: { display: true, text: 'Datasets' } }
        }
      },
    });
  };
  
  // Model Performance Comparison Chart - Shows performance for each individual dataset
  const createModelComparisonChart = (ctx: CanvasRenderingContext2D, allData: MetricResult[]) => {
    // Get all unique datasets
    const allDatasets = [...new Set(allData.map(d => d.dataset))];
    
    // For visualization, we'll create a grouped bar chart showing model performance per dataset
    // We'll focus on one specific high-performing dataset for clarity
    const selectedDataset = allDatasets.find(d => d === 'HEALTHY-BRCA') || 
                            allDatasets.find(d => d === 'PRE-BRCA-BRCA') || 
                            allDatasets[0];
    
    const datasetData = allData.filter(d => d.dataset === selectedDataset);
    
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
          return modelEntry ? modelEntry.accuracy : 0;
        }),
        backgroundColor: optIdx === 0 ? 'rgba(52,152,219,0.7)' : optIdx === 1 ? 'rgba(231,76,60,0.7)' : 'rgba(46,204,113,0.7)',
        borderColor: optIdx === 0 ? '#3498db' : optIdx === 1 ? '#e74c3c' : '#2ecc71',
        borderWidth: 2
      };
    });
    
    return new Chart(ctx, {
      type: 'bar',
      data: {
        labels: models.map(m => m.replace(' ', '\n')),
        datasets: datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: { 
            display: true, 
            text: `ML Model Performance: ${selectedDataset.replace(/-/g, ' vs ')}`
          },
          legend: { display: true, position: 'top' },
          tooltip: {
            callbacks: {
              label: (context: any) => `${context.dataset.label}: ${(context.parsed.y * 100).toFixed(1)}% Accuracy`
            }
          }
        },
        scales: {
          y: { 
            beginAtZero: true, 
            max: 1,
            title: { display: true, text: 'Accuracy' },
            ticks: {
              callback: (value: any) => `${(value * 100).toFixed(0)}%`
            }
          },
          x: { title: { display: true, text: 'ML Models' } }
        }
      },
    });
  };
  
  // Individual Dataset Model Performance Charts
  const createDatasetModelChart = (ctx: CanvasRenderingContext2D, allData: MetricResult[], datasetName: string) => {
    const datasetData = allData.filter(d => d.dataset === datasetName);
    
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
          return modelEntry ? modelEntry.accuracy : 0;
        }),
        backgroundColor: optIdx === 0 ? 'rgba(52,152,219,0.7)' : optIdx === 1 ? 'rgba(231,76,60,0.7)' : 'rgba(46,204,113,0.7)',
        borderColor: optIdx === 0 ? '#3498db' : optIdx === 1 ? '#e74c3c' : '#2ecc71',
        borderWidth: 2
      };
    });
    
    return new Chart(ctx, {
      type: 'bar',
      data: {
        labels: models.map(m => m.replace(' ', '\n')),
        datasets: datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: { 
            display: true, 
            text: `${datasetName.replace(/-/g, ' vs ')}: Model Performance by Optimizer`,
            font: { size: 14 }
          },
          legend: { display: true, position: 'top' },
          tooltip: {
            callbacks: {
              label: (context: any) => `${context.dataset.label}: ${(context.parsed.y * 100).toFixed(1)}% Accuracy`
            }
          }
        },
        scales: {
          y: { 
            beginAtZero: true, 
            max: 1,
            title: { display: true, text: 'Accuracy' },
            ticks: {
              callback: (value: any) => `${(value * 100).toFixed(0)}%`
            }
          },
          x: { title: { display: true, text: 'ML Models' } }
        }
      },
    });
  };
  
  // Metric Distribution Chart (Boxplot style visualization)
  const createMetricDistributionChart = (ctx: CanvasRenderingContext2D, allData: MetricResult[]) => {
    // Get data by model type
    const gaData = allData.filter(d => d.model === 'GA');
    const psoData = allData.filter(d => d.model === 'PSO');
    const allModelData = allData.filter(d => d.model === 'ALL');
    
    const metrics = ['accuracy', 'rocAuc', 'f1Score', 'sensitivity', 'specificity', 'precision', 'kappa'];
    const labels = ['Accuracy', 'ROC-AUC', 'F1-Score', 'Sensitivity', 'Specificity', 'Precision', 'Kappa'];
    
    const datasets = [
      {
        label: 'GA Optimization',
        data: metrics.map(metric => {
          const values = gaData.map(d => d[metric as keyof MetricResult] as number);
          return values.reduce((sum, val) => sum + val, 0) / values.length;
        }),
        backgroundColor: 'rgba(52,152,219,0.8)',
        borderColor: '#3498db',
        borderWidth: 2
      },
      {
        label: 'PSO Optimization',
        data: metrics.map(metric => {
          const values = psoData.map(d => d[metric as keyof MetricResult] as number);
          return values.reduce((sum, val) => sum + val, 0) / values.length;
        }),
        backgroundColor: 'rgba(231,76,60,0.8)',
        borderColor: '#e74c3c',
        borderWidth: 2
      },
      {
        label: 'All Features',
        data: metrics.map(metric => {
          const values = allModelData.map(d => d[metric as keyof MetricResult] as number);
          return values.reduce((sum, val) => sum + val, 0) / values.length;
        }),
        backgroundColor: 'rgba(46,204,113,0.8)',
        borderColor: '#2ecc71',
        borderWidth: 2
      }
    ];
    
    return new Chart(ctx, {
      type: 'radar',
      data: {
        labels: labels,
        datasets: datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            beginAtZero: true,
            max: 1,
            ticks: {
              stepSize: 0.2
            }
          }
        },
        plugins: {
          title: { display: true, text: 'Overall Metric Performance Comparison' },
          legend: { position: 'bottom' }
        }
      },
    });
  };

  // Main charts effect for the grid view
  useEffect(() => {
    if (!data.length) return;

    const gaData = data.filter(d => d.model === 'GA');
    const psoData = data.filter(d => d.model === 'PSO');

    const dispose: Array<() => void> = [];

    // Create GA Performance Chart
    if (gaPerformanceRef.current) {
      const ctx = gaPerformanceRef.current.getContext('2d');
      if (ctx) {
        const chart = createGAChart(ctx, gaData);
        dispose.push(() => chart.destroy());
      }
    }

    // Create PSO Performance Chart
    if (psoPerformanceRef.current) {
      const ctx = psoPerformanceRef.current.getContext('2d');
      if (ctx) {
        const chart = createPSOChart(ctx, psoData);
        dispose.push(() => chart.destroy());
      }
    }

    // Create Dataset Comparison Chart
    if (datasetComparisonRef.current) {
      const ctx = datasetComparisonRef.current.getContext('2d');
      if (ctx) {
        const chart = createDatasetComparisonChart(ctx, data);
        dispose.push(() => chart.destroy());
      }
    }

    // Create Model Comparison Chart
    if (modelComparisonRef.current) {
      const ctx = modelComparisonRef.current.getContext('2d');
      if (ctx) {
        const chart = createModelComparisonChart(ctx, data);
        dispose.push(() => chart.destroy());
      }
    }

    // Create Metric Distribution Chart
    if (metricDistributionRef.current) {
      const ctx = metricDistributionRef.current.getContext('2d');
      if (ctx) {
        const chart = createMetricDistributionChart(ctx, data);
        dispose.push(() => chart.destroy());
      }
    }

    // Create individual dataset model comparison charts
    const topDatasets = getTopDatasets(data, 3);
    
    if (dataset1ModelRef.current && topDatasets[0]) {
      const ctx = dataset1ModelRef.current.getContext('2d');
      if (ctx) {
        const chart = createDatasetModelChart(ctx, data, topDatasets[0]);
        dispose.push(() => chart.destroy());
      }
    }
    
    if (dataset2ModelRef.current && topDatasets[1]) {
      const ctx = dataset2ModelRef.current.getContext('2d');
      if (ctx) {
        const chart = createDatasetModelChart(ctx, data, topDatasets[1]);
        dispose.push(() => chart.destroy());
      }
    }
    
    if (dataset3ModelRef.current && topDatasets[2]) {
      const ctx = dataset3ModelRef.current.getContext('2d');
      if (ctx) {
        const chart = createDatasetModelChart(ctx, data, topDatasets[2]);
        dispose.push(() => chart.destroy());
      }
    }

    return () => dispose.forEach(fn => fn());
  }, [data]);
  
  // Modal charts effect
  useEffect(() => {
    if (!modalOpen || !selectedChart || !data.length) return;

    const gaData = data.filter(d => d.model === 'GA');
    const psoData = data.filter(d => d.model === 'PSO');

    let chart: Chart | null = null;

    // Create modal chart based on selected type
    if (selectedChart.type === 'ga-performance' && modalGARef.current) {
      const ctx = modalGARef.current.getContext('2d');
      if (ctx) {
        chart = createGAChart(ctx, gaData);
      }
    } else if (selectedChart.type === 'pso-performance' && modalPSORef.current) {
      const ctx = modalPSORef.current.getContext('2d');
      if (ctx) {
        chart = createPSOChart(ctx, psoData);
      }
    } else if (selectedChart.type === 'dataset-comparison' && modalDatasetRef.current) {
      const ctx = modalDatasetRef.current.getContext('2d');
      if (ctx) {
        chart = createDatasetComparisonChart(ctx, data);
      }
    } else if (selectedChart.type === 'model-comparison' && modalModelRef.current) {
      const ctx = modalModelRef.current.getContext('2d');
      if (ctx) {
        chart = createModelComparisonChart(ctx, data);
      }
    } else if (selectedChart.type === 'metric-distribution' && modalMetricRef.current) {
      const ctx = modalMetricRef.current.getContext('2d');
      if (ctx) {
        chart = createMetricDistributionChart(ctx, data);
      }
    } else if (selectedChart.type === 'dataset-model-1' && modalDataset1Ref.current) {
      const topDatasets = getTopDatasets(data, 3);
      const ctx = modalDataset1Ref.current.getContext('2d');
      if (ctx && topDatasets[0]) {
        chart = createDatasetModelChart(ctx, data, topDatasets[0]);
      }
    } else if (selectedChart.type === 'dataset-model-2' && modalDataset2Ref.current) {
      const topDatasets = getTopDatasets(data, 3);
      const ctx = modalDataset2Ref.current.getContext('2d');
      if (ctx && topDatasets[1]) {
        chart = createDatasetModelChart(ctx, data, topDatasets[1]);
      }
    } else if (selectedChart.type === 'dataset-model-3' && modalDataset3Ref.current) {
      const topDatasets = getTopDatasets(data, 3);
      const ctx = modalDataset3Ref.current.getContext('2d');
      if (ctx && topDatasets[2]) {
        chart = createDatasetModelChart(ctx, data, topDatasets[2]);
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
      {/* Charts in responsive grid layout */}
      <div className="charts-grid">
        <div 
          className="chart-item h-72"
          onClick={() => handleChartClick('GA Optimization Performance by Dataset', 'ga-performance')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleChartClick('GA Optimization Performance by Dataset', 'ga-performance')}
        >
          <h4 className="mb-2 font-semibold text-center" style={{ color: '#3498db' }}>GA Performance Analysis</h4>
          <canvas ref={gaPerformanceRef} className="w-full h-full" />
        </div>
        
        <div 
          className="chart-item h-72"
          onClick={() => handleChartClick('PSO Optimization Performance by Dataset', 'pso-performance')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleChartClick('PSO Optimization Performance by Dataset', 'pso-performance')}
        >
          <h4 className="mb-2 font-semibold text-center" style={{ color: '#e74c3c' }}>PSO Performance Analysis</h4>
          <canvas ref={psoPerformanceRef} className="w-full h-full" />
        </div>
        
        <div 
          className="chart-item h-72"
          onClick={() => handleChartClick('Metaheuristic Comparison: Average Accuracy', 'dataset-comparison')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleChartClick('Metaheuristic Comparison: Average Accuracy', 'dataset-comparison')}
        >
          <h4 className="mb-2 font-semibold text-center" style={{ color: '#2ecc71' }}>Dataset Comparison</h4>
          <canvas ref={datasetComparisonRef} className="w-full h-full" />
        </div>
        
        <div 
          className="chart-item h-72"
          onClick={() => handleChartClick('ML Model Performance by Optimizer', 'model-comparison')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleChartClick('ML Model Performance by Optimizer', 'model-comparison')}
        >
          <h4 className="mb-2 font-semibold text-center" style={{ color: '#f39c12' }}>Model Comparison</h4>
          <canvas ref={modelComparisonRef} className="w-full h-full" />
        </div>
        
        <div 
          className="chart-item h-72"
          onClick={() => handleChartClick('Overall Metric Performance Comparison', 'metric-distribution')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleChartClick('Overall Metric Performance Comparison', 'metric-distribution')}
        >
          <h4 className="mb-2 font-semibold text-center" style={{ color: '#9b59b6' }}>Metric Distribution</h4>
          <canvas ref={metricDistributionRef} className="w-full h-full" />
        </div>
        
        {/* Individual Dataset Model Comparisons */}
        <div 
          className="chart-item h-72"
          onClick={() => handleChartClick('Dataset 1: Model Performance by Optimizer', 'dataset-model-1')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleChartClick('Dataset 1: Model Performance by Optimizer', 'dataset-model-1')}
        >
          <h4 className="mb-2 font-semibold text-center" style={{ color: '#16a085' }}>Dataset 1: Models</h4>
          <canvas ref={dataset1ModelRef} className="w-full h-full" />
        </div>
        
        <div 
          className="chart-item h-72"
          onClick={() => handleChartClick('Dataset 2: Model Performance by Optimizer', 'dataset-model-2')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleChartClick('Dataset 2: Model Performance by Optimizer', 'dataset-model-2')}
        >
          <h4 className="mb-2 font-semibold text-center" style={{ color: '#8e44ad' }}>Dataset 2: Models</h4>
          <canvas ref={dataset2ModelRef} className="w-full h-full" />
        </div>
        
        <div 
          className="chart-item h-72"
          onClick={() => handleChartClick('Dataset 3: Model Performance by Optimizer', 'dataset-model-3')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleChartClick('Dataset 3: Model Performance by Optimizer', 'dataset-model-3')}
        >
          <h4 className="mb-2 font-semibold text-center" style={{ color: '#d35400' }}>Dataset 3: Models</h4>
          <canvas ref={dataset3ModelRef} className="w-full h-full" />
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
            {selectedChart.type === 'ga-performance' && (
              <canvas 
                ref={modalGARef}
                className="w-full h-full"
                style={{ maxWidth: '100%', maxHeight: '70vh' }}
              />
            )}
            {selectedChart.type === 'pso-performance' && (
              <canvas 
                ref={modalPSORef}
                className="w-full h-full"
                style={{ maxWidth: '100%', maxHeight: '70vh' }}
              />
            )}
            {selectedChart.type === 'dataset-comparison' && (
              <canvas 
                ref={modalDatasetRef}
                className="w-full h-full"
                style={{ maxWidth: '100%', maxHeight: '70vh' }}
              />
            )}
            {selectedChart.type === 'model-comparison' && (
              <canvas 
                ref={modalModelRef}
                className="w-full h-full"
                style={{ maxWidth: '100%', maxHeight: '70vh' }}
              />
            )}
            {selectedChart.type === 'metric-distribution' && (
              <canvas 
                ref={modalMetricRef}
                className="w-full h-full"
                style={{ maxWidth: '100%', maxHeight: '70vh' }}
              />
            )}
            {selectedChart.type === 'dataset-model-1' && (
              <canvas 
                ref={modalDataset1Ref}
                className="w-full h-full"
                style={{ maxWidth: '100%', maxHeight: '70vh' }}
              />
            )}
            {selectedChart.type === 'dataset-model-2' && (
              <canvas 
                ref={modalDataset2Ref}
                className="w-full h-full"
                style={{ maxWidth: '100%', maxHeight: '70vh' }}
              />
            )}
            {selectedChart.type === 'dataset-model-3' && (
              <canvas 
                ref={modalDataset3Ref}
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
