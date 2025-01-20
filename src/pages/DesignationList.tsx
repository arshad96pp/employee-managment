import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  TextField,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField as MUITextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "../config/baseUrl";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader/Loader";

// Fetch Designations API function
const fetchDesignationData = async (token: string) => {
  const response = await baseUrl.get("/designations", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data; // Assuming `data` contains an array of designations
};

const DesignationList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [selectedRow, setSelectedRow] = useState<any>(null); // Selected row for modals
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { token } = useSelector((state: any) => state.auth);

  const navigate = useNavigate();

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => setPage(newPage);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0); // Reset to the first page when rows per page changes
  };

  // Fetch Designations with React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ["designations"],
    queryFn: () => fetchDesignationData(token),
  });

  // Filter rows based on search query
  const filteredData = Array.isArray(data)
    ? data.filter((row: any) =>
        row?.name?.toLowerCase()?.includes(searchQuery.toLowerCase())
      )
    : [];

  // Extract paginated rows based on the current page and rowsPerPage
  const currentRows = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Handlers for Delete Modal
  const openDeleteModal = (row: any) => {
    setSelectedRow(row);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedRow(null);
  };

  const handleDelete = () => {
    console.log("Deleted Row:", selectedRow);
    closeDeleteModal();
    // Perform API call for deletion if needed
  };

  // Handlers for Edit Modal
  const openEditModal = (row: any) => {
    setSelectedRow(row);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedRow(null);
  };

  const handleEditSave = () => {
    console.log("Edited Row:", selectedRow);
    closeEditModal();
    // Perform API call for updating if needed
  };

  return (
    <Box flex={1} overflow="auto">
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h5" gutterBottom>
            Designation List
          </Typography>
          <Button
            variant="outlined"
            onClick={() => navigate("/addDesignation")}
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
            placeholder="Search"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ width: 200 }}
          />
        </Box>

        {/* Loading and Error States */}
        {isLoading && <Loader />}
        {error && <Alert severity="error">{(error as Error).message}</Alert>}

        {/* Designation Table */}
        {!isLoading && data && (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong>Sl.No</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Name</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Action</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentRows.map((row: any, index: number) => (
                    <TableRow
                      key={row.id}
                      sx={{
                        backgroundColor: "#f9f9f9",
                        "&:hover": {
                          backgroundColor: "#e0f7fa",
                        },
                      }}
                    >
                      <TableCell>
                        {page * rowsPerPage + index + 1}
                      </TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>
                        <IconButton
                          color="primary"
                          onClick={() => openEditModal(row)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="secondary"
                          onClick={() => openDeleteModal(row)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={filteredData.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}

        {/* Delete Modal */}
        <Dialog open={isDeleteModalOpen} onClose={closeDeleteModal}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            Are you sure you want to delete{" "}
            <strong>{selectedRow?.name}</strong>?
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDeleteModal}>Cancel</Button>
            <Button
              onClick={handleDelete}
              variant="contained"
              color="error"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Modal */}
        <Dialog open={isEditModalOpen} onClose={closeEditModal} sx={{padding:7}}>
          <DialogTitle>Edit Designation</DialogTitle>
          <DialogContent>
            <MUITextField
              fullWidth
              label="Name"
              value={selectedRow?.name || ""}
              onChange={(e) =>
                setSelectedRow({ ...selectedRow, name: e.target.value })
              }
              sx={{ mt: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeEditModal}>Cancel</Button>
            <Button
              onClick={handleEditSave}
              variant="contained"
              color="primary"
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default DesignationList;
