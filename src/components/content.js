import * as React from 'react';
import { useState } from "react";
import { styled, alpha } from '@mui/material/styles';
import { useEffect } from 'react';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Grid from '@mui/material/Grid';
import axios from "axios";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '500ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));


export default function Content() {

    const [search_text, setsearch_text] = useState('');
    const handleChange = (event) => {
        setsearch_text(event.target.value);
    };

    const [albums, setalbums] = useState([]);
    const [photos, setphotos] = useState([]);

    useEffect(() => {

        axios
            .get("https://jsonplaceholder.typicode.com/albums")
            .then(resp => resp.data)
            .then(data => {
                setalbums(data);
                console.log(albums);
            })
            .then(
                axios
                    .get("https://jsonplaceholder.typicode.com/photos")
                    .then(resp => resp.data)
                    .then(data => {
                        setphotos(data);
                        console.log(photos);
                    })
            );
    }, []);

    return (
        <div className="contentContainer">
            <Box   sx={{ my:2, display: 'flex', alignItems: 'center', width: '100%',
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                    borderRadius: 1, bgcolor: 'background.paper'}} >
                 <Search >
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase 
                        type="number"
                        value={search_text}   
                        onChange={handleChange} 
                        placeholder="Search user id" position="right"
                        inputProps={{ 'aria-label': 'search' }} />
                </Search>
            </Box>


            {albums.map(album => {
                const albumid = album.id;
                if (search_text === "" || search_text === album.userId.toString())
                    return (
                        <Accordion TransitionProps={{ unmountOnExit: true }} >
                            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                <Grid container spacing={2}>
                                    <Grid item xs={10.5}>
                                        <Chip avatar={<Avatar>{album.id}</Avatar>} label={album.title} color="primary" variant="outlined" />
                                    </Grid>
                                    <Grid item xs={1.5}>
                                        <Chip avatar={<Avatar>{album.userId}</Avatar>} edge="end" label="USER ID" color="secondary" variant="outlined" />
                                    </Grid>
                                </Grid>
                            </AccordionSummary>
                            <AccordionDetails>

                                <ImageList sx={{ width: '100%' }} cols={6} rowHeight={180}>

                                    {photos.map(photo => {
                                        if (photo.albumId === albumid) {
                                            return (
                                                <div className="card">
                                                    <Tooltip title={photo.title}>
                                                        <ImageListItem key={photo.url} >
                                                            <img
                                                                src={`${photo.thumbnailUrl}?w=150&h=150`}
                                                                srcSet={`${photo.thumbnailUrl}?w=150&h=150`}
                                                                alt={photo.title}
                                                                loading="eager"
                                                            />
                                                            <ImageListItemBar
                                                                title={photo.id}
                                                                subtitle={photo.title}
                                                            />
                                                        </ImageListItem>
                                                    </Tooltip>
                                                </div>
                                            );
                                        }
                                    })}
                                </ImageList>
                            </AccordionDetails>
                        </Accordion>
                    );
            })}
        </div>
    );
}