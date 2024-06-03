'use client'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import './globals.css'
import { Box } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import theme from '@/styling'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Appbar from '@/components/Appbar'

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
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
          </QueryClientProvider>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </html>
  )
}
