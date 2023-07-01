import "./register.css";

import styled from "@emotion/styled";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { react, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { URL } from "../constants/userConstants";
import Otp from "./otp";
import { useAlert } from "react-alert";

const Err = styled.p`
  color: red;
`;

export function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const alert = useAlert();
  const [password, setPassword] = useState("");
  const [err, setErr] = useState();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [otp, setOtp] = useState();

  const handlesubmit = async (e) => {
    e.preventDefault();

    console.log(phonenumber, username, email, password);
    const data = await axios.post(`${URL}/auth/register`, {
      username,
      email,
      phonenumber,
      password,
    });
    console.log(data);
    if (data.data.success) {
      setErr(data.data.message);
      alert.success(data.data.message);
      setOpen(true);
    } else {
      alert.error(data.data.message);
      setErr(data.data.message);
    }
  };

  const handleotp = async () => {
    const data = await axios.post(`${URL}/auth/otp`, {
      username,
      email,
      phonenumber,
      password,
      otp,
    });
    setErr(data.data.message);
  };
  return (
    <>
      <div className="registertopbar">
        <ArrowBackIcon
          style={{ marginRight: "20px" }}
          onClick={() => navigate(-1)}
        />
        register & play
      </div>

      <div className="register">
        <Paper style={{ padding: "20px 20px" }}>
          <form onSubmit={handlesubmit} className="registerform">
            <TextField
              placeholder="Email"
              variant="standard"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
            <TextField
              placeholder="name"
              name="name"
              variant="standard"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              placeholder="Phonenumber"
              variant="standard"
              name="phonenumber"
              value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
              type="phone"
            />

            <TextField
              placeholder="Password"
              variant="standard"
              name="password"
              id="fullWidth"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant="contained"
              type="submit"
              disableElevation
              style={{ backgroundColor: "#24B937" }}
            >
              Register
            </Button>
          </form>
          <Link to="/forgot-password">forgot password</Link>
        </Paper>
        <Link to="/login">Aleady a user?Log in</Link>
      </div>
      <Otp
        open={open}
        setOpen={setOpen}
        otp={otp}
        setOtp={setOtp}
        handleotp={handleotp}
        err={err}
      />
    </>
  );
}

export default Register;
