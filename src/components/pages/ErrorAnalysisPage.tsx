import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type AnalysisPrompt } from "@/types/analysis";
import { LlmResponse } from "../LlmResponse";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RefreshCw } from "lucide-react";
import { CodeSection } from "./CodeWithAi";

const ANALYSIS_TYPES = [
  "Normal",
  "Detailed",
  "Concise",
  "Explanatory",
  "Technical",
  "Beginner-friendly",
] as const;
type AnalysisType = (typeof ANALYSIS_TYPES)[number];

export const ErrorAnalysisPage: React.FC = () => {
  const [analysisType, setAnalysisType] = useState<AnalysisType>("Normal");
  const [prompts, setPrompts] = useState<AnalysisPrompt[]>([]);

  const getPrompts = (error: string, type: AnalysisType, context: string): AnalysisPrompt[] => [
    {
      name: "Explanation",
      query: `Explain this error message in ${type} manner:
    
    ${error}
    
    Code Context:
    ${context}
    
    Provide:
    1. What the error means
    2. Specific cause
    3. Programming concept explanation`,
    },
    {
      name: "Solution",
      query: `Provide step-by-step solutions for this error in ${type} manner:
    
    ${error}
    
    Code Context:
    ${context}
    
    Include:
    1. Immediate fix steps
    2. Alternative approaches
    3. Verification methods`,
    },
    {
      name: "Pitfalls",
      query: `Identify common pitfalls related to this error in ${type} manner:
    
    ${error}
    
    Code Context:
    ${context}
    
    List:
    1. Common mistake patterns
    2. Similar error traps
    3. Prevention strategies`,
    },
    {
      name: "Resources",
      query: `Recommend learning resources about this error in ${type} manner:
    
    ${error}
    
    Code Context:
    ${context}
    
    Suggest:
    1. Documentation links
    2. Tutorial references
    3. Related learning paths`,
    },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const error = formData.get('error') as string;
    const code = formData.get('code') as string;
    const analysisType = formData.get('analysisType') as AnalysisType;
    setPrompts(getPrompts(error, analysisType, code));
  };

  const handleReset = () => {
    setPrompts([]);
    ["error", "code"].forEach(name => {
      document.getElementsByName(name).forEach(element => {
        if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
          element.value = "";
        }
      });
    });
  };

  return (
    <div className="min-h-[85vh] w-full bg-transparent px-4 md:px-0">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-500 dark:from-blue-400 dark:to-blue-300">
        Error Analysis Tool
      </h1>

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
        {/* Input Section */}
        <div className="w-full lg:w-1/3 space-y-4 bg-slate-200/50 dark:bg-slate-900/50 p-4 rounded-lg border-2 border-slate-900/30 dark:border-slate-300/30 shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xl font-medium mb-2">Error</label>
              <Textarea
                name="error"
                rows={3}
                className="w-full font-mono border-2 border-slate-900/30 dark:border-slate-300/50 min-h-[100px] resize-none"
                placeholder="Paste your Error here..."

                required
              />
            </div>

            <div>
              <label className="block text-xl font-medium mb-2">
                Code <span className="text-sm font-normal">(Optional)</span>
              </label>
              <CodeSection
                name="code"
                rows={4}
                className="w-full font-mono border-2 border-slate-900/30 dark:border-slate-300/50 min-h-[150px]"
                placeholder="Paste your code here..."
              />
            </div>

            <div>
              <label className="block text-lg font-medium mb-2">
                Analysis Type
              </label>
              <Select value={analysisType} onValueChange={(value: AnalysisType) => setAnalysisType(value)}>
                <SelectTrigger className="w-full border-2 border-slate-900/30 dark:border-slate-300/50">
                  <SelectValue placeholder="Select analysis type" />
                </SelectTrigger>
                <SelectContent>
                  {ANALYSIS_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Button 
                type="submit" 
                className="w-full sm:w-2/3 bg-blue-500 hover:bg-blue-600 text-white"
              >
                Analyze Error
              </Button>
              <Button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-1/3 flex justify-center items-center"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>
          </form>
        </div>

        {/* Analysis Results Section */}
        <div className="w-full lg:w-2/3 space-y-4 bg-slate-200/50 dark:bg-slate-900/50 p-4 rounded-lg border-2 border-slate-900/30 dark:border-slate-300/30 min-h-[500px] max-h-screen overflow-y-auto">
          <h2 className="text-lg font-bold">Analysis:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prompts.map((prompt, index) => (
              <LlmResponse key={index} query={prompt.query} name={prompt.name} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorAnalysisPage;