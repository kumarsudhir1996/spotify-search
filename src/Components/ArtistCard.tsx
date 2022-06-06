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

export default function ArtistCard( props: { artist: string, 
                                            image: string,
                                            genres: string[],
                                            followers: number,
                                            spotifyLink: string,
                                            popularity: number }) {
    
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    
    return (
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
        <CardHeader title={props.artist} />
        <CardMedia
                        component="img"
                        height="auto"
                        image={props.image}
                        alt={props.artist}
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
                            <Typography paragraph>Followers: {props.followers}</Typography>
                            {(props.genres.length > 0)?<Typography paragraph>Genres: {props.genres.join(", ")}</Typography>:null}
                            <Typography paragraph>Popularity: {props.popularity}</Typography>
                        </CardContent>
                    </Collapse>
        </Card>
    );
}