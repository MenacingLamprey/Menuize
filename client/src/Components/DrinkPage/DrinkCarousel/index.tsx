import Carousel from "react-material-ui-carousel"

import useWindowDimensions from "../../../hooks/useWindowDimensions"
import { IDrink } from "../../../apiTypes"
import { DrinkCard } from "./DrinkCard"
import { Card, Container, Grid } from "@mui/material"

interface IProps {
  drinks : IDrink[]
}

export const DrinkCarousel = ({drinks} : IProps) => {
  const { width } = useWindowDimensions()
  const sliderItems: number = drinks.length > 3 ? 3 : drinks.length;
  const items: Array<any> = [];
  console.log(drinks)
  for (let i = 0; i < drinks.length-2; i ++) {
    if (i % sliderItems === 0) {
      items.push(
        <Card raised className="Banner" key={i.toString()}>
          <Grid container spacing={0} className="BannerGrid" sx={{display :'flex', justifyContent :'space-evenly'}}>
            {drinks.slice(i, i + sliderItems).map((drink, index) => {
              return <DrinkCard key={index.toString()} drink={drink} />;
            })}
          </Grid>
        </Card>
      );
    }
  }

  const setCarouselItems = () => {
    let carouselItems: any[];
    if(width > 600){
      carouselItems = items
    } else {
      carouselItems = drinks.map(drink => (
        <Container sx={{display : "flex", justifyContent:"center"}}><DrinkCard drink={drink} /></Container>
      ))
    }
    return carouselItems
  }

  return(
  <Carousel swipe={true} height={'125px'} sx={{minWidth : 300, maxWidth:700,  width,  justifyContent :"center" }} >
    {setCarouselItems()}
   </Carousel>)
}