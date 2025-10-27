import React from 'react';

export const MethodologyPipeline: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col justify-center space-y-5">
      {/* Phase 1: Data Collection & Preprocessing */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-5 shadow-lg border border-blue-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold shadow-md">
            1
          </div>
          <h3 className="text-lg font-bold text-blue-700">Data Collection & Preprocessing</h3>
        </div>
        
        <div className="grid md:grid-cols-6 gap-2 text-xs">
          <div className="bg-white p-2.5 rounded-lg border-l-4 border-blue-500 shadow-sm">
            <div className="font-bold mb-1 text-blue-700">1.1 Collect GEO</div>
            <div className="text-gray-600">5 datasets, 1318 samples</div>
          </div>
          <div className="flex items-center justify-center text-blue-400 text-lg">→</div>
          <div className="bg-white p-2.5 rounded-lg border-l-4 border-blue-500 shadow-sm">
            <div className="font-bold mb-1 text-blue-700">1.2 Tag Samples</div>
            <div className="text-gray-600">6 classes defined</div>
          </div>
          <div className="flex items-center justify-center text-blue-400 text-lg">→</div>
          <div className="bg-white p-2.5 rounded-lg border-l-4 border-blue-500 shadow-sm">
            <div className="font-bold mb-1 text-blue-700">1.3 Clean Data</div>
            <div className="text-gray-600">NULL → empty</div>
          </div>
          <div className="flex items-center justify-center text-blue-400 text-lg">→</div>
          <div className="bg-white p-2.5 rounded-lg border-l-4 border-blue-500 shadow-sm">
            <div className="font-bold mb-1 text-blue-700">1.4 Impute</div>
            <div className="text-gray-600">Min per class</div>
          </div>
        </div>
      </div>

      {/* Phase 2: Data Splitting Strategy */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 shadow-lg border border-purple-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-500 to-purple-600 text-white font-bold shadow-md">
            2
          </div>
          <h3 className="text-lg font-bold text-purple-700">Data Splitting Strategy (Healthy vs BRCA)</h3>
        </div>
        
        <div className="grid md:grid-cols-3 gap-3">
          <div className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-purple-500">
            <div className="font-bold text-purple-700 text-xs mb-2">3.1 Training (70%)</div>
            <div className="text-xs space-y-1">
              <div className="flex justify-between"><span>BRCA:</span><strong>40</strong></div>
              <div className="flex justify-between"><span>HEALTHY-UNK:</span><strong>427</strong></div>
              <div className="text-gray-500 mt-2">Model training</div>
            </div>
          </div>
          
          <div className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-purple-500">
            <div className="font-bold text-purple-700 text-xs mb-2">3.2 Validation (15%)</div>
            <div className="text-xs space-y-1">
              <div className="flex justify-between"><span>BRCA:</span><strong>6</strong></div>
              <div className="flex justify-between"><span>HEALTHY-UNK:</span><strong>140</strong></div>
              <div className="text-gray-500 mt-2">Hyperparameter tuning</div>
            </div>
          </div>
          
          <div className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-purple-500">
            <div className="font-bold text-purple-700 text-xs mb-2">3.3 Test (15%)</div>
            <div className="text-xs space-y-1">
              <div className="flex justify-between"><span>BRCA:</span><strong>9</strong></div>
              <div className="flex justify-between"><span>HEALTHY-UNK:</span><strong>147</strong></div>
              <div className="text-gray-500 mt-2">Final evaluation</div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-3 rounded-lg mt-3 border border-yellow-300">
          <div className="font-bold text-yellow-800 text-xs mb-2">Independent Test Cohorts (Held-out for 3-class validation)</div>
          <div className="grid grid-cols-5 gap-2 text-xs">
            <div className="p-2 bg-white rounded-lg shadow-sm text-center border border-green-200">
              <div className="font-bold text-green-600">HEALTHY-MT</div>
              <div className="text-lg font-bold text-green-700">22</div>
            </div>
            <div className="p-2 bg-white rounded-lg shadow-sm text-center border border-green-200">
              <div className="font-bold text-green-600">HEALTHY-WT</div>
              <div className="text-lg font-bold text-green-700">57</div>
            </div>
            <div className="p-2 bg-white rounded-lg shadow-sm text-center border border-yellow-200">
              <div className="font-bold text-yellow-600">PRE-BRCA</div>
              <div className="text-lg font-bold text-yellow-700">134</div>
            </div>
            <div className="p-2 bg-white rounded-lg shadow-sm text-center border border-red-200">
              <div className="font-bold text-red-600">BRCA-MT</div>
              <div className="text-lg font-bold text-red-700">5</div>
            </div>
            <div className="p-2 bg-white rounded-lg shadow-sm text-center border border-red-200">
              <div className="font-bold text-red-600">BRCA-WT</div>
              <div className="text-lg font-bold text-red-700">5</div>
            </div>
          </div>
        </div>
      </div>

      {/* Phase 3: PSO Feature Selection Pipeline */}
      <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-5 shadow-lg border border-red-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-red-500 to-red-600 text-white font-bold shadow-md">
            3
          </div>
          <h3 className="text-lg font-bold text-red-700">PSO Feature Selection Pipeline</h3>
        </div>
        
        <div className="grid md:grid-cols-6 gap-2 text-xs">
          <div className="bg-white p-2.5 rounded-lg border-l-4 border-red-500 shadow-sm">
            <div className="font-bold mb-1 text-red-700">4.1 Execute PSO</div>
            <div className="text-gray-600">Swarm intelligence</div>
            <div className="mt-1 font-bold text-red-600">779 features</div>
          </div>
          <div className="flex items-center justify-center text-red-400 text-lg">→</div>
          <div className="bg-white p-2.5 rounded-lg border-l-4 border-red-500 shadow-sm">
            <div className="font-bold mb-1 text-red-700">4.2 Select Features</div>
            <div className="text-gray-600">Apply to 5 models</div>
          </div>
          <div className="flex items-center justify-center text-red-400 text-lg">→</div>
          <div className="bg-white p-2.5 rounded-lg border-l-4 border-red-500 shadow-sm">
            <div className="font-bold mb-1 text-red-700">4.3 SMOTE</div>
            <div className="text-gray-600">Balance classes</div>
          </div>
          <div className="flex items-center justify-center text-red-400 text-lg">→</div>
          <div className="bg-white p-2.5 rounded-lg border-l-4 border-red-500 shadow-sm">
            <div className="font-bold mb-1 text-red-700">4.4-4.5 Train & Save</div>
            <div className="text-gray-600">5 PSO models</div>
          </div>
        </div>
      </div>

      {/* Phase 4: GA Feature Selection Pipeline */}
      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-5 shadow-lg border border-indigo-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-indigo-500 to-indigo-600 text-white font-bold shadow-md">
            4
          </div>
          <h3 className="text-lg font-bold text-indigo-700">GA Feature Selection Pipeline</h3>
        </div>
        
        <div className="grid md:grid-cols-6 gap-2 text-xs">
          <div className="bg-white p-2.5 rounded-lg border-l-4 border-indigo-500 shadow-sm">
            <div className="font-bold mb-1 text-indigo-700">5.1 Execute GA</div>
            <div className="text-gray-600">Evolutionary search</div>
            <div className="mt-1 font-bold text-indigo-600">913 features</div>
          </div>
          <div className="flex items-center justify-center text-indigo-400 text-lg">→</div>
          <div className="bg-white p-2.5 rounded-lg border-l-4 border-indigo-500 shadow-sm">
            <div className="font-bold mb-1 text-indigo-700">5.2 Select Features</div>
            <div className="text-gray-600">Apply to 5 models</div>
          </div>
          <div className="flex items-center justify-center text-indigo-400 text-lg">→</div>
          <div className="bg-white p-2.5 rounded-lg border-l-4 border-indigo-500 shadow-sm">
            <div className="font-bold mb-1 text-indigo-700">5.3 SMOTE</div>
            <div className="text-gray-600">Balance classes</div>
          </div>
          <div className="flex items-center justify-center text-indigo-400 text-lg">→</div>
          <div className="bg-white p-2.5 rounded-lg border-l-4 border-indigo-500 shadow-sm">
            <div className="font-bold mb-1 text-indigo-700">5.4-5.5 Train & Save</div>
            <div className="text-gray-600">5 GA models</div>
          </div>
        </div>
      </div>

      {/* Phase 5: Baseline (No Feature Selection) */}
      <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-5 shadow-lg border border-green-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-green-500 to-green-600 text-white font-bold shadow-md">
            5
          </div>
          <h3 className="text-lg font-bold text-green-700">Baseline Training (All Features)</h3>
        </div>
        
        <div className="grid md:grid-cols-6 gap-2 text-xs mb-3">
          <div className="bg-white p-2.5 rounded-lg border-l-4 border-green-500 shadow-sm">
            <div className="font-bold mb-1 text-green-700">6.1 All Features</div>
            <div className="text-gray-600">27,578 CpG sites</div>
          </div>
          <div className="flex items-center justify-center text-green-400 text-lg">→</div>
          <div className="bg-white p-2.5 rounded-lg border-l-4 border-green-500 shadow-sm">
            <div className="font-bold mb-1 text-green-700">6.2 Split Data</div>
            <div className="text-gray-600">Same as step 3</div>
          </div>
          <div className="flex items-center justify-center text-green-400 text-lg">→</div>
          <div className="bg-white p-2.5 rounded-lg border-l-4 border-green-500 shadow-sm">
            <div className="font-bold mb-1 text-green-700">6.3 SMOTE</div>
            <div className="text-gray-600">Balance classes</div>
          </div>
          <div className="flex items-center justify-center text-green-400 text-lg">→</div>
          <div className="bg-white p-2.5 rounded-lg border-l-4 border-green-500 shadow-sm">
            <div className="font-bold mb-1 text-green-700">6.4-6.5 Train & Save</div>
            <div className="text-gray-600">5 baseline models</div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-100 to-cyan-100 p-3 rounded-lg border border-blue-300">
          <div className="font-bold text-sm text-blue-800 mb-2">🎯 XGBoost Baseline Performance (All Features):</div>
          <div className="grid grid-cols-4 gap-2 text-xs">
            <div className="bg-white p-2 rounded shadow-sm"><strong>Accuracy:</strong> 99.35%</div>
            <div className="bg-white p-2 rounded shadow-sm"><strong>F1 Score:</strong> 99.25%</div>
            <div className="bg-white p-2 rounded shadow-sm"><strong>ROC AUC:</strong> 100.00%</div>
            <div className="bg-white p-2 rounded shadow-sm"><strong>Kappa:</strong> 0.9303</div>
          </div>
        </div>
      </div>

      {/* Phase 6: Model Testing & Evaluation */}
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-5 shadow-lg border border-orange-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-orange-500 to-orange-600 text-white font-bold shadow-md">
            6
          </div>
          <h3 className="text-lg font-bold text-orange-700">Model Testing & Evaluation</h3>
        </div>
        
        <div className="grid md:grid-cols-4 gap-3 text-xs">
          <div className="bg-white p-3 rounded-lg border-l-4 border-orange-500 shadow-sm">
            <div className="font-bold mb-1 text-orange-700">7.1 Test 15 Models</div>
            <div className="text-gray-600">5 models × 3 strategies (PSO, GA, Baseline)</div>
          </div>
          <div className="flex items-center justify-center text-orange-400 text-lg">→</div>
          <div className="bg-white p-3 rounded-lg border-l-4 border-orange-500 shadow-sm col-span-2">
            <div className="font-bold mb-1 text-orange-700">7.2 Calculate Performance Metrics</div>
            <div className="text-gray-600">Accuracy, F1, ROC-AUC, Sensitivity, Specificity, Precision, Kappa</div>
          </div>
        </div>
      </div>

      {/* Phase 7: Three-Class Risk Stratification */}
      <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 rounded-xl p-5 shadow-xl border-2 border-pink-400">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-pink-500 to-pink-600 text-white font-bold shadow-md">
            7
          </div>
          <h3 className="text-lg font-bold text-pink-700">Final Three-Class Risk Stratification</h3>
        </div>
        
        <div className="space-y-3">
          <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-pink-500">
            <div className="font-bold mb-2 text-pink-700">8. Compare Models & Select Best Classifier</div>
            <div className="text-xs text-gray-700 mb-3">
              Evaluate all 15 models to identify the best performer for three-class probabilistic risk assessment
            </div>
            
            <div className="grid md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border-2 border-green-400 shadow-sm">
                <div className="font-bold text-green-700 mb-1 flex items-center gap-1">
                  <span>✓</span> HEALTHY
                </div>
                <div className="text-gray-600">P(Healthy) - No cancer risk</div>
              </div>
              <div className="p-3 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg border-2 border-yellow-400 shadow-sm">
                <div className="font-bold text-yellow-700 mb-1 flex items-center gap-1">
                  <span>⚠</span> PRE-BRCA
                </div>
                <div className="text-gray-600">P(Risk) - Future development risk</div>
              </div>
              <div className="p-3 bg-gradient-to-br from-red-50 to-red-100 rounded-lg border-2 border-red-400 shadow-sm">
                <div className="font-bold text-red-700 mb-1 flex items-center gap-1">
                  <span>✗</span> BRCA
                </div>
                <div className="text-gray-600">P(Cancer) - Active disease</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 p-4 rounded-lg shadow-md border border-purple-300">
            <div className="font-bold text-sm mb-2 text-purple-800">🎯 Clinical Application:</div>
            <div className="text-xs text-gray-700">
              The selected model provides <strong>probabilistic risk scores</strong> enabling stage-aware care pathways:
              <div className="mt-2 flex items-center justify-center gap-2">
                <span className="px-3 py-1 bg-green-200 rounded-full font-semibold text-green-800">Routine Screening</span>
                <span className="text-purple-600">→</span>
                <span className="px-3 py-1 bg-yellow-200 rounded-full font-semibold text-yellow-800">Enhanced Surveillance</span>
                <span className="text-purple-600">→</span>
                <span className="px-3 py-1 bg-red-200 rounded-full font-semibold text-red-800">Urgent Intervention</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 rounded-xl p-4 shadow-lg border-2 border-purple-400">
        <h3 className="text-base font-bold text-center mb-3 text-purple-800">Pipeline Summary</h3>
        <div className="grid md:grid-cols-5 gap-3 text-center text-sm">
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-purple-700">5</div>
            <div className="text-xs text-gray-600 font-semibold">GEO Datasets</div>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-purple-700">1,318</div>
            <div className="text-xs text-gray-600 font-semibold">Total Samples</div>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-purple-700">27,578</div>
            <div className="text-xs text-gray-600 font-semibold">CpG Features</div>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-purple-700">15</div>
            <div className="text-xs text-gray-600 font-semibold">Trained Models</div>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-purple-700">3</div>
            <div className="text-xs text-gray-600 font-semibold">Risk Classes</div>
          </div>
        </div>
      </div>
    </div>
  );
};
