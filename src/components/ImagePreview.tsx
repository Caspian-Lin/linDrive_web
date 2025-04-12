// ImagePreview.tsx
import React, {useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  Box,
  useTheme,
  useMediaQuery
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import RotateRightIcon from '@mui/icons-material/RotateRight';

interface ImagePreviewProps {
  open: boolean;
  images: { src: string; alt?: string }[];
  initialIndex?: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

export default function ImagePreview({
  open,
  images,
  initialIndex = 0,
  onClose,
  onIndexChange
}: ImagePreviewProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // 同步索引变化
  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  // 键盘导航
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (open) {
        switch(e.key) {
          case 'ArrowLeft':
            handlePrev();
            break;
          case 'ArrowRight':
            handleNext();
            break;
          case 'Escape':
            onClose();
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, currentIndex]);

  // 切换图片
  const handleNext = () => {
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
    onIndexChange(newIndex);
    resetTransform();
  };

  const handlePrev = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(newIndex);
    onIndexChange(newIndex);
    resetTransform();
  };

  const resetTransform = () => {
    setScale(1);
    setRotation(0);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={isMobile}
      maxWidth="lg"
    >
      <DialogContent sx={{ position: 'relative' }}>
        {/* 主图片显示 */}
        <Box
          sx={{
            transform: `scale(${scale}) rotate(${rotation}deg)`,
            transition: 'transform 0.3s',
            transformOrigin: 'center center'
          }}
        >
          <img
            src={images[currentIndex]?.src}
            alt={images[currentIndex]?.alt || `Image ${currentIndex + 1}`}
            style={{
              maxWidth: '100%',
              maxHeight: '80vh',
              display: 'block',
              margin: '0 auto'
            }}
          />
        </Box>

        {/* 控制栏 */}
        <Stack
          direction="row"
          spacing={1}
          sx={{
            position: 'fixed',
            bottom: 16,
            left: '50%',
            transform: 'translateX(-50%)',
            bgcolor: 'background.paper',
            p: 1,
            borderRadius: 2,
            boxShadow: 1
          }}
        >
          <IconButton onClick={() => setScale(Math.min(scale + 0.2, 3))}>
            <ZoomInIcon />
          </IconButton>
          <IconButton onClick={() => setScale(Math.max(scale - 0.2, 0.5))}>
            <ZoomOutIcon />
          </IconButton>
          <IconButton onClick={() => setRotation(prev => prev + 90)}>
            <RotateRightIcon />
          </IconButton>
        </Stack>

        {/* 导航按钮 */}
        {images.length > 1 && (
          <>
            <IconButton
              onClick={handlePrev}
              sx={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }}
            >
              <NavigateBeforeIcon fontSize="large" />
            </IconButton>
            <IconButton
              onClick={handleNext}
              sx={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)' }}
            >
              <NavigateNextIcon fontSize="large" />
            </IconButton>
          </>
        )}

        {/* 关闭按钮 */}
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', right: 16, top: 16 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogContent>
    </Dialog>
  );
}