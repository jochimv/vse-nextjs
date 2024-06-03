'use client'
import { Button } from '@mui/material'
import React from 'react'
import { Car } from '@prisma/client'
import useActionModal from '@/hooks/useActionModal'
import SimpleModal from '@/components/SimpleModal'

const DeleteButton = ({ car }: { car: Car }) => {
  const { open, handleOpen, handleClose } = useActionModal()
  const handleDelete = async () => {
    const response = await fetch('/api/deletecar', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: car?.id }),
    })

    if (response.ok) {
      handleOpen()
    } else {
      console.error('Failed to delete the car')
    }
  }

  return (
    <>
      <Button
        variant="contained"
        color="error"
        onClick={handleDelete}
        sx={{ mt: 2 }}
      >
        Delete Car
      </Button>
      <SimpleModal
        title="Car deleted"
        description="Car deleted successfully"
        buttonDescription="close"
        open={open}
        handleClose={handleClose}
      />
    </>
  )
}

export default DeleteButton
