import { Navigation } from './components/Navigation'
import { Section } from './components/Section'
import { SlideControls } from './components/SlideControls'
import { Charts } from './components/charts/Charts'

function App() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--breast-cancer-bg)' }}>
      {/* Fixed navigation header */}
      <Navigation />

      {/* Main content with proper slideshow structure - full screen */}
      <main className="pt-16">
        {/* Title Slide - Project title, name, institution */}
        <Section sectionId="home" backgroundTheme="breast-cancer-bg-1">
          <div className="flex min-h-screen flex-col items-center justify-center gap-6 text-center px-8">
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--breast-cancer-accent)' }}>
                <span className="text-4xl text-white">🎗️</span>
              </div>
            </div>
            <h1 className="mx-auto max-w-4xl text-balance text-4xl font-bold leading-tight" style={{ color: 'var(--breast-cancer-text)' }}>
              MAMO.IA: Detecção de cancer de mama com aprendizado de maquina e otimização bioinspirada
            </h1>
            <div className="mt-8 text-xl" style={{ color: 'var(--breast-cancer-text)' }}>
              <p className="font-medium"><strong>Orientador:</strong> Wellington Pinheiro</p>
              <p className="font-small"><strong>Dicente:</strong> Leandro Carneiro</p>
              <img src="src/assets/logo-upe.png" alt="UPE Logo" className="mt-6 h-16 mx-auto" />
              <p className="text-sm opacity-70 mt-4">{new Date().getFullYear()}</p>
            </div>
          </div>
        </Section>

        {/* Introduction - Background and problem statement */}
        <Section sectionId="introduction" sectionTitle="Introduction" backgroundTheme="breast-cancer-bg-2">
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-8 md:grid-cols-2 mb-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold" style={{ color: 'var(--breast-cancer-accent)' }}>
                  Research Background
                </h3>
                <p className="text-lg leading-relaxed">
                  Breast cancer is one of the most prevalent forms of cancer affecting women worldwide, with early
                  detection being crucial for successful treatment outcomes. Machine learning and bio-inspired
                  optimization techniques have shown great promise in improving diagnostic accuracy and efficiency.
                </p>
                <p className="text-lg leading-relaxed">
                  Traditional diagnostic methods often rely on manual interpretation and can be subject to human error.
                  Automated systems using advanced algorithms can provide more consistent and accurate results.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold" style={{ color: 'var(--breast-cancer-accent)' }}>
                  Problem Statement
                </h3>
                <ul className="space-y-3 text-lg">
                  <li className="flex items-start gap-2">
                    <span style={{ color: 'var(--breast-cancer-accent)' }}>•</span>
                    Need for automated, accurate breast cancer detection systems
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: 'var(--breast-cancer-accent)' }}>•</span>
                    Integration of machine learning with bio-inspired optimization
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: 'var(--breast-cancer-accent)' }}>•</span>
                    Comparison and validation of different algorithmic approaches
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Section>

        {/* Methodology - Research approach and methods */}
        <Section sectionId="methodology" sectionTitle="Methodology" backgroundTheme="breast-cancer-bg-3">
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-8 md:grid-cols-3 mb-8">
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--breast-cancer-accent)' }}>
                  Data Collection
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>• Breast cancer datasets from UCI repository</li>
                  <li>• Clinical features and diagnostic measurements</li>
                  <li>• Pre-processing and normalization techniques</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--breast-cancer-accent)' }}>
                  Machine Learning Models
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>• Light GBM Classifier</li>
                  <li>• XGBoost Classifier</li>
                  <li>• Gradient Boosting</li>
                  <li>• Random Forest</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--breast-cancer-accent)' }}>
                  Bio-inspired Optimization
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>• Genetic Algorithm (GA) for feature selection</li>
                  <li>• Particle Swarm Optimization (PSO)</li>
                  <li>• Hybrid approaches with ML models</li>
                </ul>
              </div>
            </div>
            
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--breast-cancer-accent)' }}>
                Evaluation Metrics
              </h3>
              <div className="flex justify-center space-x-8 text-lg">
                <span>Accuracy</span> • <span>F1-Score</span> • <span>ROC-AUC</span> • <span>Sensitivity</span> • <span>Specificity</span> • <span>Kappa</span>
              </div>
            </div>
          </div>
        </Section>

        {/* Results - Grid of charts with modal functionality */}
        <Section sectionId="results" sectionTitle="Results" backgroundTheme="breast-cancer-bg-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--breast-cancer-accent)' }}>
                Performance Analysis
              </h3>
              <p className="text-lg opacity-80">
                Click on any chart to view an enlarged version with detailed analysis
              </p>
            </div>
            <Charts />
          </div>
        </Section>

        {/* Conclusion - Findings and future work */}
        <Section sectionId="conclusion" sectionTitle="Conclusion" backgroundTheme="breast-cancer-bg-5">
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold" style={{ color: 'var(--breast-cancer-accent)' }}>
                  Key Findings
                </h3>
                <ul className="space-y-3 text-lg">
                  <li className="flex items-start gap-2">
                    <span style={{ color: 'var(--breast-cancer-accent)' }}>✓</span>
                    Bio-inspired optimization significantly improved model performance
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: 'var(--breast-cancer-accent)' }}>✓</span>
                    GA and PSO enhanced feature selection effectiveness
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: 'var(--breast-cancer-accent)' }}>✓</span>
                    Ensemble methods showed superior diagnostic accuracy
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: 'var(--breast-cancer-accent)' }}>✓</span>
                    High sensitivity and specificity achieved across all models
                  </li>
                </ul>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-2xl font-bold" style={{ color: 'var(--breast-cancer-accent)' }}>
                  Future Work
                </h3>
                <ul className="space-y-3 text-lg">
                  <li className="flex items-start gap-2">
                    <span style={{ color: 'var(--breast-cancer-accent)' }}>→</span>
                    Integration with medical imaging data
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: 'var(--breast-cancer-accent)' }}>→</span>
                    Real-time diagnostic system development
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: 'var(--breast-cancer-accent)' }}>→</span>
                    Clinical validation and deployment
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: 'var(--breast-cancer-accent)' }}>→</span>
                    Exploration of deep learning architectures
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="text-center mt-12 p-8 bg-white rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--breast-cancer-accent)' }}>
                Thank You
              </h3>
              <p className="text-lg">
                Questions and Discussion Welcome
              </p>
              <p className="text-sm opacity-70 mt-4">
                Leandro Silva • Universidade de Pernambuco • {new Date().getFullYear()}
              </p>
            </div>
          </div>
        </Section>
      </main>

      {/* Previous/Next buttons and progress indicator */}
      <SlideControls />
    </div>
  )
}

export default App
