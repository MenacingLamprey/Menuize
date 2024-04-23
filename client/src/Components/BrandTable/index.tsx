import { Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { IBrand } from "../../apiTypes"

interface IProps {
  brands : IBrand[]
  isEditing? : boolean
}

export const BrandTable = ({brands, isEditing} : IProps) => {

  return (<TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell align="right">Price</TableCell>
          <TableCell align="right">Amount&nbsp;(g)</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {brands.map((row) => (
          <TableRow
            key={row.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row.name}
            </TableCell>
            {isEditing ? (<TableCell align="right">{row.price}</TableCell>) :(
              <p>Edit</p>
            )}
            {isEditing ? (<TableCell align="right">{row.amount}</TableCell>) :(
              <p>Edit</p>
            )}
            {isEditing && <TableCell><Button onClick={e => {}}>X</Button></TableCell>}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>)
}