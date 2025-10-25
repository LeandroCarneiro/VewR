import React from 'react';

export const ThreeClassResults: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Binary Model Performance (Healthy vs BRCA) */}
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h3 className="text-xl font-bold text-center mb-4 text-blue-600">
          Binary Model Performance: Healthy vs BRCA
        </h3>
        <p className="text-sm text-gray-600 text-center mb-4">
          Baseline model to distinguish healthy tissues from cancerous ones
        </p>
        
        <div className="grid md:grid-cols-6 gap-4 text-center text-sm">
          <div className="p-3 bg-blue-50 rounded">
            <div className="text-2xl font-bold text-blue-600">99.35%</div>
            <div className="text-xs text-gray-600">Accuracy</div>
          </div>
          <div className="p-3 bg-blue-50 rounded">
            <div className="text-2xl font-bold text-blue-600">99.25%</div>
            <div className="text-xs text-gray-600">F1 Score</div>
          </div>
          <div className="p-3 bg-blue-50 rounded">
            <div className="text-2xl font-bold text-blue-600">100%</div>
            <div className="text-xs text-gray-600">ROC AUC</div>
          </div>
          <div className="p-3 bg-blue-50 rounded">
            <div className="text-2xl font-bold text-blue-600">95.00%</div>
            <div className="text-xs text-gray-600">Sensitivity</div>
          </div>
          <div className="p-3 bg-blue-50 rounded">
            <div className="text-2xl font-bold text-blue-600">95.00%</div>
            <div className="text-xs text-gray-600">Specificity</div>
          </div>
          <div className="p-3 bg-blue-50 rounded">
            <div className="text-2xl font-bold text-blue-600">0.9303</div>
            <div className="text-xs text-gray-600">Kappa</div>
          </div>
        </div>
      </div>

      {/* Three-Class Model Performance (Healthy vs PRE-BRCA vs BRCA) */}
      <div className="bg-white rounded-lg p-6 shadow-lg border-2 border-pink-300">
        <h3 className="text-xl font-bold text-center mb-4 text-pink-600">
          Three-Class Model Performance: Healthy vs PRE-BRCA vs BRCA
        </h3>
        <p className="text-sm text-gray-600 text-center mb-4">
          Primary model providing probabilistic outputs for three risk states
        </p>
        
        {/* Placeholder for confusion matrix */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded border">
          <div className="text-center mb-4">
            <div className="text-lg font-semibold text-pink-700">Confusion Matrix</div>
            <div className="text-xs text-gray-600">(Placeholder - To be populated with actual results)</div>
          </div>
          
          <div className="flex justify-center">
            <table className="text-xs border-collapse">
              <thead>
                <tr>
                  <th className="border border-gray-400 p-2 bg-gray-100"></th>
                  <th className="border border-gray-400 p-2 bg-green-100 font-bold">Pred: Healthy</th>
                  <th className="border border-gray-400 p-2 bg-yellow-100 font-bold">Pred: PRE-BRCA</th>
                  <th className="border border-gray-400 p-2 bg-red-100 font-bold">Pred: BRCA</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-400 p-2 bg-green-100 font-bold">True: Healthy</td>
                  <td className="border border-gray-400 p-2 text-center">--</td>
                  <td className="border border-gray-400 p-2 text-center">--</td>
                  <td className="border border-gray-400 p-2 text-center">--</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-2 bg-yellow-100 font-bold">True: PRE-BRCA</td>
                  <td className="border border-gray-400 p-2 text-center">--</td>
                  <td className="border border-gray-400 p-2 text-center">--</td>
                  <td className="border border-gray-400 p-2 text-center">--</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-2 bg-red-100 font-bold">True: BRCA</td>
                  <td className="border border-gray-400 p-2 text-center">--</td>
                  <td className="border border-gray-400 p-2 text-center">--</td>
                  <td className="border border-gray-400 p-2 text-center">--</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Classification Report Placeholder */}
        <div className="mt-4 p-4 bg-purple-50 rounded border">
          <div className="text-sm font-semibold text-purple-700 mb-2 text-center">Classification Report</div>
          <div className="text-xs text-gray-600 text-center">(To be populated with precision, recall, F1 per class)</div>
        </div>
      </div>

      {/* Performance on Independent Cohorts */}
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h3 className="text-xl font-bold text-center mb-4 text-orange-600">
          Performance on Independent Test Cohorts
        </h3>
        <p className="text-sm text-gray-600 text-center mb-4">
          Model applied to held-out cohorts to assess generalizability
        </p>
        
        {/* Placeholder for bar chart */}
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded border">
          <div className="text-center mb-4">
            <div className="text-lg font-semibold text-orange-700">Average Predicted Probabilities by Cohort</div>
            <div className="text-xs text-gray-600">(Placeholder - Use Chart.js histogram/bar chart)</div>
          </div>
          
          <div className="space-y-3">
            {/* Healthy WT Cohort */}
            <div className="p-3 bg-white rounded border">
              <div className="font-semibold text-sm mb-2">Healthy WT (n=57)</div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="p-2 bg-green-100 rounded">
                  <div className="font-bold">P(Healthy): --</div>
                </div>
                <div className="p-2 bg-yellow-100 rounded">
                  <div className="font-bold">P(PRE-BRCA): --</div>
                </div>
                <div className="p-2 bg-red-100 rounded">
                  <div className="font-bold">P(BRCA): --</div>
                </div>
              </div>
            </div>
            
            {/* Healthy MT Cohort */}
            <div className="p-3 bg-white rounded border">
              <div className="font-semibold text-sm mb-2">Healthy MT (n=22)</div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="p-2 bg-green-100 rounded">
                  <div className="font-bold">P(Healthy): --</div>
                </div>
                <div className="p-2 bg-yellow-100 rounded">
                  <div className="font-bold">P(PRE-BRCA): --</div>
                </div>
                <div className="p-2 bg-red-100 rounded">
                  <div className="font-bold">P(BRCA): --</div>
                </div>
              </div>
            </div>
            
            {/* PRE-BRCA Cohort */}
            <div className="p-3 bg-white rounded border">
              <div className="font-semibold text-sm mb-2">PRE-BRCA (n=134)</div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="p-2 bg-green-100 rounded">
                  <div className="font-bold">P(Healthy): --</div>
                </div>
                <div className="p-2 bg-yellow-100 rounded">
                  <div className="font-bold">P(PRE-BRCA): --</div>
                </div>
                <div className="p-2 bg-red-100 rounded">
                  <div className="font-bold">P(BRCA): --</div>
                </div>
              </div>
            </div>
            
            {/* BRCA MT & WT Cohorts */}
            <div className="grid md:grid-cols-2 gap-3">
              <div className="p-3 bg-white rounded border">
                <div className="font-semibold text-sm mb-2">BRCA MT (n=5)</div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="p-2 bg-green-100 rounded">
                    <div className="font-bold">P(H): --</div>
                  </div>
                  <div className="p-2 bg-yellow-100 rounded">
                    <div className="font-bold">P(P): --</div>
                  </div>
                  <div className="p-2 bg-red-100 rounded">
                    <div className="font-bold">P(B): --</div>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-white rounded border">
                <div className="font-semibold text-sm mb-2">BRCA WT (n=5)</div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="p-2 bg-green-100 rounded">
                    <div className="font-bold">P(H): --</div>
                  </div>
                  <div className="p-2 bg-yellow-100 rounded">
                    <div className="font-bold">P(P): --</div>
                  </div>
                  <div className="p-2 bg-red-100 rounded">
                    <div className="font-bold">P(B): --</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-300">
          <div className="text-xs text-gray-700 text-center">
            <strong>Note:</strong> These cohorts were completely held-out during training to simulate real-world performance.
            Ideal model should show: High P(Healthy) for HEALTHY cohorts, High P(PRE-BRCA) for PRE-BRCA cohort, 
            and High P(BRCA) for BRCA cohorts.
          </div>
        </div>
      </div>
    </div>
  );
};
