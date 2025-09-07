import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionComponent } from './components/section/section.component';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';
import { BoxPlotController, ViolinController, BoxAndWiskers, Violin } from '@sgratzl/chartjs-chart-boxplot';
import { CsvService, MetricResult } from './services/csv.service';
import { SlideService } from './services/slide.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SectionComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('gaChartCanvas') gaChartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('psoChartCanvas') psoChartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('allChartCanvas') allChartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('violinChartCanvas') violinChartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('boxplotChartCanvas') boxplotChartCanvas!: ElementRef<HTMLCanvasElement>;

  title = 'research-presentation';
  currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  private gaChart!: Chart;
  private psoChart!: Chart;
  private allChart!: Chart;
  private violinChart!: Chart;
  private boxplotChart!: Chart;
  
  gaMetrics: MetricResult[] = [];
  psoMetrics: MetricResult[] = [];
  allMetrics: MetricResult[] = [];
  allResults: MetricResult[] = [];

  constructor(private csvService: CsvService) {
    Chart.register(...registerables, BoxPlotController, ViolinController, BoxAndWiskers, Violin);
  }

  ngOnInit() {
    this.loadResults();
  }

  private loadResults() {
    this.csvService.loadResults().subscribe({
      next: (results) => {
        this.allResults = results;
        this.gaMetrics = this.csvService.getResultsByFeatureSelection(results, 'GA');
        this.psoMetrics = this.csvService.getResultsByFeatureSelection(results, 'PSO');
        this.allMetrics = this.csvService.getResultsByFeatureSelection(results, 'NONE');

        // Create charts after data is loaded
        if (this.gaChartCanvas && this.psoChartCanvas && this.allChartCanvas && this.violinChartCanvas && this.boxplotChartCanvas) {
          this.createCharts();
        }
      },
      error: (error) => {
        console.error('Error loading CSV data:', error);
      }
    });
  }

  ngAfterViewInit() {
    // Charts will be created after data is loaded in loadResults()
    // If data is already loaded, create charts now
    if (this.gaMetrics.length > 0 && this.psoMetrics.length > 0) {
      this.createCharts();
    }
  }

  private createCharts() {
    this.createGAChart();
    this.createPSOChart();
    this.createAllChart();
    this.createViolinChart();
    this.createBoxplotChart();
  }

  private createAllChart() {
    const ctx = this.allChartCanvas.nativeElement.getContext('2d');
    if (ctx) {
      this.allChart = this.getChart(ctx, this.allMetrics);   
    }
  }
  
  private createGAChart() {
    const ctx = this.gaChartCanvas.nativeElement.getContext('2d');
    if (ctx) {
      this.gaChart = this.getChart(ctx, this.gaMetrics);
    }
  }

  private createPSOChart() {
    const ctx = this.psoChartCanvas.nativeElement.getContext('2d');
    if (ctx) {
      this.psoChart = this.getChart(ctx, this.psoMetrics);
    }
  }

  private createViolinChart() {
    const ctx = this.violinChartCanvas.nativeElement.getContext('2d');
    if (ctx) {
      this.violinChart = this.getEnhancedViolinChart(ctx);
    }
  }

  private createBoxplotChart() {
    const ctx = this.boxplotChartCanvas.nativeElement.getContext('2d');
    if (ctx) {
      this.boxplotChart = this.getEnhancedBoxplotChart(ctx);
    }
  }

  private getChartOptions(): ChartConfiguration['options'] {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            boxWidth: 12,
            padding: 15,
            font: { size: 11 }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(44, 62, 80, 0.9)',
          titleColor: '#ffffff',
          bodyColor: '#ffffff', 
          borderColor: '#3498db',
          borderWidth: 1,
          callbacks: {
            label: (context: any) => `${context.dataset.label}: ${context.parsed.y.toFixed(3)}`
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 1,
          title: {
            display: true,
            text: 'Metric Score (0-1)',
            color: '#2c3e50',
            font: { size: 12, weight: 'bold' }
          },
          grid: { color: '#ecf0f1' },
          ticks: {
            color: '#7f8c8d',
            stepSize: 0.1
          }
        },
        x: {
          title: {
            display: true,
            text: 'Machine Learning Methods',
            color: '#2c3e50', 
            font: { size: 12, weight: 'bold' }
          },
          grid: { display: true },
          ticks: { color: '#7f8c8d' }
        }
      }
    };
  }

  private getChart(ctx: CanvasRenderingContext2D, allMetrics: MetricResult[]) {
    return new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Light GBM', 'XGBoost', 'G. Boosting', 'R. Forest'],
        datasets: [
          {
            label: 'Kappa',
            data: allMetrics.map(m => m.kappa),
            backgroundColor: '#3498db',
            borderColor: '#2980b9',
            borderWidth: 1
          },
          {
            label: 'Accuracy',
            data: allMetrics.map(m => m.accuracy),
            backgroundColor: '#e74c3c',
            borderColor: '#c0392b',
            borderWidth: 1
          },
          {
            label: 'F1-Score',
            data: allMetrics.map(m => m.f1Score),
            backgroundColor: '#2ecc71',
            borderColor: '#27ae60',
            borderWidth: 1
          },
          {
            label: 'Specificity',
            data: allMetrics.map(m => m.specificity),
            backgroundColor: '#f39c12',
            borderColor: '#e67e22',
            borderWidth: 1
          },
          {
            label: 'Sensitivity',
            data: allMetrics.map(m => m.sensitivity),
            backgroundColor: '#9b59b6',
            borderColor: '#8e44ad',
            borderWidth: 1
          },
          {
            label: 'ROC-AUC',
            data: allMetrics.map(m => m.rocAuc),
            backgroundColor: '#1abc9c',
            borderColor: '#16a085',
            borderWidth: 1
          }
        ]
      },
      options: this.getChartOptions()
    });
  }

  private getEnhancedViolinChart(ctx: CanvasRenderingContext2D) {
    // Prepare violin plot data for multiple metrics using real data
    const prepareViolinData = (metrics: MetricResult[]) => {
      return {
        accuracy: metrics.map(m => m.accuracy),
        f1Score: metrics.map(m => m.f1Score),
        rocAuc: metrics.map(m => m.rocAuc),
        sensitivity: metrics.map(m => m.sensitivity),
        specificity: metrics.map(m => m.specificity),
        kappa: metrics.map(m => m.kappa)
      };
    };

    const gaData = prepareViolinData(this.gaMetrics);
    const psoData = prepareViolinData(this.psoMetrics);
    const mlData = prepareViolinData(this.allMetrics);

    // Create a comprehensive multi-metric violin plot
    return new Chart(ctx, {
      type: 'violin' as any,
      data: {
        labels: ['Accuracy', 'F1-Score', 'ROC-AUC', 'Sensitivity', 'Specificity', 'Kappa'],
        datasets: [
          {
            label: 'GA + ML Methods',
            backgroundColor: 'rgba(52, 152, 219, 0.7)',
            borderColor: '#3498db',
            borderWidth: 2,
            outlierColor: '#2980b9',
            data: [
              gaData.accuracy,
              gaData.f1Score,
              gaData.rocAuc,
              gaData.sensitivity,
              gaData.specificity,
              gaData.kappa
            ]
          },
          {
            label: 'PSO + ML Methods',
            backgroundColor: 'rgba(231, 76, 60, 0.7)',
            borderColor: '#e74c3c',
            borderWidth: 2,
            outlierColor: '#c0392b',
            data: [
              psoData.accuracy,
              psoData.f1Score,
              psoData.rocAuc,
              psoData.sensitivity,
              psoData.specificity,
              psoData.kappa
            ]
          },
          {
            label: 'Only ML Methods',
            backgroundColor: 'rgba(46, 204, 113, 0.7)',
            borderColor: '#2ecc71',
            borderWidth: 2,
            outlierColor: '#27ae60',
            data: [
              mlData.accuracy,
              mlData.f1Score,
              mlData.rocAuc,
              mlData.sensitivity,
              mlData.specificity,
              mlData.kappa
            ]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
          mode: 'index'
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              boxWidth: 15,
              padding: 20,
              font: { 
                size: 12,
                weight: 'bold'
              },
              color: '#2c3e50'
            }
          },
          tooltip: {
            enabled: true,
            backgroundColor: 'rgba(44, 62, 80, 0.95)',
            titleColor: '#ffffff',
            bodyColor: '#ffffff',
            borderColor: '#3498db',
            borderWidth: 2,
            cornerRadius: 8,
            displayColors: true,
            callbacks: {
              title: (tooltipItems: any[]) => {
                return `${tooltipItems[0].label} Distribution`;
              },
              label: (context: any) => {
                const datasetLabel = context.dataset.label;
                const stats = this.calculateStats(context.dataset.data[context.dataIndex]);
                return [
                  `${datasetLabel}:`,
                  `  Median: ${stats.median.toFixed(3)}`,
                  `  Mean: ${stats.mean.toFixed(3)}`,
                  `  Q1: ${stats.q1.toFixed(3)}`,
                  `  Q3: ${stats.q3.toFixed(3)}`,
                  `  Min: ${stats.min.toFixed(3)}`,
                  `  Max: ${stats.max.toFixed(3)}`,
                  `  Std Dev: ${stats.std.toFixed(3)}`
                ];
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 1,
            title: {
              display: true,
              text: 'Metric Score (0-1)',
              color: '#2c3e50',
              font: { 
                size: 14, 
                weight: 'bold'
              }
            },
            grid: { 
              color: 'rgba(236, 240, 241, 0.8)',
              lineWidth: 1
            },
            ticks: {
              color: '#7f8c8d',
              stepSize: 0.1,
              font: { size: 11 }
            }
          },
          x: {
            title: {
              display: true,
              text: 'Performance Metrics',
              color: '#2c3e50',
              font: { 
                size: 14, 
                weight: 'bold'
              }
            },
            grid: { 
              display: true,
              color: 'rgba(236, 240, 241, 0.5)'
            },
            ticks: { 
              color: '#7f8c8d',
              maxRotation: 45,
              minRotation: 45,
              font: { size: 11 }
            }
          }
        }
      }
    });
  }

  // Helper method to calculate statistics for tooltip
  private calculateStats(data: number[]) {
    const sorted = [...data].sort((a, b) => a - b);
    const n = sorted.length;
    
    const mean = sorted.reduce((sum, val) => sum + val, 0) / n;
    const median = n % 2 === 0 
      ? (sorted[n/2 - 1] + sorted[n/2]) / 2 
      : sorted[Math.floor(n/2)];
    
    const q1 = sorted[Math.floor(n * 0.25)];
    const q3 = sorted[Math.floor(n * 0.75)];
    const min = Math.min(...sorted);
    const max = Math.max(...sorted);
    
    const variance = sorted.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / n;
    const std = Math.sqrt(variance);
    
    return { mean, median, q1, q3, min, max, std };
  }

  private getEnhancedBoxplotChart(ctx: CanvasRenderingContext2D) {
    // Prepare box plot data for multiple metrics using real data
    const prepareBoxplotData = (metrics: MetricResult[]) => {
      return {
        accuracy: metrics.map(m => m.accuracy),
        f1Score: metrics.map(m => m.f1Score),
        rocAuc: metrics.map(m => m.rocAuc),
        sensitivity: metrics.map(m => m.sensitivity),
        specificity: metrics.map(m => m.specificity),
        kappa: metrics.map(m => m.kappa)
      };
    };

    const gaData = prepareBoxplotData(this.gaMetrics);
    const psoData = prepareBoxplotData(this.psoMetrics);
    const mlData = prepareBoxplotData(this.allMetrics);

    // Create a comprehensive multi-metric box plot
    return new Chart(ctx, {
      type: 'boxplot' as any,
      data: {
        labels: ['Accuracy', 'F1-Score', 'ROC-AUC', 'Sensitivity', 'Specificity', 'Kappa'],
        datasets: [
          {
            label: 'GA + ML Methods',
            backgroundColor: 'rgba(52, 152, 219, 0.8)',
            borderColor: '#3498db',
            borderWidth: 2,
            outlierColor: '#2980b9',
            outlierBackgroundColor: '#2980b9',
            outlierBorderColor: '#1f4e79',
            outlierRadius: 4,
            itemRadius: 0,
            itemStyle: 'circle',
            itemBackgroundColor: 'rgba(52, 152, 219, 0.3)',
            meanBorderColor: '#2980b9',
            meanBackgroundColor: '#3498db',
            meanRadius: 3,
            data: [
              gaData.accuracy,
              gaData.f1Score,
              gaData.rocAuc,
              gaData.sensitivity,
              gaData.specificity,
              gaData.kappa
            ]
          },
          {
            label: 'PSO + ML Methods',
            backgroundColor: 'rgba(231, 76, 60, 0.8)',
            borderColor: '#e74c3c',
            borderWidth: 2,
            outlierColor: '#c0392b',
            outlierBackgroundColor: '#c0392b',
            outlierBorderColor: '#922b21',
            outlierRadius: 4,
            itemRadius: 0,
            itemStyle: 'circle',
            itemBackgroundColor: 'rgba(231, 76, 60, 0.3)',
            meanBorderColor: '#c0392b',
            meanBackgroundColor: '#e74c3c',
            meanRadius: 3,
            data: [
              psoData.accuracy,
              psoData.f1Score,
              psoData.rocAuc,
              psoData.sensitivity,
              psoData.specificity,
              psoData.kappa
            ]
          },
          {
            label: 'Only ML Methods',
            backgroundColor: 'rgba(46, 204, 113, 0.8)',
            borderColor: '#2ecc71',
            borderWidth: 2,
            outlierColor: '#27ae60',
            outlierBackgroundColor: '#27ae60',
            outlierBorderColor: '#1e8449',
            outlierRadius: 4,
            itemRadius: 0,
            itemStyle: 'circle',
            itemBackgroundColor: 'rgba(46, 204, 113, 0.3)',
            meanBorderColor: '#27ae60',
            meanBackgroundColor: '#2ecc71',
            meanRadius: 3,
            data: [
              mlData.accuracy,
              mlData.f1Score,
              mlData.rocAuc,
              mlData.sensitivity,
              mlData.specificity,
              mlData.kappa
            ]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
          mode: 'index'
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              boxWidth: 15,
              padding: 20,
              font: { 
                size: 12,
                weight: 'bold'
              },
              color: '#2c3e50'
            }
          },
          tooltip: {
            enabled: true,
            backgroundColor: 'rgba(44, 62, 80, 0.95)',
            titleColor: '#ffffff',
            bodyColor: '#ffffff',
            borderColor: '#3498db',
            borderWidth: 2,
            cornerRadius: 8,
            displayColors: true,
            callbacks: {
              title: (tooltipItems: any[]) => {
                return `${tooltipItems[0].label} Distribution`;
              },
              label: (context: any) => {
                const datasetLabel = context.dataset.label;
                const stats = this.calculateStats(context.dataset.data[context.dataIndex]);
                return [
                  `${datasetLabel}:`,
                  `  Median: ${stats.median.toFixed(3)}`,
                  `  Mean: ${stats.mean.toFixed(3)}`,
                  `  Q1: ${stats.q1.toFixed(3)}`,
                  `  Q3: ${stats.q3.toFixed(3)}`,
                  `  Min: ${stats.min.toFixed(3)}`,
                  `  Max: ${stats.max.toFixed(3)}`,
                  `  IQR: ${(stats.q3 - stats.q1).toFixed(3)}`,
                  `  Range: ${(stats.max - stats.min).toFixed(3)}`
                ];
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 1,
            title: {
              display: true,
              text: 'Metric Score (0-1)',
              color: '#2c3e50',
              font: { 
                size: 14, 
                weight: 'bold'
              }
            },
            grid: { 
              color: 'rgba(236, 240, 241, 0.8)',
              lineWidth: 1
            },
            ticks: {
              color: '#7f8c8d',
              stepSize: 0.1,
              font: { size: 11 }
            }
          },
          x: {
            title: {
              display: true,
              text: 'Performance Metrics',
              color: '#2c3e50',
              font: { 
                size: 14, 
                weight: 'bold'
              }
            },
            grid: { 
              display: true,
              color: 'rgba(236, 240, 241, 0.5)'
            },
            ticks: { 
              color: '#7f8c8d',
              maxRotation: 45,
              minRotation: 45,
              font: { size: 11 }
            }
          }
        }
      }
    });
  }


}


