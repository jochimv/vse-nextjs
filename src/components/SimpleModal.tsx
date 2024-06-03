import { Box, Button, Fade, Modal, Typography } from '@mui/material'
import useActionModal from '@/hooks/useActionModal'

const SimpleModal = ({
  title,
  description,
  buttonDescription,
  open,
  handleClose,
}: {
  title: string
  description: string
  buttonDescription: string
}) => {
  return (
    <Modal open={open} onClose={handleClose} closeAfterTransition>
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
          <Typography>{description}</Typography>
          <Button onClick={handleClose} variant="contained" sx={{ mt: 2 }}>
            {buttonDescription}
          </Button>
        </Box>
      </Fade>
    </Modal>
  )
}

export default SimpleModal
