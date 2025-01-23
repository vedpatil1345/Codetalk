import React from 'react';
import { Card, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertCircle, Loader2, X } from 'lucide-react';
import { useLlmResponse } from '@/hooks/useLlmResponse';
import { MarkDown } from './MarkDown';
import classNames from 'classnames';

interface LlmResponseProps {
  query: string;
  name: string;
}

export const LlmResponse: React.FC<LlmResponseProps> = ({ query, name }) => {
  const { response, error, isLoading, retry } = useLlmResponse(query);
  const [isOpen, setIsOpen] = React.useState(false);
  const modalRef = React.useRef<HTMLDivElement>(null);

  // Handle escape key press
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  // Prevent body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle click outside modal
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative">
      <Card
        onClick={() => setIsOpen(true)}
        className={classNames(
          'h-52 p-4 md:p-6 bg-slate-200/50 dark:bg-slate-900/50',
          'shadow-lg dark:shadow-blue-500/50 rounded-lg',
          'border-2 border-slate-900/30 dark:border-slate-300/30',
          'transition-all duration-300 ease-in-out',
          'hover:shadow-xl hover:-translate-y-1',
          {
            'cursor-pointer': !isOpen,
            'hover:border-blue-500': !isOpen
          }
        )}
      >
        <CardTitle className="text-base md:text-lg font-semibold mb-2 md:mb-4">
          {name}
        </CardTitle>
        
        <div className="h-[calc(100%-2rem)]">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : error ? (
            <Alert variant="destructive" className="mt-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm">{error}</AlertDescription>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  retry();
                }}
                className="ml-2"
              >
                Retry
              </Button>
            </Alert>
          ) : (
            <div className="prose prose-sm dark:prose-invert h-full overflow-hidden">
              <div className="line-clamp-5 md:line-clamp-6">
                <MarkDown>{response}</MarkDown>
              </div>
            </div>
          )}
        </div>
      </Card>

      {isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            ref={modalRef}
            className="w-full max-w-4xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-lg shadow-xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-slate-200 dark:border-slate-800">
              <h2 className="text-lg md:text-xl font-bold">{name}</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 min-h-[300px]">
              {error ? (
                <Alert variant="destructive">
                  <AlertCircle className="h-5 w-5" />
                  <AlertDescription>{error}</AlertDescription>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={retry}
                    className="ml-2"
                  >
                    Retry
                  </Button>
                </Alert>
              ) : isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : (
                <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
                  <MarkDown>{response}</MarkDown>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LlmResponse;