// pages/about.tsx
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
} from '@mui/material'
import Head from 'next/head'

const AboutUs = () => {
  return (
    <>
      <Head>
        <title>About Us - Car Dealership</title>
      </Head>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h1" gutterBottom>
          About Us
        </Typography>
        <Typography variant="h6" gutterBottom>
          Welcome to our Car Dealership! We are dedicated to providing you with
          the best service and the best cars.
        </Typography>
        <Divider sx={{ my: 3 }} />
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  Our Mission
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Our mission is to offer high-quality cars at competitive
                  prices. We strive to provide excellent customer service and
                  ensure a smooth and enjoyable car-buying experience.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  Our Values
                </Typography>
                <Typography variant="body1" gutterBottom>
                  We value integrity, transparency, and customer satisfaction.
                  Our team is committed to helping you find the perfect car that
                  meets your needs and budget.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  Our Location
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345094877!2d144.95373531531668!3d-37.81627937975144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5777cfe7d8bc1e3!2sRMIT%20University!5e0!3m2!1sen!2sau!4v1638164872028!5m2!1sen!2sau"
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                  ></iframe>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default AboutUs
