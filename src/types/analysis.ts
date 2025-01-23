export interface AnalysisPrompt {
  name: string;
  query: string;
}

export interface AnalysisResult {
  code: string;
  analysis: AnalysisResult;
}