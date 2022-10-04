import React from "react";
import { useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import CloseIcon from "@mui/icons-material/Close";
import PublicIcon from "@mui/icons-material/Public";
import LockIcon from "@mui/icons-material/Lock";
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";
import EmojiEmotionsRoundedIcon from "@mui/icons-material/EmojiEmotionsRounded";
import SendIcon from "@mui/icons-material/Send";
import CancelIcon from '@mui/icons-material/Cancel';

import billy from "../assets/billy.png";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import { motion } from "framer-motion";
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';


const options = [
  "",
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
    <PublicIcon fontSize="small" /> Public: Visible to everyone
  </div>,
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
    <LockIcon fontSize="small" /> Private: Visible to your followers
  </div>,
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40vw",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

function PostModal() {
  //modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //privacy menu
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const privacyOpen = Boolean(anchorEl);

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };
  const handlePrivacyClose = () => {
    setAnchorEl(null);
  };

  //text field
  const CHARACTER_LIMIT = 250;
  const [values, setValues] = useState({ name: "" });
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  //image
  const [selectedImage, setSelectedImage] = useState();
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };
  const removeSelectedImage = () => {
    setSelectedImage();
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 5,
    },
    preview: {
      marginTop: 5,
      display: "flex",
      flexDirection: "column",
    },
    image: { maxWidth: "50%", maxHeight: "50%" },
  };



  return (
    <div>
      {/* Landing Page*/}
      <div style={{ backgroundColor: "#161b22", height: "100vh" }}>
        <br />
        <div style={{ paddingTop: "20vh", textAlign: "center" }}>
          <motion.div initial={{ y: -400 }} animate={{ y: 0 }} transition={{ delay: 0.5, duration: 0.5 }}>
            <h1
              style={{
                color: "#fc4273",
                fontSize: "5rem",
              }}
            >
              Bleep
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 2 }}
          >
            <p style={{ textAlign: "center", color: "white", fontSize: "x-large" }}>
              A soical media platform
            </p>
            <Button
              onClick={handleOpen}
              style={{ textDecoration: "none" }}
              size="large"
              variant="contained"
              color="primary"
            >
              Post Something
            </Button>
          </motion.div>

        </div>
      </div>

      {/* Modal*/}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Create a Post"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {/* Top bar*/}
            <div
              className="topBar"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography id="modal-modal-title" variant="h5" component="h2">
                Create a new post
              </Typography>
              <CloseIcon style={{ cursor: "pointer" }} onClick={handleClose} />
            </div>
            <hr />

            {/* Profile and Post Privacy*/}
            <div
              className="profile"
              style={{ paddingTop: "1vh", display: "flex", justifyContent: "space-between" }}
            >
              <div>
                <div className="image-container" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <img
                    style={{ borderRadius: "50%" }}
                    src={billy}
                    alt="profile"
                  /> <Typography style={{ paddingLeft: "5px" }} variant="subtitle1"><strong>Billy the Cat</strong></Typography>
                </div>
              </div>

              <div>
                <List
                  component="nav"
                  aria-label="Device settings"
                  sx={{ bgcolor: "background.paper" }}
                >
                  <ListItem
                    button
                    id="lock-button"
                    aria-haspopup="listbox"
                    aria-controls="lock-menu"
                    aria-label="when device is locked"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClickListItem}
                  >
                    <ListItemText primary={options[selectedIndex]} />
                  </ListItem>
                </List>
                <Menu
                  id="lock-menu"
                  anchorEl={anchorEl}
                  open={privacyOpen}
                  onClose={handlePrivacyClose}
                  MenuListProps={{
                    "aria-labelledby": "lock-button",
                    role: "listbox",
                  }}
                >
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      disabled={index === 0}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            </div>

            {/* Text Area 250*/}
            <TextField
              fullWidth
              placeholder="What's happening?"
              inputProps={{
                maxlength: CHARACTER_LIMIT,
              }}
              value={values.name}
              helperText={`${values.name.length}/${CHARACTER_LIMIT}`}
              onChange={handleChange("name")}
              margin="normal"
              variant="filled"
              rows={5}
              multiline
            />

            {/* Image Preview*/}
            {selectedImage && (
              <div style={styles.preview}>
                <img
                  src={URL.createObjectURL(selectedImage)}
                  style={styles.image}
                  alt="Thumb"
                />
                <Button color="error" style={{ marginTop: "3px" }} startIcon={<CancelIcon />} variant="outlined" onClick={removeSelectedImage}>
                  Remove Image
                </Button>
              </div>
            )}

            <hr />
            <div
              className="bottomBar"
              style={{
                paddingTop: "2vh",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant="text" component="label">
                  <input
                    accept="image/*"
                    type="file"
                    onChange={imageChange}
                    hidden
                  />
                  <ImageRoundedIcon />
                </Button>
                <Button variant="text" component="label">
                  <EmojiEmotionsRoundedIcon />
                </Button>
              </div>
              <Button
                size="large"
                endIcon={<SendIcon />}
                variant="contained"
              >
                Send Post{" "}
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default PostModal;
