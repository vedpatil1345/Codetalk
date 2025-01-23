import React from "react";
import { useNavigate,Outlet } from "react-router-dom";
import codeAnalysisDarkImg from '@/assets/code-analysis.png';
import errorAnalysisDarkImg from '@/assets/error-analysis.png';
import imgCodeDarkImg from '@/assets/img-code.png';
import codeTranslationDarkImg from '@/assets/code-translation.png';
import codeGeneratorDarkImg from '@/assets/code-generator.png';
import codeGeneratorLightImg from '@/assets/code-generator-light.png';
import codeAnalysisLightImg from '@/assets/code-analysis-light.png';
import errorAnalysisLightImg from '@/assets/error-analysis-light.png';
import imgCodeLightImg from '@/assets/img-code-light.png';
import codeTranslationLightImg from '@/assets/code-translation-light.png';

export const PlayGroundPage: React.FC = () => {
  const navigate = useNavigate();
  const baseUrl = '/playground';
  
  const cards = [
    {
      title: 'Programming with AI',
      imageDark: codeGeneratorDarkImg,
      imageLight: codeGeneratorLightImg,
      description: 'Generate code based on your requirements.',
      link: '/chat',
    },
    {
      title: 'Code Analysis',
      imageDark: codeAnalysisDarkImg,
      imageLight: codeAnalysisLightImg,
      description: 'Analyze your code and get insights.',
      link: '/code-analysis',
    },
    {
      title: 'Error Analysis',
      imageDark: errorAnalysisDarkImg,
      imageLight: errorAnalysisLightImg,
      description: 'Analyze your Error and get insights.',
      link: '/error-analysis',
    },
    {
      title: 'Image to Code',
      imageDark: imgCodeDarkImg,
      imageLight: imgCodeLightImg,
      description: 'Convert Screenshots into Code.',
      link: '/img-code',
    },
    {
      title: 'Code Translation',
      imageDark: codeTranslationDarkImg,
      imageLight: codeTranslationLightImg,
      description: 'Translate code into different languages.',
      link: '/code-translation',
    },
  ];
  return (
    <div className="container mx-auto px-4 min-h-screen ">
      <div className="flex justify-center">
        <h1 className="text-2xl lg:text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-500 dark:from-blue-400 dark:to-blue-300">
          CodeRoom
        </h1>
      </div>
      <div className="relative hidden lg:flex lg:flex-col ">
        {/* Timeline line - Made thicker for better visibility */}
        <div className="absolute left-1/2 lg:transform lg:-translate-x-1/2 h-full w-1 lg:bg-blue-400" />
        
        {cards.map((card, index) => (
          <div key={index} className="relative mb-16">
            <div className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
              {/* Timeline dot - Made larger and with border */}
              <div className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-400 ${index!=0 && " mt-[-150px] "} rounded-full z-10 border-2 border-white dark:border-gray-900`} />
              
              {/* Connecting line - Improved positioning and width */}
              <div className={`absolute top-1/2 transform -translate-y-1/2  ${index!=0 && 'mt-[-75px]'} ${
                index % 2 != 0 
                  ? 'left-[calc(50%+8px)] w-[calc(25%-8px)]' 
                  : 'right-[calc(50%+8px)] w-[calc(25%-8px)]'
              } h-0.5 bg-blue-400`} />
              
              {/* Card - Added gap between card and line */}
              <div className={`w-[40%]  ${index % 2 === 0 ? 'ml-24 pr-12' : 'mr-24 pl-12'} ${index!=0 && 'mt-[-150px]'}`}>
                <div
                  onClick={() => navigate(`${baseUrl}${card.link}`)}
                  className="aspect-video group cursor-pointer text-black dark:text-white bg-slate-200/50 dark:bg-slate-900/50 shadow-lg dark:shadow-blue-500/50 rounded-lg hover:-translate-y-1 border-2 border-slate-900/30 dark:border-slate-300/30  transition-transform duration-300"
                >
                  <div className="relative h-[80%] overflow-hidden rounded-t-lg">
                    <img
                      src={card.imageLight}
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 block dark:hidden"
                    />
                    <img
                      src={card.imageDark}
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 hidden dark:block"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-2 dark:text-blue-400  group-hover:text-blue-300 transition-colors duration-300">
                      {card.title}
                    </h3>
                    <p className="text-sm dark:text-gray-300">
                      {card.description}
                    </p>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          
        ))}
        
        
      </div>
      <div className="relative lg:hidden flex flex-col items-center justify-center">
          {cards.map((card) => (
            <div className={`w-full mb-11 `}>
            <div
              onClick={() => navigate(`${baseUrl}${card.link}`)}
              className="group cursor-pointer bg-gray-900 rounded-lg shadow-lg shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative h-44 overflow-hidden rounded-t-lg">
                <img
                  src={card.imageLight}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 block dark:hidden"
                />
                <img
                  src={card.imageDark}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 hidden dark:block"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2 text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-300">
                  {card.description}
                </p>
              </div>
            </div>
          </div>
          ))}
        </div>
    </div>
  );
};

export const PlayGround: React.FC = () => {
  return (
    <div className="mx-auto min-h-fit overflow-auto">
      <Outlet />
    </div>
  );
};




