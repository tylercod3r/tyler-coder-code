import {
  Box,
  Button,
  IconButton,
  Typography,
  Toolbar,
  AppBar,
} from '@mui/material';
import { SITE_TITLE } from '../../../models/consntant/constants';

interface Props {
  title: string;
}

export default function AppBarView() {
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
            {SITE_TITLE}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
