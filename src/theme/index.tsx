// src/theme/index.ts
import { createTheme, ThemeOptions } from '@mui/material';

const lightTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    // 其他颜色配置
  },
};

const darkTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: { main: '#90caf9' },
    // 其他颜色配置
  },
};

export const getTheme = (mode: 'light' | 'dark') => 
  createTheme(mode === 'light' ? lightTheme : darkTheme);