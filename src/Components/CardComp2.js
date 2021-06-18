import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        marginTop: 15
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const CardComp2 = () => {
    const classes = useStyles();

    return (
        <div>
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        <h2>Search for Hospital Facilities</h2>
                    </Typography>
                    <Typography variant="h5" component="h2">
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                    </Typography>
                    <Typography variant="body2" component="p">
                        Please visit this site for Searching Hospital Facilities
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="secondary" href="/search_facilities/">GO</Button>
                </CardActions>
            </Card>
        </div>
    )
}

export default CardComp2;
