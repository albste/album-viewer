import * as React from 'react';
import * as Costants from '../../utils/constants.js';
import PhotoListItem from './photoListItem.js';
import AlbumHeader from './albumHeader.js';
import ImageList from '@mui/material/ImageList'; 

export default function AlbumListItem({ album }) {

    return (
        <Costants.Accordion TransitionProps={{ unmountOnExit: true }} >

        <Costants.AccordionSummary aria-controls="panel1d-content" id="panel1d-header"    >
            <AlbumHeader album={album}/> 
        </Costants.AccordionSummary>

        {/* Photo list */}
        <Costants.AccordionDetails >
            <ImageList sx={{ width: '100%' }} cols={6} rowHeight={180}>
                {album.photos.map(photo => {
                    return (
                        <PhotoListItem photo={photo}/> 
                    );
                })}
            </ImageList>
        </Costants.AccordionDetails>
    </Costants.Accordion>
    );
}