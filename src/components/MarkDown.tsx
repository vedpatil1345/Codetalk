import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

import { Code, Copy } from "lucide-react";

interface CodeProps extends React.ComponentPropsWithoutRef<'code'> {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode; // Make children optional
}
const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

export const MarkDown: React.FC<{ children: string }> = ({ children }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({ inline, className, children, ...props }: CodeProps) {
          const match = /language-(\w+)/.exec(className || "");
          const matchLang = match ? match[1] : null;
          const codeContent = String(children).replace(/\n$/, "");

          return !inline && match ? (<div className="relative group">
            <div className=" h-full w-fit max-w-full rounded-lg overflow-auto border border-gray-500 dark:border-gray-700 bg-gray-200/50 dark:bg-slate-900/70 backdrop-blur-3xl shadow-lg">
      {/* Header bar containing language selector and copy button */}
      <div className="relative flex items-center justify-end px-4 py-2 bg-transparent border-b border-gray-500/50 dark:border-gray-700">
        <div className="absolute left-4 mx-auto flex items-center space-x-2">
          <Code className="w-4 h-4 mr-2" /> {matchLang}
        </div>
        <button
          onClick={() => copyToClipboard(codeContent)}
          className="p-1 hover:bg-gray-700 rounded transition-colors"
          title="Copy code"
        >
          <Copy className="w-4 h-4"  />
        </button>
        
      </div><div className="flex overflow-auto dark:bg-slate-800/70 border-b border-gray-500/50 dark:border-gray-700">
            <SyntaxHighlighter
              PreTag="div"
              language={match[1]}
              style={tomorrow} // Cast to any to avoid type issues
            >
              
              
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
            </div>
            </div>

            
            </div>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
};
