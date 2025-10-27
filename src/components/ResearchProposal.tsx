import React from 'react';

export const ResearchProposal: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col justify-center space-y-6">
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-6 border-2" style={{ borderColor: 'var(--breast-cancer-accent)' }}>
        <h3 className="text-xl font-bold text-center mb-4" style={{ color: 'var(--breast-cancer-accent)' }}>
          Study Proposal & Innovations
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3" style={{ color: 'var(--breast-cancer-accent)' }}>Primary Objectives:</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span style={{ color: 'var(--breast-cancer-accent)' }}>✓</span>
                <strong>Identify cancer risk in early stages</strong> through DNA methylation pattern analysis
              </li>
              <li className="flex items-start gap-2">
                <span style={{ color: 'var(--breast-cancer-accent)' }}>✓</span>
                <strong>Discover CpG islands linked to BRCA1 suppression</strong> that increase breast cancer development risk
              </li>
              <li className="flex items-start gap-2">
                <span style={{ color: 'var(--breast-cancer-accent)' }}>✓</span>
                <strong>Develop interpretable ML models</strong> for clinical decision support
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3" style={{ color: 'var(--breast-cancer-accent)' }}>Innovation:</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span style={{ color: 'var(--breast-cancer-accent)' }}>⚡</span>
                <strong>Samples:</strong> Only blood-derived methylation data
              </li>
              <li className="flex items-start gap-2">
                <span style={{ color: 'var(--breast-cancer-accent)' }}>⚡</span>
                <strong>Hybrid intepretable approach:</strong> Bio-inspired optimization + Tree-based ML
              </li>
              <li className="flex items-start gap-2">
                <span style={{ color: 'var(--breast-cancer-accent)' }}>⚡</span>
                <strong>Epigenetic focus:</strong> Methylation-based early detection pathway
              </li>
            </ul>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-bold text-center mb-4" style={{ color: 'var(--breast-cancer-accent)' }}>
        Mamo.IA Hybrid Framework
      </h3>
      <div className="flex justify-center items-center space-x-6">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: 'var(--breast-cancer-accent)' }}>
            <span className="text-2xl text-white">🧬</span>
          </div>
          <h4 className="font-bold text-sm">Metaheuristics</h4>
          <p className="text-xs">GA & PSO</p>
        </div>

        <div className="text-3xl" style={{ color: 'var(--breast-cancer-accent)' }}>+</div>

        <div className="text-center">
          <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: 'var(--breast-cancer-accent)' }}>
            <span className="text-2xl text-white">🌳</span>
          </div>
          <h4 className="font-bold text-sm">Tree Ensembles</h4>
          <p className="text-xs">5 ML algorithms</p>
        </div>

        <div className="text-3xl" style={{ color: 'var(--breast-cancer-accent)' }}>=</div>

        <div className="text-center">
          <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: 'var(--breast-cancer-accent)' }}>
            <span className="text-2xl text-white">🎯</span>
          </div>
          <h4 className="font-bold text-sm">Classification</h4>
          <p className="text-xs">Interpretable results</p>
        </div>
      </div>

      {/* Summary Call to Action */}
      <div className="bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100 rounded-lg p-6 border-2 border-pink-400">
        <h3 className="text-xl font-bold text-center mb-3 text-pink-700">
          Research Objective
        </h3>
        <div className="text-center text-sm text-gray-700">
          <p className="mb-2">
            Develop a <strong>blood-based, epigenetic risk stratification framework</strong> that identifies
            individuals at risk of breast cancer <strong>years before clinical diagnosis</strong>.
          </p>
          <p className="font-semibold" style={{ color: 'var(--breast-cancer-accent)' }}>
            Enable stage-aware care: Routine Screening → Enhanced Surveillance → Urgent Intervention
          </p>
        </div>
      </div>
    </div>
  );
};
