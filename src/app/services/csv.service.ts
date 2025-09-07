import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface MetricResult {
  method: string;
  featureSelection: string;
  accuracy: number;
  f1Score: number;
  rocAuc: number;
  sensitivity: number;
  specificity: number;
  precision: number;
  kappa: number;
}

@Injectable({
  providedIn: 'root'
})
export class CsvService {

  constructor(private http: HttpClient) { }

  /**
   * Reads CSV file and parses it into MetricResult objects
   */
  loadResults(): Observable<MetricResult[]> {
    return this.http.get('assets/results.csv', { responseType: 'text' })
      .pipe(
        map(csvText => this.parseCSV(csvText))
      );
  }

  /**
   * Parses CSV text into MetricResult objects
   */
  private parseCSV(csvText: string): MetricResult[] {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',');
    
    return lines.slice(1).map(line => {
      const values = line.split(',');
      return {
        featureSelection: values[0],
        method: values[1],
        accuracy: parseFloat(values[2]),
        f1Score: parseFloat(values[3]),
        rocAuc: parseFloat(values[4]),
        sensitivity: parseFloat(values[5]),
        specificity: parseFloat(values[6]),
        precision: parseFloat(values[7]),
        kappa: parseFloat(values[8])
      };
    });
  }

  /**
   * Filters results by feature selection method
   */
  getResultsByFeatureSelection(results: MetricResult[], featureSelection: string): MetricResult[] {
    return results.filter(result => result.featureSelection === featureSelection);
  }
}
