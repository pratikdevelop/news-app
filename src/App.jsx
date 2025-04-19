/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
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
} from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {  ID } from 'appwrite';
import {account} from '../appwrite-config'

// Appwrite configuration
// Enhanced articles data with unique entries from all snippets
const articlesData = [
  {
    id: 1,
    categories: ['politics'],
    title: 'Global Climate Summit Reaches Historic Agreement',
    byline: 'By Elena Martinez | April 15, 2025',
    summary: 'Nations commit to aggressive carbon cuts with developing countries receiving aid for green technology transitions.',
    img: 'https://images.unsplash.com/photo-1617791160536-598cf32026fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1064&q=80',
    content: 'After two weeks of intense negotiations, world leaders at the COP30 climate summit have reached a historic agreement to limit global warming to 1.5°C above pre-industrial levels. The landmark deal includes commitments from 195 countries to reduce greenhouse gas emissions by 50% by 2030, with developed nations pledging $100 billion annually to help developing countries transition to renewable energy. "This is our last best chance to save the planet," said UN Secretary-General during the closing ceremony. The agreement also establishes a global carbon trading system and sets strict deadlines for phasing out coal power plants. Environmental activists have praised the deal but warn that implementation will be key to its success.',
    trending: true,
    premium: false,
    readTime: '8 min read',
  },
  {
    id: 2,
    categories: ['sports'],
    title: 'Olympic Games Break Viewership Records',
    byline: 'By Michael Johnson | April 14, 2025',
    summary: 'The 2024 Paris Olympics become the most-watched event in television history with groundbreaking performances.',
    img: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    content: 'The 2024 Paris Olympics have shattered all previous viewership records, with over 5 billion people tuning in worldwide across various platforms. The games featured several historic moments, including swimmer Sarah Li breaking Michael Phelps\'s medal record and the debut of breakdancing as an Olympic sport. "These games have redefined what\'s possible in athletic achievement and global unity," said IOC President Thomas Bach. The closing ceremony, which featured a spectacular augmented reality display over the Seine River, was particularly praised for its innovative use of technology. Organizers also highlighted the games\' sustainability achievements, including carbon-neutral venues and 95% waste diversion from landfills.',
    trending: true,
    premium: true,
    readTime: '6 min read',
  },
  {
    id: 3,
    categories: ['technology'],
    title: 'AI Firm Secures $2B Investment',
    byline: 'By David Lee | April 12, 2025',
    summary: 'Funding fuels innovation in machine learning for healthcare.',
    img: 'https://images.unsplash.com/photo-1677442135136-760c813a743e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    content: 'Anthropic, an artificial intelligence startup focused on developing safe AI systems, announced today it has raised $2 billion in new funding. The investment, led by major tech venture capitalists, aims to accelerate AI applications in healthcare, particularly in diagnostics and personalized medicine. CEO Dario Amodei emphasized the company\'s commitment to ethical AI development, stating, "Our goal is to ensure AI benefits humanity without compromising safety." The funding round comes amid growing scrutiny of AI\'s societal impact, with regulators worldwide debating new oversight frameworks.',
    trending: false,
    premium: false,
    readTime: '5 min read',
  },
  {
    id: 4,
    categories: ['business'],
    title: 'Tariffs Trigger Market Volatility',
    byline: 'By Lisa Wong | April 11, 2025',
    summary: 'New trade policies spark concerns among investors, leading to a sharp decline in global markets.',
    img: 'https://images.unsplash.com/photo-1612837017934-9361e9b87a8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    content: 'Global financial markets experienced significant volatility this week following the announcement of new tariffs on imported goods by several major economies. The policies, aimed at protecting domestic industries, have raised fears of a broader trade war, prompting a sell-off in equities. "Investors are bracing for prolonged uncertainty," said financial analyst Maria Chen. The Dow Jones Industrial Average fell 3% in a single day, with tech and manufacturing sectors hit hardest. Economists warn that prolonged trade disputes could slow global GDP growth by up to 1% in the next year.',
    trending: true,
    premium: true,
    readTime: '7 min read',
  },
  {
    id: 5,
    categories: ['arts'],
    title: 'Met Museum Exhibit Breaks Attendance Records',
    byline: 'By Sophie Evans | April 10, 2025',
    summary: 'A new exhibit on Renaissance art draws unprecedented crowds, highlighting renewed interest in classical works.',
    img: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1166&q=80',
    content: 'The Metropolitan Museum of Art\'s latest exhibit, "Renaissance Reimagined," has become the most visited in the museum\'s history, attracting over 500,000 visitors in its first month. Featuring rare works by Michelangelo, Raphael, and Leonardo da Vinci, the exhibit explores the intersection of art and innovation during the Renaissance. Curator Dr. Anna Rossi noted, "This exhibit resonates because it connects historical creativity with modern aspirations." Interactive digital displays and augmented reality experiences have also drawn younger audiences, signaling a shift in how museums engage with the public.',
    trending: false,
    premium: false,
    readTime: '4 min read',
  },
  {
    id: 6,
    categories: ['politics'],
    title: 'Senate Passes Climate Bill Amid Debate',
    byline: 'By James Carter | April 14, 2025',
    summary: 'Legislation aims to reduce emissions but faces industry pushback.',
    img: 'https://images.unsplash.com/photo-1617791160536-598cf32026fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1064&q=80',
    content: 'The Senate passed a sweeping climate bill today that would impose strict limits on carbon emissions from power plants, vehicles and industrial facilities. The legislation, which passed with a narrow 51-49 vote, has been hailed by environmentalists as a critical step toward meeting national climate goals. However, industry groups have criticized the bill, arguing it will increase costs for consumers and stifle economic growth. "This is a balanced approach to a pressing issue," said Senator Maria Lopez, a key sponsor of the bill. The bill now moves to the House, where it faces an uncertain future.',
    trending: false,
    premium: true,
    readTime: '6 min read',
  },
  {
    id: 7,
    categories: ['sports'],
    title: 'Marathon Record Shattered in Boston',
    byline: 'By Sarah Kim | April 13, 2025',
    summary: 'A new world record captivates runners and fans alike.',
    img: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    content: 'Kenyan runner Eliud Kipchoge shattered the world marathon record at the Boston Marathon today, finishing in 2 hours, 1 minute and 9 seconds. The achievement, witnessed by thousands along the historic route, marks a new milestone in human endurance. "I ran with my heart today," Kipchoge said after the race. The record-breaking performance has sparked discussions about the limits of athletic potential and the role of technology, such as advanced running shoes, in modern sports.',
    trending: true,
    premium: false,
    readTime: '5 min read',
  },
];

// Scroll to top component
function ScrollTop(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor',
    );
    if (anchor) {
      anchor.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Zoom>
  );
}

// Navbar Component
const Navbar = ({ onSubscribe }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

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

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
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
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
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
                onChange={handleTabChange}
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
                  sx={{
                    width: { xs: '100%', sm: 300 },
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 20,
                      backgroundColor: '#f7f7f7',
                    },
                  }}
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
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                onClick={handleNotificationsOpen}
              >
                <Badge badgeContent={17} color="error">
                  <Notifications />
                </Badge>
              </IconButton>
              <Menu
                anchorEl={notificationsAnchorEl}
                open={Boolean(notificationsAnchorEl)}
                onClose={handleNotificationsClose}
              >
                <MenuItem onClick={handleNotificationsClose}>Breaking: Climate Agreement Reached</MenuItem>
                <MenuItem onClick={handleNotificationsClose}>Your saved article: AI Breakthrough</MenuItem>
                <MenuItem onClick={handleNotificationsClose}>15 new stories in Technology</MenuItem>
              </Menu>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  borderRadius: 20,
                  borderColor: '#ddd',
                  color: '#333',
                  textTransform: 'none',
                  px: 2,
                  display: { xs: 'none', sm: 'flex' },
                }}
                startIcon={<AccountCircle />}
                onClick={handleMenuOpen}
              >
                Account
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                <MenuItem onClick={handleMenuClose}>My account</MenuItem>
                <MenuItem onClick={handleMenuClose}>Saved articles</MenuItem>
                <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
              </Menu>
              <Button
                variant="contained"
                size="small"
                sx={{
                  borderRadius: 20,
                  backgroundColor: '#000',
                  color: '#fff',
                  textTransform: 'none',
                  px: 2,
                  '&:hover': {
                    backgroundColor: '#333',
                  },
                }}
                onClick={onSubscribe}
              >
                Subscribe
              </Button>
            </Box>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

// BreakingNews Component
const BreakingNews = () => (
  <Box
    sx={{
      backgroundColor: '#d32f2f',
      color: 'white',
      py: 1,
      px: 2,
      textAlign: 'center',
      fontSize: '0.875rem',
      fontWeight: 500,
    }}
  >
    <Box component="span" sx={{ mr: 2 }}>
      BREAKING: Global Trade Talks Falter Over Tariffs
    </Box>
    <Box component="span" sx={{ mr: 2 }}>
      •
    </Box>
    <Box component="span" sx={{ mr: 2 }}>
      Senate Passes Climate Bill
    </Box>
    <Box component="span" sx={{ mr: 2 }}>
      •
    </Box>
    <Box component="span">Tech Stocks Drop Amid Regulation Fears</Box>
  </Box>
);

// FilterPanel Component
const FilterPanel = ({ selectedCategories, setSelectedCategories, resetFilters, savePreferences }) => {
  const categories = [
    { label: 'Politics', icon: '🏛️' },
    { label: 'Sports', icon: '⚽' },
    { label: 'Technology', icon: '💻' },
    { label: 'Business', icon: '💼' },
    { label: 'Arts', icon: '🎨' },
    { label: 'Opinion', icon: '✍️' },
    { label: 'Science', icon: '🔬' },
    { label: 'Health', icon: '🏥' },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 3, borderBottom: '1px solid #e2e2e2', backgroundColor: '#f9f9f9' }}>
      <Typography variant="h6" sx={{ fontFamily: '"Times New Roman", Georgia, serif', fontWeight: 700, mb: 2 }}>
        Personalize Your News
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
        {categories.map((category) => (
          <Chip
            key={category.label}
            label={`${category.icon} ${category.label}`}
            clickable
            variant={selectedCategories.includes(category.label.toLowerCase()) ? 'filled' : 'outlined'}
            color={selectedCategories.includes(category.label.toLowerCase()) ? 'primary' : 'default'}
            onClick={() => {
              const newCategories = selectedCategories.includes(category.label.toLowerCase())
                ? selectedCategories.filter((c) => c !== category.label.toLowerCase())
                : [...selectedCategories, category.label.toLowerCase()];
              setSelectedCategories(newCategories);
            }}
            sx={{ borderRadius: 1, fontSize: '0.875rem', '& .MuiChip-icon': { marginLeft: 0 } }}
          />
        ))}
      </Box>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant="outlined" size="small" onClick={resetFilters} sx={{ textTransform: 'none', borderRadius: 1 }}>
          Reset Filters
        </Button>
        <Button variant="contained" size="small" onClick={savePreferences} sx={{ textTransform: 'none', borderRadius: 1 }}>
          Save Preferences
        </Button>
      </Box>
    </Container>
  );
};

// HeroArticle Component
const HeroArticle = ({ article }) => (
  <Card sx={{ mb: 4, borderRadius: 0, boxShadow: 'none', borderBottom: '1px solid #e2e2e2', '&:hover': { boxShadow: '0 5px 15px rgba(0,0,0,0.1)' } }}>
    <CardMedia component="img" height="480" image={article.img} alt={article.title} sx={{ objectFit: 'cover', objectPosition: 'center' }} />
    <CardContent sx={{ px: 0 }}>
      <Box sx={{ display: 'flex', gap: 1, mb: 1.5 }}>
        <Chip label={article.categories[0]} color="primary" size="small" sx={{ textTransform: 'uppercase', fontSize: '0.7rem' }} />
        {article.trending && <Chip label="Trending" color="secondary" size="small" sx={{ fontSize: '0.7rem' }} />}
        {article.premium && <Chip label="Premium" color="default" size="small" sx={{ fontSize: '0.7rem' }} />}
      </Box>
      <Typography
        variant="h2"
        sx={{ fontFamily: '"Times New Roman", Georgia, serif', fontWeight: 700, fontSize: { xs: '2rem', md: '3rem' }, lineHeight: 1.1, mb: 2 }}
      >
        {article.title}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2, fontSize: '0.9rem' }}>
        {article.byline} • {article.readTime}
      </Typography>
      <Typography variant="body1" paragraph>
        {article.summary}
      </Typography>
      <Button variant="text" endIcon={<ArrowForward />} sx={{ textTransform: 'none', fontWeight: 500, color: 'primary.main', px: 0 }}>
        Continue reading
      </Button>
    </CardContent>
  </Card>
);

const SubscriptionDialog = ({ open, onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [paymentMethod, setPaymentMethod] = useState('credit');

  const plans = [
    {
      id: 'monthly',
      title: 'Digital Subscription Monthly',
      price: '$5/month',
      term: 'billed monthly',
      description: 'Unlimited access to GlobalChronicle.com and the app.',
      features: ['Unlimited article access', 'GlobalChronicle.com and app', 'Subscriber-only newsletters'],
    },
    {
      id: 'yearly',
      title: 'Digital Subscription Yearly',
      price: '$50/year',
      term: 'billed annually, save 17%',
      description: 'Unlimited access to GlobalChronicle.com and the app, with annual savings.',
      features: ['Unlimited article access', 'GlobalChronicle.com and app', 'Subscriber-only newsletters'],
    },
  ];

  const paymentMethods = [
    { id: 'credit', label: 'Credit or Debit Card' },
    { id: 'paypal', label: 'PayPal' },
  ];

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    cardNumber: '',
    expiration: '',
    securityCode: '',
    nameOnCard: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zip: '',
    saveCard: true,
  };

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
    onSubmit:  (values, { setSubmitting }) => {
      alert(JSON.stringify(values, null, 2));
      // try {
      //   console.log(
      //     'Form submitted with values:',
      //     values,
      //   );
        
      //   if (step === 2) {
      //     console.log(
      //       'Payment method is credit card',
      //       values.cardNumber,
      //     );
          
      //     await account.create(ID.unique(), values.email, values.password, values.name);
      //     setStep(3);
      //   } else if (step === 3) {
      //     console.log('Processing payment:', { selectedPlan, paymentMethod, values });
      //     setStep(4);
      //   }
      // } catch (error) {
      //   console.error('Error:', error);
      //   alert('An error occurred. Please try again.');
      // } finally {
      //   setSubmitting(false);
      // }
    },
  });

  const handleNext = () => {
    console.log(
      'Step is',
      step,
    );
    
    if (step === 1) {
      setStep(2);
    } else if (step == 2 || step == 3) {
      formik.handleSubmit()
    } else if (step === 4) {
      onClose();
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: 0, maxWidth: { xs: '100%', md: 900 } } }}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e2e2', py: 2, px: 3 }}>
        <Typography variant="h5" sx={{ fontFamily: '"Times New Roman", Georgia, serif', fontWeight: 700 }}>
          Subscribe to Global Chronicle
        </Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 0 }}>
        {step === 1 && (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>
              Choose your subscription
            </Typography>
            <Grid container spacing={3}>
              {plans.map((plan) => (
                <Grid size={6} key={plan.id}>
                  <Card
                    variant="outlined"
                    sx={{
                      borderColor: selectedPlan === plan.id ? '#326891' : '#e2e2e2',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      cursor: 'pointer',
                      '&:hover': { borderColor: '#326891' },
                    }}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Radio checked={selectedPlan === plan.id} value={plan.id} name="plan" sx={{ p: 0, mr: 1 }} />
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          {plan.title}
                        </Typography>
                      </Box>
                      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                        {plan.price}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {plan.term}
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        {plan.description}
                      </Typography>
                      <Box component="ul" sx={{ pl: 2.5, mb: 0 }}>
                        {plan.features.map((feature, i) => (
                          <Box component="li" key={i} sx={{ mb: 1 }}>
                            <Typography variant="body2">{feature}</Typography>
                          </Box>
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
        {step === 2 && (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>
              Create your account
            </Typography>
            <form  method='post'>
              <Grid container spacing={2}>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    label="Your name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    variant="outlined"
                    size="small"
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    label="Email address"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    variant="outlined"
                    size="small"
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    label="Create a password"
                    name="password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    variant="outlined"
                    size="small"
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    label="Confirm password"
                    name="confirmPassword"
                    type="password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                    variant="outlined"
                    size="small"
                    sx={{ mb: 2 }}
                  />
                </Grid>
              </Grid>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                By creating an account, you agree to the <a href="#" style={{ color: '#326891' }}>Terms of Service</a> and{' '}
                <a href="#" style={{ color: '#326891' }}>Privacy Policy</a>.
              </Typography>
            </form>
          </Box>
        )}
        {step === 3 && (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>
              Payment method
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <FormControl component="fieldset" sx={{ width: '100%', mb: 3 }}>
                <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                  {paymentMethods.map((method) => (
                    <Paper
                      key={method.id}
                      variant="outlined"
                      sx={{
                        p: 2,
                        mb: 2,
                        borderColor: paymentMethod === method.id ? '#326891' : '#e2e2e2',
                        cursor: 'pointer',
                        '&:hover': { borderColor: '#326891' },
                      }}
                      onClick={() => setPaymentMethod(method.id)}
                    >
                      <FormControlLabel value={method.id} control={<Radio />} label={method.label} sx={{ width: '100%', m: 0 }} />
                    </Paper>
                  ))}
                </RadioGroup>
              </FormControl>
              {paymentMethod === 'credit' && (
                <Box>
                  <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
                    Credit or Debit Card
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Card number"
                        name="cardNumber"
                        value={formik.values.cardNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.cardNumber && Boolean(formik.errors.cardNumber)}
                        helperText={formik.touched.cardNumber && formik.errors.cardNumber}
                        variant="outlined"
                        size="small"
                        sx={{ mb: 2 }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Box sx={{ display: 'flex', gap: 1 }}>
                                <img src="https://via.placeholder.com/30x20?text=MC" alt="Mastercard" height="20" />
                                <img src="https://via.placeholder.com/30x20?text=VISA" alt="Visa" height="20" />
                                <img src="https://via.placeholder.com/30x20?text=AMEX" alt="Amex" height="20" />
                              </Box>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid size={6}>
                      <TextField
                        fullWidth
                        label="Expiration date"
                        name="expiration"
                        placeholder="MM/YY"
                        value={formik.values.expiration}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.expiration && Boolean(formik.errors.expiration)}
                        helperText={formik.touched.expiration && formik.errors.expiration}
                        variant="outlined"
                        size="small"
                        sx={{ mb: 2 }}
                      />
                    </Grid>
                    <Grid size={6}>
                      <TextField
                        fullWidth
                        label="Security code"
                        name="securityCode"
                        value={formik.values.securityCode}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.securityCode && Boolean(formik.errors.securityCode)}
                        helperText={formik.touched.securityCode && formik.errors.securityCode}
                        variant="outlined"
                        size="small"
                        sx={{ mb: 2 }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Name on card"
                        name="nameOnCard"
                        value={formik.values.nameOnCard}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.nameOnCard && Boolean(formik.errors.nameOnCard)}
                        helperText={formik.touched.nameOnCard && formik.errors.nameOnCard}
                        variant="outlined"
                        size="small"
                        sx={{ mb: 2 }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" sx={{ mt: 3, mb: 2, fontWeight: 500 }}>
                        Billing address
                      </Typography>
                    </Grid>
                    <Grid size={6}>
                      <TextField
                        fullWidth
                        label="First name"
                        name="firstName"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                        helperText={formik.touched.firstName && formik.errors.firstName}
                        variant="outlined"
                        size="small"
                        sx={{ mb: 2 }}
                      />
                    </Grid>
                    <Grid size={6}>
                      <TextField
                        fullWidth
                        label="Last name"
                        name="lastName"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                        helperText={formik.touched.lastName && formik.errors.lastName}
                        variant="outlined"
                        size="small"
                        sx={{ mb: 2 }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Address"
                        name="address"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.address && Boolean(formik.errors.address)}
                        helperText={formik.touched.address && formik.errors.address}
                        variant="outlined"
                        size="small"
                        sx={{ mb: 2 }}
                      />
                    </Grid>
                    <Grid size={6}>
                      <TextField
                        fullWidth
                        label="City"
                        name="city"
                        value={formik.values.city}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.city && Boolean(formik.errors.city)}
                        helperText={formik.touched.city && formik.errors.city}
                        variant="outlined"
                        size="small"
                        sx={{ mb: 2 }}
                      />
                    </Grid>
                    <Grid size={6}>
                      <TextField
                        fullWidth
                        label="ZIP code"
                        name="zip"
                        value={formik.values.zip}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.zip && Boolean(formik.errors.zip)}
                        helperText={formik.touched.zip && formik.errors.zip}
                        variant="outlined"
                        size="small"
                        sx={{ mb: 2 }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={<Checkbox checked={formik.values.saveCard} onChange={formik.handleChange} name="saveCard" />}
                        label="Save this card for future payments"
                        sx={{ '& .MuiTypography-root': { fontSize: '0.875rem' } }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              )}
              {paymentMethod === 'paypal' && (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <div id="paypal-button-container"></div>
                  {/* <script src="https://www.paypal.com/sdk/js?client-id=YOUR_PAYPAL_CLIENT_ID&currency=USD" async></script>
                  <script>
                    paypal.Buttons({
                      createSubscription : function(data, actions) {
                         actions.subscription.create({
                          plan_id: '{selectedPlan === "monthly" ? "GC-DIGITAL-MONTHLY-001" : "GC-DIGITAL-YEARLY-001"}' // Replace with actual Plan IDs
                        })
                      },
                      onApprove: function(data, actions) {
                        setStep(4)
                                                console.log('Subscription ID:', data.subscriptionID);
                      },
                      onError: function(err) {
                        console.error('PayPal Error:', err);
                        alert('An error occurred. Please try again.');
                      }
                    }).render('#paypal-button-container');
                  </script> */}
                </Box>
              )}
              <Box sx={{ mt: 3, p: 2, backgroundColor: '#f9f9f9', borderRadius: 1 }}>
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
                  Order Summary
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">{plans.find((p) => p.id === selectedPlan).title}</Typography>
                  <Typography variant="body2">{plans.find((p) => p.id === selectedPlan).price}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Tax</Typography>
                  <Typography variant="body2">$0.00</Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="subtitle1" fontWeight={500}>
                    Total
                  </Typography>
                  <Typography variant="subtitle1" fontWeight={500}>
                    {plans.find((p) => p.id === selectedPlan).price}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
                By placing your order, you agree to Global Chronicle's <a href="#" style={{ color: '#326891' }}>Terms of Sale</a> and{' '}
                <a href="#" style={{ color: '#326891' }}>Terms of Service</a>.
              </Typography>
            </form>
          </Box>
        )}
        {step === 4 && (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <CheckCircle sx={{ fontSize: 60, color: '#4CAF50', mb: 2 }} />
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
              Thank you for subscribing!
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Your subscription to Global Chronicle has been confirmed. You now have full access to our journalism.
            </Typography>
            <Button variant="contained" size="large" onClick={onClose} sx={{ px: 4, textTransform: 'none' }}>
              Start Reading
            </Button>
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ p: 2, borderTop: '1px solid #e2e2e2' }}>
        {step > 1 && step < 4 && (
          <Button variant="text" onClick={handleBack} sx={{ textTransform: 'none' }}>
            Back
          </Button>
        )}
        <Box sx={{ flexGrow: 1 }} />
        <Button
        type='button'
          variant="contained"
          onClick={handleNext}
          sx={{ textTransform: 'none' }}
          endIcon={step < 4 && <ArrowForward />}
        >
          {step === 4 ? 'Close' : 'Continue'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// ArticleCard Component
const ArticleCard = ({ article, onClick }) => (
  <Card
    onClick={onClick}
    sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 0,
      boxShadow: 'none',
      borderBottom: '1px solid #e2e2e2',
      transition: 'all 0.3s ease',
      '&:hover': { boxShadow: '0 5px 15px rgba(0,0,0,0.1)', transform: 'translateY(-3px)' },
    }}
  >
    <CardMedia component="img" height="200" image={article.img} alt={article.title} sx={{ objectFit: 'cover', objectPosition: 'center' }} />
    <CardContent sx={{ flexGrow: 1 }}>
      <Box sx={{ display: 'flex', gap: 1, mb: 1.5 }}>
        <Chip label={article.categories[0]} color="primary" size="small" sx={{ textTransform: 'uppercase', fontSize: '0.7rem' }} />
        {article.trending && <Chip label="Trending" color="secondary" size="small" sx={{ fontSize: '0.7rem' }} />}
        {article.premium && <Chip label="Premium" color="default" size="small" sx={{ fontSize: '0.7rem' }} />}
      </Box>
      <Typography variant="h5" sx={{ fontFamily: '"Times New Roman", Georgia, serif', fontWeight: 700, mb: 1.5 }}>
        {article.title}
      </Typography>
      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5, fontSize: '0.8rem' }}>
        {article.byline} • {article.readTime}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {article.summary}
      </Typography>
    </CardContent>
    <Box sx={{ px: 2, pb: 2, display: 'flex', justifyContent: 'space-between' }}>
      <IconButton size="small">
        <Bookmark fontSize="small" />
      </IconButton>
      <IconButton size="small">
        <Share fontSize="small" />
      </IconButton>
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
        <Typography variant="h6" sx={{ fontFamily: '"Times New Roman", Georgia, serif', fontWeight: 700, mb: 2, pb: 1, borderBottom: '1px solid #e2e2e2' }}>
          Most Popular
        </Typography>
        <List>
          {popularArticles.map((article, index) => (
            <ListItem key={index} disableGutters sx={{ py: 1.5, borderBottom: '1px solid #f0f0f0', '&:last-child': { borderBottom: 'none' } }}>
              <ListItemText
                primary={<Typography variant="subtitle1" fontWeight={500}>{article.title}</Typography>}
                secondary={<Typography variant="caption" color="text.secondary">{article.category} • {article.views} views</Typography>}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
      <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 0 }}>
        <Typography variant="h6" sx={{ fontFamily: '"Times New Roman", Georgia, serif', fontWeight: 700, mb: 2, pb: 1, borderBottom: '1px solid #e2e2e2' }}>
          Opinion
        </Typography>
        <List>
          {opinionArticles.map((article, index) => (
            <ListItem key={index} disableGutters sx={{ py: 1.5, borderBottom: '1px solid #f0f0f0', '&:last-child': { borderBottom: 'none' } }}>
              <ListItemAvatar>
                <Avatar src={article.img} alt={article.author} />
              </ListItemAvatar>
              <ListItemText
                primary={<Typography variant="subtitle1" fontWeight={500}>{article.title}</Typography>}
                secondary={<Typography variant="caption" color="text.secondary">By {article.author}</Typography>}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
      <Paper elevation={0} sx={{ p: 3, borderRadius: 0 }}>
        <Typography variant="h6" sx={{ fontFamily: '"Times New Roman", Georgia, serif', fontWeight: 700, mb: 2, pb: 1, borderBottom: '1px solid #e2e2e2' }}>
          Editor's Picks
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {[
            { title: 'Climate Summit Agreement', category: 'World' },
            { title: 'Quantum Computing Breakthrough', category: 'Technology' },
            { title: 'Broadway Revival Breaks Records', category: 'Arts' },
          ].map((item, index) => (
            <Box key={index}>
              <Typography variant="subtitle1" fontWeight={500}>
                {item.title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {item.category}
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

// SubscriptionBanner Component
const SubscriptionBanner = () => (
  <Box sx={{ backgroundColor: '#f5f5f5', py: 6, borderTop: '1px solid #e2e2e2', borderBottom: '1px solid #e2e2e2' }}>
    <Container maxWidth="md" sx={{ textAlign: 'center' }}>
      <Typography variant="h4" sx={{ fontFamily: '"Times New Roman", Georgia, serif', fontWeight: 700, mb: 2 }}>
        Subscribe to Global Chronicle
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 600, mx: 'auto' }}>
        Unlimited access to award-winning journalism. Get the complete Global Chronicle experience with our best offer.
      </Typography>
      <Button variant="contained" size="large" sx={{ px: 4, py: 1.5, borderRadius: 0, textTransform: 'none', fontSize: '1rem', fontWeight: 500 }}>
        Subscribe from $1/week
      </Button>
      <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 2 }}>
        Cancel anytime.
      </Typography>
    </Container>
  </Box>
);

// MultimediaSection Component
const MultimediaSection = () => {
  const multimediaItems = [
    {
      title: 'Video: Climate Summit Highlights',
      img: 'https://images.unsplash.com/photo-1617791160536-598cf32026fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1064&q=80',
      type: 'video',
    },
    {
      title: 'Photos: Olympic Record Moment',
      img: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      type: 'gallery',
    },
    {
      title: 'Video: Tech Innovation Summit',
      img: 'https://images.unsplash.com/photo-1677442135136-760c813a743e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      type: 'video',
    },
    {
      title: 'Photos: Art Exhibit Opening',
      img: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1166&q=80',
      type: 'gallery',
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Typography variant="h5" sx={{ fontFamily: '"Times New Roman", Georgia, serif', fontWeight: 700, mb: 4, pb: 1, borderBottom: '1px solid #e2e2e2' }}>
        Multimedia
      </Typography>
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
                <Typography variant="subtitle1" fontWeight={500}>
                  {item.title}
                </Typography>
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
              <Typography variant="subtitle1" sx={{ fontFamily: '"Times New Roman", Georgia, serif', fontWeight: 700, mb: 2, fontSize: '0.9rem' }}>
                {column.title}
              </Typography>
              <List dense disablePadding>
                {column.links.map((link, linkIndex) => (
                  <ListItem key={linkIndex} disableGutters sx={{ py: 0.5 }}>
                    <Button
                      variant="text"
                      sx={{ textTransform: 'none', color: 'text.secondary', fontSize: '0.8rem', px: 0, '&:hover': { color: 'primary.main', backgroundColor: 'transparent' } }}
                    >
                      {link}
                    </Button>
                  </ListItem>
                ))}
              </List>
            </Grid>
          ))}
        </Grid>
        <Divider sx={{ my: 4 }} />
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          <Typography variant="caption" color="text.secondary">
            © {new Date().getFullYear()} Global Chronicle
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="text" size="small" sx={{ textTransform: 'none', color: 'text.secondary', fontSize: '0.8rem' }}>
              Privacy Policy
            </Button>
            <Button variant="text" size="small" sx={{ textTransform: 'none', color: 'text.secondary', fontSize: '0.8rem' }}>
              Terms of Service
            </Button>
            <Button variant="text" size="small" sx={{ textTransform: 'none', color: 'text.secondary', fontSize: '0.8rem' }}>
              Contact Us
            </Button>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton size="small">
              <Box component="span" sx={{ fontSize: '1rem' }}>
                🐦
              </Box>
            </IconButton>
            <IconButton size="small">
              <Box component="span" sx={{ fontSize: '1rem' }}>
                📘
              </Box>
            </IconButton>
            <IconButton size="small">
              <Box component="span" sx={{ fontSize: '1rem' }}>
                📷
              </Box>
            </IconButton>
            <IconButton size="small">
              <Box component="span" sx={{ fontSize: '1rem' }}>
                ▶️
              </Box>
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

// Main App Component
const App = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(articlesData[0]);
  const [subscriptionModalOpen, setSubscriptionModalOpen] = useState(false);

  const resetFilters = () => {
    setSelectedCategories([]);
    setSearchTerm('');
  };

  const savePreferences = () => {
    alert('Preferences saved!');
  };

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setModalOpen(true);
  };

  const filteredArticles = articlesData.filter((article) => {
    const matchesCategory = selectedCategories.length === 0 || article.categories.some((cat) => selectedCategories.includes(cat));
    const matchesSearch =
      searchTerm === '' ||
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Box sx={{ fontFamily: '"Helvetica Neue", Arial, sans-serif', color: '#333', backgroundColor: '#fff', minHeight: '100vh' }}>
      <div id="back-to-top-anchor" />
      <Navbar onSubscribe={() => setSubscriptionModalOpen(true)} />
      <BreakingNews />
      <FilterPanel
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        resetFilters={resetFilters}
        savePreferences={savePreferences}
      />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <HeroArticle article={articlesData[0]} />
            <Typography
              variant="h5"
              sx={{
                fontFamily: '"Times New Roman", Georgia, serif',
                fontWeight: 700,
                mb: 3,
                pb: 1,
                borderBottom: '1px solid #e2e2e2',
              }}
            >
              Today's Top Stories
            </Typography>
            <Grid container spacing={3}>
              {filteredArticles.slice(1, 7).map((article) => (
                <Grid item xs={12} sm={6} md={4} key={article.id}>
                  <ArticleCard article={article} onClick={() => handleArticleClick(article)} />
                </Grid>
              ))}
            </Grid>
            <Typography
              variant="h5"
              sx={{
                fontFamily: '"Times New Roman", Georgia, serif',
                fontWeight: 700,
                mb: 3,
                mt: 6,
                pb: 1,
                borderBottom: '1px solid #e2e2e2',
              }}
            >
              Technology News
            </Typography>
            <Grid container spacing={3}>
              {filteredArticles
                .filter((a) => a.categories.includes('technology'))
                .slice(0, 3)
                .map((article) => (
                  <Grid item xs={12} md={4} key={article.id}>
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
                <CardMedia component="img" height="400" image={selectedArticle.img} alt={selectedArticle.title} />
                <Box sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <Chip label={selectedArticle.categories[0]} color="primary" size="small" sx={{ textTransform: 'uppercase', fontSize: '0.7rem' }} />
                    {selectedArticle.trending && <Chip label="Trending" color="secondary" size="small" sx={{ fontSize: '0.7rem' }} />}
                    {selectedArticle.premium && <Chip label="Premium" color="default" size="small" sx={{ fontSize: '0.7rem' }} />}
                  </Box>
                  <Typography variant="h3" sx={{ fontFamily: '"Times New Roman", Georgia, serif', fontWeight: 700, mb: 2 }}>
                    {selectedArticle.title}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
                    {selectedArticle.byline} • {selectedArticle.readTime}
                  </Typography>
                  <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.6, mb: 3 }}>
                    {selectedArticle.content}
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
      <SubscriptionDialog open={subscriptionModalOpen} onClose={() => setSubscriptionModalOpen(false)} />
      <ScrollTop>
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUp />
        </Fab>
      </ScrollTop>
    </Box>
  );
};

export default App;