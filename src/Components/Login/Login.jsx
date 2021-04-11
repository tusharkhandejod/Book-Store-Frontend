import React from "react";
import Button from "react-bootstrap/Button";
import TextField from "@material-ui/core/TextField";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarComponent from "../snackbarComponent/snackbar";
import '../Login/login.css'
import { registration } from "../../Services/user1Services"
import { login } from "../../Services/user1Services"

export default function Login(props) {

    const [toggleState, setToggleState] = React.useState(1);
    const [name, setName] = React.useState();
    const [nameFlag, setNameFlag] = React.useState();
    const [nameError, setNameError] = React.useState("");
    const [email, setEmail] = React.useState();
    const [emailFlag, setEmailFlag] = React.useState(false);
    const [emailError, setEmailError] = React.useState("");
    const [password, setPassword] = React.useState();
    const [passwordFlag, setPasswordFlag] = React.useState(false);
    const [passwordError, setPasswordError] = React.useState("");
    const [mobile, setMobile] = React.useState();
    const [mobileFlag, setMobileFlag] = React.useState(false);
    const [mobileError, setMobileError] = React.useState("");
    const [snackbaropen, setSnackbaropen] = React.useState(false);
    const [snackbarmsg, setSnackbarmsg] = React.useState("");
    const [email1, setEmail1] = React.useState();
    const [email1Flag, setEmail1Flag] = React.useState(false);
    const [email1Error, setEmail1Error] = React.useState("");
    const [password1, setPassword1] = React.useState();
    const [password1Flag, setPassword1Flag] = React.useState(false);
    const [password1Error, setPassword1Error] = React.useState("");
    const [values, setValues] = React.useState({
        password: "",
        showPassword: false,
    });

    const nextPath = (path) => {
        props.history.push(path);
    };

    const toggle = (index) => {
        console.log(index);
        setToggleState(index);
    };

    const makeInitial = () => {
        setNameFlag(false);
        setNameError("");
        setEmailFlag(false);
        setEmailError("");
        setMobileFlag(false);
        setMobileError("");
        setPasswordFlag(false);
        setPasswordError("");
    };

    const patternCheck = () => {
        makeInitial();
        const namePattern = /[a-zA-Z][a-zA-Z ]*/;
        const emailPattern = /[a-zA-Z0-9._]+[@]{1}[a-zA-Z120-9]*[.]{1}[a-zA-Z]*$/;
        const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/;
        const mobilePattern = /^[6-9]{1}[0-9]{9}$/;
        let isError = false;
        if (!namePattern.test(name)) {
            setNameFlag(true);
            setNameError("Name is Not Proper");
            isError = true;
        }
        if (!mobilePattern.test(mobile)) {
            setMobileFlag(true);
            setMobileError("Mobile Number is Not Proper");
            isError = true;
        }
        if (!emailPattern.test(email)) {
            setEmailFlag(true);
            setEmailError("Email is Not Proper");
            isError = true;
        }
        if (!passwordPattern.test(password)) {
            setPasswordFlag(true);
            setPasswordError("Please Enter Valid Password");
            isError = true;
        }
        return isError;
    };

    const handleSignupSubmit = () => {
        if (patternCheck()) {
            console.log("Error Occured");
        } else {
            console.log("Success");
            const data = {
                fullname: name,
                email: email,
                password: password,
                mobile: mobile,
            };
            
            registration(data).then((data) => {
                    console.log("registration successful : ", JSON.stringify(data.data.data));
                    nextPath("../Login");
                })
                .catch((err) => {
                    console.log("Registration Error" + err);
                });
        }
    };

    const makeInitial1 = () => {
        setEmail1Flag(false);
        setEmail1Error("");
        setPassword1Flag(false);
        setPassword1Error("");
    };

    const pattern1Check = () => {
        makeInitial1();
        const emailPattern = /[a-zA-Z0-9._]+[@]{1}[a-zA-Z120-9]*[.]{1}[a-zA-Z]*$/;
        const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/;
        let isError = false;
        if (!emailPattern.test(email1)) {
            setEmail1Flag(true);
            setEmail1Error("Email is Not Proper");
            isError = true;
        }
        if (!passwordPattern.test(password1)) {
            setPassword1Flag(true);
            setPassword1Error("Please Enter Valid Password");
            isError = true;
        }
        return isError;
    };

    const handleLoginSubmit = () => {
        if (pattern1Check()) {
            console.log("Error Occured");
        } else {
            console.log("Success");
            const data = {
                email: email1,
                password: password1,
            };
            
                login(data).then((data) => {
                    
                    console.log("Login successful : ", JSON.stringify(data));
                    console.log(data)
                    console.log('token : ',data.data.token)
                    localStorage.setItem("bookStoreToken",data.data.token);
                    nextPath("../dashboard");
                })
                .catch((err) => {
                    console.log("Login Error" + err);
                });
        }
    };



    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    return (
        <div className="container-login">
            <div className="img-holder">
                <img className="image" alt="image" />
                <span className="text">ONLINE BOOK SHOPPING</span>
            </div>
            <div className="login">
                <br></br>
                <button className="lgn" text="Test" onClick={() => toggle(1)}>
                    LOGIN
                </button>
                <button className="sgn" text="Test" onClick={() => toggle(2)}>
                    SIGN UP
                </button>
                <br></br>
                <div className={toggleState === 1 ? "active-content" : "content"}>
                    <br />
                    <div>
                        <div>
                        <br></br>
                        <br></br>
                            <div className="email">
                                <TextField
                                    id="outlined-email-input"
                                    variant="outlined"
                                    name="email"
                                    value={email1}
                                    onChange={(e) => setEmail1(e.target.value)}
                                    error={email1Flag}
                                    helperText={email1Error}
                                    label="Email"
                                    fullWidth
                                />
                            </div>
                            <br></br>
                            <div className="password">
                                <TextField
                                    id="outlined-pass-input"
                                    name="password"
                                    variant="outlined"
                                    label="Password"
                                    type={values.showPassword ? "text" : "password"}
                                    fullWidth
                                    value={password1}
                                    onChange={(e) => setPassword1(e.target.value)}
                                    error={password1Flag}
                                    helperText={password1Error}
                                    endAdornment={
                                        <IconButton
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    }
                                />
                            </div>
                            <br></br>
                            <Button
                                className="btn"
                                text="test"
                                onClick={handleLoginSubmit}
                            >
                                Login
                  </Button>
                        </div>
                    </div>
                    <br />

                </div>

                <div className={toggleState === 2 ? "active-content" : "content"}>
                <br></br>
                    <TextField
                        id="outlined-secondary-name"
                        variant="outlined"
                        color="secondary"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        error={nameFlag}
                        helperText={nameError}
                        label="Full Name"
                    />
                    <br />
                    <TextField
                        id="outlined-secondary-email"
                        variant="outlined"
                        color="secondary"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={emailFlag}
                        helperText={emailError}
                        label="Email"
                    />
                    <br />
                    <TextField
                        id="outlined-secondary-password"
                        variant="outlined"
                        color="secondary"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={passwordFlag}
                        helperText={passwordError}
                        label="Password"
                        type="password"
                    />
                    <br />
                    <TextField
                        id="outlined-secondary-mobile"
                        variant="outlined"
                        color="secondary"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        error={mobileFlag}
                        helperText={mobileError}
                        label="Mobile"
                        type="number"
                    />
                    <Button
                        className="btn"
                        onClick={handleSignupSubmit}
                    >
                        Sign up
              </Button>
                </div>
                <SnackbarComponent open={snackbaropen} message={snackbarmsg} />
            </div>
        </div>
    );
}