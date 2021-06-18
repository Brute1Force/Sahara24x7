import React from 'react';

// Importing Components
import CardComp from './CardComp';
import CardComp2 from './CardComp2';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import BarChar from './BarChar';
import PieChart from './PieChart';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    text:{
        textAlign: 'center',
    }
}));

const DashboardComp = () => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item lg={3}>
                </Grid>
                <Grid item lg={3}>
                    <CardComp />
                </Grid>
                <Grid item lg={3}>
                    <CardComp2 />
                </Grid>
                <Grid item lg={3}>
                </Grid>
            </Grid>
            <h1 className={classes.text}>States - Number of hospitals</h1>
            {/* <BarChar /> */}
            <PieChart />
        </div>
    )
}

export default DashboardComp;
