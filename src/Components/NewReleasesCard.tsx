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
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Grid from '@mui/material/Grid';

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


export default function NewReleasesCard(props: {album: string, 
                                        image: string, 
                                        artists: [{
                                            external_urls: {
                                                spotify: string
                                            }
                                            name: string
                                            
                                        }], 
                                        releaseDate: string,
                                        spotifyLink: string,
                                        totalTracks: number}) {

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    // for all artists create ListItemText inside ListItemButton
    const artists = props.artists.map((artist, index) => {
        // <ListItemButton key={index} href={artist.external_urls.spotify} target="_blank">
        //         <ListItemText key={index} primary={artist.external_urls.name} />
        //     </ListItemButton>
        return (
            <ListItem disablePadding>
                <ListItemButton key={index} href={artist.external_urls.spotify} target="_blank">
                    <ListItemText key={index} primary={artist.name} />
                </ListItemButton>
            </ListItem>
            
        );
    })

    // console.log()
    return(
            <Card 
                sx={{
                    width: 'auto',
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
            <CardHeader title={props.album} />
            <CardMedia
                        component="img"
                        height="auto"
                        image={props.image}
                        alt={props.album}
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
                            <Typography paragraph>Total Tracks: {props.totalTracks}</Typography>
                            <Typography paragraph>Release Date: {props.releaseDate}</Typography>
                            <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                <nav aria-label="secondary mailbox folders">
                                    <List>
                                        {artists}
                                    </List>
                                </nav>
                            </Box>
                        </CardContent>
                    </Collapse>
            </Card>
    )
}