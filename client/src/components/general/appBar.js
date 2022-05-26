import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Slide from '@mui/material/Slide';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Toolbar from '@mui/material/Toolbar';

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


export default function AlbumHeader({ album }) {

    return (
        <HideOnScroll>
            <AppBar>
                <Toolbar>
                    <PhotoLibraryIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography variant="h6" component="div"> Albums </Typography>
                </Toolbar>
            </AppBar>
        </HideOnScroll>
    );
}