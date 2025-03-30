import React, { createContext, useContext, useState, ReactNode } from "react";

type ViewMode = "normal" | "edit";

interface ViewModeContextProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

const ViewModeContext = createContext<ViewModeContextProps | undefined>(
  undefined
);

interface ProductViewModeProps {
  children: ReactNode;
}

export const ProductViewMode: React.FC<ProductViewModeProps> = ({ children }) => {
  const [viewMode, setViewMode] = useState<ViewMode>("normal");

  return (
    <ViewModeContext.Provider value={{ viewMode, setViewMode }}>
      {children}
    </ViewModeContext.Provider>
  );
};

export const useViewMode = () => {
  const context = useContext(ViewModeContext);
  if (!context) {
    throw new Error("useViewMode must be used within a ProductViewMode");
  }
  return context;
};
