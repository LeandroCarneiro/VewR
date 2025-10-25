import React from 'react';

export const MethodologyPipeline: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Phase 1: Data Collection & Preprocessing */}
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-500 text-white font-bold">
            1
          </div>
          <h3 className="text-xl font-bold text-blue-600">Data Collection & Preprocessing</h3>
        </div>
        
        <div className="grid md:grid-cols-5 gap-3 text-xs">
          <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-500">
            <div className="font-semibold mb-1">1. Collect from GEO</div>
            <div className="text-gray-600">5 datasets, 1318 samples, 27,578 features</div>
          </div>
          <div className="flex items-center justify-center text-blue-500 text-xl">→</div>
          <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-500">
            <div className="font-semibold mb-1">2. Tag Samples</div>
            <div className="text-gray-600">HEALTHY-MT/WT/UNK, PRE-BRCA, BRCA-MT/WT</div>
          </div>
          <div className="flex items-center justify-center text-blue-500 text-xl">→</div>
          <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-500">
            <div className="font-semibold mb-1">3. Handle Missing</div>
            <div className="text-gray-600">NULL → empty → min value per class</div>
          </div>
        </div>
      </div>

      {/* Phase 2: Data Splitting Strategy */}
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-purple-500 text-white font-bold">
            2
          </div>
          <h3 className="text-xl font-bold text-purple-600">Data Splitting Strategy</h3>
        </div>
        
        <div className="space-y-4">
          <div className="bg-purple-50 p-4 rounded border-l-4 border-purple-500">
            <div className="font-semibold mb-2">Split Configuration (Healthy vs BRCA)</div>
            <div className="grid md:grid-cols-3 gap-3 text-xs">
              <div>
                <div className="font-bold text-purple-700">Training Set (70%)</div>
                <div>BRCA: 40 samples</div>
                <div>HEALTHY-UNK: 427 samples</div>
                <div className="mt-1 text-gray-600">Used for model training</div>
              </div>
              <div>
                <div className="font-bold text-purple-700">Validation Set (15%)</div>
                <div>BRCA: 6 samples</div>
                <div>HEALTHY-UNK: 140 samples</div>
                <div className="mt-1 text-gray-600">Used for hyperparameter tuning</div>
              </div>
              <div>
                <div className="font-bold text-purple-700">Test Set (15%)</div>
                <div>BRCA: 9 samples</div>
                <div>HEALTHY-UNK: 147 samples</div>
                <div className="mt-1 text-gray-600">Used for final evaluation</div>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded border-l-4 border-yellow-500">
            <div className="font-semibold mb-2">Independent Test Cohorts (Held-out)</div>
            <div className="grid md:grid-cols-5 gap-2 text-xs">
              <div className="p-2 bg-white rounded border">
                <div className="font-bold text-green-600">HEALTHY-MT</div>
                <div>n = 22</div>
              </div>
              <div className="p-2 bg-white rounded border">
                <div className="font-bold text-green-600">HEALTHY-WT</div>
                <div>n = 57</div>
              </div>
              <div className="p-2 bg-white rounded border">
                <div className="font-bold text-yellow-600">PRE-BRCA</div>
                <div>n = 134</div>
              </div>
              <div className="p-2 bg-white rounded border">
                <div className="font-bold text-red-600">BRCA-MT</div>
                <div>n = 5</div>
              </div>
              <div className="p-2 bg-white rounded border">
                <div className="font-bold text-red-600">BRCA-WT</div>
                <div>n = 5</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Phase 3 & 4: PSO Feature Selection */}
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-red-500 text-white font-bold">
            3
          </div>
          <h3 className="text-xl font-bold text-red-600">PSO Feature Selection Pipeline</h3>
        </div>
        
        <div className="grid md:grid-cols-4 gap-3 text-xs">
          <div className="bg-red-50 p-3 rounded border-l-4 border-red-500">
            <div className="font-semibold mb-1">4.1 Execute PSO</div>
            <div className="text-gray-600">Optimize feature weights using swarm intelligence</div>
            <div className="mt-2 font-bold text-red-700">Result: 779 features</div>
          </div>
          <div className="flex items-center justify-center text-red-500 text-xl">→</div>
          <div className="bg-red-50 p-3 rounded border-l-4 border-red-500">
            <div className="font-semibold mb-1">4.2 Train Models</div>
            <div className="text-gray-600">5 tree-based models: RF, XGB, LGBM, GB, AB</div>
          </div>
          <div className="flex items-center justify-center text-red-500 text-xl">→</div>
          <div className="bg-red-50 p-3 rounded border-l-4 border-red-500">
            <div className="font-semibold mb-1">4.3 Save Models</div>
            <div className="text-gray-600">Persist trained models for evaluation</div>
          </div>
        </div>
      </div>

      {/* Phase 5: GA Feature Selection */}
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-indigo-500 text-white font-bold">
            4
          </div>
          <h3 className="text-xl font-bold text-indigo-600">GA Feature Selection Pipeline</h3>
        </div>
        
        <div className="grid md:grid-cols-4 gap-3 text-xs">
          <div className="bg-indigo-50 p-3 rounded border-l-4 border-indigo-500">
            <div className="font-semibold mb-1">5.1 Execute GA</div>
            <div className="text-gray-600">Evolutionary feature selection with crossover & mutation</div>
            <div className="mt-2 font-bold text-indigo-700">Result: 913 features</div>
          </div>
          <div className="flex items-center justify-center text-indigo-500 text-xl">→</div>
          <div className="bg-indigo-50 p-3 rounded border-l-4 border-indigo-500">
            <div className="font-semibold mb-1">5.2 Train Models</div>
            <div className="text-gray-600">5 tree-based models with GA-selected features</div>
          </div>
          <div className="flex items-center justify-center text-indigo-500 text-xl">→</div>
          <div className="bg-indigo-50 p-3 rounded border-l-4 border-indigo-500">
            <div className="font-semibold mb-1">5.3 Save Models</div>
            <div className="text-gray-600">Persist GA-optimized models</div>
          </div>
        </div>
      </div>

      {/* Phase 6: Baseline (No Feature Selection) */}
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-green-500 text-white font-bold">
            5
          </div>
          <h3 className="text-xl font-bold text-green-600">Baseline Training (All Features)</h3>
        </div>
        
        <div className="grid md:grid-cols-5 gap-3 text-xs">
          <div className="bg-green-50 p-3 rounded border-l-4 border-green-500">
            <div className="font-semibold mb-1">6.1 Use All Features</div>
            <div className="text-gray-600">27,578 CpG sites</div>
          </div>
          <div className="flex items-center justify-center text-green-500 text-xl">→</div>
          <div className="bg-green-50 p-3 rounded border-l-4 border-green-500">
            <div className="font-semibold mb-1">6.2 Apply SMOTE</div>
            <div className="text-gray-600">Balance training classes</div>
          </div>
          <div className="flex items-center justify-center text-green-500 text-xl">→</div>
          <div className="bg-green-50 p-3 rounded border-l-4 border-green-500">
            <div className="font-semibold mb-1">6.3 Train & Save</div>
            <div className="text-gray-600">Baseline models for comparison</div>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-300">
          <div className="font-semibold text-sm text-blue-800 mb-1">XGBoost Baseline Results (All Features):</div>
          <div className="grid md:grid-cols-4 gap-2 text-xs">
            <div><strong>Accuracy:</strong> 99.35%</div>
            <div><strong>F1 Score:</strong> 99.25%</div>
            <div><strong>ROC AUC:</strong> 100.00%</div>
            <div><strong>Kappa:</strong> 0.9303</div>
          </div>
        </div>
      </div>

      {/* Phase 7: Model Evaluation */}
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-orange-500 text-white font-bold">
            6
          </div>
          <h3 className="text-xl font-bold text-orange-600">Model Testing & Evaluation</h3>
        </div>
        
        <div className="grid md:grid-cols-3 gap-3 text-xs">
          <div className="bg-orange-50 p-3 rounded border-l-4 border-orange-500">
            <div className="font-semibold mb-1">7.1 Test All Models</div>
            <div className="text-gray-600">15 models total (5 models × 3 strategies)</div>
          </div>
          <div className="flex items-center justify-center text-orange-500 text-xl">→</div>
          <div className="bg-orange-50 p-3 rounded border-l-4 border-orange-500">
            <div className="font-semibold mb-1">7.2 Calculate Metrics</div>
            <div className="text-gray-600">Accuracy, F1, ROC-AUC, Sensitivity, Specificity, Kappa</div>
          </div>
        </div>
      </div>

      {/* Phase 8: Three-Class Probabilistic Model */}
      <div className="bg-white rounded-lg p-6 shadow-lg border-4 border-pink-300">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-pink-500 text-white font-bold">
            7
          </div>
          <h3 className="text-xl font-bold text-pink-600">Final Three-Class Risk Stratification</h3>
        </div>
        
        <div className="space-y-3">
          <div className="bg-pink-50 p-4 rounded border-l-4 border-pink-500">
            <div className="font-semibold mb-2">8. Compare & Select Best Model</div>
            <div className="text-sm text-gray-700 mb-3">
              Evaluate all models to identify the best classifier for three-class probability output
            </div>
            
            <div className="grid md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-green-100 rounded border border-green-400">
                <div className="font-bold text-green-700 mb-1">HEALTHY</div>
                <div className="text-gray-600">P(Healthy) - No cancer risk</div>
              </div>
              <div className="p-3 bg-yellow-100 rounded border border-yellow-400">
                <div className="font-bold text-yellow-700 mb-1">PRE-BRCA</div>
                <div className="text-gray-600">P(Risk) - Future development risk</div>
              </div>
              <div className="p-3 bg-red-100 rounded border border-red-400">
                <div className="font-bold text-red-700 mb-1">BRCA</div>
                <div className="text-gray-600">P(Cancer) - Active disease</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-4 rounded">
            <div className="font-semibold text-sm mb-2">Clinical Application:</div>
            <div className="text-xs text-gray-700">
              The final model provides probabilistic outputs to support clinical decision-making:
              <strong> Routine Screening</strong> (Healthy) → <strong>Enhanced Surveillance</strong> (PRE-BRCA) → <strong>Diagnostic Intervention</strong> (BRCA)
            </div>
          </div>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border-2 border-purple-300">
        <h3 className="text-lg font-bold text-center mb-4 text-purple-700">Pipeline Summary</h3>
        <div className="grid md:grid-cols-5 gap-4 text-center text-sm">
          <div>
            <div className="text-2xl font-bold text-purple-700">5</div>
            <div className="text-xs text-gray-600">GEO Datasets</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-700">1,318</div>
            <div className="text-xs text-gray-600">Total Samples</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-700">27,578</div>
            <div className="text-xs text-gray-600">CpG Features</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-700">15</div>
            <div className="text-xs text-gray-600">Trained Models</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-700">3</div>
            <div className="text-xs text-gray-600">Risk Classes</div>
          </div>
        </div>
      </div>
    </div>
  );
};
