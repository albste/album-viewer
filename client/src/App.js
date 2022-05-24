import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Slide from '@mui/material/Slide';
import Content from './components/content';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';


function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};
 
function App() {

  return (
        <React.Fragment>
            <CssBaseline />
            <HideOnScroll>
                <AppBar>
                    <Toolbar>
                      <PhotoLibraryIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                      <Typography variant="h6" component="div"> Albums </Typography>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Toolbar />
            <Container>                
                <Box sx={{ my: 2 }}>
                    <Content/>
                </Box>
            </Container>
        </React.Fragment>
  );
}

export default App;