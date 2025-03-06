import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, Loader2, RefreshCw } from 'lucide-react';
import { useLlmResponse } from '@/hooks/useLlmResponse';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { MarkDown } from '@/components/MarkDown';
import { CodeSection } from './CodeWithAi';
import { Input } from '@/components/ui/input';

export const TranslatePage: React.FC = () => {
  const [targetLanguage, setTargetLanguage] = useState('');
  const [prompt, setPrompt] = useState('');
  const { response, error, isLoading, retry } = useLlmResponse(prompt);
  
  const getPrompt = (code: string, language: string) => {
    return `Translate the following code into ${language}:\n\n${code}\n\n`;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const code = formData.get('code') as string;
    const language = formData.get('language') as string || targetLanguage;
    setTargetLanguage(language);
    setPrompt(getPrompt(code, language));
  };

  const handleReset = () => {
    setPrompt('');
    const codeElements = document.getElementsByName("code");
    codeElements.forEach(element => {
      if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
        element.value = "";
      }
    });
    const languageElements = document.getElementsByName("language");
    languageElements.forEach(element => {
      if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
        element.value = "Python";
      }
    });
    setTargetLanguage('Python');
  };

  return (
    <div className="h-[80vh] w-[95vw] mx-auto w-full bg-transparent px-4 md:px-0 flex flex-col">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-500 dark:from-blue-400 dark:to-blue-300">
        Code Translation Tool
      </h1>

      <div className="flex flex-col lg:flex-row gap-4 h-full overflow-hidden">
        {/* Input Section */}
        <div className="w-full lg:w-1/3 flex flex-col bg-slate-200/50 dark:bg-slate-900/50 p-4 rounded-lg border-2 border-slate-900/30 dark:border-slate-300/30 shadow-md overflow-auto">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 h-full relative">
            <div className="flex-grow min-h-[40%] relative">
              <label className="block text-xl font-medium mb-2">Code</label>
              <CodeSection
                name="code"
                placeholder="Paste your code here..."
                required
                className="h-full min-h-[250px]"
              />
            </div>
            
            <div>
              <label className="block text-xl font-medium mb-2">Target Language</label>
              <Input 
                className="w-full border-2 border-slate-900/30 dark:border-slate-300/50" 
                placeholder="Enter target language/library/framework" 
                name="language"
                defaultValue={targetLanguage}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-2 mt-2">
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
        <div className="w-full lg:w-2/3 flex flex-col bg-slate-200/50 dark:bg-slate-900/50 p-4 rounded-lg border-2 border-slate-900/30 dark:border-slate-300/30 overflow-hidden">
          <h2 className="text-lg font-bold mb-2">Translation:</h2>
          <div className="flex-grow overflow-auto">
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
              <div className="p-4 bg-slate-200/50 dark:bg-slate-900/50 rounded-lg border-2 border-slate-900/30 dark:border-slate-300/30 shadow-md h-full overflow-auto">
                <MarkDown>{response}</MarkDown>
              </div>
            ) : (
              <div className="flex justify-center items-center h-full text-slate-500">
                Enter your code and specify a target language to get started
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranslatePage;