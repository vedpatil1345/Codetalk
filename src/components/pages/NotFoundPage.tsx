import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="max-h-[85vh] bg-transparent flex items-center justify-center">
      <Card className="max-w-2xl w-full bg-transparent border-none">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <AlertCircle className="h-12 w-12 text-red-500" />
          </div>
          <CardTitle className="text-3xl font-bold text-red-500">
            Page Not Found
          </CardTitle>
          <p className="mt-2 text-gray-800 dark:text-gray-300">
            The page you are looking for doesn't exist or has been moved.
          </p>
        </CardHeader>

        <CardContent>
          <div className="dark:bg-gray-800/90 bg-slate-200/50 rounded-xl shadow-2xl p-8 text-center">
            <div className="mb-6">
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Error 404: We couldn't find the page you were looking for.
              </p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Please check the URL or return to the homepage.
              </p>
            </div>

            <a 
              href="/" 
              className="inline-block w-full bg-blue-500 dark:bg-gradient-to-r dark:from-blue-500 dark:to-green-500 text-white py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              Return to Homepage
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export {NotFoundPage};