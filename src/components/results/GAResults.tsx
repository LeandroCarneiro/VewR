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

export const GAResults: React.FC = () => {
  // GA Results Data
  const models = ['Random Forest', 'XGBoost', 'LightGBM', 'Gradient Boosting', 'AdaBoost'];
  
  const gaData = {
    rf: {
      f1_brca: 0.6667, f1_healthy: 0.6923, f1_healthy_unk: 0.9778, f1_pre_brca: 1.0000,
      accuracy: 0.8816, kappa: 0.8370, f1_macro: 0.8342, f1_weighted: 0.8802,
      precision: 0.8884, recall: 0.8816, time: 0.92
    },
    xgb: {
      f1_brca: 0.4800, f1_healthy: 0.5714, f1_healthy_unk: 0.9545, f1_pre_brca: 0.9818,
      accuracy: 0.8158, kappa: 0.7458, f1_macro: 0.7469, f1_weighted: 0.8137,
      precision: 0.8132, recall: 0.8158, time: 4.03
    },
    lgbm: {
      f1_brca: 0.5217, f1_healthy: 0.6452, f1_healthy_unk: 1.0000, f1_pre_brca: 1.0000,
      accuracy: 0.8553, kappa: 0.8005, f1_macro: 0.7917, f1_weighted: 0.8545,
      precision: 0.8542, recall: 0.8553, time: 2.39
    },
    gb: {
      f1_brca: 0.6087, f1_healthy: 0.7097, f1_healthy_unk: 1.0000, f1_pre_brca: 1.0000,
      accuracy: 0.8816, kappa: 0.8368, f1_macro: 0.8296, f1_weighted: 0.8809,
      precision: 0.8809, recall: 0.8816, time: 77.25
    },
    ada: {
      f1_brca: 0.0000, f1_healthy: 0.4242, f1_healthy_unk: 0.9362, f1_pre_brca: 0.0000,
      accuracy: 0.4737, kappa: 0.3185, f1_macro: 0.3401, f1_weighted: 0.3547,
      precision: 0.3089, recall: 0.4737, time: 4.31
    }
  };

  // F1-Score by Class Chart
  const f1ClassData = {
    labels: models,
    datasets: [
      {
        label: 'BRCA',
        data: [gaData.rf.f1_brca, gaData.xgb.f1_brca, gaData.lgbm.f1_brca, gaData.gb.f1_brca, gaData.ada.f1_brca],
        backgroundColor: 'rgba(231, 76, 60, 0.7)',
        borderColor: 'rgb(231, 76, 60)',
        borderWidth: 1
      },
      {
        label: 'HEALTHY',
        data: [gaData.rf.f1_healthy, gaData.xgb.f1_healthy, gaData.lgbm.f1_healthy, gaData.gb.f1_healthy, gaData.ada.f1_healthy],
        backgroundColor: 'rgba(46, 204, 113, 0.7)',
        borderColor: 'rgb(46, 204, 113)',
        borderWidth: 1
      },
      {
        label: 'HEALTHY-UNK',
        data: [gaData.rf.f1_healthy_unk, gaData.xgb.f1_healthy_unk, gaData.lgbm.f1_healthy_unk, gaData.gb.f1_healthy_unk, gaData.ada.f1_healthy_unk],
        backgroundColor: 'rgba(52, 152, 219, 0.7)',
        borderColor: 'rgb(52, 152, 219)',
        borderWidth: 1
      },
      {
        label: 'PRE-BRCA',
        data: [gaData.rf.f1_pre_brca, gaData.xgb.f1_pre_brca, gaData.lgbm.f1_pre_brca, gaData.gb.f1_pre_brca, gaData.ada.f1_pre_brca],
        backgroundColor: 'rgba(241, 196, 15, 0.7)',
        borderColor: 'rgb(241, 196, 15)',
        borderWidth: 1
      }
    ]
  };

  // Overall Metrics Chart
  const overallMetricsData = {
    labels: models,
    datasets: [
      {
        label: 'Accuracy',
        data: [gaData.rf.accuracy, gaData.xgb.accuracy, gaData.lgbm.accuracy, gaData.gb.accuracy, gaData.ada.accuracy],
        backgroundColor: 'rgba(155, 89, 182, 0.7)',
        borderColor: 'rgb(155, 89, 182)',
        borderWidth: 1
      },
      {
        label: 'Kappa',
        data: [gaData.rf.kappa, gaData.xgb.kappa, gaData.lgbm.kappa, gaData.gb.kappa, gaData.ada.kappa],
        backgroundColor: 'rgba(52, 73, 94, 0.7)',
        borderColor: 'rgb(52, 73, 94)',
        borderWidth: 1
      },
      {
        label: 'F1 Macro',
        data: [gaData.rf.f1_macro, gaData.xgb.f1_macro, gaData.lgbm.f1_macro, gaData.gb.f1_macro, gaData.ada.f1_macro],
        backgroundColor: 'rgba(230, 126, 34, 0.7)',
        borderColor: 'rgb(230, 126, 34)',
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
        labels: { font: { size: 11 } }
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.dataset.label}: ${(context.parsed.y * 100).toFixed(2)}%`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 1,
        ticks: {
          callback: (value: any) => `${(value * 100).toFixed(0)}%`,
          font: { size: 10 }
        }
      },
      x: {
        ticks: {
          font: { size: 10 }
        }
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-100 to-blue-100 rounded-lg p-3 shadow-lg border-2 border-indigo-400 mb-3">
        <h3 className="text-xl font-bold text-center mb-1 text-indigo-700">
          🧬 GA Feature Selection Results
        </h3>
        <p className="text-center text-xs text-gray-700">
          Performance comparison of 5 models using <strong>5577 features</strong> selected by Genetic Algorithm
        </p>
      </div>

      {/* 2x2 Grid */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        {/* F1-Score by Class */}
        <div className="bg-white rounded-lg p-3 shadow-lg">
          <h4 className="text-sm font-bold mb-2 text-center text-gray-800">
            F1-Score by Class Comparison
          </h4>
          <div style={{ height: '220px' }}>
            <Bar data={f1ClassData} options={chartOptions} />
          </div>
        </div>

        {/* Overall Metrics */}
        <div className="bg-white rounded-lg p-3 shadow-lg">
          <h4 className="text-sm font-bold mb-2 text-center text-gray-800">
            Overall Performance Metrics
          </h4>
          <div style={{ height: '220px' }}>
            <Bar data={overallMetricsData} options={chartOptions} />
          </div>
        </div>

        {/* Best Model Highlight */}
        <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-lg p-3 shadow-lg border-2 border-green-400">
          <h4 className="text-sm font-bold text-center mb-2 text-green-700">
            🏆 Best: Random Forest & Gradient Boosting
          </h4>
          <div className="grid grid-cols-4 gap-2 text-center text-xs mb-2">
            <div className="bg-white p-2 rounded shadow">
              <div className="text-lg font-bold text-green-600">88.16%</div>
              <div className="text-[10px] text-gray-600">Accuracy</div>
            </div>
            <div className="bg-white p-2 rounded shadow">
              <div className="text-lg font-bold text-green-600">0.837</div>
              <div className="text-[10px] text-gray-600">Kappa</div>
            </div>
            <div className="bg-white p-2 rounded shadow">
              <div className="text-lg font-bold text-green-600">83.42%</div>
              <div className="text-[10px] text-gray-600">F1 Macro</div>
            </div>
            <div className="bg-white p-2 rounded shadow">
              <div className="text-lg font-bold text-orange-600">0.92s</div>
              <div className="text-[10px] text-gray-600">Time (RF)</div>
            </div>
          </div>
          
          <div className="bg-white rounded p-2">
            <div className="text-[10px] font-semibold mb-1 text-center">F1-Scores per Class (Random Forest):</div>
            <div className="grid grid-cols-4 gap-1 text-[10px]">
              <div className="text-center p-1 bg-red-50 rounded">
                <div className="font-bold text-red-700">BRCA</div>
                <div className="text-sm font-bold">66.67%</div>
              </div>
              <div className="text-center p-1 bg-green-50 rounded">
                <div className="font-bold text-green-700">HEALTHY</div>
                <div className="text-sm font-bold">69.23%</div>
              </div>
              <div className="text-center p-1 bg-blue-50 rounded">
                <div className="font-bold text-blue-700">H-UNK</div>
                <div className="text-sm font-bold">97.78%</div>
              </div>
              <div className="text-center p-1 bg-yellow-50 rounded">
                <div className="font-bold text-yellow-700">PRE-BRCA</div>
                <div className="text-sm font-bold">100.00%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Table */}
        <div className="bg-white rounded-lg p-3 shadow-lg overflow-x-auto">
          <h4 className="text-sm font-bold mb-2 text-center text-gray-800">
            Detailed Performance Metrics
          </h4>
          <table className="w-full text-[10px]">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-1 text-left">Model</th>
                <th className="p-1 text-center">Acc</th>
                <th className="p-1 text-center">Kappa</th>
                <th className="p-1 text-center">F1</th>
                <th className="p-1 text-center">Prec</th>
                <th className="p-1 text-center">Rec</th>
                <th className="p-1 text-center">Time</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Random Forest', data: gaData.rf, highlight: true },
                { name: 'XGBoost', data: gaData.xgb },
                { name: 'LightGBM', data: gaData.lgbm },
                { name: 'Gradient Boosting', data: gaData.gb, highlight: true },
                { name: 'AdaBoost', data: gaData.ada }
              ].map((model, idx) => (
                <tr key={idx} className={model.highlight ? 'bg-green-50 font-semibold' : ''}>
                  <td className="p-1 border-t text-left">{model.name}</td>
                  <td className="p-1 border-t text-center">{(model.data.accuracy * 100).toFixed(1)}%</td>
                  <td className="p-1 border-t text-center">{model.data.kappa.toFixed(3)}</td>
                  <td className="p-1 border-t text-center">{(model.data.f1_macro * 100).toFixed(1)}%</td>
                  <td className="p-1 border-t text-center">{(model.data.precision * 100).toFixed(1)}%</td>
                  <td className="p-1 border-t text-center">{(model.data.recall * 100).toFixed(1)}%</td>
                  <td className="p-1 border-t text-center">{model.data.time.toFixed(1)}s</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
