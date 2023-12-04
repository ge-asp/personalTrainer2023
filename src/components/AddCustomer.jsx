import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";

export default function AddCustomer(props) {
  const [customer, setCustomer] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    streetaddress: '',
    postcode: '',
    city: ''
  })

  const [open, setOpen] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true); // Added state for email validation

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
      setIsEmailValid(true); // Reset email validation when closing the dialog
    }
  }

  const handleInputChange = (event) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
    if (event.target.name === 'email') {
      setIsEmailValid(validateEmail(event.target.value)); // Validate email on input change
    }
  }

  const handleSave = (event) => {
    // Validate email before saving
    if (!isEmailValid) {
      // Handle invalid email (show error message, prevent form submission)
      console.error('Invalid email address');
      setIsEmailValid(false); // Set email validation state to false
      return;
    }

    // If email is valid, proceed with saving the customer
    props.addCustomer(customer);
    setOpen(false);
  }

  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>Add customer</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add new customer</DialogTitle>
        <DialogContent>
          <TextField
            label='First name'
            name='firstname'
            value={customer.firstname}
            onChange={handleInputChange}
          />
          <TextField
            label='Last name'
            name='lastname'
            value={customer.lastname}
            onChange={handleInputChange}
          />
          <TextField
            label='Email'
            name='email'
            value={customer.email}
            onChange={handleInputChange}
            error={!isEmailValid} // Set error state based on email validation
            helperText={!isEmailValid ? 'Invalid email address' : ''}
          />
          <TextField
            label='Phone'
            name='phone'
            value={customer.phone}
            onChange={handleInputChange}
          />
          <TextField
            label='Street Address'
            name='streetaddress'
            value={customer.streetaddress}
            onChange={handleInputChange}
          />
          <TextField
            label='Post code'
            name='postcode'
            value={customer.postcode}
            onChange={handleInputChange}
          />
          <TextField
            label='City'
            name='city'
            value={customer.city}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
