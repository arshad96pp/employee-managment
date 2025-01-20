import React, { useState } from "react";
import {
  Typography,
  Box,
  Container,
  Card,
  Divider,
  CircularProgress, // Import CircularProgress for the loader
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AddEmployeeApi } from "../config/baseUrl";
import AddEmployeeForm from "../components/forms/AddEmployeeForm";
import { toast } from 'react-toastify';


const AddEmployee = () => {
  const { control, handleSubmit, reset, formState: { errors } } = useForm();
  const [fileDetails, setFileDetails] = useState<any>(null);
  const [pdfDetails, setPdfDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false); // Loader state

  const { token } = useSelector((state: any) => state.auth)
  const navigate = useNavigate()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setFileDetails(file); // Store the file details
    }
  };

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setPdfDetails(file); // Store the PDF file details
    }
  };

  const onSubmit = async (data: any) => {
    const {
      first_name,
      last_name,
      mobile_number,
      email,
      gender,
      designation,
      status,
      profile_pic,
      resume,
      address,
      date_of_birth
    } = data;

    // Log file details
    console.log('File details:', fileDetails);

    const item = {
      first_name,
      last_name,
      mobile_number,
      email,
      contract_period: '23',
      total_salary: '233432',
      gender,
      designation,
      status,
      resume,
      address,
      date_of_birth,
      "monthly_payments[0][payment_date]": '2024-02-21',
      "monthly_payments[0][amount_percentage]": '554',
      "monthly_payments[0][remarks]": '88',
      "monthly_payments[0][amount]": "5"
    };

    const formData = new FormData();

    // Append other fields dynamically
    Object.keys(item).forEach((key) => {
      formData.append(key, item[key]);
    });

    // Append profile pic as a file if it exists
    if (fileDetails) {
      console.log("Appending profile picture to FormData:", fileDetails);
      formData.append("profile_pic", fileDetails); // Append the actual file
    }

    if (pdfDetails) {
      console.log("Appending resume to FormData:", pdfDetails);
      formData.append("resume", pdfDetails); // Append the resume file
    }

    setLoading(true); // Show the loader

    try {
      const response = await AddEmployeeApi(formData, token);
      console.log('response', response);

      if (response?.status) {
        navigate('/EmployeeList');
        toast.success('Employee added successfully!')
        // reset();
      } else {
        console.log('Response error:', response);
      }
    } catch (error) {
      console.error('API call error:', error);
      toast.error('Failed to add employee. Please try again.')

    } finally {
      setLoading(false); // Hide the loader after the request finishes
    }
  };

  const config = {
    onSubmit,
    handleFileChange,
    handlePdfChange,
    control,
    handleSubmit,
    reset,
    Controller,
    errors
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
            width: 900,
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
            }}
          >
            <Typography variant="h6" >
              Add Employee
            </Typography>

            
          </Box>
          <Divider />

          {/* Form Section */}
          <Box sx={{ padding: 3 }}>
            {loading ? ( // Show loader while submitting
              <Box flex={1} sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
              </Box>
            ) : (
              <AddEmployeeForm config={config} />
            )}
          </Box>
        </Card>
      </Container>
    </Box>
  );
};

export default AddEmployee;
