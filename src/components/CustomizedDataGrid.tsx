import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {FileTableheader,  FileTableRows } from '../dataPreparation/FilesData';
import { useFileContext } from '../contexts/FileContext';
import { GridProps } from '@mui/material';

interface ImageGridProps extends GridProps {
  // images: Array<{ id: number; src: string; title: string }>;
  onImageClick: (Src: string) => void;
}

export default function CustomizedDataGrid({ onImageClick }: ImageGridProps) {
  const { currentFilesPath, setCurrentFilesPath } = useFileContext();
  const rows = FileTableRows(); // 调用 FileTableRows 函数并传入文件数据

  return (
    
    <DataGrid
      rows={rows}
      columns={ FileTableheader}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
      }
      initialState={{
        pagination: { paginationModel: { pageSize: 20 } },
      }}
      pageSizeOptions={[10, 20, 50]}
      checkboxSelection
      disableRowSelectionOnClick
      onRowDoubleClick={(params) => {
      if (params.row.isDir) {
        setCurrentFilesPath(currentFilesPath+"/"+params.row.name.name);
      }else if (isImg(params.row.name.name)) {
        console.log('isImg:',params.row.name.name);
        onImageClick(currentFilesPath+"/"+params.row.name.name)
      }}}
      // disableColumnResize 
      density="compact"
      slotProps={{
        filterPanel: {
          filterFormProps: {
            logicOperatorInputProps: {
              variant: 'outlined',
              size: 'small',
            },
            columnInputProps: {
              variant: 'outlined',
              size: 'small',
              sx: { mt: 'auto' },
            },
            operatorInputProps: {
              variant: 'outlined',
              size: 'small',
              sx: { mt: 'auto' },
            },
            valueInputProps: {
              InputComponentProps: {
                variant: 'outlined',
                size: 'small',
              },
            },
          },
        },
      }}
    />
  );
}


const isImg = (filename:string)=>{
    
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
  const extension=filename.split('.').pop()?.toLowerCase()
  console.log('Check isImg:',imageExtensions.includes(extension!));
  return imageExtensions.includes(extension!); // TODO 暂时断言一下后缀存在
}
  // const handleItemClick = (file: FileInfo)=>{
  //   if(file.isDir){
  //     handleDirClick(file.path);
  //   }else if(isImg(file.name)){
  //     // 收集当前目录下所有图片
  //     const [files, setFiles] = React.useState<FileInfo[]>([]);
  //     const images = files
  //     .filter(f => isImg(f.name))
  //     .map(f => ({
  //       src: `http://115.159.31.68:8010/api/imgs?path=${encodeURIComponent(f.path)}`, // API地址
  //       alt: f.name
  //     }));

  //     // 找到当前点击图片的索引
  //     const clickedIndex = images.findIndex(img => img.alt === file.name);
  //     setPreviewImages(images);
  //     setCurrentImageIndex(clickedIndex);
  //     setPreviewOpen(true);
  //   }
  // }