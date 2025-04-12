import React, { createContext, useContext, useState, ReactNode } from "react";

type ViewMode = "normal" | "edit";

interface ViewModeContextProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

const ProductViewModeContext = createContext<ViewModeContextProps | undefined>(undefined);

interface ProductViewModeProviderProps {
  children: ReactNode;
}

export const ProductViewModeProvider: React.FC<ProductViewModeProviderProps> = ({ children }) => {
  const [viewMode, setViewMode] = useState<ViewMode>("normal");

  return (
    <ProductViewModeContext.Provider value={{ viewMode, setViewMode }}>
      {children}
    </ProductViewModeContext.Provider>
  );
};

export const useProductViewMode = () => {
  const context = useContext(ProductViewModeContext);
  if (!context) {
    throw new Error("useProductViewMode must be used within a ProductViewModeProvider");
  }
  return context;
};
