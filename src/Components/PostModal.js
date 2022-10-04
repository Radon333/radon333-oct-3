import React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import billy from "../assets/billy.png"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';
import ImageRoundedIcon from '@mui/icons-material/ImageRounded';
import EmojiEmotionsRoundedIcon from '@mui/icons-material/EmojiEmotionsRounded';

const options = [
  '',
  <div>
    <PublicIcon fontSize='small' /> Public: Visible to everyone
  </div>,
  <div>
    <LockIcon fontSize='small' /> Private: Visible to your followers
  </div>,
];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
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
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };


  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          <div className="topBar" style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Create a new post
            </Typography>
            <CloseIcon onClick={handleClose} />
          </div>
          <hr />

          <div className='profile' style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
 
            <img style={{borderRadius:"50%"}}src={billy} alt="profile" /> Billy the cat
            </div>
            <div> 
              <List
                component="nav"
                aria-label="Device settings"
                sx={{ bgcolor: 'background.paper' }}
              >
                <ListItem
                  button
                  id="lock-button"
                  aria-haspopup="listbox"
                  aria-controls="lock-menu"
                  aria-label="when device is locked"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClickListItem}
                >
                  <ListItemText
                    primary={options[selectedIndex]}
                  />
                </ListItem>
              </List>
              <Menu
                id="lock-menu"
                anchorEl={anchorEl}
                open={privacyOpen}
                onClose={handlePrivacyClose}
                MenuListProps={{
                  'aria-labelledby': 'lock-button',
                  role: 'listbox',
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


          <TextField
            fullWidth
            placeholder="What's happening?"
            inputProps={{
              maxlength: CHARACTER_LIMIT
            }}
            value={values.name}
            helperText={`${values.name.length}/${CHARACTER_LIMIT}`}
            onChange={handleChange("name")}
            margin="normal"
            variant="filled"
          />

          <div className="bottomBar" style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <ImageRoundedIcon />
              <EmojiEmotionsRoundedIcon />
              </div>
            <Button variant="contained" >Post</Button>
          </div>

        </Box>
      </Modal>
    </div>
  )
}

export default PostModal