import React from "react";
import {
  Box,
  Container,
  Card,
  Typography,
  Divider,
  Button,
  Grid,
  TextField,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { registerApi } from "../config/baseUrl";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/slicess/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';



const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Using react-hook-form
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  // Handle form submission
  const onSubmit = async (data: any) => {
    console.log("Form Submitted:", data);

    const formData = new FormData();

    // Dynamically append each key-value pair from `data`
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    try {
      const response = await registerApi(formData);
      if (response?.status === 200) {
        dispatch(setToken({ token: response?.data?.access_token }))
        navigate('/')
        toast.success("Registration Successful!");

      }

      console.log("API Response:", response);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Registration failed. Please try again.");

    }
  };

  return (
    <Box flex={1} overflow="auto">
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "30px",
        }}
      >
        <Card
          sx={{

            width: 700,
            boxShadow: 3,
            borderRadius: "8px",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 2,
              background: "#f0f0f0",
            }}
          >
            <Typography variant="h6" sx={{
              fontSize: {
                xs: '1rem',  // font size for extra small screens
                sm: '1rem',    // font size for small screens
                md: '1rem',  // font size for medium screens
                lg: '1.2rem',    // font size for large screens
              }
            }}>
              Register
            </Typography>
          </Box>
          <Divider />

          {/* Form */}
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              padding: 4,
              margin: "auto",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            {/* Row 1: Name */}
            <Grid container spacing={2} alignItems="center" sx={{ marginBottom: 2, marginTop: '4px' }}>
              <Grid item xs={12} sm={4} display="flex" justifyContent="end">
                <Typography sx={{
                  fontSize: {
                    // font size for medium screens
                    lg: '0.9rem',    // font size for large screens
                  }
                }}>Name</Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Name is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      variant="outlined"
                      placeholder="Enter your name"
                      error={!!errors.name}
                      helperText={errors.name?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>

            {/* Row 2: Email */}
            <Grid container spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
              <Grid item xs={12} sm={4} display="flex" justifyContent="end">
                <Typography sx={{
                  fontSize: {
                    // font size for medium screens
                    lg: '0.9rem',    // font size for large screens
                  }
                }}>Email</Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Invalid email address",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      variant="outlined"
                      placeholder="Enter your email"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>

            {/* Row 3: Password */}
            <Grid container spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
              <Grid item xs={12} sm={4} display="flex" justifyContent="end">
                <Typography sx={{
                  fontSize: {
                    // font size for medium screens
                    lg: '0.9rem',    // font size for large screens
                  }
                }}>Password</Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      variant="outlined"
                      type="password"
                      placeholder="Enter your password"
                      error={!!errors.password}
                      helperText={errors.password?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>

            {/* Row 4: Confirm Password */}
            <Grid container spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
              <Grid item xs={12} sm={4} display="flex" justifyContent="end">
                <Typography sx={{
                  fontSize: {
                    // font size for medium screens
                    lg: '0.9rem',    // font size for large screens
                  }
                }}>Confirm Password</Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Controller
                  name="confirm_password"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === control._formValues.password || "Passwords do not match",
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      variant="outlined"
                      type="password"
                      placeholder="Confirm your password"
                      error={!!errors.confirm_password}
                      helperText={errors.confirm_password?.message}
                    />
                  )}
                />

              </Grid>
            </Grid>

            <Grid container spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
              <Grid item xs={12} sm={4} display="flex" justifyContent="end">
                <Typography sx={{
                  opacity: '0'
                }}>Confirm Password</Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                {/* Submit Button */}
                <Box sx={{ display: "flex", justifyContent: "start" }}>
                  <Button type="submit" variant="contained" color="primary">
                    Register
                  </Button>
                </Box>

              </Grid>
            </Grid>


          </Box>
        </Card>
      </Container>
    </Box>
  );
};

export default Register;
