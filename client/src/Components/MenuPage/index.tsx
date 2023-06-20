import { useQuery } from "react-query"
import { IMenu } from "../../apiTypes"
import { fetchCurrentMenu } from "../../Queries/fetchMenu"
import { Container } from "@mui/material"

export const MenuPage = () => {
  
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
    throw new Error("Error Getting Current Menu")
  }

  return (<Container>
    <h1>{menu.title}</h1>
    <div>{menu.drinks.map(drink => (
      <li>{drink.name}</li>
    ))}
    </div>
  </Container>)
}