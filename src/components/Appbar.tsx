import Link from 'next/link'
import { Button, AppBar, Toolbar, Box } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import InfoIcon from '@mui/icons-material/Info'
const Appbar = () => {
  return (
    <AppBar position="absolute">
      <Toolbar sx={{ justifyContent: 'flex-end', columnGap: 1 }}>
        <Button color="inherit" component={Link} href="/">
          <HomeIcon sx={{ marginRight: 1 }} />
          Car offers
        </Button>
        <Button color="inherit" component={Link} href="/car/new">
          <DirectionsCarIcon sx={{ marginRight: 1 }} />
          New car
        </Button>
        <Button color="inherit" component={Link} href="/about-us">
          <InfoIcon sx={{ marginRight: 1 }} />
          About us
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Appbar
