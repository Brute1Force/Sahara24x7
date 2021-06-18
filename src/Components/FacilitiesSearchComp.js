import React, { useState, useEffect } from "react";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import Link from '@material-ui/core/Link';

// Imports For Table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: 20
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    table: {
        minWidth: 650,
        marginTop: 20
    },
    button: {
        marginTop: 20
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 250,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

// For TABLE
function createData(facility_name, address, pincode, city, state, contact_number) {
    return { facility_name, address, pincode, city, state, contact_number };
}

// const locationsData = [
//     {
//         state: "Delhi",
//         cities: [
//             {
//                 city: "New Delhi"
//             }
//         ]
//     },
//     {
//         state: "Haryana",
//         cities: [
//             {
//                 city: "Gurugram"
//             }
//         ]
//     },
//     {
//         state: "Bihar",
//         cities: [
//             {
//                 city: "Patna"
//             }
//         ]
//     },
//     {
//         state: "Chhattisgarh",
//         cities: [
//             {
//                 city: "Raipur"
//             }
//         ]
//     },
//     {
//         state: "Gujarat",
//         cities: [
//             {
//                 city: "Gandhinagar"
//             }
//         ]
//     },
//     {
//         state: "Himachal Pradesh",
//         cities: [
//             {
//                 city: "Shimla"
//             }
//         ]
//     },
//     {
//         state: "Jharkhand",
//         cities: [
//             {
//                 city: "Ranchi"
//             }
//         ]
//     },
//     {
//         state: "Karnataka",
//         cities: [
//             {
//                 city: "Bengaluru"
//             }
//         ]
//     },
//     {
//         state: "Maharashtra",
//         cities: [
//             {
//                 city: "Mumbai"
//             }
//         ]
//     },
//     {
//         state: "Rajasthan",
//         cities: [
//             {
//                 city: "Jaipur"
//             }
//         ]
//     },
//     {
//         state: "Uttar Pradesh",
//         cities: [
//             {
//                 city: "Lucknow"
//             }
//         ]
//     },
//     {
//         state: "Uttarakhand",
//         cities: [
//             {
//                 city: "Dehradun"
//             }
//         ]
//     },
//     {
//         state: "West Bengal",
//         cities: [
//             {
//                 city: "Kolkata"
//             }
//         ]
//     }
// ]

let cities = [];

const FacilitiesSearchComp = () => {
    const classes = useStyles();

    const [state, setStateValue] = useState('');
    const [city, setCityValue] = useState('');
    const [need, setNeedValue] = useState('');
    const [pincode, setPinCodeValue] = useState('');
    const handleChange = (event) => {
        setNeedValue(event.target.value);
    };

    const [TableData, setTableData] = useState([]);

    const [LocationsData, setLocationsData] = useState([]);

    useEffect(() => {
        async function fetchRequestData() {
            const res = await fetch(
                `http://127.0.0.1:8000/getStatesAndCities`
            ).catch((err) => console.log(err));

            try {
                const data = await res.json();
                console.log(data);
                setLocationsData(data);
            } catch (e) {
                console.log("Unable to fetch requests");
            }
        }

        fetchRequestData();

    }, []);
     
    let states = LocationsData;

    const onSubmit = async (e) => {
        e.preventDefault();

        if (state !== '' && city !== '') {

            const data = {
                "state": state,
                "city": city,
            }

            const res = await fetch("http://127.0.0.1:8000/getHospitalsData/filter/", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(data),
            }).catch((err) => console.log(err));

            try {
                const Response = await res.json();
                console.log(Response);

                setTableData(Response);

            } catch {
                alert("Something went Wrong!");
            }

        } else {
            alert('Fill the Fields');
        }
    }

    const setCitiesData = (newInputValue) => {
        // console.log(locationsData[newInputValue].cities);
        // cities = locationsData[newInputValue].cities;
        let temp = states.filter((obj) => {
            if (obj.state === newInputValue) return true;
            else return false;
        });

        if (temp !== undefined && temp.length !== 0) {
            console.log(temp[0].cities);
            cities = temp[0].cities;
        } else {
            cities = temp;
        }
    }

    // const setPincodesData = (newInputValue) => {
    //     // console.log(locationsData[newInputValue].cities);
    //     // cities = locationsData[newInputValue].cities;
    //     let temp = cities.filter((obj)=>{
    //         if(obj.city===newInputValue) return true;
    //         else return false;
    //     });

    //     console.log(temp[0].pincodes);
    //     pincodes = temp[0].pincodes;
    // }

    return (
        <div className={classes.root}>
            <form onSubmit={onSubmit}>
                <Grid container spacing={3}>
                    <Grid item sm={5} lg={4}>
                        <Autocomplete
                            id="combo-box-demo1"
                            options={states}
                            getOptionLabel={(option) => option.state}
                            style={{
                                width: 300
                            }}
                            onInputChange={(event, newInputValue) => {
                                setStateValue(newInputValue);
                                setCitiesData(newInputValue)
                            }}
                            color="secondary"
                            renderInput={(params) => <TextField {...params}
                                label="Select your State" variant="outlined" />}
                        />
                    </Grid>
                    <Grid item sm={5} lg={4}>
                        <Autocomplete
                            id="combo-box-demo2"
                            options={cities}
                            getOptionLabel={(option) => option.city}
                            style={{
                                width: 300
                            }}
                            onInputChange={(event, newInputValue) => {
                                setCityValue(newInputValue);
                                // setPincodesData(newInputValue);
                            }}
                            renderInput={(params) => <TextField {...params} label="Select your City" variant="outlined" />}
                        />
                    </Grid>
                    {/* <Grid item sm={6} lg={4}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="age-native-simple">Select Your Need</InputLabel>
                            <Select
                                native
                                value={need}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'age',
                                    id: 'age-native-simple',
                                }}
                            >
                                <option aria-label="None" value="" />
                                <option value={1}>Hospital Beds</option>
                                <option value={2}>Oxygen Cylinders</option>
                                <option value={4}>Medicines</option>
                            </Select>
                        </FormControl>
                    </Grid> */}
                    {/* <Grid item sm={6} lg={4}> */}
                        {/* <Autocomplete
                            id="combo-box-demo2"
                            options={pincodes}
                            getOptionLabel={(option) => option.pincode}
                            style={{
                                width: 300
                            }}
                            onInputChange={(event, newInputValue) => {
                                setPinCodeValue(newInputValue);
                            }}
                            renderInput={(params) => <TextField {...params} label="Select your Pin Code" variant="outlined" />}
                        /> */}
                    {/* </Grid> */}
                    <Grid item sm={2} lg={4}>
                        <Button className={classes.button} size="medium" color="secondary" onClick={(e) => { onSubmit(e) }}>SUBMIT</Button>
                    </Grid>
                </Grid>
            </form>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Facility Name</TableCell>
                            <TableCell align="left">Address</TableCell>
                            <TableCell align="left">Pin Code</TableCell>
                            <TableCell align="left">City</TableCell>
                            <TableCell align="left">State</TableCell>
                            <TableCell align="left">Contact Information</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {TableData.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell align="left"><Link href={`/search_facilities/${row.ID}`}>{row["Facility Name"]}</Link></TableCell>
                                <TableCell align="left">{row.Address}</TableCell>
                                <TableCell align="left">{row["Pin Code"]}</TableCell>
                                <TableCell align="left">{row.City}</TableCell>
                                <TableCell align="left">{row.State}</TableCell>
                                <TableCell align="left">{row["Contact Information"]}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default FacilitiesSearchComp;
