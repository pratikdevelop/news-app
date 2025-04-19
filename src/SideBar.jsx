import React from 'react'

const Sidebar = () => (
  <Box className="flex-1 border-l border-nyt-light-gray pl-6">
    <Box className="mb-6">
      <Typography className="font-georgia text-lg font-semibold border-b border-nyt-light-gray pb-2 mb-3">Most Popular</Typography>
      {[
        { title: 'Senate Passes Climate Bill', views: '15K' },
        { title: 'Marathon Record Shattered', views: '12K' },
        { title: 'AI Firm Secures $2B', views: '10K' },
        { title: 'Tariffs Trigger Volatility', views: '8K' },
        { title: 'Met Museum Exhibit', views: '7K' },
        { title: 'Privacy Law Review', views: '6K' },
        { title: 'NFL Media Deal', views: '5K' },
        { title: 'VR Art Galleries', views: '4K' },
        { title: 'Antitrust Probe', views: '3K' },
        { title: 'Indie Film Festival', views: '2K' }
      ].map(item => (
        <Box key={item.title} className="border-b border-nyt-light-gray py-3 text-sm">
          <a href="#" className="text-nyt-blue hover:underline">{item.title} ({item.views} views)</a>
        </Box>
      ))}
    </Box>
    <Box className="mb-6">
      <Typography className="font-georgia text-lg font-semibold border-b border-nyt-light-gray pb-2 mb-3">Opinion</Typography>
      {[
        { title: 'Why Climate Action Must Accelerate', author: 'Michael Brown' },
        { title: 'The Case for Tech Regulation', author: 'Rachel Adams' },
        { title: 'Education Reform Needs Bold Ideas', author: 'Steven Hall' }
      ].map(item => (
        <Box key={item.title} className="border-b border-nyt-light-gray py-3 text-sm flex items-center">
          <img src="https://via.placeholder.com/40" alt={item.author} className="w-10 h-10 rounded-full mr-2" />
          <a href="#" className="text-nyt-blue hover:underline">{item.title}</a>
        </Box>
      ))}
    </Box>
    <Box>
      <Typography className="font-georgia text-lg font-semibold border-b border-nyt-light-gray pb-2 mb-3">Editor’s Picks</Typography>
      {[
        { title: 'Climate Summit Agreement', category: 'World' },
        { title: 'Quantum Computing Breakthrough', category: 'Technology' },
        { title: 'Broadway Revival Breaks Records', category: 'Arts' }
      ].map(item => (
        <Box key={item.title} className="border-b border-nyt-light-gray py-3 text-sm">
          <a href="#" className="text-nyt-blue hover:underline">{item.title} ({item.category})</a>
        </Box>
      ))}
    </Box>
  </Box>
);
export default Sidebar
