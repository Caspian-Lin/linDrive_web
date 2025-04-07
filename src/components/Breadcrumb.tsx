// src/components/Breadcrumb.tsx
import { Link, Typography } from '@mui/material';
import React from 'react';

export default function Breadcrumb({ path }: { path: string }) {
  const segments = path.split('/').filter(Boolean);

  return (
    <div style={{ padding: '1rem' }}>
      <Link href="#" onClick={() => window.location.reload()} color="inherit">
        根目录
      </Link>
      {segments.map((seg, index) => (
        <span key={index}>
          {' / '}
          <Link href="#" onClick={() => {/* 跳转逻辑 */}}>
            {seg}
          </Link>
        </span>
      ))}
    </div>
  );
}