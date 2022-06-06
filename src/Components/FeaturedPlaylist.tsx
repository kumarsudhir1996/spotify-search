import React from 'react';
import axios from 'axios';
import PlayListCard from './PlayListCard';
import Button from '@mui/material/Button';

export default function FeaturedPlaylist() {
    const client_id = '3f2b1aaf53f74ec1807627fdf13af161';
    const client_secret = 'f0540ea7c6644ceabbdefc80e6b9f1d9';
    const authorizeUrl = 'https://accounts.spotify.com/api/token';
    const [featuredPlaylist, setFeaturedPlaylist] = React.useState([]);
    const [isButtonClicked, setIsButtonClicked] = React.useState(false);
    const featuredPlaylistList = featuredPlaylist.map((playlist: {
        name: string,
        id: string,
        description: string,
        owner: {
            display_name: string,
            external_urls: {
                spotify: string
            }
        },
        external_urls: {
            spotify: string
        },
        images: [{
            url: string
        }],
        tracks: {
            total: number
        }
    }, index: number) => {

        const image = (playlist.images.length > 0)?
                                playlist.images[0].url:
                            './no-image-available.png';
        
        return (
            <PlayListCard
                playlist={playlist.name}
                key={playlist.id}
                images={image}
                description={playlist.description}
                owner={playlist.owner}
                spotifyLink={playlist.external_urls}
                tracks={playlist.tracks.total}
            />
        );
    });

    function handleButtonClick() {
        setIsButtonClicked(true);
        axios(authorizeUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
            },
            data: 'grant_type=client_credentials'
        })
        .then(res => {
        axios(`https://api.spotify.com/v1/browse/featured-playlists`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + res.data.access_token,
            'Content-Type': 'application/json'
        }
        })
        .then(function (response) {
            console.log(response);
            setFeaturedPlaylist(response.data.playlists.items);
        });
    })
    }
    
    return (
        <div>
            <h1>Featured Playlist</h1>
            <div>
                {isButtonClicked?featuredPlaylistList:<Button variant="text"
                    onClick={handleButtonClick}
                >Show Featured Playlists</Button>}
            </div>
        </div>
    );
}