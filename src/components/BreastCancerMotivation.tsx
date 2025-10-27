import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const BreastCancerMotivation: React.FC = () => {
  // Global trend data
  const globalData = {
    labels: ['2008', '2012', '2016', '2020', '2025', '2030'],
    datasets: [
      {
        label: 'Global Cases (Millions)',
        data: [1.38, 1.67, 2.09, 2.3, 2.6, 3.0],
        borderColor: 'rgb(220, 38, 38)',
        backgroundColor: 'rgba(220, 38, 38, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ]
  };

  // Brazil trend data
  const brazilData = {
    labels: ['2008', '2012', '2016', '2020', '2023', '2025'],
    datasets: [
      {
        label: 'Brazil Cases (Thousands)',
        data: [49.4, 52.7, 57.9, 66.3, 73.6, 80.0],
        borderColor: 'rgb(234, 179, 8)',
        backgroundColor: 'rgba(234, 179, 8, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: { size: 14 },
        bodyFont: { size: 12 }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          font: { size: 11 }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: { size: 11 }
        }
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col justify-center">
      {/* Incidence Trends */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Global Trend Chart */}
        <div className="bg-white rounded-lg p-5 shadow-lg">
          <h3 className="text-lg font-bold text-center mb-3 text-red-600">
            🌍 Global Breast Cancer Incidence
          </h3>
          <div style={{ height: '220px' }}>
            <Line data={globalData} options={chartOptions} />
          </div>
          <div className="mt-3 text-center">
            <div className="text-2xl font-bold text-red-600">2.3M → 3M</div>
            <div className="text-xs text-gray-600">2020 to 2030 projection (+30%)</div>
          </div>
        </div>

        {/* Brazil Trend Chart */}
        <div className="bg-white rounded-lg p-5 shadow-lg">
          <h3 className="text-lg font-bold text-center mb-3 text-yellow-700">
            🇧🇷 Brazil Breast Cancer Incidence
          </h3>
          <div style={{ height: '220px' }}>
            <Line data={brazilData} options={chartOptions} />
          </div>
          <div className="mt-3 text-center">
            <div className="text-2xl font-bold text-yellow-700">73K → 80K</div>
            <div className="text-xs text-gray-600">2023 to 2025 projection (+9%)</div>
          </div>
        </div>
      </div>

      {/* Socioeconomic Impact - Compelling Arguments */}
      <div className="bg-gradient-to-r from-red-50 via-pink-50 to-purple-50 rounded-lg p-6 shadow-lg border-2 border-red-300 mb-6">
        <h3 className="text-xl font-bold text-center mb-4 text-red-700">
          ⚠️ A Growing Humanitarian Crisis
        </h3>
        <div className="grid md:grid-cols-4 gap-4 text-center text-sm">
          <div className="p-3 bg-white rounded-lg shadow">
            <div className="text-3xl mb-2">👩‍👧‍👦</div>
            <div className="font-bold text-red-600">685K Deaths/Year</div>
            <div className="text-xs text-gray-600">Mothers, daughters, sisters lost</div>
          </div>
          <div className="p-3 bg-white rounded-lg shadow">
            <div className="text-3xl mb-2">💔</div>
            <div className="font-bold text-red-600">40% Late-Stage</div>
            <div className="text-xs text-gray-600">Diagnosed when it's too late</div>
          </div>
          <div className="p-3 bg-white rounded-lg shadow">
            <div className="text-3xl mb-2">🏥</div>
            <div className="font-bold text-red-600">$88B Lost</div>
            <div className="text-xs text-gray-600">Global economic burden annually</div>
          </div>
          <div className="p-3 bg-white rounded-lg shadow">
            <div className="text-3xl mb-2">⚖️</div>
            <div className="font-bold text-red-600">Inequality Crisis</div>
            <div className="text-xs text-gray-600">Poor regions lack early detection</div>
          </div>
        </div>
      </div>

      {/* The Critical Challenge
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h3 className="text-xl font-bold text-center mb-4" style={{ color: 'var(--breast-cancer-accent)' }}>
          The Early Detection Challenge
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
            <div className="font-semibold text-red-700 mb-2 text-sm">❌ Current Limitations:</div>
            <ul className="text-xs space-y-1 text-gray-700">
              <li>• <strong>Mammography detects tumors already formed</strong> (not prevention)</li>
              <li>• <strong>99% survival (Stage I) vs 27% (Stage IV)</strong> — timing is everything</li>
              <li>• <strong>High false-positives</strong> cause anxiety and unnecessary biopsies</li>
              <li>• <strong>Infrastructure barriers</strong> in rural and underserved areas</li>
              <li>• <strong>Expensive imaging</strong> limits population-wide screening</li>
            </ul>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
            <div className="font-semibold text-green-700 mb-2 text-sm">✅ Epigenetic Solution:</div>
            <ul className="text-xs space-y-1 text-gray-700">
              <li>• <strong>Pre-diagnostic detection:</strong> Identify risk 5+ years before symptoms</li>
              <li>• <strong>Simple blood test:</strong> Non-invasive, scalable, accessible</li>
              <li>• <strong>60% cost reduction:</strong> Catch cancer at Stage I vs Stage IV</li>
              <li>• <strong>Democratized access:</strong> No specialized equipment needed</li>
              <li>• <strong>Preventive intervention:</strong> Enable lifestyle changes, prophylaxis</li>
            </ul>
          </div>
        </div>
      </div> */}
    </div>
  );
};
