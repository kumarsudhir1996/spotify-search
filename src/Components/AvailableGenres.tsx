import React from 'react';
import axios from 'axios';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';

export default function AvailableGenres() {
    const [availableGenres, setAvailableGenres] = React.useState([]);
    const [isButtonClicked, setIsButtonClicked] = React.useState(false);
    const client_id = '3f2b1aaf53f74ec1807627fdf13af161';
    const client_secret = 'f0540ea7c6644ceabbdefc80e6b9f1d9';
    const authorizeUrl = 'https://accounts.spotify.com/api/token';
    
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

        axios(`https://api.spotify.com/v1/recommendations/available-genre-seeds`, {
        method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + res.data.access_token,
                'Content-Type': 'application/json'
            }
        })
        .then(function (response) {
            // console.log(response);
            setAvailableGenres(response.data.genres);
        });
    })
    }

    const availableGenresList = availableGenres.map((genre: string, index: number) => {
        return (
            <ListItem disablePadding key={index}>
                <ListItemButton key={index}>
                    <ListItemText key={index} primary={genre} />
                </ListItemButton>
            </ListItem>
        );
    });

    const genreElement = (
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <nav aria-label="secondary mailbox folders">
                    <List>
                        {availableGenresList}
                    </List>
                </nav>
        </Box>
    );
    return (
        <div>
            <h1>Available Genres</h1>
            <div>
                {isButtonClicked?
                    genreElement:
                    <Button variant="text"
                        onClick={handleButtonClick}
                    >Show Available Genres</Button>}
            </div>
        </div>
    );
}