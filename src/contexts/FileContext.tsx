// contexts/FileContext.tsx
import React, { createContext, useContext, useState } from 'react';

type FilesPathContextType = {
  currentFilesPath: string;
  setCurrentFilesPath: (path: string) => void;
};

const FileContext = createContext<FilesPathContextType>({
  currentFilesPath: '',
  setCurrentFilesPath: () => {}, // 默认空函数
});

export const FileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentFilesPath, setCurrentFilesPath] = useState<string>('');

  return (
    <FileContext.Provider value={{ currentFilesPath, setCurrentFilesPath }}>
      {children}
    </FileContext.Provider>
  );
};

export const useFileContext = () => useContext(FileContext);