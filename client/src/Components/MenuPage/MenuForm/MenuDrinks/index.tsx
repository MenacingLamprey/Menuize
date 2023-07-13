import { Box, Chip, Container, Typography } from "@mui/material"
import { IDrink } from "../../../../apiTypes"

interface IProps {
  menuDrinksState: [IDrink[], React.Dispatch<React.SetStateAction<IDrink[]>>]
}

export const MenuDrinks = ({menuDrinksState} : IProps) => {
  const [menuDrinks, setMenuDrinks] = menuDrinksState

  const handleDelete = (drink : string) => {
    setMenuDrinks(prev => prev.filter(d => d.name !== drink))
  };

  return (<Container>
    <Box>
      {menuDrinks.map(drink => (
        <Chip label={drink.name} variant="outlined" onDelete={() => handleDelete(drink.name)} />
      ))}
    </Box>
  </Container>)
}