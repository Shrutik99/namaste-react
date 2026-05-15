import RestaurantCard, { withVegLabel } from "./RestaurantCard";
import { useState, useEffect, useContext } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

const Body = () => {
  // Local State Variable - super powerful Variable
  const [listOfRestaurants, setListOfRestaurants] = useState([]);

  const [filteredRestaurant, setFilteredRestaurant] = useState([]);

  const [searchText, setSearchText] = useState("");

  const RestaurantCardVeg = withVegLabel(RestaurantCard);

  // whenever state variables update, react triggers a reconciliation cycle(re-renders a component)

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://corsproxy.io/?url=https://www.swiggy.com/dapi/restaurants/list/v5?lat=20.898372%26lng=74.77067029999999%26is-seo-homepage-enabled=true%26page_type=DESKTOP_WEB_LISTING",
    );

    const json = await data.json();

    setListOfRestaurants(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants,
    );
    setFilteredRestaurant(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants,
    );
  };

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false) {
    return (
      <h1>Looks like you're offline! Connect to the internet and try again!</h1>
    );
  }

  const { loggedInUser, setUserName } = useContext(UserContext);

  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter flex">
        <div className="search m-4 p-4">
          <input
            type="text"
            className="border border-solid border-black"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className="px-4 py-2 bg-green-100 m-4 rounded-lg cursor-pointer"
            onClick={() => {
              const filteredRestaurant = listOfRestaurants.filter((res) =>
                res.info.name.toUpperCase().includes(searchText.toUpperCase()),
              );
              setFilteredRestaurant(filteredRestaurant);
            }}
          >
            Search
          </button>
        </div>
        <div className="m-4 p-4 flex items-center">
          <button
            className="px-4 py-2 bg-gray-100 rounded-lg cursor-pointer"
            onClick={() => {
              const filteredList = listOfRestaurants.filter(
                (res) => res.info.avgRating > 4,
              );
              setFilteredRestaurant(filteredList);
            }}
          >
            Top Rated Restaurants
          </button>
        </div>
        <div className="m-4 p-4 flex items-center">
          <label>User Name:</label>
          <input
            className="border border-black p-2"
            value={loggedInUser}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-wrap">
        {filteredRestaurant.map((restaurant) => (
          <Link
            to={"/restaurants/" + restaurant.info.id}
            key={restaurant.info.id}
          >
            {restaurant.info.veg ? (
              <RestaurantCardVeg resData={restaurant} />
            ) : (
              <RestaurantCard resData={restaurant} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
