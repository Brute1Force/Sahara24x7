import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { makeStyles, withStyles,ThemeProvider, createMuiTheme, } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import { Button } from '@material-ui/core';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 20
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    button: {
        marginTop: 20
    },
}));

const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: 'green',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'green',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'red',
            },
            '&:hover fieldset': {
                borderColor: 'yellow',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'green',
            },
        },
    },
})(TextField);

const theme = createMuiTheme({
    palette: {
      primary: green,
    },
  });
  

const HospitalDetails = ({ props }) => {

    const classes = useStyles();

    const { id } = useParams();

    const [hospitalDetails, setHospitalDetails] = useState({});

    useEffect(() => {
        async function fetchRequestData() {
            const res = await fetch(
                `http://127.0.0.1:8000/getHospitalsData/${id}`
            ).catch((err) => console.log(err));

            try {
                const data = await res.json();
                console.log(data);
                setHospitalDetails({ ...data });
                console.log("hospitalData ", hospitalDetails);
            } catch (e) {
                console.log("Unable to fetch requests");
            }
        }

        fetchRequestData();

    }, []);

    return (
        <div className={classes.root} >
            <Grid container spacing={3}>
                <ThemeProvider theme={theme}>
                    <Grid item sm={6} lg={3}>
                        <CssTextField id="mui-theme-provider-standard-input" disabled label="Facility Name" variant="outlined" value={hospitalDetails["Facility Name"] || ''} />
                    </Grid>
                </ThemeProvider>
                <Grid item sm={6} lg={3}>
                    <FormControl required>
                        <TextField id="outlined-basic" disabled label="Address" variant="outlined" value={hospitalDetails.Address || ''} />
                    </FormControl>
                </Grid>
                <Grid item sm={6} lg={3}>
                    <FormControl required>
                        <TextField id="standard-number" disabled label="Pin Code" type="number" variant="outlined" value={hospitalDetails["Pin Code"] || ''} />
                    </FormControl>
                </Grid>
                <Grid item sm={6} lg={3}>
                    <FormControl required>
                        <TextField id="outlined-basic" disabled label="City" variant="outlined" value={hospitalDetails.City || ''} />
                    </FormControl>
                </Grid>
                <Grid item sm={6} lg={3}>
                    <FormControl required>
                        <TextField id="outlined-basic" disabled label="State" variant="outlined" value={hospitalDetails.State || ''} />
                    </FormControl>
                </Grid>
                <Grid item sm={6} lg={3}>
                    <FormControl>
                        <TextField id="outlined-basic" disabled label="Contact Information" value={hospitalDetails["Contact Information"] || ''} variant="outlined" />
                    </FormControl>
                </Grid>
                <Grid item sm={6} lg={3}>
                    <FormControl>
                        <TextField id="standard-number" type="number" disabled label="Vacant Beds for COVID Patients" variant="outlined" value={hospitalDetails["Vacant Beds for COVID Patients"] || ''} />
                    </FormControl>
                </Grid>
                <Grid item sm={6} lg={3}>
                    <FormControl>
                        <TextField id="standard-number" type="number" disabled label="Vacant ICU Beds" variant="outlined" value={hospitalDetails["Vacant ICU Beds"] || ''} />
                    </FormControl>
                </Grid>
                <Grid item sm={6} lg={3}>
                    <FormControl>
                        <TextField id="standard-number" type="number" disabled label="Available Ventilators" variant="outlined" value={hospitalDetails["Available Ventilators"] || ''} />
                    </FormControl>
                </Grid>
                <Grid item sm={6} lg={3}>
                    <FormControl>
                        <TextField id="outlined-basic" disabled label="Oxygen Availability" variant="outlined" value={hospitalDetails["Oxygen Availability"] || ''} />
                    </FormControl>
                </Grid>
                <Grid item sm={6} lg={3}>
                    <FormControl>
                        <TextField id="outlined-basic" disabled label="Last Update" variant="outlined" value={hospitalDetails["Last Update"] || ''} />
                    </FormControl>
                </Grid>
                <Grid item sm={6} lg={3}>
                    <FormControl>
                        <TextField id="outlined-basic" disabled label="Remdesivir" variant="outlined" value={hospitalDetails["Remdesivir"] || ''} />
                    </FormControl>
                </Grid>
                <Grid item sm={6} lg={3}>
                    <FormControl>
                        <TextField id="outlined-basic" disabled label="Favipiravir (also known as Avigan)" value={hospitalDetails["Favipiravir (also known as Avigan)"] || ''} variant="outlined" />
                    </FormControl>
                </Grid>
                <Grid item sm={6} lg={3}>
                    <FormControl>
                        <TextField id="outlined-basic" disabled label="Molnupiravir" variant="outlined" value={hospitalDetails["Molnupiravir"] || ''} />
                    </FormControl>
                </Grid>
                <Grid item sm={6} lg={3}>
                    <FormControl>
                        <TextField id="outlined-basic" disabled label="Recombinant ACE-2" variant="outlined" value={hospitalDetails["Recombinant ACE-2"] || ''} />
                    </FormControl>
                </Grid>
                <Grid item sm={6} lg={3}>
                    <FormControl>
                        <TextField id="outlined-basic" disabled label="Deriphyllin R 300mg" variant="outlined" value={hospitalDetails["Deriphyllin R 300mg"] || ''} />
                    </FormControl>
                </Grid>
                <Grid item sm={6} lg={3}>
                    <FormControl>
                        <TextField id="outlined-basic" disabled label="Nebulise 1mg" variant="outlined" value={hospitalDetails["Nebulise 1mg"] || ''} />
                    </FormControl>
                </Grid>
                <Grid item sm={6} lg={3}>
                    <FormControl>
                        <TextField id="outlined-basic" disabled label="Duolin" variant="outlined" value={hospitalDetails["Duolin"] || ''} />
                    </FormControl>
                </Grid>
                <Grid item sm={6} lg={3}>
                    <FormControl>
                        <TextField id="outlined-basic" disabled label="Medrol" variant="outlined" value={hospitalDetails["Medrol"] || ''} />
                    </FormControl>
                </Grid>
                <Grid item sm={6} lg={3}>
                    <FormControl>
                        <TextField id="outlined-basic" disabled label="Colchicine" variant="outlined" value={hospitalDetails["Colchicine"] || ''} />
                    </FormControl>
                </Grid>
                <Grid item sm={6} lg={3}>
                    <FormControl>
                        <TextField id="outlined-basic" disabled label="Ivepred" variant="outlined" value={hospitalDetails["Ivepred"] || ''} />
                    </FormControl>
                </Grid>
                <Grid item sm={6} lg={3}>
                    <FormControl>
                        <TextField id="outlined-basic" disabled label="Inh foracort forte  ( Inhaler )" variant="outlined" value={hospitalDetails["Inh foracort forte  ( Inhaler )"] || ''} />
                    </FormControl>
                </Grid>
                <Grid item sm={6} lg={3}>
                    <FormControl>
                        <TextField id="outlined-basic" disabled label="Cap Rosuva-gold 10" variant="outlined" value={hospitalDetails["Cap Rosuva-gold 10"] || ''} />
                    </FormControl>
                </Grid>
            </Grid>
        </div>
    )
}

export default HospitalDetails
