import { log } from "console";
import { createContext, useContext, useState, ReactNode } from "react";

type ModalContextType = {
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  redirectAfterLogin: string | null;
  setRedirectAfterLogin: React.Dispatch<React.SetStateAction<string | null>>;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [redirectAfterLogin, setRedirectAfterLogin] = useState<string | null>(
    null
  );

  return (
    <ModalContext.Provider
      value={{
        isLoginModalOpen,
        setIsLoginModalOpen,
        redirectAfterLogin,
        setRedirectAfterLogin,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
console.log("Coucou");

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
