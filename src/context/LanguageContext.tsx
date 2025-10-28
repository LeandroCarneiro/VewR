import React, { createContext, useContext, useState, useMemo } from 'react';

type Language = 'en' | 'pt';

type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const value = useMemo<LanguageContextValue>(() => ({
    language,
    setLanguage,
    t: (key: string) => translations[language][key] || key
  }), [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextValue => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
};

// Translations
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'home': 'Home',
    'motivation': 'Motivation',
    'proposal': 'Research Proposal',
    'introduction': 'Introduction',
    'related-work': 'Related Work',
    'methodology': 'Methodology',
    'results': 'Results',
    'conclusion': 'Conclusion',
    
    // Title slide
    'project.title': 'MAMO.IA: Breast Cancer Risk States from DNA Methylation Data Using Bio-inspired Feature Selection and Interpretable Machine Learning',
    'advisor': 'Advisor',
    'student': 'Student',
    
    // Motivation
    'motivation.title': 'Motivation',
    'motivation.global.title': 'Global Burden',
    'motivation.global.cases': 'new cases',
    'motivation.global.deaths': 'deaths annually',
    'motivation.global.common': 'Most common cancer in women',
    'motivation.brazil.title': 'Brazil Context',
    'motivation.brazil.cases': 'new cases in 2023',
    'motivation.brazil.mortality': 'high mortality rate',
    'motivation.challenge.title': 'Early Detection Challenge',
    'motivation.challenge.desc': 'Need for non-invasive methods for early risk assessment',
    
    // Proposal
    'proposal.title': 'Proposal & Objectives',
    'proposal.solution.title': 'Proposed Solution',
    'proposal.solution.desc': 'Machine learning framework combining bio-inspired optimization with interpretable models for breast cancer risk classification',
    'proposal.objectives.title': 'Main Objectives',
    'proposal.obj1': 'Feature selection using metaheuristic algorithms',
    'proposal.obj2': 'Three-class risk classification system',
    'proposal.obj3': 'Interpretable decision-making models',
    'proposal.obj4': 'Clinical validation and performance analysis',
    
    // Results
    'results.pso.title': 'Results - PSO Optimization',
    'results.ga.title': 'Results - GA Optimization',
    'results.all.title': 'Results - All Features (No Optimization)',
    'results.comparison.title': 'Results - Comparative Analysis',
    'results.detailed.title': 'Results - Detailed Analysis',
    'results.f1.title': 'F1-Score by Class Comparison',
    'results.overall.title': 'Overall Performance Metrics',
    'results.best': 'Best',
    'results.accuracy': 'Accuracy',
    'results.time': 'Time',
    'results.detailed.table': 'Detailed Performance Metrics',
    
    // Conclusion
    'conclusion.title': 'Conclusion',
    'conclusion.findings': 'Multi-Dataset Study: Key Findings',
    'conclusion.contributions': 'Key Contributions',
    'conclusion.future': 'Future Directions',
    'conclusion.impact': 'Clinical Impact',
    'conclusion.summary': 'Mamo.IA offers a reproducible pathway for translating epigenetic signatures into non-invasive diagnostic methods',
    
    // Common
    'thankyou': 'Thank You',
    'questions': 'Questions and Discussion',
    'features': 'features',
    'models': 'models',
    'all': 'All',
  },
  pt: {
    // Navigation
    'home': 'Início',
    'motivation': 'Motivação',
    'proposal': 'Proposta de Pesquisa',
    'introduction': 'Introdução',
    'related-work': 'Trabalhos Relacionados',
    'methodology': 'Metodologia',
    'results': 'Resultados',
    'conclusion': 'Conclusão',
    
    // Title slide
    'project.title': 'MAMO.IA: Estados de Risco de Câncer de Mama a partir de Dados de Metilação de DNA Usando Seleção de Características Bio-inspirada e Aprendizado de Máquina Interpretável',
    'advisor': 'Orientador',
    'student': 'Dicente',
    
    // Motivation
    'motivation.title': 'Motivação',
    'motivation.global.title': 'Carga Global',
    'motivation.global.cases': 'novos casos',
    'motivation.global.deaths': 'mortes anualmente',
    'motivation.global.common': 'Câncer mais comum em mulheres',
    'motivation.brazil.title': 'Contexto Brasil',
    'motivation.brazil.cases': 'novos casos em 2023',
    'motivation.brazil.mortality': 'alta taxa de mortalidade',
    'motivation.challenge.title': 'Desafio da Detecção Precoce',
    'motivation.challenge.desc': 'Necessidade de métodos não invasivos para avaliação de risco precoce',
    
    // Proposal
    'proposal.title': 'Proposta e Objetivos',
    'proposal.solution.title': 'Solução Proposta',
    'proposal.solution.desc': 'Framework de aprendizado de máquina combinando otimização bio-inspirada com modelos interpretáveis para classificação de risco de câncer de mama',
    'proposal.objectives.title': 'Objetivos Principais',
    'proposal.obj1': 'Seleção de características usando algoritmos metaheurísticos',
    'proposal.obj2': 'Sistema de classificação de risco em três classes',
    'proposal.obj3': 'Modelos interpretáveis de tomada de decisão',
    'proposal.obj4': 'Validação clínica e análise de desempenho',
    
    // Results
    'results.pso.title': 'Resultados - Otimização PSO',
    'results.ga.title': 'Resultados - Otimização GA',
    'results.all.title': 'Resultados - Todas as Características (Sem Otimização)',
    'results.comparison.title': 'Resultados - Análise Comparativa',
    'results.detailed.title': 'Resultados - Análise Detalhada',
    'results.f1.title': 'Comparação F1-Score por Classe',
    'results.overall.title': 'Métricas de Desempenho Geral',
    'results.best': 'Melhor',
    'results.accuracy': 'Acurácia',
    'results.time': 'Tempo',
    'results.detailed.table': 'Métricas de Desempenho Detalhadas',
    
    // Conclusion
    'conclusion.title': 'Conclusão',
    'conclusion.findings': 'Estudo Multi-Dataset: Principais Descobertas',
    'conclusion.contributions': 'Principais Contribuições',
    'conclusion.future': 'Direções Futuras',
    'conclusion.impact': 'Impacto Clínico',
    'conclusion.summary': 'Mamo.IA oferece um caminho reproduzível para traduzir assinaturas epigenéticas em métodos diagnósticos não invasivos',
    
    // Common
    'thankyou': 'Obrigado',
    'questions': 'Perguntas e Discussão',
    'features': 'características',
    'models': 'modelos',
    'all': 'Todas',
  }
};
