import React from 'react';
import axios from 'axios';
import NewReleasesCard from './NewReleasesCard';
import Button from '@mui/material/Button';

export default function NewReleases() {
    const client_id = '3f2b1aaf53f74ec1807627fdf13af161';
    const client_secret = 'f0540ea7c6644ceabbdefc80e6b9f1d9';
    const authorizeUrl = 'https://accounts.spotify.com/api/token';
    const [newreleases, setNewReleases] = React.useState([]);
    const [isButtonClicked, setIsButtonClicked] = React.useState(false);
    const newreleasesList = newreleases.map((album: {
                name: string,
                id: string,
                images: [{
                    url: string
                }],
                artists: [{
                    external_urls: {
                        spotify: string
                
                    }
                    name: string
                }],
                release_date: string,
                external_urls: {
                    spotify: string
                },
                total_tracks: number,
    }, index: number) => {
        const image = (album.images.length > 0)?
                                album.images[0].url:
                                './no-image-available.png';
                return (
                    <NewReleasesCard 
                        album={album.name}
                        key={album.id}
                        image={image}
                        artists={album.artists}
                        releaseDate={album.release_date}
                        spotifyLink={album.external_urls.spotify}
                        totalTracks={album.total_tracks}
                    />
                );
    });

    const handleButtonClick = () => {
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
            axios(`https://api.spotify.com/v1/browse/new-releases`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + res.data.access_token,
                    'Content-Type': 'application/json'
                }
            })
            .then(function (response) {
                console.log(response);
                setNewReleases(response.data.albums.items);
            });
        })
    } 

    return (
        <div>
            <h1>New Releases</h1>
            <div>
                {isButtonClicked?newreleasesList:
                <Button variant="text"
                    onClick={handleButtonClick}
                >Show New Releases</Button>}
            </div>
        </div>
    );
}