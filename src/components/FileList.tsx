import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

import Breadcrumb from './Breadcrumb';
import ImagePreview from './ImagePreview';


interface FileInfo {
  name: string;
  isDir: boolean;
  size: number;
  modTime: string;
  path: string;
}

export default function FileList() {
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [currentPath, setCurrentPath] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImages, setPreviewImages] = useState<{ src: string; alt?: string }[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);


   // 获取文件列表
  const fetchFiles = async (path: string = '') => {
    try {
      const res = await axios.get(`http://115.159.31.68:8010/api/files?path=${encodeURIComponent(path)}`);
      setFiles(res.data.data);
      setCurrentPath(path);
      console.log('API response:', res.data);
    } catch (err) {
      console.error('Error fetching files:', err);
    }
  };
  const isImg = (filename:string)=>{
    
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
    const extension=filename.split('.').pop()?.toLowerCase()
    console.log('Check isImg:',imageExtensions.includes(extension!));
    return imageExtensions.includes(extension!); // TODO 暂时断言一下后缀存在
  }

  // 处理列表点击
  const handleItemClick = (file: FileInfo)=>{
    if(file.isDir){
      handleDirClick(file.path);
    }else if(isImg(file.name)){
      // 收集当前目录下所有图片
      const images = files
      .filter(f => isImg(f.name))
      .map(f => ({
        src: `http://115.159.31.68:8010/api/imgs?path=${encodeURIComponent(f.path)}`, // API地址
        alt: f.name
      }));

      // 找到当前点击图片的索引
      const clickedIndex = images.findIndex(img => img.alt === file.name);
      setPreviewImages(images);
      setCurrentImageIndex(clickedIndex);
      setPreviewOpen(true);
    }
  }

  // 处理目录点击
  const handleDirClick = (path: string) => {
    fetchFiles(path);
  };

  // 初始化加载
  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div>
    {/* <Breadcrumb path = {currentPath}/> */}
    <TableContainer component={Paper} sx={{ maxWidth: 800, margin: '2rem auto' }}>
      <Table><TableBody>
        <TableRow>
          <TableCell >
            <div style={{ textAlign: 'left' }}> 
              <a onClick={() => handleDirClick('')}>{"test"}</a>
              <Breadcrumb path = {currentPath} onDirClick={handleDirClick}/>
            </div>
          </TableCell>
        </TableRow>
        </TableBody>
      </Table>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>名称</TableCell>
            <TableCell align="right">类型</TableCell>
            <TableCell align="right">大小</TableCell>
            <TableCell align="right">修改时间</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {files && files.map((file) => (
            <TableRow
              key={file.path}
              hover
              onClick={() =>  handleItemClick(file)}
              sx={{ cursor: file.isDir ? 'pointer' : 'default' }}
            >
              <TableCell>
                {file.isDir ? (
                  <>
                    <FolderIcon color="primary" sx={{ verticalAlign: 'bottom' }} />
                    {file.name}
                  </>
                ) : (
                  <>
                    <InsertDriveFileIcon sx={{ verticalAlign: 'bottom' }} />
                    {file.name}
                  </>
                )}
              </TableCell>
              <TableCell align="right">{file.isDir ? '目录' : '文件'}</TableCell>
              <TableCell align="right">
                {file.isDir ? '-' : `${(file.size / 1024).toFixed(2)} KB`}
              </TableCell>
              <TableCell align="right">{file.modTime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <ImagePreview
        open={previewOpen}
        images={previewImages}
        initialIndex={currentImageIndex}
        onClose={() => setPreviewOpen(false)}
        onIndexChange={setCurrentImageIndex}
      />
    </div>
  );
}