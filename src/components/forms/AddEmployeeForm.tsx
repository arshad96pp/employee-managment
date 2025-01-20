import { Box, Button, FormControlLabel, Grid, MenuItem, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import React from 'react'
import { Controller } from 'react-hook-form';

const AddEmployeeForm = ({ config }: any) => {
    const { onSubmit,
        handleFileChange,
        handlePdfChange,
        control,
        handleSubmit,
        reset,
        errors
    } = config
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {[
                { label: "First Name", name: "first_name" },
                { label: "Last Name", name: "last_name" },
                { label: "Mobile Number", name: "mobile_number" },
                { label: "Landline", name: "landline" },
                { label: "Email Address", name: "email" },
                { label: "Present Address", name: "address" },
                { label: "Permanent Address", name: "permanentAddress" },
            ].map((field) => (
                <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    key={field.name}
                    sx={{
                        marginBottom: "8px",
                        display: "grid",
                        gridTemplateColumns: "1fr 2fr",
                    }}
                >
                    <Grid item>
                        <Typography>{field.label}</Typography>
                    </Grid>
                    <Grid item>
                        <Controller
                            name={field.name}
                            control={control}
                            rules={{ required: `${field.label} is required` }}
                            defaultValue=""
                            render={({ field: inputField }) => (
                                <>
                                    <TextField
                                        {...inputField}
                                        fullWidth
                                        variant="outlined"
                                    />
                                    {errors[field.name] && (
                                        <Typography
                                            variant="body2"
                                            color="error"
                                            sx={{ marginTop: "4px" }}
                                        >
                                            {errors[field.name]?.message}
                                        </Typography>
                                    )}
                                </>
                            )}
                        />
                    </Grid>
                </Grid>
            ))}

            {/* Join Date */}
            <Grid
                container
                spacing={2}
                alignItems="center"
                sx={{
                    marginBottom: "8px",
                    display: "grid",
                    gridTemplateColumns: "1fr 2fr",
                }}
            >
                <Grid item>
                    <Typography>Join Date</Typography>
                </Grid>
                <Grid item>
                    <Controller
                        name="joinDate"
                        control={control}
                        rules={{ required: "Join Date is required" }}
                        defaultValue=""
                        render={({ field }) => (
                            <>
                                <TextField
                                    {...field}
                                    fullWidth
                                    type="date"
                                    variant="outlined"
                                />
                                {errors.joinDate && (
                                    <Typography
                                        variant="body2"
                                        color="error"
                                        sx={{ marginTop: "4px" }}
                                    >
                                        {errors.joinDate?.message}
                                    </Typography>
                                )}
                            </>
                        )}
                    />
                </Grid>
            </Grid>

            {/* Date of Birth */}
            <Grid
                container
                spacing={2}
                alignItems="center"
                sx={{
                    marginBottom: "8px",
                    display: "grid",
                    gridTemplateColumns: "1fr 2fr",
                }}
            >
                <Grid item>
                    <Typography>Date of Birth</Typography>
                </Grid>
                <Grid item>
                    <Controller
                        name="date_of_birth"
                        control={control}
                        rules={{ required: "Date of Birth is required" }}
                        defaultValue=""
                        render={({ field }) => (
                            <>
                                <TextField
                                    {...field}
                                    fullWidth
                                    type="date"
                                    variant="outlined"
                                />
                                {errors.dob && (
                                    <Typography
                                        variant="body2"
                                        color="error"
                                        sx={{ marginTop: "4px" }}
                                    >
                                        {errors.dob?.message}
                                    </Typography>
                                )}
                            </>
                        )}
                    />
                </Grid>
            </Grid>

            {/* Gender */}
            <Grid
                container
                spacing={2}
                alignItems="center"
                sx={{
                    marginBottom: "8px",
                    display: "grid",
                    gridTemplateColumns: "1fr 2fr",
                }}
            >
                <Grid item>
                    <Typography>Gender</Typography>
                </Grid>
                <Grid item>
                    <Controller
                        name="gender"
                        control={control}
                        rules={{ required: "Gender is required" }}
                        defaultValue=""
                        render={({ field }) => (
                            <>
                                <RadioGroup row {...field}>
                                    <FormControlLabel
                                        value="male"
                                        control={<Radio />}
                                        label="Male"
                                    />
                                    <FormControlLabel
                                        value="female"
                                        control={<Radio />}
                                        label="Female"
                                    />
                                </RadioGroup>
                                {errors.gender && (
                                    <Typography
                                        variant="body2"
                                        color="error"
                                        sx={{ marginTop: "4px" }}
                                    >
                                        {errors.gender?.message}
                                    </Typography>
                                )}
                            </>
                        )}
                    />
                </Grid>
            </Grid>

            {/* Designation Dropdown */}
            <Grid
                container
                spacing={2}
                alignItems="center"
                sx={{
                    marginBottom: "8px",
                    display: "grid",
                    gridTemplateColumns: "1fr 2fr",
                }}
            >
                <Grid item>
                    <Typography>Designation</Typography>
                </Grid>
                <Grid item>
                    <Controller
                        name="designation"
                        control={control}
                        rules={{ required: "Designation is required" }}
                        defaultValue=""
                        render={({ field }) => (
                            <>
                                <TextField {...field} select fullWidth variant="outlined">
                                    {[
                                        { value: "1", label: "Developer" },
                                        { value: "2", label: "Designer" },
                                        { value: "3", label: "Manager" },
                                    ].map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                {errors.designation && (
                                    <Typography
                                        variant="body2"
                                        color="error"
                                        sx={{ marginTop: "4px" }}
                                    >
                                        {errors.designation?.message}
                                    </Typography>
                                )}
                            </>
                        )}
                    />
                </Grid>
            </Grid>

            {/* Status Dropdown */}
            <Grid
                container
                spacing={2}
                alignItems="center"
                sx={{
                    marginBottom: "8px",
                    display: "grid",
                    gridTemplateColumns: "1fr 2fr",
                }}
            >
                <Grid item>
                    <Typography>Status</Typography>
                </Grid>
                <Grid item>
                    <Controller
                        name="status"
                        control={control}
                        rules={{ required: "Status is required" }}
                        defaultValue=""
                        render={({ field }) => (
                            <>
                                <TextField {...field} select fullWidth variant="outlined">
                                    {[
                                        { value: "active", label: "Active" },
                                        { value: "inactive", label: "Inactive" },
                                    ].map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                {errors.status && (
                                    <Typography
                                        variant="body2"
                                        color="error"
                                        sx={{ marginTop: "4px" }}
                                    >
                                        {errors.status?.message}
                                    </Typography>
                                )}
                            </>
                        )}
                    />
                </Grid>
            </Grid>

            {/* Profile Picture Upload */}
            <Grid
                container
                spacing={2}
                alignItems="center"
                sx={{
                    marginBottom: "8px",
                    display: "grid",
                    gridTemplateColumns: "1fr 2fr",
                }}
            >
                <Grid item>
                    <Typography>Profile Picture</Typography>
                </Grid>
                <Grid item>
                    <Controller
                        name="profile_pic"
                        control={control}
                        rules={{ required: "Profile Picture is required" }}
                        defaultValue=""
                        render={({ field }) => (
                            <>
                                <TextField
                                    {...field}
                                    fullWidth
                                    type="file"
                                    inputProps={{ accept: "image/*" }} // Accept images only
                                    variant="outlined"
                                    onChange={(e) => {
                                        field.onChange(e); // Update React Hook Form state with file
                                        handleFileChange(e); // Handle file changes (optional)
                                    }}
                                />
                                {errors.profile_pic && (
                                    <Typography
                                        variant="body2"
                                        color="error"
                                        sx={{ marginTop: "4px" }}
                                    >
                                        {errors.profile_pic?.message}
                                    </Typography>
                                )}
                            </>
                        )}
                    />
                </Grid>
            </Grid>

            {/* Resume Upload */}
            <Grid
                container
                spacing={2}
                alignItems="center"
                sx={{
                    marginBottom: "8px",
                    display: "grid",
                    gridTemplateColumns: "1fr 2fr",
                }}
            >
                <Grid item>
                    <Typography>Resume</Typography>
                </Grid>
                <Grid item>
                    <Controller
                        name="resume"
                        control={control}
                        rules={{ required: "Resume is required" }}
                        defaultValue=""
                        render={({ field }) => (
                            <>
                                <TextField
                                    {...field}
                                    fullWidth
                                    type="file"
                                    inputProps={{ accept: ".pdf,.doc,.docx" }}
                                    variant="outlined"
                                    onChange={(e) => {
                                        field.onChange(e); // Update React Hook Form state with file
                                        handlePdfChange(e); // Handle file changes (optional)
                                    }}
                                />
                                {errors.resume && (
                                    <Typography
                                        variant="body2"
                                        color="error"
                                        sx={{ marginTop: "4px" }}
                                    >
                                        {errors.resume?.message}
                                    </Typography>
                                )}
                            </>
                        )}
                    />
                </Grid>
            </Grid>

            {/* Action Buttons */}
            <Box sx={{ display: "flex", justifyContent: "start", gap: 2 }}>
                <Button
                    type="submit"
                    variant="outlined"
                    sx={{
                        color: "#000",
                        border: "1px solid #000",
                        "&:hover": {
                            border: "1px solid #333",
                            backgroundColor: "#f9f9f9",
                        },
                    }}
                >
                    Submit
                </Button>
                <Button
                    type="button"
                    variant="outlined"
                    onClick={() => reset()}
                    sx={{
                        color: "#000",
                        border: "1px solid #000",
                        "&:hover": {
                            border: "1px solid #333",
                            backgroundColor: "#f9f9f9",
                        },
                    }}
                >
                    Cancel
                </Button>
            </Box>
        </form>
    )
}

export default AddEmployeeForm