/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Button,
  TextField,
  Modal,
  Fade,
  IconButton,
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Chip,
  Paper,
  InputAdornment,
  Radio,
  RadioGroup,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  Badge,
  Menu,
  MenuItem,
  AppBar,
  Toolbar,
  useScrollTrigger,
  Zoom,
  Fab,
} from '@mui/material';
import {
  Search,
  AccountCircle,
  Bookmark,
  Share,
  ArrowForward,
  Close,
  CheckCircle,
  Notifications,
  KeyboardArrowUp,
  Menu as MenuIcon,
  Login as LoginIcon,
} from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Client, Account, ID } from 'appwrite';

// Appwrite configuration
const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('67b377760012ab049879');
const account = new Account(client);

// Scroll to top component
function ScrollTop(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');
    if (anchor) {
      anchor.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box onClick={handleClick} role="presentation" sx={{ position: 'fixed', bottom: 16, right: 16 }}>
        {children}
      </Box>
    </Zoom>
  );
}

// LoginDialog Component
const LoginDialog = ({ open, onClose, onLogin }) => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await account.createEmailPasswordSession(values.email, values.password);
        localStorage.setItem('user', JSON.stringify(response))
        onLogin();
        onClose();
      } catch (error) {
        console.error('Login error:', error);
        setErrors({ email: 'Invalid email or password' });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Log In</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" fullWidth disabled={formik.isSubmitting}>
            Log In
          </Button>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

// Navbar Component
const Navbar = ({ onSubscribe, isLoggedIn, isSubscribed, onLogin, onLogout }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [loginOpen, setLoginOpen] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationsOpen = (event) => {
    setNotificationsAnchorEl(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchorEl(null);
  };

  const handleLoginOpen = () => {
    setLoginOpen(true);
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={1}
      sx={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e2e2e2',
        py: 1,
        zIndex: 1100,
      }}
    >
      <Toolbar>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: '"Times New Roman", Georgia, serif',
                  fontWeight: 700,
                  color: '#000',
                  letterSpacing: -0.5,
                }}
              >
                Global Chronicle
              </Typography>
              <Tabs
                value={activeTab}
                onChange={(e, newValue) => setActiveTab(newValue)}
                sx={{ display: { xs: 'none', md: 'flex' } }}
                indicatorColor="primary"
                textColor="inherit"
              >
                <Tab label="Home" />
                <Tab label="World" />
                <Tab label="Politics" />
                <Tab label="Business" />
                <Tab label="Technology" />
                <Tab label="Sports" />
                <Tab label="Arts" />
              </Tabs>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {searchOpen ? (
                <TextField
                  autoFocus
                  variant="outlined"
                  size="small"
                  placeholder="Search headlines..."
                  sx={{ width: { xs: '100%', sm: 300 }, '& .MuiOutlinedInput-root': { borderRadius: 20, backgroundColor: '#f7f7f7' } }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setSearchOpen(false)}>
                          <Close fontSize="small" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              ) : (
                <IconButton onClick={() => setSearchOpen(true)}>
                  <Search />
                </IconButton>
              )}
              {isLoggedIn && (
                <IconButton
                  size="large"
                  aria-label="show notifications"
                  color="inherit"
                  onClick={handleNotificationsOpen}
                >
                  <Badge badgeContent={17} color="error">
                    <Notifications />
                  </Badge>
                </IconButton>
              )}
              {isLoggedIn && (
                <Menu
                  anchorEl={notificationsAnchorEl}
                  open={Boolean(notificationsAnchorEl)}
                  onClose={handleNotificationsClose}
                >
                  <MenuItem onClick={handleNotificationsClose}>Breaking: Climate Agreement Reached</MenuItem>
                  <MenuItem onClick={handleNotificationsClose}>Your saved article: AI Breakthrough</MenuItem>
                  <MenuItem onClick={handleNotificationsClose}>15 new stories in Technology</MenuItem>
                </Menu>
              )}
              {isLoggedIn ? (
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ borderRadius: 20, borderColor: '#ddd', color: '#333', textTransform: 'none', px: 2, display: { xs: 'none', sm: 'flex' } }}
                  startIcon={<AccountCircle />}
                  onClick={handleMenuOpen}
                >
                  Account
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ borderRadius: 20, borderColor: '#ddd', color: '#333', textTransform: 'none', px: 2, display: { xs: 'none', sm: 'flex' } }}
                  startIcon={<LoginIcon />}
                  onClick={handleLoginOpen}
                >
                  Log In
                </Button>
              )}
              {isLoggedIn ? (
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                  <MenuItem onClick={handleMenuClose}>My account</MenuItem>
                  {isSubscribed && <MenuItem onClick={handleMenuClose}>Saved articles</MenuItem>}
                  <MenuItem onClick={() => { handleMenuClose(); onLogout(); }}>Logout</MenuItem>
                </Menu>
              ) : null}
              {!isSubscribed && (
                <Button
                  variant="contained"
                  size="small"
                  sx={{ borderRadius: 20, backgroundColor: '#000', color: '#fff', textTransform: 'none', px: 2, '&:hover': { backgroundColor: '#333' } }}
                  onClick={onSubscribe}
                >
                  Subscribe
                </Button>
              )}
            </Box>
          </Box>
        </Container>
      </Toolbar>
      <LoginDialog open={loginOpen} onClose={handleLoginClose} onLogin={onLogin} />
    </AppBar>
  );
};

// BreakingNews Component
const BreakingNews = () => (
  <Box sx={{ backgroundColor: '#d32f2f', color: 'white', py: 1, px: 2, textAlign: 'center', fontSize: '0.875rem', fontWeight: 500 }}>
    <Box component="span" sx={{ mr: 2 }}>BREAKING: Global Trade Talks Falter Over Tariffs</Box>
    <Box component="span" sx={{ mr: 2 }}>•</Box>
    <Box component="span" sx={{ mr: 2 }}>Senate Passes Climate Bill</Box>
    <Box component="span" sx={{ mr: 2 }}>•</Box>
    <Box component="span">Tech Stocks Drop Amid Regulation Fears</Box>
  </Box>
);

// HeroArticle Component
const HeroArticle = ({ article }) => (
  <Card sx={{ mb: 4, borderRadius: 0, boxShadow: 'none', borderBottom: '1px solid #e2e2e2', '&:hover': { boxShadow: '0 5px 15px rgba(0,0,0,0.1)' } }}>
    <CardMedia component="img" height="480" image={article.image || 'https://via.placeholder.com/800x480'} alt={article.title} sx={{ objectFit: 'cover', objectPosition: 'center' }} />
    <CardContent sx={{ px: 0 }}>
      <Box sx={{ display: 'flex', gap: 1, mb: 1.5 }}>
        <Chip label={article.source?.name || 'General'} color="primary" size="small" sx={{ textTransform: 'uppercase', fontSize: '0.7rem' }} />
        {article.trending && <Chip label="Trending" color="secondary" size="small" sx={{ fontSize: '0.7rem' }} />}
        {article.premium && <Chip label="Premium" color="default" size="small" sx={{ fontSize: '0.7rem' }} />}
      </Box>
      <Typography variant="h2" sx={{ fontFamily: '"Times New Roman", Georgia, serif', fontWeight: 700, fontSize: { xs: '2rem', md: '3rem' }, lineHeight: 1.1, mb: 2 }}>
        {article.title}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2, fontSize: '0.9rem' }}>
        {article.source?.name || 'Unknown'} • {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : 'N/A'}
      </Typography>
      <Typography variant="body1" paragraph>
        {article.description || 'No description available'}
      </Typography>
      <Button variant="text" endIcon={<ArrowForward />} sx={{ textTransform: 'none', fontWeight: 500, color: 'primary.main', px: 0 }}>
        Continue reading
      </Button>
    </CardContent>
  </Card>
);

// SubscriptionDialog Component
const SubscriptionDialog = ({ open, onClose, onSubscribeSuccess }) => {
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [paymentMethod, setPaymentMethod] = useState('credit');

  const plans = [
    { id: 'monthly', title: 'Digital Subscription Monthly', price: '$5/month', term: 'billed monthly', description: 'Unlimited access to GlobalChronicle.com and the app.' },
    { id: 'yearly', title: 'Digital Subscription Yearly', price: '$50/year', term: 'billed annually, save 17%', description: 'Unlimited access with annual savings.' },
  ];

  const paymentMethods = [{ id: 'credit', label: 'Credit or Debit Card' }, { id: 'paypal', label: 'PayPal' }];

  const initialValues = { name: '', email: '', password: '', confirmPassword: '', cardNumber: '', expiration: '', securityCode: '', nameOnCard: '', firstName: '', lastName: '', address: '', city: '', zip: '', saveCard: true };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
    ...(paymentMethod === 'credit' && {
      cardNumber: Yup.string().matches(/^\d{16}$/, 'Card number must be 16 digits').required('Card number is required'),
      expiration: Yup.string().matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Invalid expiration date (MM/YY)').required('Expiration date is required'),
      securityCode: Yup.string().matches(/^\d{3,4}$/, 'Invalid security code').required('Security code is required'),
      nameOnCard: Yup.string().required('Name on card is required'),
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      address: Yup.string().required('Address is required'),
      city: Yup.string().required('City is required'),
      zip: Yup.string().matches(/^\d{5}$/, 'Invalid ZIP code').required('ZIP code is required'),
    }),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (step === 2) {
          await account.create(ID.unique(), values.email, values.password, values.name);
          setStep(3);
        } else if (step === 3) {
          console.log('Processing payment:', { selectedPlan, paymentMethod, values });
          setStep(4);
          onSubscribeSuccess();
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleNext = () => (step === 1 ? setStep(2) : step < 4 ? formik.handleSubmit() : onClose());
  const handleBack = () => step > 1 && setStep(step - 1);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Subscribe to Global Chronicle</DialogTitle>
      <DialogContent>
        {step === 1 && (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>Choose your subscription</Typography>
            <Grid container spacing={3}>
              {plans.map((plan) => (
                <Grid item xs={12} md={6} key={plan.id}>
                  <Card variant="outlined" sx={{ borderColor: selectedPlan === plan.id ? '#326891' : '#e2e2e2', height: '100%', cursor: 'pointer', '&:hover': { borderColor: '#326891' } }} onClick={() => setSelectedPlan(plan.id)}>
                    <CardContent>
                      <Radio checked={selectedPlan === plan.id} value={plan.id} name="plan" sx={{ p: 0, mr: 1 }} />
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>{plan.title}</Typography>
                      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>{plan.price}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{plan.term}</Typography>
                      <Typography variant="body1" sx={{ mb: 2 }}>{plan.description}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
        {step === 2 && (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>Create your account</Typography>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}><TextField fullWidth label="Name" name="name" value={formik.values.name} onChange={formik.handleChange} error={formik.touched.name && Boolean(formik.errors.name)} helperText={formik.touched.name && formik.errors.name} sx={{ mb: 2 }} /></Grid>
                <Grid item xs={12} md={6}><TextField fullWidth label="Email" name="email" value={formik.values.email} onChange={formik.handleChange} error={formik.touched.email && Boolean(formik.errors.email)} helperText={formik.touched.email && formik.errors.email} sx={{ mb: 2 }} /></Grid>
                <Grid item xs={12} md={6}><TextField fullWidth label="Password" name="password" type="password" value={formik.values.password} onChange={formik.handleChange} error={formik.touched.password && Boolean(formik.errors.password)} helperText={formik.touched.password && formik.errors.password} sx={{ mb: 2 }} /></Grid>
                <Grid item xs={12} md={6}><TextField fullWidth label="Confirm Password" name="confirmPassword" type="password" value={formik.values.confirmPassword} onChange={formik.handleChange} error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)} helperText={formik.touched.confirmPassword && formik.errors.confirmPassword} sx={{ mb: 2 }} /></Grid>
              </Grid>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>By creating an account, you agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.</Typography>
            </form>
          </Box>
        )}
        {step === 3 && (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>Payment method</Typography>
            <form onSubmit={formik.handleSubmit}>
              <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                {paymentMethods.map((method) => (
                  <Paper key={method.id} variant="outlined" sx={{ p: 2, mb: 2, borderColor: paymentMethod === method.id ? '#326891' : '#e2e2e2', cursor: 'pointer', '&:hover': { borderColor: '#326891' } }} onClick={() => setPaymentMethod(method.id)}>
                    <FormControlLabel value={method.id} control={<Radio />} label={method.label} />
                  </Paper>
                ))}
              </RadioGroup>
              {paymentMethod === 'credit' && (
                <Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12}><TextField fullWidth label="Card number" name="cardNumber" value={formik.values.cardNumber} onChange={formik.handleChange} error={formik.touched.cardNumber && Boolean(formik.errors.cardNumber)} helperText={formik.touched.cardNumber && formik.errors.cardNumber} sx={{ mb: 2 }} /></Grid>
                    <Grid item xs={12} md={6}><TextField fullWidth label="Expiration" name="expiration" placeholder="MM/YY" value={formik.values.expiration} onChange={formik.handleChange} error={formik.touched.expiration && Boolean(formik.errors.expiration)} helperText={formik.touched.expiration && formik.errors.expiration} sx={{ mb: 2 }} /></Grid>
                    <Grid item xs={12} md={6}><TextField fullWidth label="Security code" name="securityCode" value={formik.values.securityCode} onChange={formik.handleChange} error={formik.touched.securityCode && Boolean(formik.errors.securityCode)} helperText={formik.touched.securityCode && formik.errors.securityCode} sx={{ mb: 2 }} /></Grid>
                    <Grid item xs={12}><TextField fullWidth label="Name on card" name="nameOnCard" value={formik.values.nameOnCard} onChange={formik.handleChange} error={formik.touched.nameOnCard && Boolean(formik.errors.nameOnCard)} helperText={formik.touched.nameOnCard && formik.errors.nameOnCard} sx={{ mb: 2 }} /></Grid>
                    <Grid item xs={12} md={6}><TextField fullWidth label="First name" name="firstName" value={formik.values.firstName} onChange={formik.handleChange} error={formik.touched.firstName && Boolean(formik.errors.firstName)} helperText={formik.touched.firstName && formik.errors.firstName} sx={{ mb: 2 }} /></Grid>
                    <Grid item xs={12} md={6}><TextField fullWidth label="Last name" name="lastName" value={formik.values.lastName} onChange={formik.handleChange} error={formik.touched.lastName && Boolean(formik.errors.lastName)} helperText={formik.touched.lastName && formik.errors.lastName} sx={{ mb: 2 }} /></Grid>
                    <Grid item xs={12}><TextField fullWidth label="Address" name="address" value={formik.values.address} onChange={formik.handleChange} error={formik.touched.address && Boolean(formik.errors.address)} helperText={formik.touched.address && formik.errors.address} sx={{ mb: 2 }} /></Grid>
                    <Grid item xs={12} md={6}><TextField fullWidth label="City" name="city" value={formik.values.city} onChange={formik.handleChange} error={formik.touched.city && Boolean(formik.errors.city)} helperText={formik.touched.city && formik.errors.city} sx={{ mb: 2 }} /></Grid>
                    <Grid item xs={12} md={6}><TextField fullWidth label="ZIP code" name="zip" value={formik.values.zip} onChange={formik.handleChange} error={formik.touched.zip && Boolean(formik.errors.zip)} helperText={formik.touched.zip && formik.errors.zip} sx={{ mb: 2 }} /></Grid>
                    <Grid item xs={12}><FormControlLabel control={<Checkbox checked={formik.values.saveCard} onChange={formik.handleChange} name="saveCard" />} label="Save this card" /></Grid>
                  </Grid>
                </Box>
              )}
              {paymentMethod === 'paypal' && (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <div id="paypal-button-container"></div>
                  <script src="https://www.paypal.com/sdk/js?client-id=YOUR_PAYPAL_CLIENT_ID¤cy=USD" async></script>
                  <script dangerouslySetInnerHTML={{ __html: `paypal.Buttons({createSubscription: function(data, actions) {return actions.subscription.create({plan_id: '${selectedPlan === 'monthly' ? 'GC-DIGITAL-MONTHLY-001' : 'GC-DIGITAL-YEARLY-001'}'})}, onApprove: function(data, actions) {document.getElementById('step-state').dataset.step = '4';}, onError: function(err) {alert('An error occurred. Please try again.');}}).render('#paypal-button-container');` }} />
                </Box>
              )}
              <Box sx={{ mt: 3, p: 2, backgroundColor: '#f9f9f9', borderRadius: 1 }}>
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>Order Summary</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}><Typography variant="body2">{plans.find((p) => p.id === selectedPlan).title}</Typography><Typography variant="body2">{plans.find((p) => p.id === selectedPlan).price}</Typography></Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}><Typography variant="body2">Tax</Typography><Typography variant="body2">$0.00</Typography></Box>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}><Typography variant="subtitle1" fontWeight={500}>Total</Typography><Typography variant="subtitle1" fontWeight={500}>{plans.find((p) => p.id === selectedPlan).price}</Typography></Box>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>By subscribing, you agree to the <a href="#">Terms of Sale</a> and <a href="#">Terms of Service</a>.</Typography>
            </form>
          </Box>
        )}
        {step === 4 && (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <CheckCircle sx={{ fontSize: 60, color: '#4CAF50', mb: 2 }} />
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>Thank you for subscribing!</Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>Your subscription has been confirmed.</Typography>
            <Button variant="contained" size="large" onClick={onClose} sx={{ px: 4, textTransform: 'none' }}>Start Reading</Button>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        {step > 1 && step < 4 && <Button onClick={handleBack}>Back</Button>}
        <Box sx={{ flexGrow: 1 }} />
        <Button variant="contained" onClick={handleNext} endIcon={step < 4 && <ArrowForward />} disabled={formik.isSubmitting}>{step === 4 ? 'Close' : 'Continue'}</Button>
      </DialogActions>
      <div id="step-state" data-step={step} style={{ display: 'none' }} />
    </Dialog>
  );
};

// ArticleCard Component
const ArticleCard = ({ article, onClick }) => (
  <Card onClick={onClick} sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 0, boxShadow: 'none', borderBottom: '1px solid #e2e2e2', transition: 'all 0.3s ease', '&:hover': { boxShadow: '0 5px 15px rgba(0,0,0,0.1)', transform: 'translateY(-3px)' } }}>
    <CardMedia component="img" height="200" image={article.image || 'https://via.placeholder.com/400x200'} alt={article.title} sx={{ objectFit: 'cover', objectPosition: 'center' }} />
    <CardContent sx={{ flexGrow: 1 }}>
      <Box sx={{ display: 'flex', gap: 1, mb: 1.5 }}>
        <Chip label={article.source?.name || 'General'} color="primary" size="small" sx={{ textTransform: 'uppercase', fontSize: '0.7rem' }} />
        {article.trending && <Chip label="Trending" color="secondary" size="small" sx={{ fontSize: '0.7rem' }} />}
        {article.premium && <Chip label="Premium" color="default" size="small" sx={{ fontSize: '0.7rem' }} />}
      </Box>
      <Typography variant="h5" sx={{ fontFamily: '"Times New Roman", Georgia, serif', fontWeight: 700, mb: 1.5 }}>{article.title}</Typography>
      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5, fontSize: '0.8rem' }}>{article.source?.name || 'Unknown'} • {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : 'N/A'}</Typography>
      <Typography variant="body2" color="text.secondary">{article.description || 'No description available'}</Typography>
    </CardContent>
    <Box sx={{ px: 2, pb: 2, display: 'flex', justifyContent: 'space-between' }}>
      <IconButton size="small"><Bookmark fontSize="small" /></IconButton>
      <IconButton size="small"><Share fontSize="small" /></IconButton>
    </Box>
  </Card>
);

// Sidebar Component
const Sidebar = () => {
  const popularArticles = [
    { title: 'Global Climate Summit Reaches Agreement', views: '15K', category: 'Politics' },
    { title: 'Olympic Games Break Records', views: '12K', category: 'Sports' },
    { title: 'AI Firm Secures $2B', views: '10K', category: 'Technology' },
    { title: 'Tariffs Trigger Volatility', views: '8K', category: 'Business' },
    { title: 'Met Museum Exhibit', views: '7K', category: 'Arts' },
  ];

  const opinionArticles = [
    { title: 'Why Climate Action Must Accelerate', author: 'Michael Brown', img: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { title: 'The Case for Tech Regulation', author: 'Rachel Adams', img: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { title: 'Education Reform Needs Bold Ideas', author: 'Steven Hall', img: 'https://randomuser.me/api/portraits/men/67.jpg' },
  ];

  return (
    <Box sx={{ pl: { md: 4 }, borderLeft: { md: '1px solid #e2e2e2' } }}>
      <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 0 }}>
        <Typography variant="h6" sx={{ fontFamily: '"Times New Roman", Georgia, serif', fontWeight: 700, mb: 2, pb: 1, borderBottom: '1px solid #e2e2e2' }}>Most Popular</Typography>
        <List>{popularArticles.map((article, index) => <ListItem key={index} disableGutters sx={{ py: 1.5, borderBottom: '1px solid #f0f0f0', '&:last-child': { borderBottom: 'none' } }}><ListItemText primary={<Typography variant="subtitle1" fontWeight={500}>{article.title}</Typography>} secondary={<Typography variant="caption" color="text.secondary">{article.category} • {article.views} views</Typography>} /></ListItem>)}</List>
      </Paper>
      <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 0 }}>
        <Typography variant="h6" sx={{ fontFamily: '"Times New Roman", Georgia, serif', fontWeight: 700, mb: 2, pb: 1, borderBottom: '1px solid #e2e2e2' }}>Opinion</Typography>
        <List>{opinionArticles.map((article, index) => <ListItem key={index} disableGutters sx={{ py: 1.5, borderBottom: '1px solid #f0f0f0', '&:last-child': { borderBottom: 'none' } }}><ListItemAvatar><Avatar src={article.img} alt={article.author} /></ListItemAvatar><ListItemText primary={<Typography variant="subtitle1" fontWeight={500}>{article.title}</Typography>} secondary={<Typography variant="caption" color="text.secondary">By {article.author}</Typography>} /></ListItem>)}</List>
      </Paper>
      <Paper elevation={0} sx={{ p: 3, borderRadius: 0 }}>
        <Typography variant="h6" sx={{ fontFamily: '"Times New Roman", Georgia, serif', fontWeight: 700, mb: 2, pb: 1, borderBottom: '1px solid #e2e2e2' }}>Editor's Picks</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {[{ title: 'Climate Summit Agreement', category: 'World' }, { title: 'Quantum Computing Breakthrough', category: 'Technology' }, { title: 'Broadway Revival Breaks Records', category: 'Arts' }].map((item, index) => <Box key={index}><Typography variant="subtitle1" fontWeight={500}>{item.title}</Typography><Typography variant="caption" color="text.secondary">{item.category}</Typography></Box>)}
        </Box>
      </Paper>
    </Box>
  );
};

// SubscriptionBanner Component
const SubscriptionBanner = () => (
  <Box sx={{ backgroundColor: '#f5f5f5', py: 6, borderTop: '1px solid #e2e2e2', borderBottom: '1px solid #e2e2e2' }}>
    <Container maxWidth="md" sx={{ textAlign: 'center' }}>
      <Typography variant="h4" sx={{ fontFamily: '"Times New Roman", Georgia, serif', fontWeight: 700, mb: 2 }}>Subscribe to Global Chronicle</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 600, mx: 'auto' }}>Unlimited access to award-winning journalism.</Typography>
      <Button variant="contained" size="large" sx={{ px: 4, py: 1.5, borderRadius: 0, textTransform: 'none', fontSize: '1rem', fontWeight: 500 }}>Subscribe from $1/week</Button>
      <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 2 }}>Cancel anytime.</Typography>
    </Container>
  </Box>
);

const MultimediaSection = () => {
  const multimediaItems = [
    { title: 'Video: Climate Summit Highlights', img: 'https://images.unsplash.com/photo-1617791160536-598cf32026fb', type: 'video' },
    { title: 'Photos: Olympic Record Moment', img: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5', type: 'gallery' },
    { title: 'Video: Tech Innovation Summit', img: 'https://images.unsplash.com/photo-1677442135136-760c813a743e', type: 'video' },
    { title: 'Photos: Art Exhibit Opening', img: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5', type: 'gallery' },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Typography variant="h5" sx={{ fontFamily: '"Times New Roman", Georgia, serif', fontWeight: 700, mb: 4, pb: 1, borderBottom: '1px solid #e2e2e2' }}>Multimedia</Typography>
      <Grid container spacing={3}>
        {multimediaItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ borderRadius: 0, boxShadow: 'none' }}>
              <Box sx={{ position: 'relative' }}>
                <CardMedia component="img" height="160" image={item.img} alt={item.title} />
                <Box sx={{ position: 'absolute', top: 8, right: 8, backgroundColor: 'rgba(0,0,0,0.7)', color: 'white', px: 1, py: 0.5, borderRadius: 1, fontSize: '0.7rem' }}>
                  {item.type === 'video' ? '▶️ Video' : '📷 Gallery'}
                </Box>
              </Box>
              <CardContent sx={{ px: 0 }}>
                <Typography variant="subtitle1" fontWeight={500}>{item.title}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

// Footer Component
const Footer = () => {
  const footerLinks = [
    { title: 'News', links: ['Home Page', 'World', 'U.S.', 'Politics', 'Business', 'Technology'] },
    { title: 'Opinion', links: ['Editorials', 'Op-Ed', 'Letters', 'Columnists', 'Sunday Review'] },
    { title: 'Arts', links: ['Books', 'Movies', 'Theater', 'Music', 'Television', 'Art & Design'] },
    { title: 'Business', links: ['Economy', 'Markets', 'Technology', 'Media', 'Your Money', 'Small Business'] },
    { title: 'Services', links: ['Subscribe', 'Newsletters', 'Mobile Apps', 'Archives', "Today's Paper"] },
    { title: 'About', links: ['Contact', 'Careers', 'Privacy Policy', 'Terms of Service', 'Advertise'] },
  ];

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', py: 6, borderTop: '1px solid #e2e2e2' }}>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {footerLinks.map((column, index) => (
            <Grid item xs={6} sm={4} md={2} key={index}>
              <Typography variant="subtitle1" sx={{ fontFamily: '"Times New Roman", Georgia, serif', fontWeight: 700, mb: 2, fontSize: '0.9rem' }}>{column.title}</Typography>
              <List dense disablePadding>{column.links.map((link, linkIndex) => <ListItem key={linkIndex} disableGutters sx={{ py: 0.5 }}><Button variant="text" sx={{ textTransform: 'none', color: 'text.secondary', fontSize: '0.8rem', px: 0, '&:hover': { color: 'primary.main', backgroundColor: 'transparent' } }}>{link}</Button></ListItem>)}</List>
            </Grid>
          ))}
        </Grid>
        <Divider sx={{ my: 4 }} />
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          <Typography variant="caption" color="text.secondary">© {new Date().getFullYear()} Global Chronicle</Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="text" size="small" sx={{ textTransform: 'none', color: 'text.secondary', fontSize: '0.8rem' }}>Privacy Policy</Button>
            <Button variant="text" size="small" sx={{ textTransform: 'none', color: 'text.secondary', fontSize: '0.8rem' }}>Terms of Service</Button>
            <Button variant="text" size="small" sx={{ textTransform: 'none', color: 'text.secondary', fontSize: '0.8rem' }}>Contact Us</Button>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton size="small"><Box component="span" sx={{ fontSize: '1rem' }}>🐦</Box></IconButton>
            <IconButton size="small"><Box component="span" sx={{ fontSize: '1rem' }}>📘</Box></IconButton>
            <IconButton size="small"><Box component="span" sx={{ fontSize: '1rem' }}>📷</Box></IconButton>
            <IconButton size="small"><Box component="span" sx={{ fontSize: '1rem' }}>▶️</Box></IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

// Main App Component
const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [subscriptionModalOpen, setSubscriptionModalOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const apikey = 'f6d7209cdb9590d9c0eaa202cad2ad20'; // Replace with your actual GNews API key
    const url = `https://gnews.io/api/v4/search?q=example&lang=en&country=us&max=10&apikey=${apikey}`;
    fetch(url)
      .then(response => response.json())
      .then(data => setArticles(data.articles || []))
      .catch(error => console.error('Error fetching news:', error));

    const checkSession = async () => {
      try {
        await account.get();
        setIsLoggedIn(true);
        setIsSubscribed(false);
      } catch (error) {
        setIsLoggedIn(false);
        setIsSubscribed(false);
      }
    };
    checkSession();
  }, []);

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setModalOpen(true);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    try {
      await account.deleteSession('current');
      setIsLoggedIn(false);
      setIsSubscribed(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleSubscribeSuccess = () => {
    setIsSubscribed(true);
  };

  const filteredArticles = articles.filter((article) => {
    const searchMatch = searchTerm === '' || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (article.description && article.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return searchMatch;
  });

  return (
    <Box sx={{ fontFamily: '"Helvetica Neue", Arial, sans-serif', color: '#333', backgroundColor: '#fff', minHeight: '100vh' }}>
      <div id="back-to-top-anchor" />
      <Navbar 
        onSubscribe={() => setSubscriptionModalOpen(true)} 
        isLoggedIn={isLoggedIn} 
        isSubscribed={isSubscribed} 
        onLogin={handleLogin} 
        onLogout={handleLogout} 
      />
      <BreakingNews />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            {articles.length > 0 && <HeroArticle article={articles[0]} />}
            <Typography variant="h5" sx={{ fontFamily: '"Times New Roman", Georgia, serif', fontWeight: 700, mb: 3, pb: 1, borderBottom: '1px solid #e2e2e2' }}>
              Today's Top Stories
            </Typography>
            <Grid container spacing={3}>
              {filteredArticles.slice(1, 7).map((article, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <ArticleCard article={article} onClick={() => handleArticleClick(article)} />
                </Grid>
              ))}
            </Grid>
            <Typography variant="h5" sx={{ fontFamily: '"Times New Roman", Georgia, serif', fontWeight: 700, mb: 3, mt: 6, pb: 1, borderBottom: '1px solid #e2e2e2' }}>
              Technology News
            </Typography>
            <Grid container spacing={3}>
              {filteredArticles
                .filter((a) => a.source?.name?.toLowerCase().includes('technology') || a.title.toLowerCase().includes('tech'))
                .slice(0, 3)
                .map((article, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <ArticleCard article={article} onClick={() => handleArticleClick(article)} />
                  </Grid>
                ))}
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <Sidebar />
          </Grid>
        </Grid>
      </Container>
      <SubscriptionBanner />
      <MultimediaSection />
      <Footer />
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
        <Fade in={modalOpen}>
          <Paper sx={{ maxWidth: 800, width: '100%', maxHeight: '90vh', overflow: 'auto', outline: 'none' }}>
            {selectedArticle && (
              <>
                <CardMedia component="img" height="400" image={selectedArticle.image || 'https://via.placeholder.com/800x400'} alt={selectedArticle.title} />
                <Box sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <Chip label={selectedArticle.source?.name || 'General'} color="primary" size="small" sx={{ textTransform: 'uppercase', fontSize: '0.7rem' }} />
                    {selectedArticle.trending && <Chip label="Trending" color="secondary" size="small" sx={{ fontSize: '0.7rem' }} />}
                    {selectedArticle.premium && <Chip label="Premium" color="default" size="small" sx={{ fontSize: '0.7rem' }} />}
                  </Box>
                  <Typography variant="h3" sx={{ fontFamily: '"Times New Roman", Georgia, serif', fontWeight: 700, mb: 2 }}>
                    {selectedArticle.title}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
                    {selectedArticle.source?.name || 'Unknown'} • {selectedArticle.publishedAt ? new Date(selectedArticle.publishedAt).toLocaleDateString() : 'N/A'}
                  </Typography>
                  <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.6, mb: 3 }}>
                    {selectedArticle.content || selectedArticle.description || 'No content available'}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
                    <Button variant="outlined" startIcon={<Bookmark />} sx={{ textTransform: 'none' }}>
                      Save for later
                    </Button>
                    <Button variant="outlined" startIcon={<Share />} sx={{ textTransform: 'none' }}>
                      Share
                    </Button>
                    <Box sx={{ flexGrow: 1 }} />
                    <Button variant="contained" onClick={() => setModalOpen(false)} sx={{ textTransform: 'none' }}>
                      Close
                    </Button>
                  </Box>
                </Box>
              </>
            )}
          </Paper>
        </Fade>
      </Modal>
      <SubscriptionDialog 
        open={subscriptionModalOpen} 
        onClose={() => setSubscriptionModalOpen(false)} 
        onSubscribeSuccess={handleSubscribeSuccess} 
      />
      <ScrollTop>
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUp />
        </Fab>
      </ScrollTop>
    </Box>
  );
};

export default App;