import React, { useEffect, useState } from "react";
import {
  Paper,
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { Container } from "@mui/system";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";

const initialValue = {
  name: "",
  phone: "",
  type: "",
  isWhatsapp: null,
  profilepics: "",
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function AddContactForm({ updateState, setUpdateState }) {
  const [contactDetails, setContactDetails] = useState(initialValue);
  const [addressType, setAddressType] = useState(["Home", "Office"]);
  const [contactDetailsList, setContactDetailsList] = useState([]);
  const [idForUpdate, setidForUpdate] = useState("");

  useEffect(() => {
    let idForUpdate = localStorage.getItem("idForUpdate");
    setidForUpdate(idForUpdate);
    if (idForUpdate != null) {
      let contacts = JSON.parse(localStorage.getItem("array"));
      let filteredContact = contacts.filter(item => item.id === idForUpdate);
      let data = filteredContact[0];

      contactDetails.name = data.name;
      contactDetails.phone = data.phone;
      contactDetails.type = data.type;
      contactDetails.isWhatsapp = data.isWhatsapp;
    } else {
      setContactDetails({
        name: "",
        phone: "",
        type: "",
        isWhatsapp: null,
        profilepics: "",
      });
    }
  }, []);

  const handleSubmit = e => {
    // e.preventDefault();
    let users = JSON.parse(localStorage.getItem("array"));
    let idForUpdate = localStorage.getItem("idForUpdate");

    if (idForUpdate != null) {
      let filteredContact = users.map(contact =>
        contact.id === idForUpdate
          ? {
              ...contact,
              name: contactDetails.name,
              phone: contactDetails.phone,
              type: contactDetails.type,
              isWhatsapp: contactDetails.isWhatsapp,
              profilepics: contactDetails.profilepics,
            }
          : contact
      );

      localStorage.setItem("array", JSON.stringify([...filteredContact]));
      setContactDetails({
        name: "",
        phone: "",
        type: "",
        isWhatsapp: null,
        profilepics: "",
      });
      return;
    }

    if (users != null) {
      const id = uuidv4();
      contactDetails.id = id;
      users.push(contactDetails);
      localStorage.setItem("array", JSON.stringify([...users]));
    } else {
      const id = uuidv4();
      contactDetails.id = id;
      let userss = [];
      userss.push(contactDetails);
      localStorage.setItem("array", JSON.stringify(userss));
    }

    setContactDetails({
      name: "",
      phone: "",
      type: "",
      isWhatsapp: null,
      profilepics: "",
    });
  };

  return (
    <div>
      <Box mt={8}>
        <Container maxWidth="xs">
          <form onSubmit={handleSubmit}>
            <Paper sx={{ padding: "16px" }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box mb={2}>
                    <Typography variant="h6">Add new contact</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="name"
                    value={contactDetails.name}
                    label="Name"
                    size="small"
                    onChange={e =>
                      setContactDetails({
                        ...contactDetails,
                        name: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="number"
                    name="phone"
                    value={contactDetails.phone}
                    onChange={e =>
                      setContactDetails({
                        ...contactDetails,
                        phone: e.target.value,
                      })
                    }
                    label="Phone"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel id="select__state">Type</InputLabel>
                    <Select
                      size="small"
                      labelId="stateList"
                      id="stateList_id"
                      value={contactDetails?.type}
                      name="type"
                      onChange={e =>
                        setContactDetails({
                          ...contactDetails,
                          type: e.target.value,
                        })
                      }
                      label="Type"
                      MenuProps={MenuProps}
                    >
                      {addressType.map((address, index) => (
                        <MenuItem key={index} value={address}>
                          {address}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      IsWhatsapp
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="isWhatsapp"
                      row
                      onChange={e =>
                        setContactDetails({
                          ...contactDetails,
                          isWhatsapp: e.target.value,
                        })
                      }
                      value={contactDetails?.isWhatsapp}
                    >
                      <FormControlLabel
                        value="Yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="No"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="file"
                    name="profilepics"
                    value={contactDetails.profilepics}
                    onChange={e =>
                      setContactDetails({
                        ...contactDetails,
                        profilepics: e.target.value,
                      })
                    }
                    label="Image"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    component={Link}
                    to="/"
                    fullWidth
                    type="submit"
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={
                      contactDetails.name === "" ||
                      contactDetails.phone === "" ||
                      contactDetails.type === "" ||
                      contactDetails.isWhatsapp === null
                    }
                  >
                    {idForUpdate != null ? "Update Contact" : "Add Contact"}
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </form>
        </Container>
      </Box>
    </div>
  );
}

export default AddContactForm;
