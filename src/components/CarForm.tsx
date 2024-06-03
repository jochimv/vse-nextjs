'use client'
import { createCar, updateCar } from '@/utils/actions'
import { Currency, Car } from '@prisma/client'
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
  TextField,
  Typography,
  Stack,
} from '@mui/material'
import { FormikValues, useFormik } from 'formik'
import { useRef, useState, useEffect } from 'react'
import SimpleModal from '@/components/SimpleModal'
import useActionModal from '@/hooks/useActionModal'

const CarForm = ({
  car,
  currencies,
}: {
  car?: Car
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

  const { values, handleChange, handleSubmit, setValues } = useFormik({
    initialValues: {
      brand: car?.brand || '',
      model: car?.model || '',
      city: car?.city || '',
      condition: car?.condition || '',
      year: car?.year || '',
      currency: car?.currencyId || '',
      price: car?.price || '',
      adName: car?.adName || '',
    },
    onSubmit: async (data: FormikValues) => {
      if (car) {
        await updateCar({ ...data, id: car.id })
      } else {
        const { imageSrc } = await uploadFile()
        await createCar({ ...data, imageSrc })
      }
      handleOpen()
    },
  })

  useEffect(() => {
    if (car) {
      setValues({
        brand: car.brand,
        model: car.model,
        city: car.city,
        condition: car.condition,
        year: car.year,
        currency: car.currencyId,
        price: car.price,
        adName: car.adName,
      })
    }
  }, [car, setValues])

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
        <Typography variant="h4">
          {car ? 'Edit Car' : 'Add a New Car'}
        </Typography>
        <TextField
          onChange={handleChange}
          value={values.adName}
          name="adName"
          required={true}
          label="Advertisement name"
        />
        <TextField
          onChange={handleChange}
          value={values.brand}
          name="brand"
          required
          label="Brand"
        />
        <TextField
          onChange={handleChange}
          value={values.model}
          name="model"
          required
          label="Model"
        />
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
          required
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
            Object.keys(values).some((key) => !values[key]) ||
            (car ? false : !isImageUploaded)
          }
        >
          {car ? 'Update Car' : 'Submit'}
        </Button>
      </Box>
      <SimpleModal
        buttonDescription="close"
        description={
          car
            ? 'The car details have been successfully updated!'
            : 'The new car has been successfully created!'
        }
        title={car ? 'Car Updated' : 'New Car Created'}
        open={open}
        handleClose={handleClose}
      />
    </>
  )
}

export default CarForm
