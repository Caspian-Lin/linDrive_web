import * as React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { useFileContext } from '../contexts/FileContext';
const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: (theme.vars || theme).palette.action.disabled,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: 'center',
  },
}));

export default function NavbarBreadcrumbs() {
  const { currentFilesPath, setCurrentFilesPath } = useFileContext();
  const segments = currentFilesPath.split('/').filter(Boolean);

  const handleBreadcrumbClick = (index: number) => {
    const newPath = '/' + segments.slice(0, index + 1).join('/');
    setCurrentFilesPath(newPath);
  };

  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      {/* 根路径 */}
      <Typography
        variant="body1"
        sx={{ cursor: 'pointer' }}
        onClick={() => setCurrentFilesPath('/')}
      >
        Home
      </Typography>

      {/* 动态生成路径片段 */}
      {segments.map((seg, index) => (
        <Typography
          key={seg}
          variant="body1"
          sx={{
            color: 'text.primary',
            fontWeight: 600,
            cursor: 'pointer',
          }}
          onClick={() => handleBreadcrumbClick(index)} // 绑定点击事件
        >
          {seg}
        </Typography>
      ))}
    </StyledBreadcrumbs>
  );
}
