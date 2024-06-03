'use client'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import './globals.css'
import { Box } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import theme from '@/styling'
import Appbar from '@/components/Appbar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <Box
            component="body"
            display="flex"
            justifyContent="center"
            mt={10}
            mb={4}
          >
            <Appbar />
            {children}
          </Box>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </html>
  )
}
