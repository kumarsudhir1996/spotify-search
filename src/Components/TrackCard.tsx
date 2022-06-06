import React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}
  
const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
    })(({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function TrackCard(props: {track: string,
                                        image: string, 
                                        artists:[{
                                            name: string,
                                            external_urls: {
                                                spotify: string
                                            }
                                        }], 
                                        releaseDate: string, 
                                        spotifyLink: string,
                                    album: {
                                        name: string,
                                        release_date: string,
                                        images: [{
                                            url: string
                                        }],
                                        external_urls: {
                                            spotify: string
                                        },
                                        total_tracks: number
                                    }, 
                                    popularity: number,
                                    explicit: boolean,
                                    duration: number,
                                }) {

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    // for all artists create ListItemText inside ListItemButton
    const artists = props.artists.map((artist, index) => {
        return (
            <ListItemButton key={index} href={artist.external_urls.spotify} target="_blank">
                <ListItemText key={index} primary={artist.name}/>
            </ListItemButton>
        );
    })
    
    // convert duration to minutes and seconds
    const durationMins = props.duration / 60000;
    const durationSecs = (props.duration / 1000) % 60;
    const duration = `${durationMins.toFixed(0)}:${durationSecs.toFixed(0)}`;

    return(
        <Card 
        sx={{
            width: 280,
            margin: '1em',
            borderRadius: '10px',
            boxShadow: '0px 0px 10px rgba(0,0,0,0.2)',
            padding: '0.2em',
            backgroundColor: 'grey',
            '&:hover': {
                backgroundColor: 'primary.main',
                opacity: [0.9, 0.8, 0.7],
            },
        }}
        >
        <CardHeader title={props.track} />
        <CardMedia
                        component="img"
                        height="auto"
                        image={props.image}
                        alt={props.track}
        />
        <CardActions disableSpacing>
                <Button 
                            variant="contained"
                            href={props.spotifyLink}
                            target="_blank"
                >View in Spotify</Button>
                <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
        </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            {/* <Typography paragraph>Total Tracks: {props.totalTracks}</Typography> */}
                            <Typography paragraph>Release Date: {props.releaseDate}</Typography>
                            <Typography paragraph>Popularity: {props.popularity}</Typography>
                            <Typography paragraph>Duration: {duration}</Typography>
                            <Typography paragraph>Explicit: {props.explicit ? 'Yes' : 'No'}</Typography>
                            {artists}
                            {/*break line element*/}
                            <br/>
                            {/*box element*/}
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}>

                                <Typography variant="h6">Album:</Typography>
                                <ListItemButton href={props.album.external_urls.spotify} target="_blank">
                                    <ListItemText primary={props.album.name}/>
                                </ListItemButton>
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}>
                                <Typography variant="h6">Release Date:</Typography>
                                <Typography variant="h6">{props.album.release_date}</Typography>
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}>
                                <Typography variant="h6">Total Tracks:</Typography>
                                <Typography variant="h6">{props.album.total_tracks}</Typography>
                            </Box>
                            

                            {/* <Typography paragraph>Album: {props.album.name}</Typography>
                            <Typography paragraph>Release Date: {props.album.release_date}</Typography>
                            <Typography paragraph>Total Tracks: {props.album.total_tracks}</Typography> */}
                        </CardContent>
                    </Collapse>
        </Card>
    );
}