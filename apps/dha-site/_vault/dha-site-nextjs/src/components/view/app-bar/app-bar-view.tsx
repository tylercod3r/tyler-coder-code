import { FC } from 'react';
import {
  Box,
  IconButton,
  Typography,
  Toolbar,
  AppBar,
} from '@mui/material';

import { APP_TITLE } from '@/models/app-data/app-data';

import styles from './app-bar.module.scss';

interface Props {
  title: string;
}

const AppBarView:FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {APP_TITLE}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default AppBarView;