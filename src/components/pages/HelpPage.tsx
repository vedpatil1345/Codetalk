import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, Code, MessageSquare, Image, AlertTriangle, Zap } from 'lucide-react';

export const HelpPage = () => {
  const features = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Code Analysis Tool",
      description: "Paste your code to get detailed analysis including error detection, requirements, and improvement suggestions. Supports multiple programming languages."
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "AI Chat Assistant",
      description: "Get real-time help with your code through our AI chat interface. Ask questions, debug issues, and receive step-by-step explanations."
    },
    {
      icon: <Image className="w-6 h-6" />,
      title: "Code Translator",
      description: "Convert code between different programming languages or generate code from natural language descriptions."
    }
  ];

  const guides = [
    {
      title: "Getting Started",
      steps: [
        "Select your desired tool from the CodeRoom dropdown in the navigation bar",
        "Choose the appropriate programming language or platform for your needs",
        "Paste your code or type your question in the provided input area",
        "Click the relevant action button (Analyze Code, Translate, etc.)",
        "Review the AI-generated results and suggestions"
      ]
    },
    {
      title: "Best Practices",
      items: [
        "Provide complete, well-formatted code snippets for better analysis",
        "Be specific with your questions and requirements",
        "Use the error analysis tool to debug issues systematically",
        "Take advantage of the AI chat for detailed explanations",
        "Review improvement suggestions to optimize your code"
      ]
    }
  ];

  return (
    <div className="container mx-auto my-auto px-4 py-4 max-w-full min-h-[85vh] overflow-auto ">
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-500 dark:from-blue-400 dark:to-blue-300">Welcome to CodeTalk Help Center</h1>
          <p className="text-xl text-muted-foreground">
            Learn how to make the most of our AI-powered code analysis and debugging platform
          </p>
        </div>

        {/* Features Section */}
        <Card className='bg-slate-200/50 dark:bg-slate-900/50 rounded-lg border-2 border-slate-900/30 dark:border-slate-300/30 shadow-md'>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-6 h-6" />
              Key Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className=" bg-slate-200/50 dark:bg-slate-900/50 shadow-lg dark:shadow-blue-500/50 rounded-lg hover:-translate-y-1 border-2 border-slate-900/30 dark:border-slate-300/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      {feature.icon}
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* User Guides */}
        {guides.map((guide, index) => (
          <Card key={index} className='bg-slate-200/50 dark:bg-slate-900/50 rounded-lg border-2 border-slate-900/30 dark:border-slate-300/30 shadow-md'>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="w-6 h-6" />
                {guide.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-3">
                {guide.steps ? (
                  guide.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="text-muted-foreground">{step}</li>
                  ))
                ) : (
                  guide.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-muted-foreground">{item}</li>
                  ))
                )}
              </ol>
            </CardContent>
          </Card>
        ))}

        {/* Troubleshooting */}
        <Card className='bg-slate-200/50 dark:bg-slate-900/50  rounded-lg border-2 border-slate-900/30 dark:border-slate-300/30 shadow-md'>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-6 h-6" />
              Troubleshooting
            </CardTitle>
            <CardDescription>Common issues and their solutions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Analysis Not Working?</h3>
                <ul className="list-disc list-inside text-muted-foreground">
                  <li>Ensure your code is properly formatted</li>
                  <li>Check if you've selected the correct programming language</li>
                  <li>Try breaking down complex code into smaller segments</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Chat Response Issues?</h3>
                <ul className="list-disc list-inside text-muted-foreground">
                  <li>Be more specific with your questions</li>
                  <li>Provide context about your programming environment</li>
                  <li>Include relevant error messages if applicable</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HelpPage;