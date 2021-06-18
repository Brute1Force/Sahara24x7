import React, { useState, useEffect } from "react";
import { Pie } from 'react-chartjs-2';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const PieChart = () => {
    const classes = useStyles();

    const [chartData, setChartData] = useState({
        'states_data' : [],
        'number_of_hospitals' : []
    })

    useEffect(() => {
        async function fetchRequestData() {
            const res = await fetch(
                `http://127.0.0.1:8000/getChartData`
            ).catch((err) => console.log(err));

            try {
                const data = await res.json();
                console.log(data);
                setChartData(data);
            } catch (e) {
                console.log("Unable to fetch requests");
            }
        }

        fetchRequestData();

    }, []);

    const data = {
        labels: chartData.states_data,
        datasets: [
            {
                label: '# of Votes',
                data: chartData.number_of_hospitals,
                backgroundColor: [
                    'rgba(255, 99, 71)',
                    'rgba(149, 99, 162)',
                    'rgba(149, 255, 108)',
                    'rgba(250, 104, 182)',
                    'rgba(250, 207, 0)',
                    'rgba(0, 182, 214)',
                    'rgba(0, 247, 214)',
                    'rgb(255, 0, 0)',
                    'rgb(0, 0, 255)',
                    'rgb(60, 179, 113)',
                    'rgb(238, 130, 238)',
                    'rgb(255, 165, 0)',
                    'rgb(106, 90, 205)',
                    'rgba(0, 0, 255, 0.1)',
                    'rgba(81, 157, 0, 0.1)',
                    'rgba(81, 157, 242, 0.5)'
                ],
                borderColor: [
                    'rgba(255, 99, 71)',
                    'rgba(149, 99, 162)',
                    'rgba(149, 255, 108)',
                    'rgba(250, 104, 182)',
                    'rgba(250, 207, 0)',
                    'rgba(0, 182, 214)',
                    'rgba(0, 247, 214)',
                    'rgb(255, 0, 0)',
                    'rgb(0, 0, 255)',
                    'rgb(60, 179, 113)',
                    'rgb(238, 130, 238)',
                    'rgb(255, 165, 0)',
                    'rgb(106, 90, 205)',
                    'rgba(0, 0, 255, 0.1)',
                    'rgba(81, 157, 0, 0.1)',
                    'rgba(81, 157, 242, 0.5)'
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item lg={4}>
                </Grid>
                <Grid item lg={4}>
                    <Pie data={data} />
                </Grid>
                <Grid item lg={4}>
                </Grid>
            </Grid>
        </div>
    )
};

export default PieChart;