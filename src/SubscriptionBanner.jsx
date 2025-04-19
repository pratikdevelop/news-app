import React from 'react'

const SubscriptionBanner = ({onEvent}) => {


    const setSubscribeModalOpen = () => {
        onEvent('susbcribtion', true)
    }
    return (
        <Container maxWidth="xl" className="bg-gray-100 py-6 px-4 text-center">
            <Typography className="font-georgia text-2xl font-semibold mb-3">Subscribe to The New York Times</Typography>
            <Typography className="text-sm text-nyt-gray mb-3">Unlimited access to award-winning journalism. Plans start at $1/week.</Typography>
            <Button variant="contained" className="bg-nyt-blue text-nyt-white" onClick={setSubscribeModalOpen}>Subscribe Now</Button>
        </Container>
    )
}



export default SubscriptionBanner
