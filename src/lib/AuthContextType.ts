
import { User } from "firebase/auth";

export interface AuthContextType {
    user: User | null;
    loading: boolean;
    signInWithEmail: (email: string, password: string) => Promise<void>;
    signUpWithEmail: (email: string, password: string) => Promise<void>;
    signInWithGoogle: () => Promise<void>;
    signInWithGithub: () => Promise<void>;
    logout: () => Promise<void>;
  }