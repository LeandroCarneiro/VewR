import { Navigation } from './components/Navigation'
import { Section } from './components/Section'
import { SlideControls } from './components/SlideControls'
import { ModelPerformanceCharts } from './components/charts/ModelPerformanceCharts'
import { OptimizerPerformanceCharts } from './components/charts/OptimizerPerformanceCharts'
import { MethodologyPipeline } from './components/MethodologyPipeline'
import { ThreeClassResults } from './components/ThreeClassResults'
import { BreastCancerMotivation } from './components/BreastCancerMotivation'
import { ResearchProposal } from './components/ResearchProposal'

function App() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--breast-cancer-bg)' }}>
      {/* Navigation header - hidden to give more space */}
      <div style={{ display: 'none' }}>
        <Navigation />
      </div>

      {/* Main content with proper slideshow structure - full screen */}
      <main className="">
        {/* Title Slide - Project title, name, institution */}
        <Section sectionId="home" backgroundTheme="breast-cancer-bg-4">
          <div className="lex-col justify-center items-center text-center">
            <div className="mb-48">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--breast-cancer-accent)' }}>
                <span className="text-4xl text-white">🎗️</span>
              </div>
            </div>
            <h1 className="mx-auto max-w-4xl text-balance text-4xl font-bold leading-tight" style={{ color: 'var(--breast-cancer-text)' }}>
              MAMO.IA: Breast Cancer Risk States from DNA Methylation Data Using Bio-inspired Feature Selection and Interpretable Machine Learning
            </h1>
            <div className="mt-8 text-xl" style={{ color: 'var(--breast-cancer-text)' }}>
              <p className="font-medium"><strong>Orientador:</strong> Wellington Pinheiro</p>
              <p className="font-small"><strong>Dicente:</strong> Leandro Carneiro</p>
              <img src="src/assets/logo-upe.png" alt="UPE Logo" className="mt-8 h-20 mx-auto" />
              <p className="text-sm opacity-70 mt-4">{new Date().getFullYear()}</p>
            </div>
          </div>
        </Section>

        {/* Motivation - Global and Brazil breast cancer statistics */}
        <Section sectionId="motivation" sectionTitle="Motivation" backgroundTheme="breast-cancer-bg-3">
          <BreastCancerMotivation />
        </Section>

        {/* Research Proposal - Detailed solution and objectives */}
        <Section sectionId="proposal" sectionTitle="Proposal & Objectives" backgroundTheme="breast-cancer-bg-2">
          <ResearchProposal />
        </Section>

        {/* Introduction - Background and problem statement */}
        <Section sectionId="introduction" sectionTitle="Introduction" backgroundTheme="breast-cancer-bg-2">
          <div className="max-w-7xl mx-auto">
            {/* Genome Data & Gene Expression */}
            <div className="grid gap-6 md:grid-cols-2 mb-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold" style={{ color: 'var(--breast-cancer-accent)' }}>
                  Genome Data & Gene Expression
                </h3>
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <h4 className="font-semibold mb-2" style={{ color: 'var(--breast-cancer-accent)' }}>Key Genomic Elements:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <span className="text-blue-500 font-bold">🧬</span>
                      <div><strong>DNA Methylation:</strong> Epigenetic modification controlling gene expression</div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 font-bold">🔍</span>
                      <div><strong>CpG Islands:</strong> DNA regions rich in cytosine-guanine dinucleotides</div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-purple-500 font-bold">🚯</span>
                      <div><strong>Gene Silencing:</strong> Suppression of gene expression through methylation</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold" style={{ color: 'var(--breast-cancer-accent)' }}>
                  Methylation & Gene Suppression
                </h3>
                <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-lg p-4 border-2" style={{ borderColor: 'var(--breast-cancer-accent)' }}>
                  <h4 className="font-semibold mb-2" style={{ color: 'var(--breast-cancer-accent)' }}>BRCA1 Suppression Pathway:</h4>
                  <div className="text-sm space-y-1">
                    <div>→ <strong>Hypermethylation</strong> at BRCA1 promoter region</div>
                    <div>→ <strong>Gene silencing</strong> of tumor suppressor function</div>
                    <div>→ <strong>Increased cancer risk</strong> through DNA repair deficiency</div>
                    <div>→ <strong>Detectable signatures</strong> years before clinical symptoms</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Machine Learning Power */}
            <div className="bg-white rounded-lg p-6 shadow-lg mb-8">
              <h3 className="text-2xl font-bold text-center mb-4" style={{ color: 'var(--breast-cancer-accent)' }}>
                The Power of Machine Learning in Breast Cancer Research
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: 'rgba(46, 204, 113, 0.15)', border: '2px solid #2ecc71' }}>
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h4 className="font-semibold mb-2" style={{ color: '#2ecc71' }}>Early Detection</h4>
                  <p className="text-sm text-gray-600">
                    ML algorithms can identify subtle methylation patterns that precede clinical manifestation by years,
                    enabling preventive intervention.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: 'rgba(52, 152, 219, 0.15)', border: '2px solid #3498db' }}>
                    <span className="text-2xl">🔍</span>
                  </div>
                  <h4 className="font-semibold mb-2" style={{ color: '#3498db' }}>Biomarker Discovery</h4>
                  <p className="text-sm text-gray-600">
                    Advanced feature selection reveals critical CpG sites linked to BRCA1 suppression,
                    providing new therapeutic targets.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: 'rgba(231, 76, 60, 0.15)', border: '2px solid #e74c3c' }}>
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h4 className="font-semibold mb-2" style={{ color: '#e74c3c' }}>Precision Medicine</h4>
                  <p className="text-sm text-gray-600">
                    Personalized risk profiles based on individual methylation signatures
                    enable tailored screening and treatment strategies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Related Work - Previous research and comparisons */}
        <Section sectionId="related-work" sectionTitle="Related Work" backgroundTheme="breast-cancer-bg-3">
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold" style={{ color: 'var(--breast-cancer-accent)' }}>
                  DNA Methylation Biomarkers
                </h3>
                <div className="bg-white rounded-lg p-6 shadow-lg">
                  <h4 className="font-semibold mb-3" style={{ color: 'var(--breast-cancer-accent)' }}>
                    Espín Perez et al. (2022)
                  </h4>
                  <ul className="text-sm space-y-2">
                    <li>• <strong>NHL prediction</strong> using blood DNA methylation</li>
                    <li>• <strong>135 CpG sites</strong> identified for Non-Hodgkin lymphoma</li>
                    <li>• <strong>96.3% accuracy</strong> for NHL detection</li>
                    <li>• <strong>Binary classification</strong> (healthy vs. pre-diagnostic)</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-lg">
                  <h4 className="font-semibold mb-3" style={{ color: 'var(--breast-cancer-accent)' }}>
                    Zhou et al. (2024)
                  </h4>
                  <ul className="text-sm space-y-2">
                    <li>• <strong>Ensemble gradient boosting</strong> for epigenetic age</li>
                    <li>• <strong>15 methylation clusters</strong> linked to biological aging</li>
                    <li>• Focus on <strong>aging rather than cancer</strong></li>
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-bold" style={{ color: 'var(--breast-cancer-accent)' }}>
                  Machine Learning Approaches
                </h3>
                <div className="bg-white rounded-lg p-6 shadow-lg">
                  <h4 className="font-semibold mb-3" style={{ color: 'var(--breast-cancer-accent)' }}>
                    Taghizadeh et al. (2022)
                  </h4>
                  <ul className="text-sm space-y-2">
                    <li>• <strong>ANOVA + mutual information</strong> with ensemble classifiers</li>
                    <li>• <strong>20 breast cancer biomarkers</strong> from 16,380 genes</li>
                    <li>• <strong>86% accuracy</strong> in BRCA subtype classification</li>
                    <li>• <strong>Tissue-specific TCGA</strong> data (potential bias)</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-lg">
                  <h4 className="font-semibold mb-3" style={{ color: 'var(--breast-cancer-accent)' }}>
                    Gomes et al. (2022)
                  </h4>
                  <ul className="text-sm space-y-2">
                    <li>• <strong>Deep learning + feature selection</strong></li>
                    <li>• <strong>98.75% accuracy</strong> in 13 seconds</li>
                    <li>• <strong>7 tumor suppressor genes</strong> identified</li>
                    <li>• Illumina <strong>450K/27K arrays</strong></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="text-center bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-6 mt-8 border-2" style={{ borderColor: 'var(--breast-cancer-accent)' }}>
              <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--breast-cancer-accent)' }}>
                Our Contribution: Three-Class Classification
              </h3>
              <p className="text-base">
                Unlike previous <strong>binary approaches</strong>, Mamo.IA addresses a <strong>three-class challenge</strong>:
                distinguishing transient epigenetic changes from persistent pre-diagnostic signatures
              </p>
            </div>
          </div>
        </Section>

        {/* Methodology - Research approach and methods */}
        <Section sectionId="methodology" sectionTitle="Methodology - Dataset" backgroundTheme="breast-cancer-bg-3">
          <div className="max-w-7xl mx-auto">
            {/* Data Extraction Process */}

            {/* Hierarchy Tree for HEALTHY and BRCA */}
            <div className="bg-gradient-to-r from-green-50 via-yellow-50 to-red-50 rounded-lg p-6 shadow-lg mb-6 border-2" style={{ borderColor: 'var(--breast-cancer-accent)' }}>
              <h3 className="text-2xl font-bold mb-2 text-center" style={{ color: 'var(--breast-cancer-accent)' }}>
                Population Cohorts
              </h3>
              <p className="text-sm text-gray-600 text-center mb-4">Five populations used in this study and their sample counts</p>

              <div className="grid md:grid-cols-3 gap-6">
                {/* HEALTHY Branch */}
                <div className="space-y-3">
                  <div className="bg-green-100 rounded-lg p-4 shadow-md border-2 border-green-500 text-center">
                    <div className="text-2xl mb-1">💚</div>
                    <div className="text-lg font-bold text-green-700">HEALTHY</div>
                    <div className="text-2xl font-bold text-green-800">793</div>
                    <div className="text-xs text-gray-600">total samples</div>
                  </div>

                  <div className="flex justify-center">
                    <div className="w-0.5 h-6 bg-green-500"></div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="bg-green-50 rounded p-2 border border-green-400 text-center">
                      <div className="text-lg text-gray-600">🧬</div>
                      <div className="font-bold text-green-700">With mutation</div>
                      <div className="text-lg font-bold">22</div>
                    </div>
                    <div className="bg-green-50 rounded p-2 border border-green-400 text-center">
                      <div className="text-lg text-gray-600">✅</div>
                      <div className="font-bold text-green-700">Without</div>
                      <div className="text-lg font-bold">57</div>
                    </div>
                    <div className="bg-green-50 rounded p-2 border border-green-400 text-center">
                      <div className="text-lg text-gray-600">⁉️</div>
                      <div className="font-bold text-green-700">Unkwown</div>
                      <div className="text-lg font-bold">714</div>
                    </div>
                  </div>
                </div>

                {/* PRE-BRCA Branch */}
                <div className="space-y-3">
                  <div className="bg-yellow-100 rounded-lg p-4 shadow-md border-2 border-yellow-500 text-center">
                    <div className="text-2xl mb-1">⚠</div>
                    <div className="text-lg font-bold text-yellow-700">PRE-BRCA</div>
                    <div className="text-2xl font-bold text-yellow-800">134</div>
                    <div className="text-xs text-gray-600">at-risk samples</div>
                  </div>

                  <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-300 text-center text-xs">
                    <div className="font-semibold text-yellow-800">Future Development</div>
                    <div className="text-gray-600 mt-1">Developed cancer within 5 years of sample collection</div>
                  </div>
                </div>

                {/* BRCA Branch */}
                <div className="space-y-3">
                  <div className="bg-red-100 rounded-lg p-4 shadow-md border-2 border-red-500 text-center">
                    <div className="text-2xl mb-1">🎗️</div>
                    <div className="text-lg font-bold text-red-700">BRCA</div>
                    <div className="text-2xl font-bold text-red-800">65</div>
                    <div className="text-xs text-gray-600">cancer samples</div>
                  </div>

                  <div className="flex justify-center">
                    <div className="w-0.5 h-6 bg-red-500"></div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-red-50 rounded p-2 border border-red-400 text-center">
                      <div className="text-lg text-gray-600">🧬</div>
                      <div className="font-bold text-red-700">With mutation</div>
                      <div className="text-lg font-bold">50</div>
                    </div>
                    <div className="bg-red-50 rounded p-2 border border-red-400 text-center">
                      <div className="text-lg text-gray-600">❌</div>
                      <div className="font-bold text-red-700">Without</div>
                      <div className="text-lg font-bold">15</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            {/* Technical Rationale */}
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-6 border border-indigo-200">
              <h3 className="text-xl font-bold text-center mb-4" style={{ color: 'var(--breast-cancer-accent)' }}>
                Technical Rationale: 27,578 CpG Sites Challenge
              </h3>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="p-4">
                  <div className="text-3xl mb-2">📊</div>
                  <h4 className="font-semibold mb-2">High Dimensionality</h4>
                  <p className="text-sm">27,578 features vs. 790 samples creates the <strong>curse of dimensionality</strong></p>
                </div>
                <div className="p-4">
                  <div className="text-3xl mb-2">🔄</div>
                  <h4 className="font-semibold mb-2">Combinatorial Explosion</h4>
                  <p className="text-sm">2^27,578 possible feature combinations require <strong>intelligent search strategies</strong></p>
                </div>
                <div className="p-4">
                  <div className="text-3xl mb-2">⚖️</div>
                  <h4 className="font-semibold mb-2">Bias-Variance Tradeoff</h4>
                  <p className="text-sm">Metaheuristics + trees balance <strong>model complexity with generalization</strong></p>
                </div>
              </div>
            </div>
          </div>
        </Section>



        {/* Metaheuristics - Why and how they work */}
        <Section sectionId="metaheuristics" sectionTitle="Methodology - Optimization" backgroundTheme="breast-cancer-bg-4">
          <div className="max-w-7xl mx-auto">
            {/* High-level overview */}
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--breast-cancer-accent)' }}>
                Bio-inspired Feature Selection
              </h3>
            </div>

            {/* Compact algorithm comparison */}
            <div className="grid gap-6 md:grid-cols-2 mb-6">
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center" style={{ backgroundColor: '#3498db' }}>
                    <span className="text-2xl text-white">🧬</span>
                  </div>
                  <h3 className="text-xl font-bold mt-2" style={{ color: '#3498db' }}>Genetic Algorithm (GA)</h3>
                  <p className="text-sm text-gray-600 mt-1">Evolutionary Feature Selection</p>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded">
                    <div className="text-sm mb-2"><strong>Key Concepts:</strong></div>
                    <ul className="text-xs space-y-1">
                      <li>• <strong>Population diversity</strong> explores multiple solutions</li>
                      <li>• <strong>Crossover & mutation</strong> prevent local optima</li>
                      <li>• <strong>Natural selection</strong> drives optimization</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-xs mb-1"><strong>Individual:</strong> I = [w₁, w₂, ..., wₙ] where wᵢ ∈ [0,1]</div>
                    <div className="text-xs mb-1"><strong>Fitness:</strong> f(I) = 1 - (1/5) × Σᵢ₌₁⁵ κ(X ⊙ I, Y)</div>
                    <div className="text-xs">κ = Cohen's Kappa, ⊙ = element-wise multiplication</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center" style={{ backgroundColor: '#e74c3c' }}>
                    <span className="text-2xl text-white">🐝</span>
                  </div>
                  <h3 className="text-xl font-bold mt-2" style={{ color: '#e74c3c' }}>Particle Swarm Optimization (PSO)</h3>
                  <p className="text-sm text-gray-600 mt-1">Swarm Intelligence Optimization</p>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-red-50 rounded">
                    <div className="text-sm mb-2"><strong>Key Concepts:</strong></div>
                    <ul className="text-xs space-y-1">
                      <li>• <strong>Swarm intelligence</strong> from collective behavior</li>
                      <li>• <strong>Fast convergence</strong> with fewer parameters</li>
                      <li>• <strong>Social learning</strong> balances exploration/exploitation</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-xs mb-1"><strong>Objective:</strong> f(w) = 1 - mean([cohen_kappa(est, X × w, Y) for cv])</div>
                    <div className="text-xs mb-1"><strong>Selection:</strong> f(w) = {'{'}j | w[j] ≥ τ, j ∈ [1,n]{'}'}</div>
                    <div className="text-xs">w = particle position = feature weights</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Comparative advantages */}
            <div className="grid gap-4 md:grid-cols-3">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                <h4 className="font-semibold mb-2" style={{ color: '#3498db' }}>⚙️ GA Advantages</h4>
                <ul className="text-xs space-y-1">
                  <li>• Global search capability</li>
                  <li>• Robust to parameter settings</li>
                  <li>• Handles discrete/continuous variables</li>
                  <li>• No gradient information required</li>
                </ul>
              </div>
              <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-lg p-4 border border-red-200">
                <h4 className="font-semibold mb-2" style={{ color: '#e74c3c' }}>⚡ PSO Advantages</h4>
                <ul className="text-xs space-y-1">
                  <li>• Simple implementation</li>
                  <li>• Fast convergence rate</li>
                  <li>• Few parameters to tune</li>
                  <li>• Memory of best solutions</li>
                </ul>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
                <h4 className="font-semibold mb-2" style={{ color: 'var(--breast-cancer-accent)' }}>🎯 Combined Power</h4>
                <ul className="text-xs space-y-1">
                  <li>• Complementary search strategies</li>
                  <li>• Reduced algorithm bias</li>
                  <li>• Enhanced robustness</li>
                  <li>• Comprehensive feature space exploration</li>
                </ul>
              </div>
            </div>
          </div>
        </Section>

        {/* Pipeline Process - Hybrid Framework and Rationale */}
        <Section sectionId="pipeline-process" sectionTitle="Methodology - Pipeline" backgroundTheme="breast-cancer-bg-4">
          <div className="max-w-7xl mx-auto">
            {/* Detailed Process Workflow */}
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-6 border-2 mb-8" style={{ borderColor: 'var(--breast-cancer-accent)' }}>
              <h3 className="text-xl font-bold text-center mb-4" style={{ color: 'var(--breast-cancer-accent)' }}>
                Complete Research Pipeline
              </h3>

              {/* Initial Steps */}
              <div className="flex justify-center items-center space-x-2 mb-4 overflow-x-auto">
                <div className="bg-blue-100 rounded-lg p-3 shadow-lg text-center min-w-28 border-2 border-blue-400">
                  <div className="text-lg mb-1">📁</div>
                  <div className="text-xs font-bold">1. Collect GEO</div>
                  <div className="text-xs opacity-75">5 datasets</div>
                </div>
                <div className="text-lg text-blue-600">→</div>
                <div className="bg-gray-100 rounded-lg p-3 shadow-lg text-center min-w-28 border-2 border-gray-400">
                  <div className="text-lg mb-1">🏷️</div>
                  <div className="text-xs font-bold">2. Preprocess</div>
                  <div className="text-xs opacity-75">Tag, clean</div>
                </div>
                <div className="text-lg text-blue-600">→</div>
                <div className="bg-purple-100 rounded-lg p-3 shadow-lg text-center min-w-28 border-2 border-purple-400">
                  <div className="text-lg mb-1">⚔️</div>
                  <div className="text-xs font-bold">3. Split Data</div>
                  <div className="text-xs opacity-75">Train: 70%</div>
                  <div className="text-xs opacity-75">Validation: 15% </div>
                  <div className="text-xs opacity-75">Test: 15%</div>
                </div>
                <div className="text-lg text-blue-600">→</div>
                <div className="bg-black-100 rounded-lg p-3 shadow-lg text-center min-w-28 border-2 border-black-400">
                  <div className="text-lg mb-1">🧮</div>
                  <div className="text-xs font-bold">4. Impute missing values</div>
                  <div className="text-xs opacity-75">Mean value from train set</div>
                </div>
                <div className="text-lg text-blue-600">→</div>
                <div className="bg-green-50 rounded-lg p-2 shadow-md text-center min-w-24 border-2 border-green-300">
                  <div className="text-base mb-1">⚖️</div>
                  <div className="text-xs font-bold">5. Balance</div>
                  <div className="text-xs opacity-75">SMOTE</div>
                  <div className="text-xs opacity-75">Min 80 samples</div>
                </div>
              </div>

              {/* Parallel Paths Label */}
              <div className="text-center text-xs font-bold mb-3" style={{ color: 'var(--breast-cancer-accent)' }}>
                ↓ Three Parallel & Independent Paths ↓
              </div>
              {/* Baseline Path - Horizontal */}
              <div className="flex justify-center items-center space-x-2 mb-3 overflow-x-auto">
                <div className="bg-green-100 rounded-lg p-2 shadow-md text-center min-w-24 border-2 border-green-400">
                  <div className="text-base mb-1">📊</div>
                  <div className="text-xs font-bold">6. Baseline</div>
                  <div className="text-xs opacity-75">- All 27,577 features -</div>
                </div>
                <div className="text-sm text-green-600">→</div>
                <div className="bg-green-50 rounded-lg p-2 shadow-md text-center min-w-24 border-2 border-green-300">
                  <div className="text-base mb-1">🤖</div>
                  <div className="text-xs font-bold">6.1. Train</div>
                  <div className="text-xs opacity-75">ML - 4 classes</div>
                </div>
                <div className="text-sm text-green-600">→</div>
                <div className="bg-green-50 rounded-lg p-2 shadow-md text-center min-w-24 border-2 border-green-300">
                  <div className="text-base mb-1">📈</div>
                  <div className="text-xs font-bold">6.2. Validate & Test</div>
                  <div className="text-xs opacity-75">ML - 4 classes</div>
                </div>
                <div className="text-sm text-green-600">→</div>
                <div className="bg-green-50 rounded-lg p-2 shadow-md text-center min-w-24 border-2 border-green-300">
                  <div className="text-base mb-1">📊</div>
                  <div className="text-xs font-bold">6.3. Metrics</div>
                  <div className="text-xs opacity-75">Kappa | Accuracy | ROC-AUC | F1-Score | Sensitivity | Specificity | Precision</div>
                </div>
              </div>
              {/* PSO Path - Horizontal */}
              <div className="flex justify-center items-center space-x-2 mb-2 overflow-x-auto">
                <div className="bg-red-100 rounded-lg p-2 shadow-md text-center min-w-24 border-2 border-red-400">
                  <div className="text-base mb-1">🐝</div>
                  <div className="text-xs font-bold">7. PSO</div>
                  <div className="text-xs opacity-75">6178 features selected</div>
                </div>
                <div className="text-sm text-red-600">→</div>
                <div className="bg-red-50 rounded-lg p-2 shadow-md text-center min-w-24 border-2 border-red-300">
                  <div className="text-base mb-1">🤖</div>
                  <div className="text-xs font-bold">7.1. Train</div>
                  <div className="text-xs opacity-75">ML - 4 classes</div>
                </div>
                <div className="text-sm text-red-600">→</div>
                <div className="bg-red-50 rounded-lg p-2 shadow-md text-center min-w-24 border-2 border-red-300">
                  <div className="text-base mb-1">📈</div>
                  <div className="text-xs font-bold">7.2. Validate & Test</div>
                  <div className="text-xs opacity-75">ML - 4 classes</div>
                </div>
                <div className="text-sm text-red-600">→</div>
                <div className="bg-red-50 rounded-lg p-2 shadow-md text-center min-w-24 border-2 border-red-300">
                  <div className="text-base mb-1">📊</div>
                  <div className="text-xs font-bold">7.3. Metrics</div>
                  <div className="text-xs opacity-75">Kappa | Accuracy | ROC-AUC | F1-Score | Sensitivity | Specificity | Precision</div>
                </div>
              </div>

              {/* GA Path - Horizontal */}
              <div className="flex justify-center items-center space-x-2 mb-2 overflow-x-auto">
                <div className="bg-indigo-100 rounded-lg p-2 shadow-md text-center min-w-24 border-2 border-indigo-400">
                  <div className="text-base mb-1">🧬</div>
                  <div className="text-xs font-bold">8. GA</div>
                  <div className="text-xs opacity-75">5577 features selected</div>
                </div>
                <div className="text-sm text-indigo-600">→</div>
                <div className="bg-indigo-50 rounded-lg p-2 shadow-md text-center min-w-24 border-2 border-indigo-300">
                  <div className="text-base mb-1">🤖</div>
                  <div className="text-xs font-bold">8.1. Train</div>
                  <div className="text-xs opacity-75">ML - 4 classes</div>
                </div>
                <div className="text-sm text-indigo-600">→</div>
                <div className="bg-indigo-50 rounded-lg p-2 shadow-md text-center min-w-24 border-2 border-indigo-300">
                  <div className="text-base mb-1">📈</div>
                  <div className="text-xs font-bold">8.2. Validate & Test</div>
                  <div className="text-xs opacity-75">ML - 4 classes</div>
                </div>
                <div className="text-sm text-indigo-600">→</div>
                <div className="bg-indigo-50 rounded-lg p-2 shadow-md text-center min-w-24 border-2 border-indigo-300">
                  <div className="text-base mb-1">📊</div>
                  <div className="text-xs font-bold">8.3. Metrics</div>
                  <div className="text-xs opacity-75">Kappa | Accuracy | ROC-AUC | F1-Score | Sensitivity | Specificity | Precision</div>
                </div>
              </div>

              {/* Convergence Label */}
              <div className="text-center text-xs font-bold mb-3" style={{ color: 'var(--breast-cancer-accent)' }}>
                ↓ All Paths Converge ↓
              </div>

              {/* Final Steps */}
              <div className="flex justify-center items-center space-x-2 overflow-x-auto">
                <div className="bg-orange-100 rounded-lg p-3 shadow-lg text-center min-w-32 border-2 border-orange-400">
                  <div className="text-lg mb-1">🔍</div>
                  <div className="text-xs font-bold">9. Compare Results</div>
                  <div className="text-xs opacity-75">Random Forest | Gradiente Boosting | Ada Boosting | XGBoost | Light GBM</div>
                </div>
                <div className="text-lg" style={{ color: 'var(--breast-cancer-accent)' }}>→</div>
                <div className="bg-pink-100 rounded-lg p-3 shadow-lg text-center min-w-32 border-2 border-pink-400">
                  <div className="text-lg mb-1">🎯</div>
                  <div className="text-xs font-bold">10. Best Model</div>
                  <div className="text-xs opacity-75"><strong>Predict:</strong> BRCA(%)</div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Tree Methods - Why focus on tree-based algorithms */}
        <Section sectionId="tree-methods" sectionTitle="Methodology - Classification" backgroundTheme="breast-cancer-bg-2">
          <div className="max-w-7xl mx-auto">
            {/* Top section with models and interpretability */}
            <div className="grid gap-6 lg:grid-cols-2 mb-6">
              {/* Left: ML Models */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-center" style={{ color: 'var(--breast-cancer-accent)' }}>
                  5 Tree-Based Algorithms
                </h3>
                <div className="grid gap-3 grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <div className="bg-white rounded-lg p-3 shadow-lg text-center">
                    <div className="w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: '#2ecc71' }}>
                      <span className="text-white font-bold text-sm">RF</span>
                    </div>
                    <h4 className="font-semibold mb-1 text-sm" style={{ color: '#2ecc71' }}>Random Forest</h4>
                    <ul className="text-xs space-y-0">
                      <li>• Gini importance</li>
                      <li>• Ensemble robustness</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-lg text-center">
                    <div className="w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: '#3498db' }}>
                      <span className="text-white font-bold text-sm">XG</span>
                    </div>
                    <h4 className="font-semibold mb-1 text-sm" style={{ color: '#3498db' }}>XGBoost</h4>
                    <ul className="text-xs space-y-0">
                      <li>• Gain-based importance</li>
                      <li>• High performance</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-lg text-center">
                    <div className="w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: '#9b59b6' }}>
                      <span className="text-white font-bold text-sm">LG</span>
                    </div>
                    <h4 className="font-semibold mb-1 text-sm" style={{ color: '#9b59b6' }}>LightGBM</h4>
                    <ul className="text-xs space-y-0">
                      <li>• Fast training</li>
                      <li>• Memory efficient</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-lg text-center">
                    <div className="w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: '#f39c12' }}>
                      <span className="text-white font-bold text-sm">GB</span>
                    </div>
                    <h4 className="font-semibold mb-1 text-sm" style={{ color: '#f39c12' }}>Gradient Boosting</h4>
                    <ul className="text-xs space-y-0">
                      <li>• Sequential learning</li>
                      <li>• Error correction</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-lg text-center col-span-2 lg:col-span-1 xl:col-span-2">
                    <div className="w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: '#e74c3c' }}>
                      <span className="text-white font-bold text-sm">AB</span>
                    </div>
                    <h4 className="font-semibold mb-1 text-sm" style={{ color: '#e74c3c' }}>AdaBoost</h4>
                    <ul className="text-xs space-y-0">
                      <li>• Adaptive learning • Simple interpretation</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Right: Interpretability */}
              <div className="bg-white rounded-lg p-5 shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-center" style={{ color: 'var(--breast-cancer-accent)' }}>
                  Why Decision Trees for Interpretability?
                </h3>
                <div className="space-y-3">
                  <div className="p-3 border-l-4 border-green-400 bg-green-50">
                    <h4 className="font-semibold mb-1 text-sm" style={{ color: '#2ecc71' }}>🌳 Biological Interpretability</h4>
                    <ul className="text-xs space-y-1">
                      <li>• <strong>Decision paths</strong> traced to biological mechanisms</li>
                      <li>• <strong>Feature importance</strong> identifies key CpG sites</li>
                      <li>• <strong>Threshold values</strong> provide clinical boundaries</li>
                    </ul>
                  </div>
                  <div className="p-3 border-l-4 border-purple-400 bg-purple-50">
                    <h4 className="font-semibold mb-1 text-sm" style={{ color: '#9b59b6' }}>🏥 Clinical Applicability</h4>
                    <ul className="text-xs space-y-1">
                      <li>• <strong>Explainable predictions</strong> for medical professionals</li>
                      <li>• <strong>Rule-based decisions</strong> easy to implement clinically</li>
                      <li>• <strong>Regulatory compliance</strong> through transparency</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-green-50 to-purple-50 rounded border">
                    <h4 className="font-semibold mb-1 text-sm" style={{ color: 'var(--breast-cancer-accent)' }}>🎯 vs. Black-Box Models</h4>
                    <p className="text-xs">
                      Unlike deep learning, tree methods provide <strong>transparent decision-making</strong>
                      essential for identifying BRCA1-related CpG islands.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom section with key advantages */}
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-5 border-2" style={{ borderColor: 'var(--breast-cancer-accent)' }}>
              <h3 className="text-lg font-bold text-center mb-3" style={{ color: 'var(--breast-cancer-accent)' }}>
                Tree-Based Advantages for Epigenetic Analysis
              </h3>
              <div className="grid md:grid-cols-4 gap-4 text-center">
                <div className="p-3">
                  <div className="text-2xl mb-1">🔍</div>
                  <div className="text-sm font-semibold">Feature Importance</div>
                  <div className="text-xs text-gray-600">Direct CpG site ranking</div>
                </div>
                <div className="p-3">
                  <div className="text-2xl mb-1">🌲</div>
                  <div className="text-sm font-semibold">Decision Paths</div>
                  <div className="text-xs text-gray-600">Traceable to biology</div>
                </div>
                <div className="p-3">
                  <div className="text-2xl mb-1">📊</div>
                  <div className="text-sm font-semibold">Clinical Thresholds</div>
                  <div className="text-xs text-gray-600">Actionable boundaries</div>
                </div>
                <div className="p-3">
                  <div className="text-2xl mb-1">✅</div>
                  <div className="text-sm font-semibold">Regulatory Ready</div>
                  <div className="text-xs text-gray-600">Transparent predictions</div>
                </div>
              </div>
            </div>
          </div>
        </Section>


        {/* Results Part 1 - ML Models Performance by Dataset */}
        <Section sectionId="results-models" sectionTitle="Results - ML Models Performance" backgroundTheme="breast-cancer-bg-4">
          <div className="max-w-7xl mx-auto h-full flex flex-col">
            <div className="text-center mb-2 flex-shrink-0">
              <h3 className="text-2xl font-bold mb-3" style={{ color: 'var(--breast-cancer-accent)' }}>
                ML Models Performance by Dataset
              </h3>
              <p className="text-base opacity-80 max-w-4xl mx-auto">
                Each chart shows model performance with GA, PSO, and no optimization.
              </p>
            </div>
            <div className="flex-1 min-h-0">
              <ModelPerformanceCharts />
            </div>
          </div>
        </Section>

        {/* Results Part 2 - Optimizers Performance Analysis */}
        <Section sectionId="results-optimizers" sectionTitle="Results - Optimizers Performance" backgroundTheme="breast-cancer-bg-5">
          <div className="max-w-7xl mx-auto h-full flex flex-col">
            <div className="text-center mb-4 flex-shrink-0">
              <h3 className="text-2xl font-bold mb-3" style={{ color: 'var(--breast-cancer-accent)' }}>
                Optimization Strategies Comparison
              </h3>
              <p className="text-base opacity-80 max-w-4xl mx-auto">
                Performance comparison between Genetic Algorithm (GA), Particle Swarm Optimization (PSO), and no optimization (ALL features).
                Best performing model for each strategy is highlighted.
              </p>
            </div>
            <div className="flex-1 min-h-0">
              <OptimizerPerformanceCharts />
            </div>
          </div>
        </Section>

        {/* Conclusion - Findings and future work */}
        <Section sectionId="conclusion" sectionTitle="Conclusion" backgroundTheme="breast-cancer-bg-5">
          <div className="max-w-7xl mx-auto h-full flex flex-col justify-center">
            {/* Main conclusions - Key Findings */}
            <div className="bg-white rounded-lg p-6 shadow-lg mb-6">
              <h3 className="text-xl font-bold text-center mb-4" style={{ color: 'var(--breast-cancer-accent)' }}>
                Multi-Dataset Study: Key Findings
              </h3>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div className="p-3">
                  <div className="text-2xl font-bold mb-1" style={{ color: 'var(--breast-cancer-accent)' }}>100%</div>
                  <div className="text-xs">PRE-BRCA vs BRCA Classification</div>
                  <div className="text-xs text-gray-500">Perfect separation achieved</div>
                </div>
                <div className="p-3">
                  <div className="text-2xl font-bold mb-1" style={{ color: 'var(--breast-cancer-accent)' }}>94%</div>
                  <div className="text-xs">HEALTHY vs BRCA (Best)</div>
                  <div className="text-xs text-gray-500">With LightGBM + GA/PSO</div>
                </div>
                <div className="p-3">
                  <div className="text-2xl font-bold mb-1" style={{ color: 'var(--breast-cancer-accent)' }}>80%</div>
                  <div className="text-xs">3-Class Challenge</div>
                  <div className="text-xs text-gray-500">HEALTHY-MT-WT-BRCA</div>
                </div>
                <div className="p-3">
                  <div className="text-2xl font-bold mb-1" style={{ color: 'var(--breast-cancer-accent)' }}>9</div>
                  <div className="text-xs">Dataset Configurations</div>
                  <div className="text-xs text-gray-500">Comprehensive evaluation</div>
                </div>
              </div>
            </div>

            <div className="grid gap-6 grid-cols-3">
              {/* Column 1: Key Contributions */}
              <div className="bg-white rounded-lg p-5 shadow-lg">
                <h3 className="text-lg font-bold mb-3 text-center" style={{ color: 'var(--breast-cancer-accent)' }}>
                  Key Contributions
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span style={{ color: 'var(--breast-cancer-accent)' }}>✓</span>
                    <strong>Multi-dataset</strong> comparative framework
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: 'var(--breast-cancer-accent)' }}>✓</span>
                    <strong>9 dataset configurations</strong> systematically evaluated
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: 'var(--breast-cancer-accent)' }}>✓</span>
                    <strong>GA vs PSO</strong> metaheuristic comparison
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: 'var(--breast-cancer-accent)' }}>✓</span>
                    <strong>Mutation-based</strong> subgroup analysis
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: 'var(--breast-cancer-accent)' }}>✓</span>
                    <strong>Pre-diagnostic</strong> classification insights
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: 'var(--breast-cancer-accent)' }}>✓</span>
                    <strong>Clinical strategy</strong> optimization guidance
                  </li>
                </ul>
              </div>

              {/* Column 2: Future Work */}
              <div className="bg-white rounded-lg p-5 shadow-lg">
                <h3 className="text-lg font-bold mb-3 text-center" style={{ color: 'var(--breast-cancer-accent)' }}>
                  Future Directions
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span style={{ color: 'var(--breast-cancer-accent)' }}>→</span>
                    <strong>High-density arrays</strong> (EPIC 850K)
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: 'var(--breast-cancer-accent)' }}>→</span>
                    <strong>Demographic</strong> confounders study
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: 'var(--breast-cancer-accent)' }}>→</span>
                    <strong>Clinical validation</strong> trials
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: 'var(--breast-cancer-accent)' }}>→</span>
                    <strong>Multi-omics</strong> integration
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: 'var(--breast-cancer-accent)' }}>→</span>
                    <strong>Diagnostic tools</strong> development
                  </li>
                </ul>
              </div>

              {/* Column 3: Clinical Impact */}
              <div className="bg-white rounded-lg p-5 shadow-lg">
                <h3 className="text-lg font-bold mb-3 text-center" style={{ color: 'var(--breast-cancer-accent)' }}>
                  Clinical Impact
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span style={{ color: 'var(--breast-cancer-accent)' }}>•</span>
                    <strong>Early detection</strong> capability
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: 'var(--breast-cancer-accent)' }}>•</span>
                    <strong>Risk stratification</strong> for pre-diagnostic cases
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: 'var(--breast-cancer-accent)' }}>•</span>
                    <strong>Cost reduction</strong> via screening
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: 'var(--breast-cancer-accent)' }}>•</span>
                    <strong>Personalized medicine</strong> advancement
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: 'var(--breast-cancer-accent)' }}>•</span>
                    <strong>Reproducible pathway</strong> for biomarkers
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom summary */}
            <div className="text-center mt-6 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg border-2" style={{ borderColor: 'var(--breast-cancer-accent)' }}>
              <p className="text-base font-medium" style={{ color: 'var(--breast-cancer-accent)' }}>
                Mamo.IA offers a <strong>reproducible pathway</strong> for translating epigenetic signatures into <strong>non-invasive diagnostic methods</strong>
              </p>
            </div>
          </div>
        </Section>

        {/* Acknowledgments slide */}
        <Section sectionId="acknowledgments" sectionTitle="" backgroundTheme="breast-cancer-bg-4">
          <div className="flex-col justify-center items-center text-center ">
            <div className="mb">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--breast-cancer-accent)' }}>
                <span className="text-4xl text-white">🙏</span>
              </div>
            </div>

            <h1 className="text-5xl font-bold mb-4" style={{ color: 'var(--breast-cancer-text)' }}>
              Thank You
            </h1>

            <div className="space-y-4 text-lg" style={{ color: 'var(--breast-cancer-text)' }}>
              <p className="font-medium text-2xl">
                Questions and Discussion
              </p>

              <div className="mt-6 space-y-3">
                <div>
                  <p className="font-semibold text-xl">Leandro C. Author & Wellingthon P. Researcher</p>
                  <p className="opacity-80 text-lg">Universidade de Pernambuco</p>
                </div>
              </div>
            </div>

            <div className="mt-10 flex justify-center items-center gap-4 flex-wrap">
              <div className="px-6 py-2 rounded-full text-base font-medium" style={{ backgroundColor: 'rgba(255, 107, 157, 0.2)', color: 'var(--breast-cancer-accent)' }}>
                Mamo.IA Framework
              </div>
              <div className="px-6 py-2 rounded-full text-base font-medium" style={{ backgroundColor: 'rgba(255, 107, 157, 0.2)', color: 'var(--breast-cancer-accent)' }}>
                Epigenetic Biomarkers
              </div>
              <div className="px-6 py-2 rounded-full text-base font-medium" style={{ backgroundColor: 'rgba(255, 107, 157, 0.2)', color: 'var(--breast-cancer-accent)' }}>
                GA & PSO Optimization
              </div>
            </div>

            <div className="mt-8 text-base">
              <p><strong>MAMO.IA:</strong> Breast Cancer Detection using Machine Learning and Bio-inspired Optimization</p>
              <img src="src/assets/logo-upe.png" alt="UPE Logo" className="mt-10 h-24 mx-auto" />
              <p className="mt-3">{new Date().getFullYear()}</p>
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
