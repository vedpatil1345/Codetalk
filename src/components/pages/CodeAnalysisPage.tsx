import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { type AnalysisPrompt } from '@/types/analysis';
import { LlmResponse } from '../LlmResponse';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { CodeSection } from './CodeWithAi';

const ANALYSIS_TYPES = ['Normal', 'Detailed', 'Concise', 'Explanatory', 'Technical', 'Beginner-friendly'] as const;
type AnalysisType = typeof ANALYSIS_TYPES[number];

export const CodeAnalysisPage: React.FC = () => {
  const [analysisType, setAnalysisType] = useState<AnalysisType>('Normal');
  const [prompts, setPrompts] = useState<AnalysisPrompt[]>([]);

  const getPrompts = (code: string, analysisType: AnalysisType): AnalysisPrompt[] => [
    {
      name: 'Explanation',
      query: `Explain this code in a ${analysisType} manner:\n\n${code}\n\nFocus on:\n1. Overall purpose\n2. Key components\n3. Logic flow\n4. Important functions/methods`,
    },
    {
      name: 'Requirements',
      query: `List requirements for running this code in a ${analysisType} manner:\n\n${code}\n\nInclude:\n1. Dependencies\n2. Environment setup\n3. System requirements\n4. Prerequisites`,
    },
    {
      name: 'Error Detection',
      query: `Analyze this code for potential errors in a ${analysisType} manner:\n\n${code}\n\nConsider:\n1. Syntax errors\n2. Logic errors\n3. Common pitfalls\n4. Edge cases`,
    },
    {
      name: 'Improvements',
      query: `Suggest improvements for this code in a ${analysisType} manner:\n\n${code}\n\nFocus on:\n1. Performance\n2. Readability\n3. Best practices\n4. Security`,
    }
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const code = formData.get('code') as string;
    const analysisType = formData.get('analysisType') as AnalysisType;
    setPrompts(getPrompts(code, analysisType));
  };

  const handleReset = () => {
    setPrompts([]);
    const codeElements = document.getElementsByName("code");
    codeElements.forEach(element => {
      if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
        element.value = "";
      }
    });
  };

  return (
    <div className="min-h-[85vh] w-full bg-transparent px-4 md:px-0">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-500 dark:from-blue-400 dark:to-blue-300">
        Code Analysis Tool
      </h1>

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
        {/* Input Section */}
        <div className="w-full lg:w-1/3 space-y-4 bg-slate-200/50 dark:bg-slate-900/50 p-4 rounded-lg border-2 border-slate-900/30 dark:border-slate-300/30 shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xl md:text-2xl font-medium mb-2">Code</label>
              <CodeSection
                name="code"
                rows={7}
                placeholder="Paste your code here..."
                required
                className="min-h-[200px] md:min-h-[300px]"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
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
                Analyze Code
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
        <div className="w-full lg:w-2/3 space-y-4 bg-slate-200/50 dark:bg-slate-900/50 p-4 rounded-lg border-2 border-slate-900/30 dark:border-slate-300/30 min-h-[550px] lg:max-h-screen overflow-y-auto">
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

export default CodeAnalysisPage;