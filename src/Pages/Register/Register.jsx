import React, { useState } from "react";
import { TextField, Button, Card, CardContent, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
// import { signup } from "../../redux/Actioins";
import { useForm } from "react-hook-form";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const Register = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [status, setStatus] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },

  } = useForm({ mode: "onChange" })

  // const dispatch = useDispatch();
  const navigate=useNavigate()

  const onSubmit = async(data) => {
    console.log("Form Data:", data);
    try {
      const response = await axios.post('http://localhost:5000/register', {
        username: data.username,
        email: data.email,    
        password: data.password,
      });

      // console.log('Login successful:', response.data);
      alert("successfully Registered. Please login")  
      // Handle successful login (e.g., store token, navigate, etc.)
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      // Handle error (e.g., display error message)
    }
    //  dispatch(signup({username:data.username,email:data.email,password:data.password},navigate))
     setStatus('successfully Registered')
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Card sx={{ maxWidth: 400, padding: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" textAlign="center" gutterBottom>
            Register
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Username"
        fullWidth
        margin="normal"
        {...register("username", { required: "Username is required" })}
        error={!!errors.username}
        helperText={errors.username?.message}
      />

      <TextField
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: "Invalid email address",
          },
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        {...register("password", { required: "Password is required" })}
        error={!!errors.password}
        helperText={errors.password?.message}
      />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={!isValid}
          >
            Register
          </Button>
          {
  status!==''?<Typography color="success.main" sx={{ mt: 2, textAlign: "center" }}>
  {status}
</Typography>:''
          }
        

            <Link to="/Login" style={{ display: "block", textAlign: "center", marginTop: "10px", textDecoration: "none", color: "blue" }}>
  Already have an account? Login here
</Link>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Register;