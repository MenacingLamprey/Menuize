import { Button, Checkbox, Container, FormControlLabel, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { IBrand } from "../../apiTypes"
import { useState } from "react"

interface IProps {
  brandStates : IBrand[]
  setBrandStates? : React.Dispatch<React.SetStateAction<IBrand[]>>
}

export const BrandTable = ({ brandStates, setBrandStates } : IProps) => {
  
  const setPreferrence = (newBrand : IBrand) => {
    const updatedStates = brandStates.map(brand => {
      if (brand.preferred){
        return {...brand, preferred : false} 
      } else if (brand.name == newBrand.name) {
        return {...newBrand, preferred : true}
      } else {
        return brand
      }
    })
    //if no brand state setter, setPreferrence is unreachable
    setBrandStates && setBrandStates(updatedStates) 
  }
  return (<TableContainer component={Paper} sx={{}}>
    <Table sx={{}} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell align="right">Price</TableCell>
          <TableCell align="right">Amount</TableCell>
          <TableCell align="right">Preferred</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {brandStates.map((row) => (
          <TableRow
            key={row.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row.name}
            </TableCell>
            <TableCell align="right">{row.price}</TableCell>
            <TableCell align="right">{row.amount}</TableCell>
            <TableCell align="right">
              {setBrandStates ? (
                <Checkbox checked={row.preferred} onChange={e => setPreferrence(row)}/> ) : (
                <Checkbox checked={row.preferred} />
              )}
            </TableCell>
            {setBrandStates && <TableCell><Button onClick={e => {}}>X</Button></TableCell>}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>)
}