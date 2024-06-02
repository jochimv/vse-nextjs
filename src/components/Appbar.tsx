import Link from 'next/link'
import { Button, AppBar, Toolbar, Box } from '@mui/material'

const Appbar = () => {
  return (
    <AppBar position="absolute">
      <Toolbar sx={{ justifyContent: 'flex-end', columnGap: 1 }}>
        <Button color="inherit" component={Link} href="/">
          Home
        </Button>
        <Button color="inherit" component={Link} href="/car/new">
          New car
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Appbar
