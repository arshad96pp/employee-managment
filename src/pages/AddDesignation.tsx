import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AddDesignationApi } from "../config/baseUrl";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddDesignation = () => {
  const [designationsValue, setDesignationsValue] = useState("");
  const { token } = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  const submitDesignation = async (e: any) => {
    e.preventDefault();

    if (designationsValue?.trim() === "") {
      return;
    }
    const data = {
      designation_name: designationsValue,
    };

    try {
      const response = await AddDesignationApi(data, token);
      if (response?.status === 200) {
        setDesignationsValue("");
        toast.success("Destination added successfully!");
        navigate("/designationList");
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Failed to add destination. Please try again.");
    }
  };

  const handleCancel = () => {
    setDesignationsValue("");
  };

  return (
    <Box flex={1} overflow={"auto"}>
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
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Add Designation
            </Typography>
          </Box>
          <Divider />

          {/* Bottom Section */}
          <Box
            sx={{
              padding: 3,
            }}
          >
            <form>
              {/* Input Field with Static Label */}
              <Box sx={{ marginBottom: 2 }}>
                <label
                  htmlFor="designation-name"
                  style={{ fontWeight: "bold" }}
                >
                  Designation Name
                </label>
                <Box
                  component="input"
                  value={designationsValue}
                  onChange={(e) => setDesignationsValue(e.target.value)}
                  id="designation-name"
                  type="text"
                  required
                  placeholder="Enter Designation"
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    marginTop: "8px",
                    fontSize: "16px",
                  }}
                />
              </Box>

              {/* Action Buttons */}
              <Box sx={{ display: "flex", justifyContent: "start", gap: 2 }}>
                <Button
                  onClick={submitDesignation}
                  type="submit"
                  variant="outlined"
                  sx={{
                    color: "#000",
                    border: "1px solid #000",
                    "&:hover": {
                      border: "1px solid #333", // Darker border on hover
                      backgroundColor: "#f9f9f9", // Slight hover background effect
                    },
                  }}
                >
                  Submit
                </Button>

                <Button
                  type="button"
                  variant="outlined"
                  sx={{
                    color: "#000",
                    border: "1px solid #000",
                    "&:hover": {
                      border: "1px solid #333", // Darker border on hover
                      backgroundColor: "#f9f9f9", // Slight hover background effect
                    },
                  }}
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </Box>
            </form>
          </Box>
        </Card>
      </Container>
    </Box>
  );
};

export default AddDesignation;
