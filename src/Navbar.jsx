import React from 'react'

const Navbar = ({ onEvent}) => {
  const handleClick = () => {
    onEvent(true);
  };
  return (
  <Box component="header" className="sticky bg-white top-0 bg-nyt-white border-b border-nyt-black py-2 px-4 z-50">
    <Container  className="flex justify-between items-center">
      <Typography className="font-georgia text-3xl font-bold tracking-tight">The New York Times</Typography>
      <Box className="flex space-x-3">
        {['U.S.', 'World', 'Business', 'Arts', 'Sports', 'Opinion', 'Technology'].map(section => (
          <a key={section} href="#" className="text-nyt-blue text-xs uppercase font-medium hover:underline hover:underline-offset-2">{section}</a>
        ))}
      </Box>
      <Box sx={
        {
          display: "flex",
          alignItems: "center",
          gap:"10px"
        }
      }>
        {/* <TextField
          size="small"
          placeholder="Search..."
          className="w-6/12"
          onChange={e => showSuggestions(e.target.value)}
        /> */}
  
        <Button variant="contained" size="medium" className=" w-3/12  text-nyt-blue mx-4 border-nyt-blue">Log In</Button>
        <Button variant="contained" onClick={handleClick} size="medium" className=" w-3/12  text-nyt-blue mx-4 border-nyt-blue">Signup</Button>
        {/* <Button variant="contained" size="medium" className=" w-3/12 text-nyt-blue mx-4 border-nyt-blue">Subscribe</Button> */}
      </Box>
    </Container>
    </Box>
  )
}

export default Navbar
