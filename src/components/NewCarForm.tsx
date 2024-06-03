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
import { useMemo, useRef, useState } from 'react'
import SimpleModal from '@/components/SimpleModal'
import useActionModal from '@/hooks/useActionModal'

const NewCarForm = ({
  models,
  brands,
  currencies,
}: {
  models: CarModel[]
  brands: Brand[]
  currencies: Currency[]
}) => {
  const { open, handleOpen, handleClose } = useActionModal()
  const [isImageUploaded, setIsImageUploaded] = useState(false)
  const fileInput = useRef<HTMLInputElement>(null)

  async function uploadFile() {
    try {
      const formData = new FormData()
      formData.append('file', fileInput?.current?.files?.[0]!)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Error uploading file:', errorData)
        return
      }

      return await response.json()
    } catch (error) {
      console.error('Error during upload:', error)
    }
  }

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
      const { imageSrc } = await uploadFile()
      await createCar({ ...data, imageSrc })
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
        onSubmit={(event) => {
          event.preventDefault()
          handleSubmit()
        }}
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
        <input
          id="file"
          name="file"
          type="file"
          ref={fileInput}
          onChange={() => setIsImageUploaded(true)}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ width: '50%' }}
          disabled={
            Object.keys(values).some((key) => !values[key]) || !isImageUploaded
          }
        >
          Submit
        </Button>
      </Box>
      <SimpleModal
        buttonDescription="close"
        description="The new car has been successfully created!"
        title="New Car Created"
        open={open}
        handleClose={handleClose}
      />
    </>
  )
}

export default NewCarForm
