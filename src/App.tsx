import React from 'react';
import axios from 'axios';
import {useState} from 'react';
import './App.css';
import Search from './Components/Search';
import CardList from './Components/CardList';
import NewReleases from './Components/NewReleases';
import FeaturedPlaylist from './Components/FeaturedPlaylist';
import AvailableGenres from './Components/AvailableGenres';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Itemresult = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export default function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState({});
    const [searchType, setSearchType] = useState('artist');
    const client_id = '5737677a88794eedb5810a6346d20516s';
    const client_secret = '5737677a88794eedb5810a6346d20516';
    const authorizeUrl = 'https://accounts.spotify.com/api/token';
    return (
      <div className="App">
            <Box sx={{ flexGrow: 1 }}>
                <Grid direction="row" container spacing={3}>
                    <Grid item xs={10}>
                        <Search 
                            searchTerm={searchTerm} 
                            setSearchTerm={setSearchTerm} 
                            searchResults={searchResults} 
                            setSearchResults={setSearchResults} 
                            searchType={searchType}
                            setSearchType={setSearchType}
                        />
                        <CardList searchResults={searchResults} />
                        <Grid container  spacing={2}>
                            <Grid item xs={6} md={6}>
                                <Item>
                                    <NewReleases />
                                </Item>
                            </Grid>
                            <Grid item xs={6} md={6}>
                                <Item>
                                    <FeaturedPlaylist />
                                </Item>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={2}>
                        <AvailableGenres />
                    </Grid>
                </Grid>
            </Box>
      </div>
    );
}
