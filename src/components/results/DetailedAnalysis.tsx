import React from 'react';

export const DetailedAnalysis: React.FC = () => {
  // Confusion matrix data (XGBoost example from image)
  const confusionData = {
    raw: [
      { true: 'BRCA', predicted: ['BRCA', 'HEALTHY', 'HEALTHY-UNK', 'PRE-BRCA'], values: [5, 5, 1, 1] },
      { true: 'HEALTHY', predicted: ['BRCA', 'HEALTHY', 'HEALTHY-UNK', 'PRE-BRCA'], values: [3, 12, 0, 0] },
      { true: 'HEALTHY-UNK', predicted: ['BRCA', 'HEALTHY', 'HEALTHY-UNK', 'PRE-BRCA'], values: [0, 0, 22, 0] },
      { true: 'PRE-BRCA', predicted: ['BRCA', 'HEALTHY', 'HEALTHY-UNK', 'PRE-BRCA'], values: [0, 0, 0, 27] }
    ],
    normalized: [
      { true: 'BRCA', values: [0.42, 0.42, 0.08, 0.08] },
      { true: 'HEALTHY', values: [0.20, 0.80, 0.00, 0.00] },
      { true: 'HEALTHY-UNK', values: [0.00, 0.00, 1.00, 0.00] },
      { true: 'PRE-BRCA', values: [0.00, 0.00, 0.00, 1.00] }
    ]
  };

  const getConfusionColor = (value: number, isNormalized: boolean) => {
    if (isNormalized) {
      if (value >= 0.80) return 'bg-red-900 text-white';
      if (value >= 0.60) return 'bg-red-700 text-white';
      if (value >= 0.40) return 'bg-orange-500 text-white';
      if (value >= 0.20) return 'bg-orange-300 text-gray-900';
      if (value > 0) return 'bg-orange-100 text-gray-900';
      return 'bg-gray-50 text-gray-500';
    } else {
      if (value >= 20) return 'bg-blue-900 text-white';
      if (value >= 15) return 'bg-blue-700 text-white';
      if (value >= 10) return 'bg-blue-500 text-white';
      if (value >= 5) return 'bg-blue-300 text-gray-900';
      if (value > 0) return 'bg-blue-100 text-gray-900';
      return 'bg-gray-50 text-gray-500';
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg p-2 shadow-lg border-2 border-blue-400 mb-2">
        <h3 className="text-lg font-bold text-center mb-1 text-blue-700">
          🔍 Detailed Model Analysis
        </h3>
        <p className="text-center text-[10px] text-gray-700">
          Confusion Matrix and PCA for <strong>XGBoost + PSO</strong> | Acc: <strong>0.8684</strong> | Kappa: <strong>0.8174</strong>
        </p>
      </div>

      {/* Confusion Matrices Row */}
      <div className="grid grid-cols-2 gap-2 mb-2">
        {/* Raw Confusion Matrix */}
        <div className="bg-white rounded-lg p-2 shadow-lg">
          <h4 className="text-xs font-bold mb-1 text-center text-gray-800">
            Test Set Confusion Matrix
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-[9px] border-collapse">
              <thead>
                <tr>
                  <th className="p-1 text-left border bg-gray-100"></th>
                  <th colSpan={4} className="p-1 text-center border bg-gray-100 font-bold">
                    Predicted label
                  </th>
                </tr>
                <tr className="bg-gray-50">
                  <th className="p-1 text-left border">True</th>
                  <th className="p-1 text-center border">BRCA</th>
                  <th className="p-1 text-center border">HLTH</th>
                  <th className="p-1 text-center border">H-UNK</th>
                  <th className="p-1 text-center border">PRE</th>
                </tr>
              </thead>
              <tbody>
                {confusionData.raw.map((row, idx) => (
                  <tr key={idx}>
                    <td className="p-1 border text-left font-semibold bg-gray-50 text-[9px]">{row.true}</td>
                    {row.values.map((val, vIdx) => (
                      <td
                        key={vIdx}
                        className={`p-2 border text-center font-bold ${getConfusionColor(val, false)}`}
                      >
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-1 text-[8px] text-gray-600 text-center">
            Raw counts
          </div>
        </div>

        {/* Normalized Confusion Matrix */}
        <div className="bg-white rounded-lg p-2 shadow-lg">
          <h4 className="text-xs font-bold mb-1 text-center text-gray-800">
            Test Set (Normalized)
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-[9px] border-collapse">
              <thead>
                <tr>
                  <th className="p-1 text-left border bg-gray-100"></th>
                  <th colSpan={4} className="p-1 text-center border bg-gray-100 font-bold">
                    Predicted label
                  </th>
                </tr>
                <tr className="bg-gray-50">
                  <th className="p-1 text-left border">True</th>
                  <th className="p-1 text-center border">BRCA</th>
                  <th className="p-1 text-center border">HLTH</th>
                  <th className="p-1 text-center border">H-UNK</th>
                  <th className="p-1 text-center border">PRE</th>
                </tr>
              </thead>
              <tbody>
                {confusionData.normalized.map((row, idx) => (
                  <tr key={idx}>
                    <td className="p-1 border text-left font-semibold bg-gray-50 text-[9px]">{row.true}</td>
                    {row.values.map((val, vIdx) => (
                      <td
                        key={vIdx}
                        className={`p-2 border text-center font-bold ${getConfusionColor(val, true)}`}
                      >
                        {val.toFixed(2)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-1 text-[8px] text-gray-600 text-center">
            Normalized by row
          </div>
        </div>
      </div>

      {/* PCA Plots Row */}
      <div className="grid grid-cols-2 gap-2 mb-2">
        {/* Training Set PCA */}
        <div className="bg-white rounded-lg p-2 shadow-lg">
          <h4 className="text-xs font-bold mb-1 text-center text-gray-800">
            Training Set - PCA
          </h4>
          <div className="relative bg-gray-50 rounded border" style={{ height: '200px' }}>
            {/* Simulated scatter plot */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full p-4">
                {/* Axis labels */}
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-[8px] text-gray-600">
                  PC1 (56.74%)
                </div>
                <div className="absolute left-1 top-1/2 transform -translate-y-1/2 -rotate-90 text-[8px] text-gray-600">
                  PC2 (21.25%)
                </div>
                
                {/* Legend */}
                <div className="absolute top-1 left-1 bg-white p-1 rounded shadow text-[8px] space-y-0">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span>BRCA</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                    <span>HLTH</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span>H-UNK</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span>PRE</span>
                  </div>
                </div>

                {/* Visual representation of clustering */}
                <div className="absolute left-[15%] top-[40%] w-20 h-32 opacity-30">
                  <div className="text-[8px] text-center font-semibold text-gray-700">
                    Clustered Training Data
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {[...Array(30)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          i < 8 ? 'bg-blue-500' : i < 15 ? 'bg-orange-500' : i < 23 ? 'bg-green-500' : 'bg-red-500'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                
              </div>
            </div>
          </div>
          <div className="mt-1 text-[8px] text-gray-600 text-center">
            Well-separated clusters
          </div>
        </div>

        {/* Test Set PCA */}
        <div className="bg-white rounded-lg p-2 shadow-lg">
          <h4 className="text-xs font-bold mb-1 text-center text-gray-800">
            Test Set - PCA
          </h4>
          <div className="relative bg-gray-50 rounded border" style={{ height: '200px' }}>
            {/* Simulated scatter plot with more spread */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full p-4">
                {/* Axis labels */}
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-[8px] text-gray-600">
                  PC1 (56.74%)
                </div>
                <div className="absolute left-1 top-1/2 transform -translate-y-1/2 -rotate-90 text-[8px] text-gray-600">
                  PC2 (21.25%)
                </div>

                {/* Visual representation of more scattered data */}
                <div className="absolute inset-0 p-8">
                  {/* Group 1: Top-left (HEALTHY-UNK + some BRCA) */}
                  <div className="absolute left-[20%] top-[15%] flex flex-wrap gap-1 w-24">
                    {[...Array(15)].map((_, i) => (
                      <div
                        key={`g1-${i}`}
                        className={`w-2 h-2 rounded-full ${i < 11 ? 'bg-green-500' : 'bg-blue-500'}`}
                      />
                    ))}
                  </div>
                  
                  {/* Group 2: PRE-BRCA cluster (bottom) */}
                  <div className="absolute left-[30%] bottom-[15%] flex flex-wrap gap-1 w-32">
                    {[...Array(20)].map((_, i) => (
                      <div key={`g2-${i}`} className="w-2 h-2 rounded-full bg-red-500" />
                    ))}
                  </div>
                  
                  {/* Group 3: HEALTHY + BRCA overlap (center) */}
                  <div className="absolute left-[45%] top-[35%] flex flex-wrap gap-1 w-20">
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={`g3-${i}`}
                        className={`w-2 h-2 rounded-full ${i % 2 === 0 ? 'bg-orange-500' : 'bg-blue-500'}`}
                      />
                    ))}
                  </div>
                </div>
                
              </div>
            </div>
          </div>
          <div className="mt-1 text-[8px] text-gray-600 text-center">
            Some BRCA/HEALTHY overlap
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-2 border border-blue-300">
        <h4 className="text-xs font-bold mb-1 text-center text-blue-700">
          🔑 Key Insights
        </h4>
        <div className="grid grid-cols-3 gap-2 text-[9px]">
          <div className="bg-white rounded p-1.5">
            <div className="font-bold text-blue-700 mb-0.5">✓ Perfect Separation</div>
            <div className="text-gray-700">
              <strong>HEALTHY-UNK</strong> and <strong>PRE-BRCA</strong> show 100% accuracy
            </div>
          </div>
          <div className="bg-white rounded p-1.5">
            <div className="font-bold text-orange-600 mb-0.5">⚠️ Main Challenge</div>
            <div className="text-gray-700">
              <strong>BRCA</strong> vs <strong>HEALTHY</strong> confusion (42% misclassified)
            </div>
          </div>
          <div className="bg-white rounded p-1.5">
            <div className="font-bold text-green-600 mb-0.5">📊 PCA Validation</div>
            <div className="text-gray-700">
              78% variance by PC1+PC2 confirms feature effectiveness
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
