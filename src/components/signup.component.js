import React from 'react';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { FormControl } from '@material-ui/core';
import Image from '../images/medical-hero-signup.jpg';
import axios from 'axios';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    card: {
        margin: theme.spacing(4),
        marginTop: theme.spacing(2),
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
    },
    overall: {
        backgroundImage: 'url(' + Image + ')',
        backgroundSize: 'cover',
    },
    paper: {
        paddingTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp() {
    const classes = useStyles();

    const [name, setName] = React.useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const [email, setEmail] = React.useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }


    const [password, setPassword] = React.useState('');

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const [selectedDate, setSelectedDate] = React.useState('2020-07-20');

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const [gender, setGender] = React.useState('');

    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    const [phone, setPhone] = React.useState('');
    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    }

    const [insurance, setInsurance] = React.useState('');

    const handleInsuranceChange = (event) => {
        setInsurance(event.target.value);
    };

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const diseases = [
        'Disability',
        'Diabetes',
        'Hypertension',
        'Alcoholism'
    ];

    const [diseaseName, setDiseaseName] = React.useState([]);

    const handleDiseaseChange = (event) => {
        setDiseaseName(event.target.value);
    }

    const SignUpClick = (e) => {
        e.preventDefault();
        var hand = diseaseName.includes('Disability') ? true : false;
        var dia = diseaseName.includes('Diabetes') ? true : false;
        var hyp = diseaseName.includes('Hypertension') ? true : false;
        var alc = diseaseName.includes('Alcoholism') ? true : false;
        const newPatient = {
            name: name,
            email: email,
            password: password,
            dob: selectedDate,
            sex: gender,
            phone: phone,
            insurance: insurance,
            handicap: hand,
            diabetes: dia,
            hypertension: hyp,
            alcoholism: alc
        }

        axios.post('http://localhost:5000/patients/register', newPatient)
        .then((res) => {console.log(res.data)});

        window.location = '/';
    }

    return (
        <Box width={1} className={classes.overall}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>

                    <Paper>
                        <div className={classes.card}>
                            <Typography component="h1" variant="h3" color="primary">ASIM</Typography>

                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Register
        </Typography>
                            <form className={classes.form} noValidate>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            autoComplete="fname"
                                            name="fullName"
                                            variant="standard"
                                            required
                                            fullWidth
                                            id="fullName"
                                            label="Full Name"
                                            onChange={handleNameChange}
                                            value={name}
                                            autoFocus
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="standard"
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            value={email}
                                            onChange={handleEmailChange}
                                            autoComplete="email"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="standard"
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            value={password}
                                            onChange={handlePasswordChange}
                                            autoComplete="current-password"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            variant="standard"
                                            fullWidth
                                            id="date"
                                            label="Date of birth"
                                            type="date"
                                            defaultValue={selectedDate}
                                            onChange={handleDateChange}
                                            className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl variant="standard" fullWidth>
                                            <InputLabel id="gender">Gender *</InputLabel>
                                            <Select
                                                required
                                                labelId="gender"
                                                id="gender"
                                                defaultValue="male"
                                                value={gender}
                                                onChange={handleGenderChange}
                                                label="Gender *"
                                            >
                                                <MenuItem value="male">Male</MenuItem>
                                                <MenuItem value="female">Female</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="standard"
                                            required
                                            fullWidth
                                            name="phone"
                                            label="Phone number"
                                            type="text"
                                            id="phone"
                                            value={phone}
                                            onChange={handlePhoneChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl variant="standard" fullWidth>
                                            <InputLabel id="insurance">Insurance *</InputLabel>
                                            <Select
                                                required
                                                labelId="insurance"
                                                id="insurance"
                                                value={insurance}
                                                onChange={handleInsuranceChange}
                                                label="Insurance *"
                                            >
                                                <MenuItem value="true">Yes, I have medical insurance</MenuItem>
                                                <MenuItem value="false">No, I do not have medical insurance</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl variant="standard" fullWidth>
                                            <InputLabel id="disease">Disease history *</InputLabel>
                                            <Select
                                                labelId="disease"
                                                id="disease"
                                                multiple
                                                value={diseaseName}
                                                onChange={handleDiseaseChange}
                                                input={<Input />}
                                                MenuProps={MenuProps}
                                            >
                                                {diseases.map((name) => (
                                                    <MenuItem key={name} value={name}>
                                                        {name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    onClick={SignUpClick}
                                    className={classes.submit}
                                >
                                    Register
          </Button>
                                <Grid container justify="flex-end">
                                    <Grid item>
                                        <Link href="/login" variant="body2">
                                            Already have an account? Log in
              </Link>
                                    </Grid>

                                </Grid>
                            </form>
                        </div>
                    </Paper>
                </div>
                <Box mt={5}>
                    <Copyright />
                </Box>
            </Container>
        </Box>
    );
}