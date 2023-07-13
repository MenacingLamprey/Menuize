import { useNavigate } from "react-router-dom"
import { useQuery } from "react-query"
import { IMenu } from "../../apiTypes"
import { fetchCurrentMenu } from "../../Queries/fetchMenu"
import { Box, Button, Container, Typography } from "@mui/material"
import { MenuDetails } from "../MenuDetails"

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
    <Box>
    <Typography variant="h4">Current Menu</Typography>
    <MenuDetails menu={menu} />
    <Typography variant="h6"><Button>Menu Archive</Button></Typography>
    <Typography variant="h6"><Button onClick={() => navigate('/menu-form')}>Create New Menu</Button></Typography>
    </Box>
  </Container>)
}