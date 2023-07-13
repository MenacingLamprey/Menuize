import { useNavigate } from "react-router-dom"
import { useQuery } from "react-query"
import { IMenu } from "../../apiTypes"
import { fetchCurrentMenu } from "../../Queries/fetchMenu"
import { Button, Container, Typography } from "@mui/material"

export const MenuPage = () => {
  const navigate = useNavigate()
  const results = useQuery("menu", fetchCurrentMenu)

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }
  const menu = results?.data?.res
  if(!menu) {
    return <Container>
      <Typography variant="h4">No menu set current!</Typography>
      <Typography variant="h6">
        Would you like to set one of your previously made menus current? <Button>Menus</Button>
      </Typography>
      <Typography variant="h6">
        Or Create a new one to set? <Button onClick={() => navigate('/menu-form')}>Create Menu</Button>
      </Typography>
    </Container>
  }

  return (<Container>
    <h1>{menu.title}</h1>
    <div>{menu.drinks.map(drink => (
      <li>{drink.name}</li>
    ))}
    </div>
  </Container>)
}