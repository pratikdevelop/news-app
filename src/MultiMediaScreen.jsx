import React from 'react'

const MultimediaSection = () => (
  <Container maxWidth="xl" className="py-6">
    <Typography className="font-georgia text-lg font-semibold border-b border-nyt-light-gray pb-2 mb-3">Multimedia</Typography>
    <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { title: 'Video: Climate Summit Highlights', img: 'https://via.placeholder.com/300x150' },
        { title: 'Photos: Marathon Record Moment', img: 'https://via.placeholder.com/300x150' },
        { title: 'Video: Tech Innovation Summit', img: 'https://via.placeholder.com/300x150' },
        { title: 'Photos: Art Exhibit Opening', img: 'https://via.placeholder.com/300x150' }
      ].map(item => (
        <Box key={item.title} className="border border-nyt-light-gray p-2">
          <img src={item.img} alt={item.title} className="w-full h-[120px] object-cover mb-2" />
          <Typography className="text-sm text-nyt-blue">{item.title}</Typography>
        </Box>
      ))}
    </Box>
  </Container>
);

export default MultimediaSection
