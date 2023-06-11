import { useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Container from '@mui/material/Container';

export const NavBar = () => {
  const nav = useNavigate()

  return (
    <AppBar position="static" sx={{backgroundColor :'#282c34'}}>
      <Container>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
            <IconButton
              aria-haspopup="true"
              color="inherit"
              onClick={e => nav(-1)}
            >
            <ArrowBackIcon sx={{ display: { xs: 'flex', md: 'flex'}, mr: 1 }} />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}