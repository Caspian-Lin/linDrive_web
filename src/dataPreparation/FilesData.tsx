
import axios, { AxiosResponse } from 'axios';
import * as React from 'react';

import { GridCellParams, GridRowsProp, GridColDef, GridValidRowModel } from '@mui/x-data-grid';

import {
  Chip
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

// import Breadcrumb from './Breadcrumb';
// import ImagePreview from './ImagePreview';
import { useFileContext } from '../contexts/FileContext';


interface FileInfo {
  name: string;
  isDir: boolean;
  size: number;
  modTime: string;
  path: string;
}
// 自定义 Hook 用于获取文件列表
export const useFetchFiles = () => {
    const [files, setFiles] = React.useState<FileInfo[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | null>(null);
    const { currentFilesPath, setCurrentFilesPath } = useFileContext();
    // 修复 1：将 fetchFiles 改为 async 函数
    const fetchFiles = React.useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get(
                `http://115.159.31.68:8010/api/files?path=${encodeURIComponent(currentFilesPath)}`
            );
            setFiles(res.data.data);
        } catch (err) {
            console.error('Error fetching files:', err);
            setError('无法获取文件列表');
        } finally {
            setLoading(false);
        }
    }, [currentFilesPath]); // 依赖项添加 path

    // 修复 2：解注并修正 useEffect
    React.useEffect(() => {
        fetchFiles();
    }, [fetchFiles]); // 依赖 fetchFiles（被 useCallback 包裹）

    // 修复 3：返回完整的 API 接口
    return { 
        files, 
        fetchFiles, 
        loading, 
        error, 
        currentFilesPath
    };
};

  // TODO: 处理列表点击 要放到别的模组去
  // const [previewOpen, setPreviewOpen] = React.useState(false);
  // const [previewImages, setPreviewImages] = React.useState<{ src: string; alt?: string }[]>([]);
  // const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
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

  // // 处理目录点击
  // const handleDirClick = (path: string) => {
  //   const { setCurrentFilesPath } = useFileContext();
  //   setCurrentFilesPath(path);
  //   useFetchFiles(path);
  // };
  // 初始化加载

  

          // <TableCell >
          //   <div style={{ textAlign: 'left' }}> 
          //     <a onClick={() => handleDirClick('')}>{"test"}</a>
          //     <Breadcrumb path = {currentPath} onDirClick={handleDirClick}/>
          //   </div>
          // </TableCell>

          // {files && files.map((file) => (
          //   <TableRow
          //     key={file.path}
          //     hover
          //     onClick={() =>  handleItemClick(file)}
          //     sx={{ cursor: file.isDir ? 'pointer' : 'default' }}
          //   >
          //     <TableCell>
          //       {file.isDir ? (
          //         <>
          //           <FolderIcon color="primary" sx={{ verticalAlign: 'bottom' }} />
          //           {file.name}
          //         </>
          //       ) : (
          //         <>
          //           <InsertDriveFileIcon sx={{ verticalAlign: 'bottom' }} />
          //           {file.name}
          //         </>
          //       )}
          //     </TableCell>
          //     <TableCell align="right">{file.isDir ? '目录' : '文件'}</TableCell>
          //     <TableCell align="right">
          //       {file.isDir ? '-' : `${(file.size / 1024).toFixed(2)} KB`}
          //     </TableCell>
          //     <TableCell align="right">{file.modTime}</TableCell>
          //   </TableRow>
          // ))}


    // <ImagePreview
    //     open={previewOpen}
    //     images={previewImages}
    //     initialIndex={currentImageIndex}
    //     onClose={() => setPreviewOpen(false)}
    //     onIndexChange={setCurrentImageIndex}
    //   />


function renderStatus(status: 'Online' | 'Offline') {
  const colors: { [index: string]: 'success' | 'default' } = {
    Online: 'success',
    Offline: 'default',
  };

  return <Chip label={status} color={colors[status]} size="small" />;
}

function renderFileTypeIcon(status: boolean) {
  return status ? <FolderIcon color="primary" sx={{ verticalAlign: 'bottom' }} /> : <InsertDriveFileIcon sx={{ verticalAlign: 'bottom' }} />
}

export const FileTableheader: GridColDef[] = [

  { field: 'name', headerName: '名称', flex: 1.5, minWidth: 200,
    renderCell: (params) => (<div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      height: '100%',
      padding: '0 12px',
    }}>
      {/* 动态渲染文件类型图标 */}
      {renderFileTypeIcon(params.value.isDir as any)}
      <span>
        {params.value.name}
      </span>
    </div>), 
  },
  {
    field: 'status', 
    headerName: '状态',
    flex: 0.5,
    width: 80,
    renderCell: (params) => renderStatus(params.value as any), //暂时保留 未来有用
  },
  {
    field: 'isDir',
    headerName: '类型',
    headerAlign: 'left',
    align: 'left',
    resizable: false,
    flex: 1,
    width: 1,
    renderCell: (params) => {
      return params.value ? '文件夹' : '文件';} 
  },
  {
    field: 'size',
    headerName: '大小',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    width: 100,
    renderCell: (params) => {
      return params.value.isDir ? "" : (params.value.size/ 1024).toFixed(2)+'KB';} 
  },
  {
    field: 'modTime',
    headerName: '修改时间',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    width: 120,
  },
];


export const FileTableRows = function():GridRowsProp{
  // 正确使用useState的位置 [[7]][[9]]
  const {files, loading,error,currentFilesPath} = useFetchFiles();
  // const [files, setFiles] = React.useState<FileInfo[]>([]);
  console.log('FileTableRows:',files);
  // 使用useMemo转换数据并添加id字段 [[3]][[6]]
  const rows: GridRowsProp = 
      files.map((file, index) => ({
        id: index, 
        status: 'Online',
        name: {name:file.name,isDir:file.isDir},
        isDir: file.isDir,
        size: {size:file.size,isDir:file.isDir},
        modTime: file.modTime,
      }));
  // 返回表格数据（需配合表格组件使用）
  
  return rows;
};

