import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {useFetchFiles, FileTableheader,  FileTableRows } from '../dataPreparation/FilesData';

export default function CustomizedDataGrid() {
  const rows = FileTableRows(); // 调用 FileTableRows 函数并传入文件数据

  return (
    <DataGrid
      checkboxSelection
      rows={rows}
      columns={ FileTableheader}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
      }
      initialState={{
        pagination: { paginationModel: { pageSize: 20 } },
      }}
      pageSizeOptions={[10, 20, 50]}
      disableColumnResize
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
