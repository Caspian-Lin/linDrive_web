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

   // 获取文件列表
  const fetchFiles = async (path: string = '') => {
    try {
      const res = await axios.get(`http://localhost:8010/api/files?path=${encodeURIComponent(path)}`);
      setFiles(res.data);
      setCurrentPath(path);
      console.log('API response:', res.data);
    } catch (err) {
      console.error('Error fetching files:', err);
    }
  };

  // 处理目录点击
  const handleDirClick = (path: string) => {
    fetchFiles(path);
  };

  // 初始化加载
  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 800, margin: '2rem auto' }}>
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
          {files.map((file) => (
            <TableRow
              key={file.path}
              hover
              onClick={() => file.isDir && handleDirClick(file.path)}
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
  );
}