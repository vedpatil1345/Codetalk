import { useState, useEffect } from 'react';
import { ChatGroq } from '@langchain/groq';
import { HumanMessage } from '@langchain/core/messages';

export const useLlmResponse = (query: string) => {
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const fetchResponse = async () => {
      setIsLoading(true);
      setError(null);
      setResponse(''); // Clear previous response

      try {
        if (!import.meta.env.VITE_GROQ_API_KEY) {
          throw new Error('GROQ API key is not configured');
        }

        const llm = new ChatGroq({
          modelName: 'llama-3.3-70b-versatile',
          apiKey: import.meta.env.VITE_GROQ_API_KEY,
          temperature: 0.7,
        });

        const messages = [new HumanMessage(query)];

        // Fetch the stream response
        const stream = await llm.stream(messages);

        // Collect chunks as they come in
        for await (const chunk of stream) {
          if (chunk && chunk.content) {
            // Update the response progressively
            setResponse((prev) => prev + chunk.content);
          }
        }

        // Once streaming is complete
        setIsLoading(false);

      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch response';
        setError(errorMessage);
        setIsLoading(false);
        console.error('LLM Stream Error:', err);
      }
    };

    if (query) {
      fetchResponse();
    }
  }, [query, retryCount]);

  const retry = () => setRetryCount((prev) => prev + 1);

  return {
    response,
    error,
    isLoading,
    retry
  };
};
