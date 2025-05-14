import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CustomizedDataGrid from './CustomizedDataGrid';
import { useViewTypeContext, ViewTypeProvider } from '../contexts/ViewTypeContect';
import ImageGrid from './ImageGrid';
import ImageViewer from './ImageViewer';
import { useEffect, useReducer, useState } from 'react';

// const mockImages = Array.from({ length: 12 }, (_, i) => ({
//   id: i,
//   src: `https://picsum.photos/500/300?random=${i}`,
//   title: `Image ${i + 1}`
// }));

// 新增公共布局组件（网页6、网页8）
const ViewLayout = ({ 
  title,
  children 
}: { 
  title: string;
  children: React.ReactNode;
}) => (
  <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
    <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
      {title}
    </Typography>
    <Grid container spacing={4} columns={9}>
      <Grid size={{ xs: 24, lg: 9 }}> 
        {children}
      </Grid>
    </Grid>
  </Box>
);
export default function MainGrid() {
  const { currentViewType } = useViewTypeContext();
  const [open, setOpen] = useState(false);
  const [currentSrc, setCurrentSrc ]= useState<string>('');

  const handleOpen = (Src: string) => {
    setCurrentSrc(Src);
    setOpen(true);
  };

  // 类型定义提升至组件顶层（网页6）
  type ViewType = 'Home' | 'Images View'; // 明确限定可选的视图类型[6,8](@ref)

  // 重构视图配置对象（网页1）
  const viewConfig = {
    Home: {
      title: "文件列表",
      content: (
        <CustomizedDataGrid 
          onImageClick={handleOpen}
        />
      )
    },
    'Images View': {
      title: "图片列表",
      content: (
        <ImageGrid 
          onImageClick={handleOpen}
        />
      )
    }
  } as const; // 使用as const锁定类型[6,8](@ref)

  // 添加默认视图保护（网页3）
  const safeViewType: ViewType = viewConfig.hasOwnProperty(currentViewType) 
    ? currentViewType as ViewType 
    : 'Home';

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        {viewConfig[safeViewType].title}
      </Typography>
      
      {/* 主内容区域 */}
      <Grid container spacing={4}>
        <Grid size={{xs:12,lg:9}}> {/* 修正Grid属性（网页3） */}
          {viewConfig[safeViewType].content}
        </Grid>
      </Grid>

      {/* 公共图片查看器 */}
      <ImageViewer
        open={open}
        imageSrc={currentSrc}
        name={currentSrc}
        onClose={() => setOpen(false)}
        onChangeSrc={setCurrentSrc}
      />
    </Box>
    
  );
}