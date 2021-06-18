import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import { Button } from '@material-ui/core';

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

const HealthCareWorkersComp = () => {
    const classes = useStyles();

    const [FacilityName, setFacilityName] = useState('');
    const [Address, setAddress] = useState('');
    const [Pincode, setPincode] = useState();
    const [City, setCity] = useState('');
    const [State, setState] = useState('');
    const [ContactInfo, setContactInfo] = useState('');
    const [VacantBeds, setVacantBeds] = useState('');
    const [VacantICUBeds, setVacantICUBeds] = useState();
    const [Ventilators, setVentilators] = useState();
    const [Oxygen, setOxygen] = useState('');
    const [lastUpdated, setlastUpdated] = useState('');
    const [Remdesivir, setRemdesivir] = useState('');
    const [Favipiravir, setFavipiravir] = useState('');
    const [Molnupiravir, setMolnupiravir] = useState('');
    const [Recombinant, setRecombinant] = useState('');
    const [Deriphyllin, setDeriphyllin] = useState('');
    const [Nebulise, setNebulise] = useState('');
    const [Duolin, setDuolin] = useState('');
    const [Medrol, setMedrol] = useState('');
    const [Colchicine, setColchicine] = useState('');
    const [Ivepred, setIvepred] = useState('');
    const [Inh_foracort_forte, setInh_foracort_forte] = useState('');
    const [Cap_Rosuva_gold, setCap_Rosuva_gold] = useState('');

    const onSubmit = async(e) => {
        e.preventDefault();

        if (FacilityName !== '' && Address !== '' && Pincode !== '' && City !== '' && State !== '') {

            const data = {
                "FacilityName": FacilityName,
                "Address": Address,
                "Pincode": Pincode,
                "City": City,
                "State": State,
                "ContactInfo": ContactInfo,
                "VacantBeds": VacantBeds,
                "VacantICUBeds": VacantICUBeds,
                "Ventilators": Ventilators,
                "Oxygen": Oxygen,
                "lastUpdated": lastUpdated,
                "Remdesivir": Remdesivir,
                "Favipiravir": Favipiravir,
                "Molnupiravir": Molnupiravir,
                "Recombinant": Recombinant,
                "Deriphyllin": Deriphyllin,
                "Nebulise": Nebulise,
                "Duolin": Duolin,
                "Medrol": Medrol,
                "Colchicine": Colchicine,
                "Ivepred": Ivepred,
                "Inh_foracort_forte": Inh_foracort_forte,
                "Cap_Rosuva_gold": Cap_Rosuva_gold
            }

            const res = await fetch("http://127.0.0.1:8000/addHospitalData/", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(data),
            }).catch((err) => console.log(err));

            console.log(res);
            try {
                const Response = await res.json();
                console.log(Response);
                alert('Successfully submitted');
                window.location.href = "/healthcare_workers";
            } catch {
                alert("Something went Wrong!");
            }

        } else {
            alert('Fill All Neccessary Fields');
        }

        // console.log(FacilityName);
    }

    return (
        <div>
            <form className={classes.root} onSubmit={onSubmit}>
                <Grid container spacing={3}>
                    <Grid item sm={6} lg={3}>
                        <FormControl className={classes.formControl} required>
                            <TextField id="outlined-basic" label="Facility Name" variant="outlined" value={FacilityName} onChange={(e) => setFacilityName(e.target.value)} required />
                        </FormControl>
                    </Grid>
                    <Grid item sm={6} lg={3}>
                        <FormControl required>
                            <TextField id="outlined-basic" label="Address" variant="outlined" value={Address} onChange={(e) => setAddress(e.target.value)} required />
                        </FormControl>
                    </Grid>
                    <Grid item sm={6} lg={3}>
                        <FormControl required>
                            <TextField id="standard-number" label="Pin Code" type="number" variant="outlined" value={Pincode} onChange={(e) => setPincode(e.target.value)} required />
                        </FormControl>
                    </Grid>
                    <Grid item sm={6} lg={3}>
                        <FormControl required>
                            <TextField id="outlined-basic" label="City" variant="outlined" value={City} onChange={(e) => setCity(e.target.value)} required />
                        </FormControl>
                    </Grid>
                    <Grid item sm={6} lg={3}>
                        <FormControl required>
                            <TextField id="outlined-basic" label="State" variant="outlined" value={State} onChange={(e) => setState(e.target.value)} required />
                        </FormControl>
                    </Grid>
                    <Grid item sm={6} lg={3}>
                        <FormControl>
                            <TextField id="outlined-basic" label="Contact Information" value={ContactInfo} variant="outlined" onChange={(e) => setContactInfo(e.target.value)} />
                        </FormControl>
                    </Grid>
                    <Grid item sm={6} lg={3}>
                        <FormControl>
                            <TextField id="standard-number" type="number" label="Number of Vacant Beds for COVID Patients" variant="outlined" value={VacantBeds} onChange={(e) => setVacantBeds(e.target.value)} />
                        </FormControl>
                    </Grid>
                    <Grid item sm={6} lg={3}>
                        <FormControl>
                            <TextField id="standard-number" type="number" label="Number of Vacant ICU Beds" variant="outlined" value={VacantICUBeds} onChange={(e) => setVacantICUBeds(e.target.value)} />
                        </FormControl>
                    </Grid>
                    <Grid item sm={6} lg={3}>
                        <FormControl>
                            <TextField id="standard-number" type="number" label="Number of Available Ventilators" variant="outlined" value={Ventilators} onChange={(e) => setVentilators(e.target.value)} />
                        </FormControl>
                    </Grid>
                    <Grid item sm={6} lg={3}>
                        <FormControl>
                            <TextField id="standard-number" type="number" label="Number of Oxygen Cyclinders" variant="outlined" value={Oxygen} onChange={(e) => setOxygen(e.target.value)} />
                        </FormControl>
                    </Grid>
                    <Grid item sm={6} lg={3}>
                        <FormControl>
                            <TextField id="outlined-basic" label="Last Updated Date/Time" variant="outlined" value={lastUpdated} onChange={(e) => setlastUpdated(e.target.value)} />
                        </FormControl>
                    </Grid>
                    <Grid item sm={6} lg={3}>
                        <FormControl>
                            <TextField id="outlined-basic" label="Remdesivir(Yes/No/NA)" variant="outlined" value={Remdesivir} onChange={(e) => setRemdesivir(e.target.value)} />
                        </FormControl>
                    </Grid>
                    <Grid item sm={6} lg={3}>
                        <FormControl>
                            <TextField id="outlined-basic" label="Favipiravir (also known as Avigan)(Yes/No/NA)" value={Favipiravir} variant="outlined" onChange={(e) => setFavipiravir(e.target.value)} />
                        </FormControl>
                    </Grid>
                    <Grid item sm={6} lg={3}>
                        <FormControl>
                            <TextField id="outlined-basic" label="Molnupiravir(Yes/No/NA)" variant="outlined" value={Molnupiravir} onChange={(e) => setMolnupiravir(e.target.value)} />
                        </FormControl>
                    </Grid>
                    <Grid item sm={6} lg={3}>
                        <FormControl>
                            <TextField id="outlined-basic" label="Recombinant ACE-2(Yes/No/NA)" variant="outlined" value={Recombinant} onChange={(e) => setRecombinant(e.target.value)} />
                        </FormControl>
                    </Grid>
                    <Grid item sm={6} lg={3}>
                        <FormControl>
                            <TextField id="outlined-basic" label="Deriphyllin R 300mg(Yes/No/NA)" variant="outlined" value={Deriphyllin} onChange={(e) => setDeriphyllin(e.target.value)} />
                        </FormControl>
                    </Grid>
                    <Grid item sm={6} lg={3}>
                        <FormControl>
                            <TextField id="outlined-basic" label="Nebulise 1mg(Yes/No/NA)" variant="outlined" value={Nebulise} onChange={(e) => setNebulise(e.target.value)} />
                        </FormControl>
                    </Grid>
                    <Grid item sm={6} lg={3}>
                        <FormControl>
                            <TextField id="outlined-basic" label="Duolin(Yes/No/NA)" variant="outlined" value={Duolin} onChange={(e) => setDuolin(e.target.value)} />
                        </FormControl>
                    </Grid>
                    <Grid item sm={6} lg={3}>
                        <FormControl>
                            <TextField id="outlined-basic" label="Medrol(Yes/No/NA)" variant="outlined" value={Medrol} onChange={(e) => setMedrol(e.target.value)} />
                        </FormControl>
                    </Grid>
                    <Grid item sm={6} lg={3}>
                        <FormControl>
                            <TextField id="outlined-basic" label="Colchicine(Yes/No/NA)" variant="outlined" value={Colchicine} onChange={(e) => setColchicine(e.target.value)} />
                        </FormControl>
                    </Grid>
                    <Grid item sm={6} lg={3}>
                        <FormControl>
                            <TextField id="outlined-basic" label="Ivepred(Yes/No/NA)" variant="outlined" value={Ivepred} onChange={(e) => setIvepred(e.target.value)} />
                        </FormControl>
                    </Grid>
                    <Grid item sm={6} lg={3}>
                        <FormControl>
                            <TextField id="outlined-basic" label="Inh foracort forte(Inhaler)(Yes/No/NA)" variant="outlined" value={Inh_foracort_forte} onChange={(e) => setInh_foracort_forte(e.target.value)} />
                        </FormControl>
                    </Grid>
                    <Grid item sm={6} lg={3}>
                        <FormControl>
                            <TextField id="outlined-basic" label="Cap Rosuva-gold 10(Yes/No/NA)" variant="outlined" value={Cap_Rosuva_gold} onChange={(e) => setCap_Rosuva_gold(e.target.value)} />
                        </FormControl>
                    </Grid>
                </Grid>
                <div>
                    <Grid container spacing={3}>
                        <Grid item sm={6} lg={4}>
                        </Grid>
                        <Grid item sm={6} lg={4}>
                            <Button className={classes.button} size="large" color="secondary" onClick={(e) => { onSubmit(e) }}>SUBMIT</Button>
                        </Grid>
                        <Grid item sm={6} lg={4}>
                        </Grid>
                    </Grid>
                </div>
            </form>
        </div >
    )
}

export default HealthCareWorkersComp;
