'use client'
import { createCar } from '@/utils/actions'
import { Brand, CarModel, Currency } from '@prisma/client'

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
  Fade,
  Stack,
} from '@mui/material'
import { FormikValues, useFormik } from 'formik'
import { useMemo } from 'react'
import useModal from '@/hooks/useModal'

const NewCarForm = ({
  models,
  brands,
  currencies,
}: {
  models: CarModel[]
  brands: Brand[]
  currencies: Currency[]
}) => {
  const { open, handleOpen, handleClose } = useModal()
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      brand: '',
      model: '',
      city: '',
      condition: '',
      year: '',
      currency: '',
      price: '',
      adName: '',
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
        <TextField
          onChange={handleChange}
          value={values.adName}
          name="adName"
          required={true}
          label="Advertisement name"
        />
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
          value={values.year}
          name="year"
          required={true}
          label="Year of production"
          inputProps={{
            inputMode: 'numeric',
            pattern: '(19[0-9]{2}|20[0-9]{2}|2100)',
          }}
        />
        <FormControl fullWidth>
          <InputLabel id="select-condition-label">
            Select a condition
          </InputLabel>
          <Select
            labelId="select-condition-label"
            id="select-condition-label"
            value={values.condition}
            label="Condition"
            onChange={handleChange}
            name="condition"
          >
            <MenuItem value="New">New</MenuItem>
            <MenuItem value="Excellent">Excellent</MenuItem>
            <MenuItem value="Good">Good</MenuItem>
            <MenuItem value="Fair">Fair</MenuItem>
            <MenuItem value="For repair">For repair</MenuItem>
            <MenuItem value="For parts">For parts</MenuItem>
          </Select>
        </FormControl>
        <Stack direction="row" spacing={1} alignItems="center">
          <TextField
            onChange={handleChange}
            value={values.price}
            name="price"
            required={true}
            label="Price"
            inputProps={{ inputMode: 'numeric', pattern: '[1-9][0-9]*' }}
          />
          <FormControl fullWidth>
            <InputLabel id="select-currency-label">Select currency</InputLabel>
            <Select
              labelId="select-currency-label"
              id="select-currency-label"
              value={values.currency}
              label="Currency"
              onChange={handleChange}
              name="currency"
            >
              {currencies.map((currency: Currency) => (
                <MenuItem key={currency.id} value={currency.id}>
                  {currency.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
        <TextField
          onChange={handleChange}
          value={values.city}
          name="city"
          label="City"
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ width: '50%' }}
          disabled={Object.keys(values).some((key) => !values[key])}
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
