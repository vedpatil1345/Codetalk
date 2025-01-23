
import { AuthProvider } from "@/components/auth/AuthContext";
import { Routes, Route } from "react-router-dom";
import {Layout} from "@/components/Layout";
import AuthPage from "@/components/auth/AuthPage";
import { Home } from "@/components/pages/Home";
import { PlayGroundPage , PlayGround } from "@/components/pages/PlayGround";
import {CodeAnalysisPage} from "@/components/pages/CodeAnalysisPage";
import { ErrorAnalysisPage } from "@/components/pages/ErrorAnalysisPage";
import { Image2CodePage } from "@/components/pages/Image2CodePage";
import { TranslatePage } from "@/components/pages/TranslatePage";
import { CodeWithAi } from "@/components/pages/CodeWithAi";
import { HelpPage } from "@/components/pages/HelpPage";
import { ContactPage } from "@/components/pages/ContactPage";
import 'regenerator-runtime/runtime';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="auth" element={<AuthPage />} />
          <Route path="help" element={<HelpPage/>} />
          <Route path="contact" element={<ContactPage/>} />
          {/* Nested Playground Routes */}
          <Route path="playground" element={<PlayGround />}>
            <Route index element={<PlayGroundPage />} />
            <Route path="code-analysis" element={<CodeAnalysisPage />} />
            <Route path="error-analysis" element={<ErrorAnalysisPage />} />
            <Route path="img-code" element={<Image2CodePage />} />
            <Route path="code-translation" element={<TranslatePage />} />
            <Route path="chat" element={<CodeWithAi />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
