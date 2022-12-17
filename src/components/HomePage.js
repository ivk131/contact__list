import React, { useEffect, useState } from "react";
import { Box, Toolbar, Typography, Button, IconButton } from "@mui/material";
import Header from "./Header";
import AddIcon from "@mui/icons-material/Add";
import { Link, Navigate, useHref, useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddContactForm from "./AddContactForm";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

function HomePage() {
  const [contactList, setContactList] = useState([]);
  const [updateState, setUpdateState] = useState("");
  const [isDelete, setIsDelete] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsDelete(false);
    let getContactList = JSON.parse(localStorage.getItem("array"));
    setContactList(getContactList);
  }, [isDelete]);

  useEffect(() => {
    localStorage.removeItem("idForUpdate");
  }, []);

  const handleEdit = row => {
    localStorage.setItem("idForUpdate", row?.id);
    setUpdateState(row?.id);
    navigate("/add-contact");
  };

  const handleDelete = row => {
    let getContactList = JSON.parse(localStorage.getItem("array"));
    const filteredContactList = getContactList.filter(
      item => item.id != row.id
    );

    localStorage.setItem("array", JSON.stringify(filteredContactList));
    setIsDelete(true);
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "16px 24px",
        }}
      >
        <Typography variant="h5">Contact List</Typography>
        <Button
          component={Link}
          to="add-contact"
          variant="outlined"
          startIcon={<AddIcon />}
        >
          Add Contact
        </Button>
      </Box>
      <Box sx={{ padding: "0 24px" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="center">Phone</TableCell>
                <TableCell align="center">Type</TableCell>
                <TableCell align="center">IsWhatsapp</TableCell>
                <TableCell align="center">Profile</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contactList?.length > 0 &&
                contactList.map((row, index) =>
                  row.id === updateState ? (
                    <AddContactForm
                      updateState={updateState}
                      setUpdateState={setUpdateState}
                    />
                  ) : (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row?.name}
                      </TableCell>
                      <TableCell align="center">{row?.phone}</TableCell>
                      <TableCell align="center">{row?.type}</TableCell>
                      <TableCell align="center">
                        {row?.isWhatsapp ? "Yes" : "No"}
                      </TableCell>
                      <TableCell align="center">{row?.profilepics}</TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                          <IconButton onClick={() => handleEdit(row)}>
                            <EditIcon fontSize="small" />
                          </IconButton>

                          <IconButton onClick={() => handleDelete(row)}>
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  )
                )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}

export default HomePage;
