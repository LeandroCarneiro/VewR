import { Navigation } from './components/Navigation'
import { Section } from './components/Section'
import { SlideControls } from './components/SlideControls'
import { ModelPerformanceCharts } from './components/charts/ModelPerformanceCharts'
import { OptimizerPerformanceCharts } from './components/charts/OptimizerPerformanceCharts'

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
        <Section sectionId="home" backgroundTheme="breast-cancer-bg-1">
          <div className="flex min-h-screen flex-col items-center justify-center gap-6 text-center px-8">
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--breast-cancer-accent)' }}>
                <span className="text-4xl text-white">🎗️</span>
              </div>
            </div>
            <h1 className="mx-auto max-w-4xl text-balance text-4xl font-bold leading-tight" style={{ color: 'var(--breast-cancer-text)' }}>
              MAMO.IA: Breast Cancer Detection using Machine Learning and Bio-inspired Optimization
            </h1>
            <div className="mt-8 text-xl" style={{ color: 'var(--breast-cancer-text)' }}>
              <p className="font-medium"><strong>Orientador:</strong> Wellington Pinheiro</p>
              <p className="font-small"><strong>Dicente:</strong> Leandro Carneiro</p>
              <img src="src/assets/logo-upe.png" alt="UPE Logo" className="mt-8 h-20 mx-auto" />
              <p className="text-sm opacity-70 mt-4">{new Date().getFullYear()}</p>
            </div>
          </div>
        </Section>

        {/* Introduction - Background and problem statement */}
        <Section sectionId="introduction" sectionTitle="Introduction" backgroundTheme="breast-cancer-bg-2">
          <div className="max-w-7xl mx-auto">
            <div className="grid gap-6 md:grid-cols-2 mb-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold" style={{ color: 'var(--breast-cancer-accent)' }}>
                  Multi-Dataset Comparative Study
                </h3>
                <p className="text-lg leading-relaxed">
                  Our approach evaluates multiple <strong>class combinations</strong> to understand the discriminatory power of DNA methylation patterns.
                  This research presents a methodology usign machine learning to dignostic breast in early stages. This study comperes
                  <strong> 9 different dataset configurations</strong> for BRCA classification.
                </p>
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-4 border-2" style={{ borderColor: 'var(--breast-cancer-accent)' }}>
                  <h4 className="font-semibold mb-2" style={{ color: 'var(--breast-cancer-accent)' }}>Key Innovation:</h4>
                  <p className="text-sm">
                    <strong>Systematic evaluation</strong> of how different class combinations affect
                    classification performance, providing insights into optimal grouping strategies for clinical applications.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold" style={{ color: 'var(--breast-cancer-accent)' }}>
                  Classification Scenarios
                </h3>
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <div className="text-sm space-y-1">
                    <div>• <strong>HEALTHY-MT-WT-BRCA:</strong> 3-class (Healthy with/without mutation + Cancer)</div>
                    <div>• <strong>HEALTHY-WT-BRCA:</strong> 2-class (Healthy without mutation + Cancer)</div>
                    <div>• <strong>HEALTHY-MT-BRCA:</strong> 2-class (Healthy with mutation + Cancer)</div>
                    <div>• <strong>HEALTHY-BRCA:</strong> 2-class (All healthy + Cancer)</div>
                    <div>• <strong>HEALTHY-PRE-BRCA:</strong> 2-class (Healthy + Pre-diagnostic)</div>
                    <div>• <strong>HEALTHY-PRE-BRCA-BRCA:</strong> 3-class (Healthy + Pre-diagnostic + Cancer)</div>
                    <div>• <strong>PRE-BRCA-BRCA:</strong> 2-class (Pre-diagnostic + Cancer)</div>
                    <div>• <strong>PRE-BRCA-BRCA-MT:</strong> 2-class (Pre-diagnostic + Cancer with mutation)</div>
                    <div>• <strong>PRE-BRCA-BRCA-WT:</strong> 2-class (Pre-diagnostic + Cancer without mutation)</div>
                  </div>
                </div>

              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg mt-8">
              <h3 className="text-2xl font-bold mb-2 text-center" style={{ color: 'var(--breast-cancer-accent)' }}>
                Population Cohorts
              </h3>
              <p className="text-sm text-gray-600 text-center mb-4">Five populations used in this study and their sample counts</p>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {/* Healthy with mutation */}
                <div className="p-4 rounded-lg border shadow-sm">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: 'rgba(46, 204, 113, 0.15)', border: '2px solid #2ecc71' }}>
                      <span className="text-xl">🧬</span>
                    </div>
                    <div className="text-sm font-semibold">Healthy (with mutation)</div>
                    <div className="text-xs text-gray-600">n = <strong>22</strong></div>
                  </div>
                </div>
                {/* Healthy without mutation */}
                <div className="p-4 rounded-lg border shadow-sm">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: 'rgba(46, 204, 113, 0.15)', border: '2px solid #2ecc71' }}>
                      <span className="text-xl">✅</span>
                    </div>
                    <div className="text-sm font-semibold">Healthy (without mutation)</div>
                    <div className="text-xs text-gray-600">n = <strong>57</strong></div>
                  </div>
                </div>
                {/* Pre-BRCA */}
                <div className="p-4 rounded-lg border shadow-sm">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: 'rgba(241, 196, 15, 0.15)', border: '2px solid #f1c40f' }}>
                      <span className="text-xl">⏳</span>
                    </div>
                    <div className="text-sm font-semibold">PRE-BRCA</div>
                    <div className="text-xs text-gray-600">n = <strong>134</strong></div>
                    <div className="text-[10px] text-gray-500 mt-1">Developed cancer within 5 years</div>
                  </div>
                </div>
                {/* BRCA with mutation */}
                <div className="p-4 rounded-lg border shadow-sm">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: 'rgba(231, 76, 60, 0.15)', border: '2px solid #e74c3c' }}>
                      <span className="text-xl">🧬</span>
                    </div>
                    <div className="text-sm font-semibold">BRCA (with mutation)</div>
                    <div className="text-xs text-gray-600">n = <strong>50</strong></div>
                  </div>
                </div>
                {/* BRCA without mutation */}
                <div className="p-4 rounded-lg border shadow-sm">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: 'rgba(231, 76, 60, 0.15)', border: '2px solid #e74c3c' }}>
                      <span className="text-xl">🎗️</span>
                    </div>
                    <div className="text-sm font-semibold">BRCA (without mutation)</div>
                    <div className="text-xs text-gray-600">n = <strong>15</strong></div>
                  </div>
                </div>
              </div>
                <div className="mt-4">
                <h4 className="font-semibold text-sm text-gray-600 mb-2">Additional Samples:</h4>
                <div className="text-sm">• Healthy (mutation status unknown): <strong>512</strong></div>
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

        {/* Metaheuristics - Why and how they work */}
        <Section sectionId="metaheuristics" sectionTitle="Metaheuristic Algorithms" backgroundTheme="breast-cancer-bg-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--breast-cancer-accent)' }}>
              </h3>
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <p className="text-lg mb-4">
                  <strong>27,578 CpG sites</strong> vs. <strong>790 samples</strong><br />
                  High-dimensional challenge
                </p>
                <div className="grid md:grid-cols-2 gap-6 text-left">
                  <div>
                    <h4 className="font-semibold mb-2" style={{ color: 'var(--breast-cancer-accent)' }}>Challenges:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Combinatorial feature selection</li>
                      <li>• Overfitting risks</li>
                      <li>• Computational complexity</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2" style={{ color: 'var(--breast-cancer-accent)' }}>Solutions:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Global optimization capability</li>
                      <li>• Feature subset optimization</li>
                      <li>• Biological interpretability preserved</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center" style={{ backgroundColor: '#3498db' }}>
                    <span className="text-2xl text-white">🧬</span>
                  </div>
                  <h3 className="text-xl font-bold mt-2" style={{ color: '#3498db' }}>Genetic Algorithm (GA)</h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div>
                    <strong>Individual Representation:</strong> 
                    <div className="ml-4 mt-2 text-xs font-mono bg-gray-100 p-2 rounded">
                      I = [w₁, w₂, ..., wₙ] where wᵢ ∈ [0,1]<br/> 
                      for all i in [1,...,n_features]
                    </div>
                  </div>
                  <div>
                    <strong>Population:</strong> 
                    <div className="ml-4 mt-2 text-xs font-mono bg-gray-100 p-2 rounded">
                      P(t) = {'{'}{`I1, I2, ..., Ip`}{'}'} where p = pop_size
                    </div>
                  </div>
                  <div>
                    <strong>Fitness:</strong> 
                    <div className="ml-4 mt-2 text-xs font-mono bg-gray-100 p-2 rounded">
                      f(I) = 1 - (1/5) × Σᵢ₌₁⁵ κ(X ⊙ I, Y)
                    </div>
                  </div>
                  <div>
                    <strong>Where:</strong>
                    <ul className="ml-4 mt-2 space-y-1">
                      <li>• κ is Cohen's Kappa score</li>
                      <li>• ⊙ is element-wise multiplication</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center" style={{ backgroundColor: '#e74c3c' }}>
                    <span className="text-2xl text-white">🐝</span>
                  </div>
                  <h3 className="text-xl font-bold mt-2" style={{ color: '#e74c3c' }}>Particle Swarm Optimization (PSO)</h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div>
                    <strong>Inspiration:</strong> Social behavior of bird flocks
                  </div>
                  <div>
                    <strong>Objective Function:</strong>
                    <div className="ml-4 mt-2 text-xs font-mono bg-gray-100 p-2 rounded">
                      f(w) = 1 - mean([cohen_kappa(est, X × w, Y) for cv in 5 folds])
                    </div>
                  </div>
                    <div>
                    <strong>Where:</strong>
                    <ul className="ml-4 mt-2 space-y-1 text-xs">
                      <li>• w = particle position = feature weights [w₁, w₂, ..., wₙ]</li>
                      <li>• X × w = feature matrix with weighted features</li>
                    </ul>
                    </div>
                  <div>
                    <strong>Feature Selection:</strong>
                    <div className="ml-4 mt-2 text-xs font-mono bg-gray-100 p-2 rounded text-center">
                      f(w) = {'{'} j | w[j] ≥ τ, j ∈ [1,n] {'}'} where τ is threshold
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Tree Methods - Why focus on tree-based algorithms */}
        <Section sectionId="tree-methods" sectionTitle="Why Tree-Based Methods?" backgroundTheme="breast-cancer-bg-2">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--breast-cancer-accent)' }}>
                Interpretable Machine Learning for Epigenetics
              </h3>
              <div className="bg-white rounded-lg p-6 shadow-lg mb-6">
                <p className="text-lg">
                  <strong>Biological interpretability</strong> is critical for establishing plausible links between
                  computational predictions and <strong>mechanistic understanding</strong> of disease processes.
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-5">
              <div className="bg-white rounded-lg p-4 shadow-lg text-center">
                <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: '#2ecc71' }}>
                  <span className="text-white font-bold">RF</span>
                </div>
                <h4 className="font-semibold mb-2" style={{ color: '#2ecc71' }}>Random Forest</h4>
                <ul className="text-xs space-y-1">
                  <li>• <strong>Gini importance</strong></li>
                  <li>• Ensemble of trees</li>
                  <li>• Robust to overfitting</li>
                  <li>• Feature ranking</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-lg text-center">
                <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: '#3498db' }}>
                  <span className="text-white font-bold">XG</span>
                </div>
                <h4 className="font-semibold mb-2" style={{ color: '#3498db' }}>XGBoost</h4>
                <ul className="text-xs space-y-1">
                  <li>• <strong>Gain-based</strong> importance</li>
                  <li>• Gradient boosting</li>
                  <li>• High performance</li>
                  <li>• Regularization</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-lg text-center">
                <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: '#9b59b6' }}>
                  <span className="text-white font-bold">LG</span>
                </div>
                <h4 className="font-semibold mb-2" style={{ color: '#9b59b6' }}>LightGBM</h4>
                <ul className="text-xs space-y-1">
                  <li>• <strong>Fast training</strong></li>
                  <li>• Memory efficient</li>
                  <li>• Leaf-wise growth</li>
                  <li>• High accuracy</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-lg text-center">
                <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: '#f39c12' }}>
                  <span className="text-white font-bold">GB</span>
                </div>
                <h4 className="font-semibold mb-2" style={{ color: '#f39c12' }}>Gradient Boosting</h4>
                <ul className="text-xs space-y-1">
                  <li>• <strong>Sequential</strong> learning</li>
                  <li>• Error correction</li>
                  <li>• Interpretable splits</li>
                  <li>• Feature importance</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-lg text-center">
                <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: '#e74c3c' }}>
                  <span className="text-white font-bold">AB</span>
                </div>
                <h4 className="font-semibold mb-2" style={{ color: '#e74c3c' }}>AdaBoost</h4>
                <ul className="text-xs space-y-1">
                  <li>• <strong>Adaptive</strong> learning</li>
                  <li>• Weak learner focus</li>
                  <li>• Error weighting</li>
                  <li>• Simple interpretation</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-6 mt-8 border-2" style={{ borderColor: 'var(--breast-cancer-accent)' }}>
              <h3 className="text-xl font-bold mb-3 text-center" style={{ color: 'var(--breast-cancer-accent)' }}>
                Tree Methods vs. Black-Box Approaches
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2" style={{ color: 'var(--breast-cancer-accent)' }}>✓ Tree-Based Advantages:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Feature importance</strong> scores readily available</li>
                    <li>• <strong>Decision paths</strong> can be traced and interpreted</li>
                    <li>• <strong>Biological relevance</strong> of splits can be evaluated</li>
                    <li>• <strong>Regulatory interactions</strong> in high-dimensional data</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2" style={{ color: 'var(--breast-cancer-accent)' }}>⚠ Deep Learning Limitations:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Black-box</strong> nature obscures biological insights</li>
                    <li>• <strong>Feature interactions</strong> difficult to interpret</li>
                    <li>• <strong>Overfitting risk</strong> with limited sample sizes</li>
                    <li>• <strong>Clinical adoption</strong> requires explainability</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Methodology - Research approach and methods */}
        <Section sectionId="methodology" sectionTitle="Methodology" backgroundTheme="breast-cancer-bg-3">
          <div className="max-w-7xl mx-auto">
            {/* Multi-Dataset Comparison Strategy */}
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--breast-cancer-accent)' }}>
                Comprehensive Multi-Dataset Comparison Strategy
              </h3>
              <p className="text-lg max-w-5xl mx-auto mb-6">
                Our methodology systematically evaluates <strong>9 different dataset configurations</strong> to identify
                optimal classification strategies for various clinical scenarios.
              </p>
            </div>

            {/* Dataset Configuration Matrix */}
            <div className="bg-white rounded-lg p-6 shadow-lg mb-6">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="border rounded-lg p-4">
                  <h5 className="font-semibold mb-2" style={{ color: '#2ecc71' }}>Binary Classifications</h5>
                  <div className="text-sm space-y-1">
                  <div>• HEALTHY-WT-BRCA</div>
                  <div>• HEALTHY-MT-BRCA</div>
                  <div>• HEALTHY-BRCA</div>
                  <div>• HEALTHY-PRE-BRCA</div>
                  <div>• PRE-BRCA-BRCA</div>
                  <div>• PRE-BRCA-BRCA-MT</div>
                  <div>• PRE-BRCA-BRCA-WT</div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h5 className="font-semibold mb-2" style={{ color: '#e74c3c' }}>Multi-Class Classifications</h5>
                  <div className="text-sm space-y-1">
                  <div>• HEALTHY-MT-WT-BRCA</div>
                  <div>• HEALTHY-PRE-BRCA-BRCA</div>
                  </div>
                  <div className="mt-4 p-2 bg-red-50 rounded">
                  <div className="text-xs">These represent the most challenging scenarios with 3 distinct classes</div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h5 className="font-semibold mb-2" style={{ color: '#3498db' }}>Evaluation Framework</h5>
                  <div className="text-sm space-y-1">
                  <div>• <strong>2</strong> Metaheuristics (GA, PSO)</div>
                  <div>• <strong>5</strong> ML Algorithms</div>
                  <div>• <strong>3</strong> Feature Selection strategies</div>
                  <div>• <strong>8</strong> Performance metrics</div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div>
                  <h4 className="font-semibold mb-2" style={{ color: 'var(--breast-cancer-accent)' }}>Platform</h4>
                  <p className="text-sm">Illumina Human Methylation 27 BeadChip</p>
                  <p className="text-xs text-gray-600"><strong>27,578 CpG sites</strong></p>
                  </div>
                  <div className="mt-4">
                  <h4 className="font-semibold mb-2" style={{ color: 'var(--breast-cancer-accent)' }}>Data Sources</h4>
                  <p className="text-sm">Gene Expression Omnibus (GEO)</p>
                  <p className="text-xs text-gray-600">GSE58119, GSE58045, GSE57285, GSE41037, GSE32396</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hybrid Methodology Framework */}
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-6 border-2" style={{ borderColor: 'var(--breast-cancer-accent)' }}>
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

              <br />
              <h3 className="text-xl font-bold text-center mb-4" style={{ color: 'var(--breast-cancer-accent)' }}>
              Process Workflow
              </h3>
              <div className="flex justify-center items-center space-x-3 overflow-x-auto">
              <div className="bg-white rounded-lg p-3 shadow-lg text-center min-w-24">
                <div className="text-xl mb-1">📁</div>
                <div className="text-xs font-semibold">Data Collection</div>
                <div className="text-xs opacity-75">711 samples</div>
              </div>
              <div className="text-lg" style={{ color: 'var(--breast-cancer-accent)' }}>→</div>

              <div className="bg-white rounded-lg p-3 shadow-lg text-center min-w-24">
                <div className="text-xl mb-1">⚔️</div>
                <div className="text-xs font-semibold">Data Split</div>
                <div className="text-xs opacity-75">70/15/15%</div>
              </div>
              <div className="text-lg" style={{ color: 'var(--breast-cancer-accent)' }}>→</div>

              <div className="bg-white rounded-lg p-3 shadow-lg text-center min-w-24">
                <div className="text-xl mb-1">⚖️</div>
                <div className="text-xs font-semibold">SMOTE</div>
                <div className="text-xs opacity-75">Balance</div>
              </div>
              <div className="text-lg" style={{ color: 'var(--breast-cancer-accent)' }}>→</div>

              <div className="bg-white rounded-lg p-3 shadow-lg text-center min-w-24">
                <div className="text-xl mb-1">🔍</div>
                <div className="text-xs font-semibold">Feature Selection</div>
                <div className="text-xs opacity-75">GA & PSO</div>
              </div>
              <div className="text-lg" style={{ color: 'var(--breast-cancer-accent)' }}>→</div>

              <div className="bg-white rounded-lg p-3 shadow-lg text-center min-w-24">
                <div className="text-xl mb-1">🎯</div>
                <div className="text-xs font-semibold">Classification</div>
                <div className="text-xs opacity-75">5 ML models</div>
              </div>
              </div>
            </div>

            {/* Process Flow */}
            <div className="mt-6">
              
            </div>
          </div>
        </Section>

        {/* Classification Strategy - What accurate models enable per dataset */}
        <Section sectionId="classification-strategy" sectionTitle="Classification Strategy" backgroundTheme="breast-cancer-bg-2">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--breast-cancer-accent)' }}>
                What accurate models enable per dataset
              </h3>
              <p className="text-base max-w-4xl mx-auto">
                For each dataset combination below, if the model is accurate it unlocks concrete clinical and research actions.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {/* 1 */}
              <div className="p-4 rounded-lg bg-white shadow-lg border" style={{ borderColor: 'var(--breast-cancer-accent)' }}>
                <div className="font-semibold text-sm">HEALTHY-MT-WT-BRCA</div>
                <div className="text-xs text-gray-600 mb-2">3-class (Healthy with/without mutation + Cancer)</div>
                <ul className="text-xs space-y-1 text-gray-700">
                  <li>• Route carriers to enhanced surveillance; fast-track BRCA to diagnostics.</li>
                  <li>• Allocate resources by risk strata across three groups.</li>
                </ul>
              </div>
              {/* 2 */}
              <div className="p-4 rounded-lg bg-white shadow-lg border" style={{ borderColor: 'var(--breast-cancer-accent)' }}>
                <div className="font-semibold text-sm">HEALTHY-WT-BRCA</div>
                <div className="text-xs text-gray-600 mb-2">2-class (Healthy without mutation + Cancer)</div>
                <ul className="text-xs space-y-1 text-gray-700">
                  <li>• Population triage before imaging to reduce unnecessary mammograms.</li>
                  <li>• Fast-track positives to diagnostic imaging.</li>
                </ul>
              </div>
              {/* 3 */}
              <div className="p-4 rounded-lg bg-white shadow-lg border" style={{ borderColor: 'var(--breast-cancer-accent)' }}>
                <div className="font-semibold text-sm">HEALTHY-MT-BRCA</div>
                <div className="text-xs text-gray-600 mb-2">2-class (Healthy with mutation + Cancer)</div>
                <ul className="text-xs space-y-1 text-gray-700">
                  <li>• Early detection in mutation carriers with immediate referral.</li>
                  <li>• Monitor carriers for emergent malignant signatures.</li>
                </ul>
              </div>
              {/* 4 */}
              <div className="p-4 rounded-lg bg-white shadow-lg border" style={{ borderColor: 'var(--breast-cancer-accent)' }}>
                <div className="font-semibold text-sm">HEALTHY-BRCA</div>
                <div className="text-xs text-gray-600 mb-2">2-class (All healthy + Cancer)</div>
                <ul className="text-xs space-y-1 text-gray-700">
                  <li>• Broad blood-based screening to complement mammography.</li>
                  <li>• Non-invasive recurrence monitoring post-treatment.</li>
                </ul>
              </div>
              {/* 5 */}
              <div className="p-4 rounded-lg bg-white shadow-lg border" style={{ borderColor: 'var(--breast-cancer-accent)' }}>
                <div className="font-semibold text-sm">HEALTHY-PRE-BRCA</div>
                <div className="text-xs text-gray-600 mb-2">2-class (Healthy + Pre-diagnostic)</div>
                <ul className="text-xs space-y-1 text-gray-700">
                  <li>• 5-year risk stratification and intensified follow-up.</li>
                  <li>• Enrollment into prevention and lifestyle programs.</li>
                </ul>
              </div>
              {/* 6 */}
              <div className="p-4 rounded-lg bg-white shadow-lg border" style={{ borderColor: 'var(--breast-cancer-accent)' }}>
                <div className="font-semibold text-sm">HEALTHY-PRE-BRCA-BRCA</div>
                <div className="text-xs text-gray-600 mb-2">3-class (Healthy + Pre-diagnostic + Cancer)</div>
                <ul className="text-xs space-y-1 text-gray-700">
                  <li>• Stage-aware care: routine screening, surveillance, or urgent oncology.</li>
                  <li>• Prioritize clinical-trial recruitment by stage.</li>
                </ul>
              </div>
              {/* 7 */}
              <div className="p-4 rounded-lg bg-white shadow-lg border" style={{ borderColor: 'var(--breast-cancer-accent)' }}>
                <div className="font-semibold text-sm">PRE-BRCA-BRCA</div>
                <div className="text-xs text-gray-600 mb-2">2-class (Pre-diagnostic + Cancer)</div>
                <ul className="text-xs space-y-1 text-gray-700">
                  <li>• Distinguish pre-diagnostic from active disease to avoid overtreatment.</li>
                  <li>• Decide urgency and need for imaging/invasive tests.</li>
                </ul>
              </div>
              {/* 8 */}
              <div className="p-4 rounded-lg bg-white shadow-lg border" style={{ borderColor: 'var(--breast-cancer-accent)' }}>
                <div className="font-semibold text-sm">PRE-BRCA-BRCA-MT</div>
                <div className="text-xs text-gray-600 mb-2">2-class (Pre-diagnostic + Cancer with mutation)</div>
                <ul className="text-xs space-y-1 text-gray-700">
                  <li>• Anticipate mutation-driven cancers; evaluate targeted therapy pathways.</li>
                  <li>• Intensify surveillance for likely progression to mutation-positive cancer.</li>
                </ul>
              </div>
              {/* 9 */}
              <div className="p-4 rounded-lg bg-white shadow-lg border" style={{ borderColor: 'var(--breast-cancer-accent)' }}>
                <div className="font-semibold text-sm">PRE-BRCA-BRCA-WT</div>
                <div className="text-xs text-gray-600 mb-2">2-class (Pre-diagnostic + Cancer without mutation)</div>
                <ul className="text-xs space-y-1 text-gray-700">
                  <li>• Detect epigenetically-driven cancers in non-carriers.</li>
                  <li>• Extend screening beyond genetic tests for equitable coverage.</li>
                </ul>
              </div>
            </div>
          </div>
        </Section>

        {/* Data Processing - Detailed implementation */}
        <Section sectionId="data-processing" sectionTitle="Data Processing Pipeline" backgroundTheme="breast-cancer-bg-4">
          <div className="max-w-7xl mx-auto h-full flex flex-col justify-center">
            {/* Three Column Layout - Main Content */}
            <div className="grid gap-6 grid-cols-3 mb-6">
              {/* Column 1: Data Partitioning */}
              <div className="bg-white rounded-lg p-5 shadow-lg">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: 'var(--breast-cancer-accent)' }}>
                    <span className="text-xl text-white">⚔️</span>
                  </div>
                  <h3 className="text-lg font-bold" style={{ color: 'var(--breast-cancer-accent)' }}>Data Partitioning</h3>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center p-2 rounded text-sm" style={{ backgroundColor: 'rgba(46, 204, 113, 0.1)' }}>
                    <span><strong>Training</strong></span>
                    <span className="font-bold">70%</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded text-sm" style={{ backgroundColor: 'rgba(52, 152, 219, 0.1)' }}>
                    <span><strong>Validation</strong></span>
                    <span className="font-bold">15%</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded text-sm" style={{ backgroundColor: 'rgba(231, 76, 60, 0.1)' }}>
                    <span><strong>Testing</strong></span>
                    <span className="font-bold">15%</span>
                  </div>
                </div>

                <div className="border-t pt-3">
                  <h4 className="font-semibold mb-2 text-sm">SMOTE Balancing</h4>
                  <ul className="text-xs space-y-1 text-gray-700">
                    <li>• Training set only</li>
                    <li>• Prevents data leakage</li>
                    <li>• Synthetic minority samples</li>
                    <li>• Maintains distribution</li>
                  </ul>
                </div>
              </div>

              {/* Column 2: Feature Selection */}
              <div className="bg-white rounded-lg p-5 shadow-lg">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: 'var(--breast-cancer-accent)' }}>
                    <span className="text-xl text-white">🧬</span>
                  </div>
                  <h3 className="text-lg font-bold" style={{ color: 'var(--breast-cancer-accent)' }}>GA & PSO Algorithms</h3>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <strong>Two Metaheuristics Tested:</strong>
                    <ul className="mt-1 space-y-1">
                      <li>• <strong>Genetic Algorithm (GA)</strong></li>
                      <li>• <strong>Particle Swarm Optimization (PSO)</strong></li>
                    </ul>
                  </div>
                  <div>
                    <strong>Fitness Function (Both):</strong>
                    <div className="mt-1 p-2 bg-gray-50 rounded font-mono text-xs">
                      f(x) = 1 - CV_Accuracy + α×(features/D)
                    </div>
                  </div>
                  <div>
                    <strong>Binary Encoding:</strong> 27K-dimensional vectors
                  </div>
                  <div>
                    <strong>Common Parameters:</strong>
                    <ul className="mt-1 space-y-1">
                      <li>• Population: 50-100</li>
                      <li>• α = 0.01 (penalty factor)</li>
                      <li>• Max iterations: 100</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Column 3: Evaluation */}
              <div className="bg-white rounded-lg p-5 shadow-lg">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: 'var(--breast-cancer-accent)' }}>
                    <span className="text-xl text-white">🎯</span>
                  </div>
                  <h3 className="text-lg font-bold" style={{ color: 'var(--breast-cancer-accent)' }}>ML Evaluation</h3>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Cross-Validation</h4>
                    <ul className="text-xs space-y-1">
                      <li>• <strong>5-fold</strong> stratified CV</li>
                      <li>• <strong>Training data</strong> only</li>
                      <li>• <strong>Prevents</strong> overfitting</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Metrics</h4>
                    <div className="grid grid-cols-2 gap-1 text-xs">
                      <span>• Accuracy</span><span>• Sensitivity</span>
                      <span>• F1-Score</span><span>• Specificity</span>
                      <span>• ROC-AUC</span><span>• Kappa</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Algorithms</h4>
                    <div className="text-xs space-y-1">
                      <div>• Random Forest</div>
                      <div>• XGBoost</div>
                      <div>• LightGBM</div>
                      <div>• Gradient Boosting</div>
                      <div>• AdaBoost</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Termination Criteria - Full Width at Bottom */}
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-4 border-2" style={{ borderColor: 'var(--breast-cancer-accent)' }}>
              <h3 className="text-xl font-bold text-center mb-4" style={{ color: 'var(--breast-cancer-accent)' }}>
                GA & PSO Termination Criteria
              </h3>
              <div className="grid grid-cols-3 gap-8 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: 'var(--breast-cancer-accent)' }}>
                    <span className="text-2xl font-bold text-white">100</span>
                  </div>
                  <div className="text-sm font-semibold">Maximum Iterations</div>
                  <div className="text-xs text-gray-600">Hard limit for optimization</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: 'var(--breast-cancer-accent)' }}>
                    <span className="text-xl font-bold text-white">&lt;1%</span>
                  </div>
                  <div className="text-sm font-semibold">Fitness Improvement</div>
                  <div className="text-xs text-gray-600">Convergence threshold</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: 'var(--breast-cancer-accent)' }}>
                    <span className="text-2xl font-bold text-white">10</span>
                  </div>
                  <div className="text-sm font-semibold">Stagnation Iterations</div>
                  <div className="text-xs text-gray-600">Early stopping criterion</div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Results Part 1 - ML Models Performance by Dataset */}
        <Section sectionId="results-models" sectionTitle="Results - ML Models Performance" backgroundTheme="breast-cancer-bg-4">
          <div className="max-w-7xl mx-auto h-full flex flex-col">
            <div className="text-center mb-4 flex-shrink-0">
              <h3 className="text-2xl font-bold mb-3" style={{ color: 'var(--breast-cancer-accent)' }}>
                ML Models Performance by Dataset
              </h3>
              <p className="text-base opacity-80 max-w-4xl mx-auto">
                Comprehensive comparison of 5 machine learning algorithms across 9 different dataset configurations.
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
        <Section sectionId="acknowledgments" sectionTitle="" backgroundTheme="breast-cancer-bg-6">
          <div className="max-w-4xl mx-auto h-full flex flex-col justify-center text-center">
            <div className="mb-4">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--breast-cancer-accent)' }}>
                <span className="text-2xl text-white">🙏</span>
              </div>
            </div>

            <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--breast-cancer-text)' }}>
              Thank You
            </h1>

            <div className="space-y-3 text-base" style={{ color: 'var(--breast-cancer-text)' }}>
              <p className="font-medium text-lg">
                Questions and Discussion
              </p>

              <div className="mt-4 space-y-2">
                <div>
                  <p className="font-semibold">Leandro C. Author & Wellingthon P. Researcher</p>
                  <p className="opacity-80 text-sm">Universidade de Pernambuco</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-center items-center gap-3 flex-wrap">
              <div className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'rgba(255, 107, 157, 0.2)', color: 'var(--breast-cancer-accent)' }}>
                Mamo.IA Framework
              </div>
              <div className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'rgba(255, 107, 157, 0.2)', color: 'var(--breast-cancer-accent)' }}>
                Epigenetic Biomarkers
              </div>
              <div className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'rgba(255, 107, 157, 0.2)', color: 'var(--breast-cancer-accent)' }}>
                GA & PSO Optimization
              </div>
            </div>

            <div className="mt-4 text-xs opacity-60">
              <p><strong>MAMO.IA:</strong> Breast Cancer Detection using Machine Learning and Bio-inspired Optimization</p>
              <img src="src/assets/logo-upe.png" alt="UPE Logo" className="mt-8 h-20 mx-auto" />
              <p className="mt-1">{new Date().getFullYear()}</p>
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
