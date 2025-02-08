import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, Loader2, RefreshCw } from 'lucide-react';
import { useLlmResponse } from '@/hooks/useLlmResponse';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { MarkDown } from '@/components/MarkDown';
import { CodeSection } from './CodeWithAi';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const LANGUAGES = ['Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'Ruby', 'Go', 'Rust'] as const;
type TargetLanguage = typeof LANGUAGES[number];

export const TranslatePage: React.FC = () => {
  const [targetLanguage, setTargetLanguage] = useState<TargetLanguage>('Python');
  const [prompt, setPrompt] = useState('');
  const { response, error, isLoading, retry } = useLlmResponse(prompt);
  
  const getPrompt = (code: string, language: TargetLanguage) => {
    return `Translate the following code into ${language}:\n\n${code}\n\n`;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const code = formData.get('code') as string;
    setPrompt(getPrompt(code, targetLanguage));
  };

  const handleReset = () => {
    setPrompt('');
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
        Code Translation Tool
      </h1>

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 lg:max-h-[75vh]">
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
                Target Language
              </label>
              <Select value={targetLanguage} onValueChange={(value: TargetLanguage) => setTargetLanguage(value)}>
                <SelectTrigger className="w-full border-2 border-slate-900/30 dark:border-slate-300/50">
                  <SelectValue placeholder="Select target language" />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map((lang) => (
                    <SelectItem key={lang} value={lang}>
                      {lang}
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
                Translate Code
              </Button>
              <Button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-1/3 flex justify-center items-center"
                variant="outline"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>
          </form>
        </div>

        {/* Translation Results Section */}
        <div className="w-full lg:w-2/3 space-y-4 bg-slate-200/50 dark:bg-slate-900/50 p-4 rounded-lg border-2 border-slate-900/30 dark:border-slate-300/30 min-h-[550px] lg:max-h-screen overflow-y-auto">
          <h2 className="text-lg font-bold">Translation:</h2>
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : error ? (
            <Alert variant="destructive">
              <AlertCircle className="h-5 w-5" />
              <AlertDescription>{error}</AlertDescription>
              <Button onClick={retry} variant="link" className="mt-2">
                Retry
              </Button>
            </Alert>
          ) : response ? (
            <div className="p-4 bg-slate-200/50 dark:bg-slate-900/50 rounded-lg border-2 border-slate-900/30 dark:border-slate-300/30 shadow-md">
              <MarkDown>{response}</MarkDown>
            </div>
          ) : (
            <div className="flex justify-center items-center h-[200px] text-slate-500">
              Enter your code and select a target language to get started
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TranslatePage;