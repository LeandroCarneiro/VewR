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

export const AllFeaturesResults: React.FC = () => {
  // All Features Results Data
  const models = ['Random Forest', 'XGBoost', 'LightGBM', 'Gradient Boosting', 'AdaBoost'];
  
  const allData = {
    rf: {
      f1_brca: 0.7692, f1_healthy: 0.8148, f1_healthy_unk: 0.9778, f1_pre_brca: 1.0000,
      accuracy: 0.9211, kappa: 0.8912, f1_macro: 0.8905, f1_weighted: 0.9206,
      precision: 0.9259, recall: 0.9211, time: 2.06
    },
    xgb: {
      f1_brca: 0.5000, f1_healthy: 0.7500, f1_healthy_unk: 0.9778, f1_pre_brca: 0.9818,
      accuracy: 0.8684, kappa: 0.8174, f1_macro: 0.8024, f1_weighted: 0.8588,
      precision: 0.8575, recall: 0.8684, time: 20.47
    },
    lgbm: {
      f1_brca: 0.5455, f1_healthy: 0.7097, f1_healthy_unk: 0.9565, f1_pre_brca: 0.9811,
      accuracy: 0.8553, kappa: 0.8003, f1_macro: 0.7982, f1_weighted: 0.8516,
      precision: 0.8510, recall: 0.8553, time: 11.27
    },
    gb: {
      f1_brca: 0.6667, f1_healthy: 0.7879, f1_healthy_unk: 1.0000, f1_pre_brca: 1.0000,
      accuracy: 0.9079, kappa: 0.8729, f1_macro: 0.8636, f1_weighted: 0.9055,
      precision: 0.9101, recall: 0.9079, time: 387.43
    },
    ada: {
      f1_brca: 0.0000, f1_healthy: 0.4242, f1_healthy_unk: 0.9362, f1_pre_brca: 0.0000,
      accuracy: 0.4737, kappa: 0.3185, f1_macro: 0.3401, f1_weighted: 0.3547,
      precision: 0.3089, recall: 0.4737, time: 20.56
    }
  };

  // F1-Score by Class Chart
  const f1ClassData = {
    labels: models,
    datasets: [
      {
        label: 'BRCA',
        data: [allData.rf.f1_brca, allData.xgb.f1_brca, allData.lgbm.f1_brca, allData.gb.f1_brca, allData.ada.f1_brca],
        backgroundColor: 'rgba(231, 76, 60, 0.7)',
        borderColor: 'rgb(231, 76, 60)',
        borderWidth: 1
      },
      {
        label: 'HEALTHY',
        data: [allData.rf.f1_healthy, allData.xgb.f1_healthy, allData.lgbm.f1_healthy, allData.gb.f1_healthy, allData.ada.f1_healthy],
        backgroundColor: 'rgba(46, 204, 113, 0.7)',
        borderColor: 'rgb(46, 204, 113)',
        borderWidth: 1
      },
      {
        label: 'HEALTHY-UNK',
        data: [allData.rf.f1_healthy_unk, allData.xgb.f1_healthy_unk, allData.lgbm.f1_healthy_unk, allData.gb.f1_healthy_unk, allData.ada.f1_healthy_unk],
        backgroundColor: 'rgba(52, 152, 219, 0.7)',
        borderColor: 'rgb(52, 152, 219)',
        borderWidth: 1
      },
      {
        label: 'PRE-BRCA',
        data: [allData.rf.f1_pre_brca, allData.xgb.f1_pre_brca, allData.lgbm.f1_pre_brca, allData.gb.f1_pre_brca, allData.ada.f1_pre_brca],
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
        data: [allData.rf.accuracy, allData.xgb.accuracy, allData.lgbm.accuracy, allData.gb.accuracy, allData.ada.accuracy],
        backgroundColor: 'rgba(155, 89, 182, 0.7)',
        borderColor: 'rgb(155, 89, 182)',
        borderWidth: 1
      },
      {
        label: 'Kappa',
        data: [allData.rf.kappa, allData.xgb.kappa, allData.lgbm.kappa, allData.gb.kappa, allData.ada.kappa],
        backgroundColor: 'rgba(52, 73, 94, 0.7)',
        borderColor: 'rgb(52, 73, 94)',
        borderWidth: 1
      },
      {
        label: 'F1 Macro',
        data: [allData.rf.f1_macro, allData.xgb.f1_macro, allData.lgbm.f1_macro, allData.gb.f1_macro, allData.ada.f1_macro],
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
      <div className="bg-gradient-to-r from-green-100 to-teal-100 rounded-lg p-3 shadow-lg border-2 border-green-400 mb-3">
        <h3 className="text-xl font-bold text-center mb-1 text-green-700">
          📊 Baseline Results (No Optimization)
        </h3>
        <p className="text-center text-xs text-gray-700">
          Performance comparison of 5 models using <strong>all 27,577 features</strong> without feature selection
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
            🏆 Best: Random Forest
          </h4>
          <div className="grid grid-cols-4 gap-2 text-center text-xs mb-2">
            <div className="bg-white p-2 rounded shadow">
              <div className="text-lg font-bold text-green-600">92.11%</div>
              <div className="text-[10px] text-gray-600">Accuracy</div>
            </div>
            <div className="bg-white p-2 rounded shadow">
              <div className="text-lg font-bold text-green-600">0.891</div>
              <div className="text-[10px] text-gray-600">Kappa</div>
            </div>
            <div className="bg-white p-2 rounded shadow">
              <div className="text-lg font-bold text-green-600">89.05%</div>
              <div className="text-[10px] text-gray-600">F1 Macro</div>
            </div>
            <div className="bg-white p-2 rounded shadow">
              <div className="text-lg font-bold text-orange-600">2.06s</div>
              <div className="text-[10px] text-gray-600">Time</div>
            </div>
          </div>
          
          <div className="bg-white rounded p-2">
            <div className="text-[10px] font-semibold mb-1 text-center">F1-Scores per Class (Random Forest):</div>
            <div className="grid grid-cols-4 gap-1 text-[10px]">
              <div className="text-center p-1 bg-red-50 rounded">
                <div className="font-bold text-red-700">BRCA</div>
                <div className="text-sm font-bold">76.92%</div>
              </div>
              <div className="text-center p-1 bg-green-50 rounded">
                <div className="font-bold text-green-700">HEALTHY</div>
                <div className="text-sm font-bold">81.48%</div>
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
                { name: 'Random Forest', data: allData.rf, highlight: true },
                { name: 'XGBoost', data: allData.xgb },
                { name: 'LightGBM', data: allData.lgbm },
                { name: 'Gradient Boosting', data: allData.gb },
                { name: 'AdaBoost', data: allData.ada }
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
