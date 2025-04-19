// import React from 'react'
// import {account} from '../appwrite-config'
// import { ID } from 'appwrite'

// const signup = () => {
//     account.create(ID.unique(), 'aa@yopmail.com', 'Acces@#$1234', 'aa' )
//   return (
//     <div>signup</div>
//   )
// }

// export default signup

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Divider,
  IconButton,
  InputAdornment,
  Card,
  CardContent,
  Grid,
  Paper,
  Checkbox
} from '@mui/material';
import { Close, ArrowForward, CheckCircle } from '@mui/icons-material';



// Usage example:
// <SubscriptionDialog open={open} onClose={handleClose} />