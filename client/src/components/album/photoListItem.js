import * as React from 'react';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Tooltip from '@mui/material/Tooltip';

export default function PhotoListItem({photo}) {

    return (
        <div className="cards" >
            <Tooltip title={photo.title}>
                <ImageListItem>
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