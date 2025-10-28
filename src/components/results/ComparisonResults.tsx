import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const ComparisonResults: React.FC = () => {
  const models = ['Random Forest', 'XGBoost', 'LightGBM', 'Gradient Boosting', 'AdaBoost'];
  
  // Accuracy data for heatmap
  const accuracyData = {
    'Random Forest': { all: 0.921, ga: 0.882, pso: 0.855 },
    'XGBoost': { all: 0.868, ga: 0.816, pso: 0.868 },
    'LightGBM': { all: 0.855, ga: 0.855, pso: 0.895 },
    'Gradient Boosting': { all: 0.908, ga: 0.882, pso: 0.908 },
    'AdaBoost': { all: 0.474, ga: 0.474, pso: 0.724 }
  };

  // Training time data
  const timeData = {
    'Random Forest': { all: 2.06, ga: 0.92, pso: 0.93 },
    'XGBoost': { all: 20.47, ga: 4.03, pso: 4.48 },
    'LightGBM': { all: 11.27, ga: 2.39, pso: 2.66 },
    'Gradient Boosting': { all: 387.43, ga: 77.25, pso: 86.37 },
    'AdaBoost': { all: 20.56, ga: 4.31, pso: 4.67 }
  };

  // Model Performance Distribution (Box plot simulation with bars)
  const performanceData = {
    labels: models,
    datasets: [
      {
        label: 'Accuracy',
        data: [0.885, 0.851, 0.868, 0.899, 0.557],
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 1
      },
      {
        label: 'F1 Score',
        data: [0.871, 0.783, 0.815, 0.877, 0.451],
        backgroundColor: 'rgba(255, 159, 64, 0.7)',
        borderColor: 'rgb(255, 159, 64)',
        borderWidth: 1
      },
      {
        label: 'Precision',
        data: [0.890, 0.852, 0.863, 0.896, 0.470],
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 1
      },
      {
        label: 'Recall',
        data: [0.885, 0.851, 0.868, 0.899, 0.557],
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 1
      }
    ]
  };

  // Training Time Comparison
  const trainingTimeData = {
    labels: models,
    datasets: [
      {
        label: 'PSO Features',
        data: [0.93, 4.48, 2.66, 86.37, 4.67],
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 1
      },
      {
        label: 'GA Features',
        data: [0.92, 4.03, 2.39, 77.25, 4.31],
        backgroundColor: 'rgba(255, 159, 64, 0.7)',
        borderColor: 'rgb(255, 159, 64)',
        borderWidth: 1
      },
      {
        label: 'All Features',
        data: [2.06, 20.47, 11.27, 387.43, 20.56],
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: { font: { size: 10 } }
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.dataset.label}: ${context.parsed.y.toFixed(3)}`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { font: { size: 9 } }
      },
      x: {
        ticks: { font: { size: 9 } }
      }
    }
  };

  const timeChartOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.dataset.label}: ${context.parsed.y.toFixed(2)}s`
        }
      }
    }
  };

  // Helper to get color based on accuracy
  const getHeatmapColor = (value: number) => {
    if (value >= 0.90) return 'bg-red-900 text-white';
    if (value >= 0.85) return 'bg-red-700 text-white';
    if (value >= 0.80) return 'bg-red-500 text-white';
    if (value >= 0.75) return 'bg-orange-500 text-white';
    if (value >= 0.70) return 'bg-orange-400 text-white';
    if (value >= 0.60) return 'bg-yellow-500 text-gray-900';
    if (value >= 0.50) return 'bg-yellow-300 text-gray-900';
    return 'bg-yellow-100 text-gray-900';
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-3 shadow-lg border-2 border-purple-400 mb-3">
        <h3 className="text-xl font-bold text-center mb-1 text-purple-700">
          📊 Comparative Analysis Across Feature Sets
        </h3>
        <p className="text-center text-xs text-gray-700">
          Performance comparison across <strong>PSO</strong>, <strong>GA</strong>, and <strong>All Features</strong>
        </p>
      </div>

      {/* Top row: Heatmap and Performance Distribution */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        {/* Accuracy Heatmap */}
        <div className="bg-white rounded-lg p-3 shadow-lg">
          <h4 className="text-sm font-bold mb-2 text-center text-gray-800">
            Accuracy by Model and Feature Set
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-[10px] border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left border">Model</th>
                  <th className="p-2 text-center border">All Features</th>
                  <th className="p-2 text-center border">GA Features</th>
                  <th className="p-2 text-center border">PSO Features</th>
                </tr>
              </thead>
              <tbody>
                {models.map((model) => (
                  <tr key={model}>
                    <td className="p-2 border text-left font-semibold">{model}</td>
                    <td className={`p-3 border text-center font-bold ${getHeatmapColor(accuracyData[model as keyof typeof accuracyData].all)}`}>
                      {accuracyData[model as keyof typeof accuracyData].all.toFixed(3)}
                    </td>
                    <td className={`p-3 border text-center font-bold ${getHeatmapColor(accuracyData[model as keyof typeof accuracyData].ga)}`}>
                      {accuracyData[model as keyof typeof accuracyData].ga.toFixed(3)}
                    </td>
                    <td className={`p-3 border text-center font-bold ${getHeatmapColor(accuracyData[model as keyof typeof accuracyData].pso)}`}>
                      {accuracyData[model as keyof typeof accuracyData].pso.toFixed(3)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-2 flex items-center justify-center gap-2 text-[9px]">
            <span className="px-2 py-1 bg-red-900 text-white rounded">≥0.90</span>
            <span className="px-2 py-1 bg-red-700 text-white rounded">≥0.85</span>
            <span className="px-2 py-1 bg-orange-500 text-white rounded">≥0.75</span>
            <span className="px-2 py-1 bg-yellow-500 text-gray-900 rounded">≥0.60</span>
            <span className="px-2 py-1 bg-yellow-100 text-gray-900 rounded border">&lt;0.60</span>
          </div>
        </div>

        {/* Model Performance Distribution */}
        <div className="bg-white rounded-lg p-3 shadow-lg">
          <h4 className="text-sm font-bold mb-2 text-center text-gray-800">
            Model Performance Distribution
          </h4>
          <div style={{ height: '240px' }}>
            <Bar data={performanceData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Bottom row: Training Time */}
      <div className="bg-white rounded-lg p-3 shadow-lg">
        <h4 className="text-sm font-bold mb-2 text-center text-gray-800">
          Training Time by Model and Feature Set
        </h4>
        <div style={{ height: '220px' }}>
          <Bar data={trainingTimeData} options={timeChartOptions} />
        </div>
        <div className="mt-2 text-center">
          <p className="text-[10px] text-gray-600">
            💡 <strong>Key Insight:</strong> Feature selection (PSO/GA) significantly reduces training time while maintaining high accuracy
          </p>
        </div>
      </div>

      {/* Key Findings */}
      <div className="grid grid-cols-3 gap-2 mt-3">
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded p-2 border border-green-300">
          <div className="text-xs font-bold text-green-700 mb-1">🏆 Best Accuracy</div>
          <div className="text-[10px] text-gray-700">
            <strong>Random Forest</strong> with All Features: <strong>92.11%</strong>
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded p-2 border border-blue-300">
          <div className="text-xs font-bold text-blue-700 mb-1">⚡ Best Speed</div>
          <div className="text-[10px] text-gray-700">
            <strong>Random Forest</strong> with GA: <strong>0.92s</strong>
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded p-2 border border-purple-300">
          <div className="text-xs font-bold text-purple-700 mb-1">⚖️ Best Balance</div>
          <div className="text-[10px] text-gray-700">
            <strong>Gradient Boosting</strong> with PSO: <strong>90.79% / 86.37s</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
