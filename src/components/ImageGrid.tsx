// ImageGrid.tsx
import { Grid, GridProps, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ImagesViewThumbnails } from '../dataPreparation/ImageThumbnails';
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';
import { useFileContext } from '../contexts/FileContext';

const apiUrl = process.env.REACT_APP_API_URL;
const useStyles = makeStyles({
  gridItem: {
    transition: 'transform 0.3s',
    '&:hover': {
      transform: 'scale(1.02)',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
    }
  },
  image: {
    borderRadius: 8,
    cursor: 'pointer'
  }
});
interface ThumbnailInfo {
    thumbnail: string;
    original: string;
}

interface ImageGridProps extends GridProps {
  //images: Array<ThumbnailInfo>;
  onImageClick: (Src: string) => void;
}

export default function ImageGrid({ onImageClick }: ImageGridProps) {
  const { currentFilesPath, setCurrentFilesPath } = useFileContext();
  const classes = useStyles();
  const images=ImagesViewThumbnails();
  return (
    <Grid container spacing={3}>
      {images.map((value: ThumbnailInfo, index: number) => (
        <Grid size={ {xs: 12 ,sm:6, md:4, lg: 3} }  key={index} className={classes.gridItem}>
          <ImageListItem>
            <img
              src={`http://${apiUrl}/api/img?path=${encodeURIComponent(currentFilesPath+"/"+value.thumbnail)}`}
              alt={value.original}
              loading="lazy"
              className={classes.image}
              onClick={() => onImageClick(currentFilesPath+"/"+value.original)}
            />
            <ImageListItemBar
              title={value.original}
              position="below"
              sx={{ paddingLeft: 1 }}
            />
          </ImageListItem>
        </Grid>
      ))}
    </Grid>
  );
}