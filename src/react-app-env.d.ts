/// <reference types="react-scripts" />
// 1. 在 react-app-env.d.ts 中声明类型
declare namespace NodeJS {
  interface ProcessEnv {
    readonly REACT_APP_API_URL: string;
    readonly REACT_APP_ENV: 'dev' | 'prod';
  }
}