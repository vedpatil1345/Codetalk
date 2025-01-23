import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, Loader2, RefreshCw } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useLlmResponse } from '@/hooks/useLlmResponse';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { MarkDown } from '@/components/MarkDown';
import { CodeSection } from './CodeWithAi';

export const TranslatePage: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const { response, error, isLoading, retry } = useLlmResponse(prompt);
  
  const getPrompt = (code: string, language: string) => {
    return `Translate the following code into ${language}:\n\n${code}\n\n`;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const code = formData.get('code') as string;
    const language = formData.get('language') as string;
    setPrompt(getPrompt(code, language));
  };

  const handleReset = () => {
    setPrompt('');
    const elements = document.querySelectorAll('input[name="language"], textarea[name="code"]');
    elements.forEach(element => {
      if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
        element.value = '';
      }
    });
  };

  return (
    <div className="min-h-[85vh] w-full bg-transparent px-4 md:px-0">
      <div className="container mx-auto px-4 lg:px-0 max-w-screen">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-500 dark:from-blue-400 dark:to-blue-300">
          Code Translator
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-4 lg:gap-8">
          <div className="h-auto lg:h-[calc(100vh-12rem)] p-4 bg-slate-200/50 dark:bg-slate-900/50 rounded-lg border-2 border-slate-900/30 dark:border-slate-300/30 shadow-md">
            <form onSubmit={handleSubmit} className="space-y-4 h-full flex flex-col">
              <div className="flex-grow">
                <label className="block text-xl md:text-2xl font-medium mb-2">Code</label>
                <CodeSection
                  name="code"
                  rows={4}
                  className="w-full h-[200px] lg:h-[300px] font-mono border-2 border-slate-900/30 dark:border-slate-300/50 resize-none"
                  placeholder="Paste your code here..."
                  required
                />
              </div>
              
              <div>
                <label className="block text-xl md:text-2xl font-medium mb-2">Language</label>
                <Input
                  name="language"
                  className="w-full font-mono border-2 border-slate-900/30 dark:border-slate-300/50"
                  placeholder="Enter target language..."
                  required
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <Button 
                  type="submit" 
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Translate Code
                </Button>
                <Button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center justify-center"
                  variant="outline"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
              </div>
            </form>
          </div>

          <div className="h-auto lg:h-[calc(100vh-12rem)] p-4 bg-slate-200/50 dark:bg-slate-900/50 rounded-lg border-2 border-slate-900/30 dark:border-slate-300/30 shadow-md overflow-hidden">
            <h2 className="text-xl md:text-2xl font-bold mb-4">Translation</h2>
            <div className="h-[calc(100%-3rem)] overflow-auto p-4">
              {isLoading ? (
                <div className="flex justify-center items-center h-full">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : error ? (
                <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-5 w-5" />
                  <AlertDescription>{error}</AlertDescription>
                  <Button onClick={retry} variant="link" className="mt-2">
                    Retry
                  </Button>
                </Alert>
              ) : (
                <div className="p-4 text-black dark:text-white bg-slate-200/50 dark:bg-slate-900/50 shadow-lg dark:shadow-blue-500/50 rounded-lg hover:-translate-y-1 border-2 border-slate-900/30 dark:border-slate-300/30 transition-transform duration-300">
                  <MarkDown>{response}</MarkDown>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};