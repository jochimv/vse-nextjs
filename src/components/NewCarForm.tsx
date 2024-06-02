'use client'
import { createCar } from '@/utils/actions'
import { Brand, CarModel } from '@prisma/client'
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
  TextField,
  Typography,
  Modal,
  Backdrop,
  Fade,
} from '@mui/material'
import { FormikValues, useFormik } from 'formik'
import { useMemo } from 'react'
import useModal from '@/hooks/useModal'

const NewCarForm = ({
  models,
  brands,
}: {
  models: CarModel[]
  brands: Brand[]
}) => {
  const { open, handleOpen, handleClose } = useModal()
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      brand: '',
      model: '',
      description: '',
    },
    onSubmit: async (data: FormikValues, { resetForm }) => {
      await createCar(data)
      resetForm()
      handleOpen()
    },
  })

  const filteredModels = useMemo(() => {
    return models.filter((model: CarModel) => model.brandId === values.brand)
  }, [values.brand, models])

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        flexDirection="column"
        gap={2}
        width="30%"
      >
        <Typography variant="h4">Add a new car</Typography>
        <FormControl fullWidth>
          <InputLabel id="select-brand-label">Select a brand</InputLabel>
          <Select
            labelId="select-brand-label"
            id="select-brand-label"
            value={values.brand}
            label="Brand"
            onChange={handleChange}
            name="brand"
          >
            {brands.map((brand: Brand) => (
              <MenuItem key={brand.id} value={brand.id}>
                {brand.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="select-model-label">Select a model</InputLabel>
          <Select
            labelId="select-model-label"
            id="select-model-label"
            value={values.model}
            label="Model"
            onChange={handleChange}
            name="model"
            disabled={values.brand === ''}
          >
            {filteredModels.map((model: CarModel) => (
              <MenuItem key={model.id} value={model.id}>
                {model.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          onChange={handleChange}
          value={values.description}
          name="description"
          required={true}
          disabled={values.brand === '' || values.model === ''}
          label="Description"
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ width: '50%' }}
          disabled={
            values.brand === '' ||
            values.model === '' ||
            values.description === ''
          }
        >
          Submit
        </Button>
      </Box>

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
              New Car Created
            </Typography>
            <Typography>The new car has been successfully created!</Typography>
            <Button onClick={handleClose} variant="contained" sx={{ mt: 2 }}>
              Close
            </Button>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}

export default NewCarForm
