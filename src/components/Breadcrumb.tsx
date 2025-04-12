// src/components/Breadcrumb.tsx
import { Link, Typography,TableCell } from '@mui/material';
import React from 'react';
// 定义 Props 接口
interface BreadcrumbProps {
  path: string;
  onDirClick: (path: string) => void;
}
export default function Breadcrumb({ path, onDirClick }: BreadcrumbProps) {
    // 分割目录
  const segments = path.split('/').filter(Boolean);
  const getBreadcrumbPath = (index: number) => {
    return '/' + segments.slice(0, index + 1).join('/');
  };
  return (
    <>
      {segments.map((seg, index) => (
        <a onClick = {() => onDirClick(getBreadcrumbPath(index))}>
          {'/'}
            {seg}
        </a>
      ))}
    </>
  );
}