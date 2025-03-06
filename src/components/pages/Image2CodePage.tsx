import { useState, useCallback, useEffect } from "react";
import { Buffer } from "buffer";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Upload, Loader2, AlertCircle, Code } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MarkDown } from "../MarkDown";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { DragEvent, ChangeEvent } from "react";

const LANGUAGES = [
  { value: "html", label: "HTML/CSS" },
  { value: "react", label: "React" },
  { value: "flutter", label: "Flutter" },
  { value: "nextjs", label: "Next.js" },
] as const;

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export const Image2CodePage = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [generatedCode, setGeneratedCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("html");
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    return () => {
      if (selectedImage) URL.revokeObjectURL(URL.createObjectURL(selectedImage));
    };
  }, [selectedImage]);

  const handleDrag = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(e.type === "dragenter" || e.type === "dragover");
  }, []);

  const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer?.files?.[0];
    if (file && file.type.startsWith("image/") && file.size <= 10 * 1024 * 1024) {
      setSelectedImage(file);
      setError("");
    } else {
      setError("Please upload a valid image file (max 10MB).");
    }
  }, []);

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/") && file.size <= 10 * 1024 * 1024) {
      setSelectedImage(file);
      setError("");
    } else {
      setError("Please upload a valid image file (max 10MB).");
    }
  };

  const fileToGenerativePart = async (file: File) => {
    const data = await file.arrayBuffer();
    return {
      inlineData: {
        data: Buffer.from(data).toString("base64"),
        mimeType: file.type,
      },
    };
  };

  const generateCode = async () => {
    if (!selectedImage) return;
    setError("");
    try {
      setLoading(true);
      const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-pro" });
      const imagePart = await fileToGenerativePart(selectedImage);
      const prompt = `Generate ${selectedLanguage.toUpperCase()} code for this image.`;
      const result = await model.generateContent([prompt, imagePart]);
      setGeneratedCode(await result.response.text());
    } catch (error) {
      setError("Error generating code. Please try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetAll = () => {
    setSelectedImage(null);
    setGeneratedCode("");
    setError("");
  };

  return (
    <div className="min-h-[85vh] w-full bg-transparent px-4 md:px-0">
      <div className="container mx-auto max-w-screen">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-500 dark:from-blue-400 dark:to-blue-300">
          Image to Code Converter
        </h1>

        <div className="relative max-w-[85vw] grid grid-cols-1 lg:grid-cols-[40%_60%] gap-4 lg:gap-8">
          {/* Configuration Section */}
          <div className="space-y-6 bg-slate-200/50 dark:bg-slate-900/50 p-4 rounded-lg border-2 border-slate-900/30 dark:border-slate-300/30 shadow-md">
            <div>
              <h2 className="text-2xl font-medium mb-4">Configuration</h2>
              <label htmlFor="platform-select" className="block font-medium mb-2">Select Platform</label>
              <Select
                onValueChange={setSelectedLanguage}
                defaultValue={selectedLanguage}
              >
                <SelectTrigger id="platform-select" className="w-full bg-slate-300/50 hover:bg-slate-400/50 dark:bg-slate-700/50 dark:hover:bg-slate-600/50 border-2 border-slate-900/30 dark:border-slate-300/50">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="file-input" className="block font-medium mb-2">Upload Image</label>
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-lg p-6 transition-all duration-200 ${
                  isDragging
                    ? "border-blue-500 bg-blue-50/50 dark:bg-blue-900/20"
                    : "border-slate-900/30 dark:border-slate-300/50 hover:border-blue-400"
                }`}
              >
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  aria-label="Upload image"
                />
                
                {selectedImage ? (
                  <div className="flex flex-col items-center space-y-4">
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="Selected"
                      className="max-w-full h-32 object-contain rounded-lg shadow-lg"
                    />
                    <p className="text-sm opacity-70">{selectedImage.name}</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center space-y-4">
                    <Upload className="w-12 h-12 text-blue-500" />
                    <div className="text-center">
                      <p className="font-medium">
                        <span className="text-blue-500">Click to upload</span>
                        <span className="opacity-70"> or drag and drop</span>
                      </p>
                      <p className="text-sm opacity-70 mt-1">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                )}
              </div>
              {error && (
                <Alert variant="destructive" className="mt-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={generateCode}
                disabled={!selectedImage || loading}
                className="flex-1 px-6 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                {loading ? "Generating..." : "Generate Code"}
              </button>
              <button
                onClick={resetAll}
                className="px-6 py-2.5 bg-slate-300 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg hover:opacity-90 transition-opacity font-medium"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Generated Code Section */}
          <div className="h-[calc(100vh-12rem)] bg-slate-200/50 dark:bg-slate-900/50 rounded-lg border-2 border-slate-900/30 dark:border-slate-300/30 shadow-md">
            <div className="relative flex items-center justify-between px-4 py-2 border-b border-slate-900/30 dark:border-slate-300/30">
              <div className="flex items-center text-xl font-medium">
                <Code className="w-5 h-5 mr-2" />
                Generated Code
              </div>
            </div>
            <div className="h-[calc(100%-3rem)] overflow-auto">
              <div className="p-4">
                <MarkDown>
                  {generatedCode
                    ? generatedCode
                    : selectedImage
                    ? loading
                      ? "Generating..."
                      : "No code generated yet."
                    : "Upload an image to generate code."}
                </MarkDown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Image2CodePage;