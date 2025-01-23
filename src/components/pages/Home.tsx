import React, { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const words = ["Talk", "AI", "Future", "Dreams", "Innovation", "Possibilities"];
const TYPING_SPEED = 150;
const DELETING_SPEED = 100;
const PAUSE_TIME = 2000;

export function TypewriterEffect() {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [delta, setDelta] = useState(TYPING_SPEED);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentWord = words[wordIndex];

      if (isDeleting) {
        setText(currentWord.substring(0, text.length - 1));
        setDelta(DELETING_SPEED);
      } else {
        setText(currentWord.substring(0, text.length + 1));
        setDelta(TYPING_SPEED);
      }

      if (!isDeleting && text === currentWord) {
        setTimeout(() => setIsDeleting(true), PAUSE_TIME);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    }, delta);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, delta]);

  return (
    <span className="text-primary-600 font-bold">
      {text}
      <span className="animate-pulse">|</span>
    </span>
  );
}

export const Home: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center text-center lg:max-h-screen">
      <h1
        className=" text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent transition-colors duration-300
                   bg-gradient-to-r from-blue-800 via-blue-800 to-blue-800
                   dark:from-blue-500 dark:via-blue-400 dark:to-blue-500  p-1"
      >
        Code{'{'}<TypewriterEffect />{'}'}
      </h1>
      <h1 className="text-lg dark:text-white lg:text-2xl mt-6 mb-4 w-[70%] lg:w-full max-w-4xl mx-auto">
        The Online Code Analysis And Debugging Platform
      </h1>
      <p className="text-sm lg:text-lg text-muted-foreground mb-4 w-[70%] lg:w-full max-w-4xl mx-auto">
        Analyze, debug, and optimize your code with AI assistance
      </p>
      <div className="flex justify-center gap-4">
        <Button
          className="bg-blue-500 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-800 text-white lg:h-14 lg:w-44 lg:text-xl lg:px-8 lg:py-4 lg:rounded-lg"
          size="lg"
          onClick={user ? () => navigate("/playground") : () => navigate("/auth")}
        >
          {user ? "CodeRoom" : "Get Started"}
        </Button>
      </div>
      <div className="block w-[80%] lg:w-1/4 mx-auto mt-5 mb-2 items-center rounded-xl">
        <iframe
          className="w-full aspect-video rounded-xl shadow-xl shadow-blue-800/50 dark:shadow-blue-500/50"
          src="https://www.youtube.com/embed/psTOEr2itDo?si=GXecUrHGlOCQw0cf"
          title="YouTube video player"
          aria-label="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
      <ToolsDisplay/>
    </div>
  );
};
import vitelogo from '@/assets/vite.svg';
import reactlogo from '@/assets/react.svg';
import metalogo from '@/assets/meta.svg';

const ToolsDisplay = () => {
  return (
    <div className="w-full bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <h1 className="text-xl text-gray-200 text-center mb-5">
        Tools we Integrate for Context & Communication
      </h1>
      
      <div className="justify-center mx-auto">
        <div className="flex flex-wrap justify-center gap-4">
          {/* Row 1 */}
          <div className="bg-slate-800/50 rounded-lg p-4 flex items-center gap-2 hover:bg-slate-700/50 transition-colors">
            <img src={reactlogo} alt="React" className="w-6 h-6" />
            <span className="text-gray-200">React</span>
          </div>
          
          <div className="bg-slate-800/50 rounded-lg p-4 flex items-center gap-2 hover:bg-slate-700/50 transition-colors">
            <img src={vitelogo} alt="Vite" className="w-6 h-6" />
            <span className="text-gray-200">Vite</span>
          </div>
          
          <div className="bg-slate-800/50 rounded-lg p-4 flex items-center gap-2 hover:bg-slate-700/50 transition-colors">
            <svg className="w-6 h-6" viewBox="0 0 54 33" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M27 0C19.8 0 15.3 3.6 13.5 10.8C16.2 7.2 19.35 5.85 22.95 6.75C25.004 7.263 26.472 8.754 28.097 10.403C30.744 13.09 33.808 16.2 40.5 16.2C47.7 16.2 52.2 12.6 54 5.4C51.3 9 48.15 10.35 44.55 9.45C42.496 8.937 41.028 7.446 39.403 5.797C36.756 3.11 33.692 0 27 0ZM13.5 16.2C6.3 16.2 1.8 19.8 0 27C2.7 23.4 5.85 22.05 9.45 22.95C11.504 23.464 12.972 24.954 14.597 26.603C17.244 29.29 20.308 32.4 27 32.4C34.2 32.4 38.7 28.8 40.5 21.6C37.8 25.2 34.65 26.55 31.05 25.65C28.996 25.137 27.528 23.646 25.903 21.997C23.256 19.31 20.192 16.2 13.5 16.2Z" fill="#38BDF8"/>
            </svg>
            <span className="text-gray-200">TailwindCSS</span>
          </div>
          
          <div className="bg-slate-800/50 rounded-lg p-4 flex items-center gap-2 hover:bg-slate-700/50 transition-colors">
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path fill="#FFA611" d="M3.89 15.673L6.255 2.461A.542.542 0 0 1 7.27 2.16L12 4.854v14.839l-8.11-4.02zm4.053 1.266l8.478-4.207-8.478-4.208v8.415z"/>
            </svg>
            <span className="text-gray-200">Firebase</span>
          </div>
          
          <div className="bg-slate-800/50 rounded-lg p-4 flex items-center gap-2 hover:bg-slate-700/50 transition-colors">
          <img src={metalogo} alt="Vite" className="h-6" />
            <span className="text-gray-200">Meta Llama</span>
          </div>

          {/* Row 2 */}
          <div className="bg-slate-800/50 rounded-lg p-4 flex items-center gap-2 hover:bg-slate-700/50 transition-colors">
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            <span className="text-gray-200">Email</span>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4 flex items-center gap-2 hover:bg-slate-700/50 transition-colors">
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M3 13.5C3 9.36 6.36 6 10.5 6c2.07 0 3.81.78 5.13 2.03L12.5 11.16c-.69-.66-1.66-1.07-2.72-1.07-2.39 0-4.33 1.94-4.33 4.33s1.94 4.33 4.33 4.33c2.22 0 3.41-1.02 3.81-2.53H10.5v-2.42h6.32c.06.33.09.69.09 1.07 0 3.87-2.59 6.62-6.41 6.62C6.36 21 3 17.64 3 13.5z"/>
            </svg>
            <span className="text-gray-200">Gemini</span>
          </div>
        </div>
      </div>
    </div>
  );
};