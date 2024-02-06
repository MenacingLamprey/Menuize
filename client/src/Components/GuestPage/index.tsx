import {useQuery} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { fetchPublicItems } from "../../Queries/fetchGuest";
import { DrinkPage } from "../DrinkPage";

export const GuestPage = () => {
  localStorage.setItem('accessToken', 'guest')

    const results = useQuery({queryKey :["public"], queryFn :fetchPublicItems});
    if (results.isLoading) {
      return (
        <div className="loading-pane">
          <h2 className="loader">🌀</h2>
        </div>
      );
    }
    const publicItems = results?.data?.res;
    if (!publicItems) {
      throw new Error("public items not found");
    }

    console.log(publicItems.drinks)

    localStorage.setItem('drinks', JSON.stringify(publicItems.drinks))
    localStorage.setItem('ingredients', JSON.stringify(publicItems.ingredients));

    return (<div id={"guest-container"}>
      <DrinkPage />
    </div>)
}