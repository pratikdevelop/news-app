import React from 'react'

const Footer = () => (
  <Container maxWidth="xl" className="bg-gray-100 py-6 px-4">
    <Box className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {[
        { title: 'News', links: ['Home Page', 'World', 'U.S.', 'Politics', 'Business'] },
        { title: 'Opinion', links: ['Editorials', 'Op-Ed', 'Letters', 'Columnists'] },
        { title: 'Arts', links: ['Books', 'Movies', 'Theater', 'Music'] },
        { title: 'Business', links: ['Economy', 'Markets', 'Technology', 'Media'] },
        { title: 'Services', links: ['Subscribe', 'Newsletters', 'Mobile Apps', 'Archives'] },
        { title: 'About', links: ['Contact', 'Privacy Policy', 'Terms of Service', 'Advertise'] }
      ].map(column => (
        <Box key={column.title}>
          <Typography className="font-georgia text-sm font-semibold mb-2">{column.title}</Typography>
          {column.links.map(link => (
            <a key={link} href="#" className="block text-nyt-blue text-xs mb-1 hover:underline">{link}</a>
          ))}
        </Box>
      ))}
    </Box>
    <Box className="mt-4 flex justify-center space-x-4">
      <a href="#" className="text-nyt-blue text-sm">🐦</a>
      <a href="#" className="text-nyt-blue text-sm">📘</a>
      <a href="#" className="text-nyt-blue text-sm">📷</a>
      <a href="#" className="text-nyt-blue text-sm">▶️</a>
    </Box>
  </Container>
);
export default Footer
