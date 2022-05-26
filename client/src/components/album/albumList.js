import * as React from 'react';
import AlbumListItem from './albumListItem.js';

export default function AlbumList({ albums, searchText }) {

    return (
        <div className="albumListContainer">
            {albums.map(album => {
                if (searchText === "" || album.id.toString().includes(searchText) || album.title.toString().includes(searchText))
                    return (
                        <AlbumListItem album={album} />
                    );
            })}
        </div>
    );
}