import * as React from 'react';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';

export default function AlbumHeader({ album }) {

    return (
        <Grid container spacing={2} >
            <Grid item xs={10.5}>
                <Chip avatar={<Avatar>{album.id}</Avatar>} label={album.title} color="primary" variant="outlined" />
            </Grid>
            <Grid item xs={1.5}>
                <Chip avatar={<Avatar>{album.userId}</Avatar>} edge="end" label="USER ID" color="secondary" variant="outlined" />
            </Grid>
        </Grid>
    );
}