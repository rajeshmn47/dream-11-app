import "./register.css";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, react } from "react";
import { URL } from "../constants/userConstants";
import Otp from "./otp";
import styled from "@emotion/styled";

const Err = styled.p`
  color: red;
`;

export const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [otp, setOtp] = useState();

  const handlesubmit = async (e) => {
    e.preventDefault();

    console.log(phonenumber, username, email, password);
    const data = await axios.post(`${URL}/auth/register`, {
      username: username,
      email: email,
      phonenumber: phonenumber,
      password: password,
    });
    console.log(data);
    if (data.data.success) {
      setErr(data.data.message);
      setOpen(true);
    } else {
      setErr(data.data.message);
    }
  };

  const handleotp = async () => {
    const data = await axios.post(`${URL}/auth/otp`, {
      username: username,
      email: email,
      phonenumber: phonenumber,
      password: password,
      otp: otp,
    });
    console.log(data.data.message);
    setErr(data.data.message);
  };
  return (
    <>
      <div className="registertopbar">
        <ArrowBackIcon
          style={{ marginRight: "2vw" }}
          onClick={() => navigate(-1)}
        />
        register & play
      </div>

      <div className="register">
        <Paper style={{ padding: "2vh 2vw" }}>
          <form onSubmit={handlesubmit} className="registerform">
            <TextField
              placeholder="Email"
              variant="standard"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
            <TextField
              placeholder="name"
              variant="standard"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              placeholder="Phonenumber"
              variant="standard"
              value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
              type="phone"
            />

            <TextField
              placeholder="Password"
              variant="standard"
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
          {err && <Err>{err}</Err>}
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
};

export default Register;
