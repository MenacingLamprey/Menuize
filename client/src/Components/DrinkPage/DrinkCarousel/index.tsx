import Carousel from "react-material-ui-carousel"

import { IDrink } from "../../../apiTypes"
import { DrinkCard } from "./DrinkCard"

interface IProps {
  drinks : IDrink[]
}

export const DrinkCarousel = ({drinks} : IProps) => {

  return(
  <Carousel height={'120px'} sx={{width : '200px'}}>
    {
      drinks.map(drink => <DrinkCard drink={drink} />)
    }
   </Carousel>)
}