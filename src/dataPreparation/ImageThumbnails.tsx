import axios from "axios";
import { useFileContext } from "../contexts/FileContext";
import React from "react";
import exp from "constants";

interface ThumbnailInfo {
    thumbnail: string;
    original: string;
}
const apiUrl = process.env.REACT_APP_API_URL;
export const useFetchImgs = () => {
    const {currentFilesPath, setCurrentFilesPath} =  useFileContext();
    const [files, setFiles] = React.useState<ThumbnailInfo[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | null>(null);
    const fetchFiles = React.useCallback(async () => {
        try {
                const res = await axios.get(
                    `http://${apiUrl}/api/imgsview?path=${encodeURIComponent(currentFilesPath)}`
                );
                setFiles(res.data.images);
            } catch (err) {
                console.error('Error fetching files:', err);
                setError('无法获取文件列表');
            } finally {
                setLoading(false);
            }
        }, [currentFilesPath]); // 依赖项添加 path

    React.useEffect(() => {
            fetchFiles();
        }, [fetchFiles]); 
    return { 
        files,  
        loading, 
        error, 
        currentFilesPath
    };
}
export const ImagesViewThumbnails = function():ThumbnailInfo[] {

  const {files} = useFetchImgs();
  // const [files, setFiles] = React.useState<FileInfo[]>([]);
  console.log('FileTableRows:',files);
  // 使用useMemo转换数据并添加id字段 [[3]][[6]]
  const rows: ThumbnailInfo[] = 
      files.map((file, index) => ({
        thumbnail: file.thumbnail,
        original: file.original
      }));
  return rows;
};
 