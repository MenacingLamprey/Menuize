import { FormProvider, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { IBrand } from "../../apiTypes";
import { createBrand } from "../../apiServices/brandServices";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";


export const BrandForm = () => {
  let { ingredientName }  = useParams()
  console.log(useParams())
  const accessToken = localStorage.getItem('accessToken') || ''
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const methods  = useForm<IBrand>({
    defaultValues: {
      price : 0,
      amount : ''
    },
    mode: "onBlur"
  }); 

  ingredientName = ingredientName || ''
  const { register, handleSubmit} = methods
  const mutation = useMutation({mutationFn : (brand  : IBrand,) => createBrand(brand, ingredientName, accessToken), 
    onSuccess : () => {
      queryClient.invalidateQueries({queryKey : ['ingredient', ingredientName]})
    }
  }) 

  if (mutation.isPending) {
    return <span>Submitting...</span>;
  }

  if (mutation.isError) {
    return <span>Error</span>;
  }

  if (mutation.isSuccess) {
    return (<div>
      <span>Post submitted!</span>
    </div>)
  }

  const submit = async (brand : IBrand) => {
    console.log(ingredientName)
    const success = await mutation.mutateAsync(brand)
    console.log(success)
    navigate(-1)
  }

  return (<Container sx={{ display : 'flex', flexDirection :'column' }}>
  <Typography component={'h1'} variant='h5'>Register Your New Drink</Typography>
  <FormProvider {...methods}>
  <Box component="form" onSubmit={handleSubmit(data => submit(data))} noValidate sx={{ mt: 1 }} id='form'>
    <TextField
      margin="normal"
      required
      fullWidth
      id="brand-name"
      label="Name"
      {...register(`name` as const, {
        required: true
      })}
    />
    <TextField
    margin="normal"
    required
    fullWidth
    id="price"
    label="Price"
    {...register(`price` as const, {
      required: true
    })}
  />
    <TextField
    margin="normal"
    required
    fullWidth
    id="amount"
    label="Amount"
    {...register(`amount` as const, {
      required: true
    })}
  />
   <Button
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
    >
      Create Brand
    </Button>
  </Box>
  </FormProvider>
  </Container>)
}