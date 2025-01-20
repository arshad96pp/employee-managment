import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../config/baseUrl";
import Loader from "../components/Loader/Loader";

// Fetch Designation Data from API
const fetchDesignationData = async (token: string) => {
  const response = await baseUrl.get("/employees?page=1", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data?.data;
};

const EmployeeList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const { token } = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => setPage(newPage);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setRowsPerPage(+event.target.value);

  // Fetch Employee Data with React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ["employees"],
    queryFn: () => fetchDesignationData(token),
  });

  // Filter rows based on search query
  const filteredRows = data?.filter(
    (row) =>
      row.first_name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      row.last_name?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  const currentRows = filteredRows?.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  console.log('API Data:', data);

  return (
    <Box flex={1} overflow="auto">
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h5" gutterBottom>
            Employee List
          </Typography>

          <Button
            variant="outlined"
            onClick={() => navigate("/addEmployee")}
            sx={{
              color: "#000",
              border: "1px solid #000",
              "&:hover": {
                border: "1px solid #333",
                backgroundColor: "#f9f9f9",
              },
            }}
          >
            Add New Record
          </Button>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "end", mb: 2 }}>
          <TextField
            size="small"
            placeholder="Search by name"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query
            sx={{ width: 200 }}
          />
        </Box>


        {/* Wrap the TableContainer with a div for horizontal scrolling */}
        <div style={{ overflowX: "auto" }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Sl.No</strong>
                  </TableCell>
                  <TableCell sx={{
                    whiteSpace: "nowrap", // Prevent text wrapping
                    overflow: "hidden", // Hide overflow text
                    textOverflow: "ellipsis", // Add ellipsis if text overflows
                  }}>
                    <strong>First Name</strong>
                  </TableCell>
                  <TableCell sx={{
                    whiteSpace: "nowrap", // Prevent text wrapping
                    overflow: "hidden", // Hide overflow text
                    textOverflow: "ellipsis", // Add ellipsis if text overflows
                  }}>
                    <strong>Last Name</strong>
                  </TableCell>
                  <TableCell sx={{
                    whiteSpace: "nowrap", // Prevent text wrapping
                    overflow: "hidden", // Hide overflow text
                    textOverflow: "ellipsis", // Add ellipsis if text overflows
                  }}>
                    <strong>Join Date</strong>
                  </TableCell>
                  <TableCell sx={{
                    whiteSpace: "nowrap", // Prevent text wrapping
                    overflow: "hidden", // Hide overflow text
                    textOverflow: "ellipsis", // Add ellipsis if text overflows
                  }}>
                    <strong>Date of Birth</strong>
                  </TableCell>
                  <TableCell sx={{
                    whiteSpace: "nowrap", // Prevent text wrapping
                    overflow: "hidden", // Hide overflow text
                    textOverflow: "ellipsis", // Add ellipsis if text overflows
                  }}>
                    <strong>Gender</strong>
                  </TableCell>
                  <TableCell sx={{
                    whiteSpace: "nowrap", // Prevent text wrapping
                    overflow: "hidden", // Hide overflow text
                    textOverflow: "ellipsis", // Add ellipsis if text overflows
                  }}>
                    <strong>Designation</strong>
                  </TableCell>
                  <TableCell sx={{
                    whiteSpace: "nowrap", // Prevent text wrapping
                    overflow: "hidden", // Hide overflow text
                    textOverflow: "ellipsis", // Add ellipsis if text overflows
                  }}>
                    <strong>Email</strong>
                  </TableCell>
                  <TableCell sx={{
                    whiteSpace: "nowrap", // Prevent text wrapping
                    overflow: "hidden", // Hide overflow text
                    textOverflow: "ellipsis", // Add ellipsis if text overflows
                  }}>
                    <strong>Phone no</strong>
                  </TableCell>
                  <TableCell sx={{
                    whiteSpace: "nowrap", // Prevent text wrapping
                    overflow: "hidden", // Hide overflow text
                    textOverflow: "ellipsis", // Add ellipsis if text overflows
                  }}>
                    <strong>Profile Image</strong>
                  </TableCell>
                </TableRow>
              </TableHead>


              <TableBody>
                {currentRows?.map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell sx={{
                      whiteSpace: "nowrap", // Prevent text wrapping
                      overflow: "hidden", // Hide overflow text
                      textOverflow: "ellipsis", // Add ellipsis if text overflows
                    }}>{row.first_name}</TableCell>
                    <TableCell sx={{
                      whiteSpace: "nowrap", // Prevent text wrapping
                      overflow: "hidden", // Hide overflow text
                      textOverflow: "ellipsis", // Add ellipsis if text overflows
                    }}>{row.last_name}</TableCell>
                    <TableCell sx={{
                      whiteSpace: "nowrap", // Prevent text wrapping
                      overflow: "hidden", // Hide overflow text
                      textOverflow: "ellipsis", // Add ellipsis if text overflows
                    }}>{row.join_date || 'no join date'}</TableCell>
                    <TableCell>{row.date_of_birth}</TableCell>
                    <TableCell>{row.gender}</TableCell>
                    <TableCell sx={{
                      whiteSpace: "nowrap", // Prevent text wrapping
                      overflow: "hidden", // Hide overflow text
                      textOverflow: "ellipsis", // Add ellipsis if text overflows
                    }}>{row.designation}</TableCell>
                    <TableCell
                      sx={{
                        whiteSpace: "nowrap", // Prevent text wrapping
                        overflow: "hidden", // Hide overflow text
                        textOverflow: "ellipsis", // Add ellipsis if text overflows
                      }}
                    >
                      {row.email}
                    </TableCell>
                    <TableCell sx={{
                      whiteSpace: "nowrap", // Prevent text wrapping
                      overflow: "hidden", // Hide overflow text
                      textOverflow: "ellipsis", // Add ellipsis if text overflows
                    }}>{row.mobile_number}</TableCell>
                    <TableCell sx={{
                      whiteSpace: "nowrap", // Prevent text wrapping
                      overflow: "hidden", // Hide overflow text
                      textOverflow: "ellipsis", // Add ellipsis if text overflows
                    }}>
                      <img
                        src={row.profile_image_url}
                        alt={`${row.first_name} ${row.last_name}`}
                        style={{ width: 50, height: 50, borderRadius: '50%' }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        {isLoading && <Loader />}


        <TablePagination
          component="div"
          count={filteredRows?.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Container>
    </Box>
  );
};

export default EmployeeList;
