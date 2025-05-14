// contexts/ViewTypeContext.tsx
import React, { createContext, useContext, useState } from 'react';

type ViewTypeContextType = {
  currentViewType: string;
  setCurrentViewType: (type: string) => void;
};

const ViewTypeContext = createContext<ViewTypeContextType>({
  currentViewType: 'Home',
  setCurrentViewType: () => {}, // 默认空函数
});

export const ViewTypeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentViewType, setCurrentViewType] = useState<string>('');

  return (
    <ViewTypeContext.Provider value={{ currentViewType, setCurrentViewType }}>
      {children}
    </ViewTypeContext.Provider>
  );
};

export const useViewTypeContext = () => useContext(ViewTypeContext);