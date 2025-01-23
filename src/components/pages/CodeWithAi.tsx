import React, { useState, useEffect, useCallback } from 'react';
import { Mic, Send, Loader2, MicOff, Code, Trash2 } from 'lucide-react';
import { useLlmResponse } from '@/hooks/useLlmResponse';
import { MarkDown } from '../MarkDown';


const ClearChatButton = ({ messages, onClearChat }: { messages: Message[], onClearChat: () => void }) => {
  // State to handle the confirmation UI
  const [showClearConfirm, setShowClearConfirm] = React.useState(false);

  // Handle clear chat with confirmation
  const handleClearClick = () => {
    if (messages.length === 0) return;
    
    if (!showClearConfirm) {
      setShowClearConfirm(true);
      // Auto-hide confirmation after 3 seconds
      setTimeout(() => setShowClearConfirm(false), 3000);
    } else {
      onClearChat();
      setShowClearConfirm(false);
    }
    
  };

  return (
    <button
      onClick={handleClearClick}
      disabled={messages.length === 0}
      className={`group flex items-center gap-2 px-1 py-1.5 rounded-md transition-all duration-200
        ${showClearConfirm 
          ? 'bg-red-500 dark:bg-red-500/50 dark:hover:bg-red-600/30 text-red-200' 
          : 'bg-gray-800 dark:bg-gray-800/40 hover:bg-gray-700/50 disabled:opacity-40 disabled:cursor-not-allowed'
        } backdrop-blur-sm`}
    >
      <Trash2 className={`w-8 h-8 transition-all duration-200 
        ${showClearConfirm 
          ? 'text-red-200 group-hover:text-red-100' 
          : 'text-gray-400 group-hover:text-gray-300'}`} 
      />
      <span className="text-xs md:text-sm">
        {showClearConfirm ? 'Confirm?' : 'Clear Chat'}
      </span>
    </button>
  );
};

import { Copy } from 'lucide-react';

interface CodeSectionProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name?: string;
  className?: string;
  onCodeChange?: (code: string) => void;
}

export const CodeSection = ({ 
  name, 
  className = '',
  title='' ,
  onCodeChange,
  ...props 
}: CodeSectionProps) => {
  // Create a ref to access the textarea element directly
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  // Handle code changes and notify parent component when the content changes
  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    if (onCodeChange) {
      onCodeChange(newCode);
    }
    if (props.onChange) {
      props.onChange(e);
    }
  };

  // Handle copying code to clipboard when the copy button is clicked
  const handleCopy = async () => {
    if (textareaRef.current) {
      await navigator.clipboard.writeText(textareaRef.current.value);
    }
  };
  const handleClear = () => {
    if (textareaRef.current) {
      textareaRef.current.value = '';
    }
  };


  // Calculate the number of lines for the line numbers column

  return (
    <div className="h-fit lg:h-auto rounded-lg overflow-hidden border border-gray-500 dark:border-gray-700 bg-gray-200/50 dark:bg-slate-900/70 backdrop-blur-3xl shadow-lg">
      <div className="relative flex items-center justify-end px-4 py-2 bg-transparent border-b border-gray-500/50 dark:border-gray-700 h-fit">
        <div className="absolute left-4 mx-auto flex items-center space-x-2 text-bold font-bold lg:max-w-[50%] text-blue-500">
          <Code className="w-4 h-4 mr-2" />{title}
        </div>
        <button
          onClick={handleCopy}
          className="p-1 hover:bg-gray-700 rounded transition-colors"
          title="Copy code"
        >
          <Copy className="w-4 h-4" />
        </button>
        <button
          onClick={handleClear}
          className="p-1 hover:bg-gray-700 rounded transition-colors"
          title="Clear"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="flex max-h-fit overflow-auto">
        <textarea
          ref={textareaRef}
          name={name}
          {...props}
          onChange={handleCodeChange}
          className={`w-full h-full ${className} overflow-auto text-black dark:text-white dark:bg-slate-800/70 border-b border-gray-500/50 dark:border-gray-700
             font-mono text-sm pl-4 pr-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent 
            outline-none resize-none`}
          spellCheck="false"
        />
      </div>
    </div>
  );
};
interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const MessageBubble: React.FC<{ message: Message }> = ({ message }) => {
  const formatTimestamp = (date: Date): string =>
    new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit' }).format(date);

  return (
    <div className={`flex  ${message.type === 'user' ? 'justify-end' : 'justify-start'} `}>
      <div
        className={` p-4 rounded-lg overflow-hidden max-w-[80%] ${
          message.type === 'user'
            ? 'dark:bg-blue-600 bg-blue-300 bg-opacity-50 backdrop-blur-sm'
            : 'dark:bg-gray-700 bg-gray-300 bg-opacity-50 backdrop-blur-sm'
        }`}
      >
        <div className="flex flex-col gap-2 text-black dark:text-gray-200 ">
          <MarkDown>{message.content}</MarkDown>
          <span className="text-xs ">{formatTimestamp(message.timestamp)}</span>
        </div>
      </div>
    </div>
  );
};

const CodeWithAi: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>(() => {
    // Initialize with greeting message
    return [{
      id: crypto.randomUUID(),
      type: 'bot',
      content: "👋 Hi! I'm your coding assistant. Paste your code in the editor, and I'll help you understand, debug, or improve it. How can I help you today?",
      timestamp: new Date()
    }];
  });
  const [inputText, setInputText] = useState<string>('');
  const [speechState, setSpeechState] = useState({
    isListening: false,
    speechSupported: false,
    error: '',
  });
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [queryText, setQueryText] = useState<string>('');

  // Modified to include code context in the query
  const createQueryWithContext = useCallback((userMessage: string) => {
    if (code.trim()) {
      return `if there is greeting in latest message then just greet user and ask for help otherwise\n\nignore previous greetings and Answer in chatting manner and behave like coding assistent chatbot give response of latest message using Context - Current code in editor:\n\`\`\`\n${code}\n\`\`\`\n\nUser question: ${userMessage} `;
    }
    return userMessage;
  }, [code]);

  const { response, isLoading, error } = useLlmResponse(queryText);

  // Handle code changes
  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  // Speech recognition setup remains the same...
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognitionAPI =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      if (SpeechRecognitionAPI) {
        try {
          const recognitionInstance = new SpeechRecognitionAPI();
          recognitionInstance.continuous = false;
          recognitionInstance.interimResults = true;

          recognitionInstance.onstart = () =>
            setSpeechState((prev) => ({ ...prev, isListening: true, error: '' }));

          recognitionInstance.onerror = (event: SpeechRecognitionErrorEvent) =>
            setSpeechState((prev) => ({
              ...prev,
              isListening: false,
              error: getErrorMessage(event.error),
            }));

          recognitionInstance.onend = () =>
            setSpeechState((prev) => ({ ...prev, isListening: false }));

          recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
            const transcript = Array.from(event.results)
              .map((result) => result[0].transcript)
              .join(' ');

            setInputText((prevText) => `${prevText} ${transcript.trim()}`.trim());
          };

          setRecognition(recognitionInstance);
          setSpeechState((prev) => ({ ...prev, speechSupported: true }));
        } catch {
          setSpeechState((prev) => ({
            ...prev,
            speechSupported: false,
            error: 'Speech recognition not supported in this browser',
          }));
        }
      } else {
        setSpeechState((prev) => ({
          ...prev,
          speechSupported: false,
          error: 'Speech recognition not supported in this browser',
        }));
      }
    }
  }, []);

  const getErrorMessage = (error: string): string => {
    const errorMessages: Record<string, string> = {
      'not-allowed': 'Microphone access denied. Please allow microphone access and try again.',
      'no-speech': 'No speech was detected. Please try again.',
      'network': 'Network error occurred. Please check your connection.',
    };
    return errorMessages[error] || 'Error occurred with speech recognition. Please try again.';
  };

  const toggleListening = useCallback(() => {
    if (!recognition || !speechState.speechSupported) return;

    if (speechState.isListening) {
      recognition.stop();
    } else {
      try {
        recognition.start();
      } catch (error: unknown) {
        setSpeechState((prev) => ({
          ...prev,
          error: 'Error starting speech recognition. Please try again.' + error,
        }));
      }
    }
  }, [recognition, speechState]);

  // Modified handleSubmit to include code context
  const handleSubmit = useCallback(() => {
    if (inputText.trim()) {
      const userMessage: Message = {
        id: crypto.randomUUID(),
        type: 'user',
        content: inputText.trim(),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInputText('');
      // Include code context in the query
      setQueryText(createQueryWithContext(userMessage.content));
    }
    
    
     
    const scrollablediv = document.getElementById('scrollable-div');
    function sleep(ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    if (scrollablediv) {
      
      sleep(1000).then(() => {
        scrollablediv.scrollTo({
          top: scrollablediv.scrollHeight,
          behavior: 'smooth',
        });
      });
      sleep(1000).then(() => {
        scrollablediv.scrollTo({
          top: scrollablediv.scrollHeight,
          behavior: 'smooth',
        });
      });
        
      }
  }, [inputText, createQueryWithContext]);
  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit],
  );

  useEffect(() => {
    if (response && !isLoading) {
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), type: 'bot', content: response, timestamp: new Date() },
      ]);
      setQueryText('');
    }
  }, [response, isLoading]);

  useEffect(() => {
    if (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          type: 'bot',
          content: 'Sorry, there was an error processing your request. Please try again.',
          timestamp: new Date(),
        },
      ]);
    }
  }, [error]);
  const handleClearChat = () => {
    setMessages([{
      id: crypto.randomUUID(),
      type: 'bot',
      content: "👋 Hi! I'm your coding assistant. Paste your code in the editor, and I'll help you understand, debug, or improve it. How can I help you today?",
      timestamp: new Date()
    }]); // Clear the messages array
    // If you're storing messages in localStorage or a database, clear those too
    localStorage.removeItem('chatMessages'); // Optional: If you're using localStorage
    // You might also want to reset other states like input text
    setInputText('');
  };
  return (
    <div className="min-h-[85vh] w-full bg-transparent px-4 md:px-0">
      <div className="mx-auto  h-[75vh] w-full lg:w-[95vw]">
        <h1 className="text-3xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-500 dark:from-blue-400 dark:to-blue-300">
          Programming with Ai
        </h1>
        <div className="grid grid-rows-[40%_60%] gap-y-5 lg:grid-rows-1 lg:grid-cols-[35vw_58vw] lg:gap-8 h-full lg:h-max">
          {/* Code Section */}
          <div className=" h-full w-full lg:h-[75vh] lg:max-h-full overflow-auto space-y-6 bg-slate-200/50 dark:bg-slate-900/50 p-4 rounded-lg border-2 border-slate-900/30 dark:border-slate-300/30 shadow-md">
            <CodeSection
              name="code"
              value={code}
              title={'Code For Context'}
              className='min-h-[21vh] lg:min-h-[64vh]'
              placeholder="Paste your code here..."
              onChange={(e) => setCode(e.target.value)}
              onCodeChange={handleCodeChange}
            />
          </div>

          {/* Chat Section remains the same... */}
          <div className="h-full lg:max-h-[75vh] overflow-hidden w-full  lg:relative flex flex-col bg-slate-200/50 dark:bg-gray-800/50 text-white rounded-lg shadow-md  lg:mr-12 border-2 border-slate-900/30 dark:border-slate-300/30">
            <div className="flex-1 overflow-y-auto p-4 space-y-4" id='scrollable-div'>
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-700 bg-opacity-50 backdrop-blur-sm p-4 rounded-lg">
                    <Loader2 className="w-6 h-6 animate-spin text-blue-400" />
                  </div>
                </div>
              )}
            </div>

            {speechState.error && (
              <div className="px-4 py-2 bg-red-500 bg-opacity-50 backdrop-blur-sm text-white text-sm">
                {speechState.error}
              </div>
            )}

            <div className="backdrop-blur-xl bg-gray-300/50 dark:bg-gray-900/50 p-2 mt-0 top-0 relative ">
              <div className="max-w-2xl flex items-center my-auto justify-center gap-2 w-full">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={isLoading ? undefined : handleKeyPress}
                  className="w-full flex p-3 mr-2 rounded-lg text-sm text-black dark:text-white dark:bg-gray-700 bg-gray-200/70 bg-opacity-50 backdrop-blur-sm border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                  placeholder="Type your message..."
                  rows={1}
                />
                <ClearChatButton messages={messages} onClearChat={handleClearChat} />
                <button
                  onClick={toggleListening}
                  className={`inline-flex p-3 rounded-full transition-colors ${
                    !speechState.speechSupported
                      ? 'bg-gray-600 cursor-not-allowed'
                      : speechState.isListening
                      ? 'bg-red-500 hover:bg-red-600'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                  title={
                    !speechState.speechSupported
                      ? 'Speech recognition not supported in this browser'
                      : speechState.isListening
                      ? 'Stop listening'
                      : 'Start listening'
                  }
                  disabled={!speechState.speechSupported}
                >
                  {speechState.speechSupported ? (
                    <Mic className={`w-6 h-6 ${speechState.isListening ? 'animate-pulse' : ''}`} />
                  ) : (
                    <MicOff className="w-3 h-3 lg:w-6 lg:h-6" />
                  )}
                </button>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={!inputText.trim() || isLoading}
                  className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  title="Send message"
                >
                  <Send className="w-3 h-3 lg:w-6 lg:h-6" />
                </button>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CodeWithAi;
export { CodeWithAi };