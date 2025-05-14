// ImageViewer.tsx
import { Dialog, IconButton, Slide } from '@mui/material';
import { Close, NavigateBefore, NavigateNext } from '@mui/icons-material';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ImageViewerProps {
  open: boolean;
  imageSrc: string;
  name: string;
  onClose: () => void;
  onChangeSrc: (newSrc: string) => void;
}
const apiUrl = process.env.REACT_APP_API_URL;
export default function ImageViewer({ 
  open, imageSrc,name, onClose, onChangeSrc
}: ImageViewerProps) {
  
  // const handleKeyDown = (e: KeyboardEvent) => {
  //   if (e.key === 'ArrowLeft') {
  //     onChangeIndex((currentIndex - 1 + images.length) % images.length);
  //   } else if (e.key === 'ArrowRight') {
  //     onChangeIndex((currentIndex + 1) % images.length);
  //   }
  // };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      // onKeyDown={handleKeyDown}
    >
      <div style={{ position: 'relative', height: '100%' }}>
        <IconButton
          onClick={() => onChangeSrc(imageSrc)}
          sx={{ position: 'absolute', left: 20, top: '50%', zIndex: 1 }}
        >
          <NavigateBefore fontSize="large" />
        </IconButton>
        
        <img 
          src={`http://${apiUrl}/api/img?path=${encodeURIComponent(imageSrc)}`} 
          style={{ 
            maxHeight: '90vh',
            maxWidth: '90%',
            margin: 'auto',
            display: 'block'
          }}
          alt={`Preview ${name}`}
        />
        
        <IconButton
          onClick={() => onChangeSrc(imageSrc)}
          sx={{ position: 'absolute', right: 20, top: '50%', zIndex: 1 }}
        >
          <NavigateNext fontSize="large" />
        </IconButton>
        
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', right: 20, top: 20 }}
        >
          <Close fontSize="large" />
        </IconButton>
      </div>
    </Dialog>
  );
}