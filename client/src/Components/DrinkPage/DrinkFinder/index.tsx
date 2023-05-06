import { Box, TextField } from "@mui/material"

export const DrinkFinder = () => {

  return (<Box component="form" noValidate sx={{ mt: 1 }}>
    <TextField 
      margin="normal"
      fullWidth
      name="ingredients"
      label="Ingredients"
      type="ingredients"
      id="ingredients"
    />
  </Box>)
}