import React, { SetStateAction } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { pink } from '@mui/material/colors';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
    // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    // ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const SearchStyles = styled('div')(({ theme }) => ({
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
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(12)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));
  
// Search is a react component that takes searchTerm and setSearchTerm as props.
// It renders the search bar and handles the search.

export default function Search(props: { 
                                searchTerm: string, 
                                setSearchTerm: React.Dispatch<React.SetStateAction<string>>,
                                searchResults: {},
                                setSearchResults: React.Dispatch<SetStateAction<{}>>,
                                searchType: string
                                setSearchType: React.Dispatch<SetStateAction<string>>
                                }) {
    const client_id = '3f2b1aaf53f74ec1807627fdf13af161';
    const client_secret = 'f0540ea7c6644ceabbdefc80e6b9f1d9';
    const authorizeUrl = 'https://accounts.spotify.com/api/token';
    const searchUrl = 'https://api.spotify.com/v1/search';
    const [isArtistChecked, setIsArtistChecked] = useState(true);
    
    function handleSubmit() {
        axios(authorizeUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
            },
            data: 'grant_type=client_credentials'
        })
        .then(res => {
            // console.log(res.data.access_token);
            // setToken(res.data.access_token);
            axios(searchUrl, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + res.data.access_token,
                        'Content-Type': 'application/json'
                    },
                    params: {
                        q: props.searchTerm,
                        type: (props.searchType === '')?'artist':props.searchType
                    }
                })
                .then(function (response) {
                   // console.log(response);
                    // stringify the response data
                    props.setSearchResults(response.data);
                });
            });
    }

    function handleSearchType(type: string) {
        if (type === 'artist') {
            handleChecked();
        }
        props.setSearchType(prevSearchType => {
            // prevSearchType is a string of form 'artist, album, track'
            // split it into an array of strings
            const prevSearchTypeArray = prevSearchType.split(',');
            // if the type is already in the array, remove it
            if (prevSearchTypeArray.includes(type)) {
                const index = prevSearchTypeArray.indexOf(type);
                prevSearchTypeArray.splice(index, 1);
            }
            // otherwise, add it
            else {
                prevSearchTypeArray.push(type);
            }
            // join the array back into a string
            console.log(prevSearchTypeArray.join(','));
            return prevSearchTypeArray.join(',');
        });

    }

    function handleChecked() {
        // change the state of the checkbox to the opposite of what it is
        setIsArtistChecked(prevIsArtistChecked => !prevIsArtistChecked);
    }
 
    return (
        
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        Spotify Search
                    </Typography>
                    <FormGroup>
                        <Grid container spacing={2}>
                            <Grid item xs={4} md={4} >
                                    <FormControlLabel onChange={() => handleSearchType('artist', )} checked={isArtistChecked} control={<Checkbox sx={{
                                                                color: pink[800],
                                                                '&.Mui-checked': {
                                                                    color: pink[600],
                                                                },
                                                                }}/>} label="Artist" />
                            </Grid>
                            <Grid item xs={4} md={4}>
                                
                                    <FormControlLabel onChange={() => handleSearchType('album', )} control={<Checkbox sx={{
                                                                color: pink[800],
                                                                '&.Mui-checked': {
                                                                    color: pink[600],
                                                                },
                                                                }}/>} label="Album" />
                                
                            </Grid>
                            <Grid item xs={4} md={4}>
                                
                                    <FormControlLabel onChange={() => handleSearchType('track', )} control={<Checkbox sx={{
                                                                color: pink[800],
                                                                '&.Mui-checked': {
                                                                    color: pink[600],
                                                                },
                                                                }}/>} label="Track" />
                                
                            </Grid>
                        </Grid>
                    </FormGroup>
                    <SearchStyles>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            value={props.searchTerm}
                            onChange={(e) => props.setSearchTerm(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    handleSubmit();
                                }
                            }}
                        />
                    </SearchStyles>
                </Toolbar>
            </AppBar>
        </Box>
       
    );
    
}
