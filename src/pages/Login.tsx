import React from "react";
import { Box, Container, Card, Typography, Divider, Button, Grid, TextField, FormControlLabel, Checkbox } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { loginApi } from "../config/baseUrl";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/slicess/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const dispatch=useDispatch()
  const navigate =useNavigate()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();





  // Submit handler
  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append('email', data?.email);
    formData.append('password', data?.password);


    try {
      const response = await loginApi(formData)
      if (response?.status === 200) {
        dispatch(setToken({token: response?.data?.access_token}))
        navigate('/')

      }
    } catch (error) {
      console.log(error);

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
            <Typography
              variant="h6"
              sx={{
                fontSize: {
                  xs: "1rem", // font size for extra small screens
                  sm: "1rem", // font size for small screens
                  md: "1rem", // font size for medium screens
                  lg: "1.2rem", // font size for large screens
                },
              }}
            >
              Login
            </Typography>
          </Box>
          <Divider />

          {/* Bottom Section */}
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              padding: 3,
              margin: "auto",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            {/* Row 1: E-mail Address */}
            <Grid container spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
              <Grid item xs={12} sm={4} display="flex" justifyContent="end">
                <Typography>E-mail Address</Typography>
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
                      helperText={errors.email ? errors.email.message : ""}
                    />
                  )}
                />
              </Grid>
            </Grid>

            {/* Row 2: Password */}
            <Grid container spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
              <Grid item xs={12} sm={4} display="flex" justifyContent="end">
                <Typography>Password</Typography>
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
                      helperText={errors.password ? errors.password.message : ""}
                    />
                  )}
                />
              </Grid>
            </Grid>

            {/* Row 3: Remember Me */}
            <Grid container spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
              <Grid item xs={12} sm={4}></Grid>
              <Grid item xs={12} sm={8}>
                <FormControlLabel
                  control={
                    <Controller
                      name="rememberMe"
                      control={control}
                      defaultValue={false}
                      render={({ field }) => <Checkbox {...field} />}
                    />
                  }
                  label="Remember Me"
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
              <Grid item xs={12} sm={4}></Grid>
              <Grid item xs={12} sm={8}>
                {/* Buttons and Forgot Password */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "20px",
                  }}
                >
                  <Button
                    type="submit"
                    variant="outlined"
                    sx={{
                      color: "primary.main",
                      border: "1px solid",
                      borderColor: "primary.main",
                      "&:hover": {
                        borderColor: "primary.dark",
                        backgroundColor: "primary.light",
                      },
                    }}
                  >
                    Login
                  </Button>
                  <Typography
                    sx={{
                      color: "primary.main",
                      fontWeight: "bold",
                    }}
                  >
                    Forgot Password
                  </Typography>
                </Box>
              </Grid>
            </Grid>


          </Box>
        </Card>
      </Container>
    </Box>
  );
};

export default Login;
