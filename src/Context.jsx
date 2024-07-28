import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AppContext = createContext();

const allMealsUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const randomMealUrl = "https://www.themealdb.com/api/json/v1/1/random.php";

const getFavouritesFromLocalStorage = () => {
  let favourites = localStorage.getItem("favourites");
  if (favourites) {
    favourites = JSON.parse(localStorage.getItem("favourites"));
  } else {
    favourites = [];
  }
  return favourites;
};

const AppProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [favourites, setFavourites] = useState(getFavouritesFromLocalStorage());

  const fetchMeals = async (url) => {
    setLoading(true);
    try {
      const { data } = await axios(url);
      // const data = await response.json();
      // console.log(data);
      if (data.meals) {
        setMeals(data.meals);
      } else {
        setMeals([]);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const fetchRandomMeal = () => {
    fetchMeals(randomMealUrl);
  };

  const addFavourites = (idMeal) => {
    const meal = meals.find((meal) => meal.idMeal === idMeal);
    const alreadyFavourite = favourites.find((meal) => meal.idMeal === idMeal);
    if (alreadyFavourite) return;
    const updateFavourites = [...favourites, meal];
    setFavourites(updateFavourites);
    localStorage.setItem("favourites", JSON.stringify(updateFavourites));
  };

  const removeFavourites = (idMeal) => {
    const updateFavourites = favourites.filter(
      (meal) => meal.idMeal !== idMeal
    );
    setFavourites(updateFavourites);
    localStorage.setItem("favourites", JSON.stringify(updateFavourites));
  };

  const selectMeal = (idMeal, favouriteMeal) => {
    let meal;

    if (favouriteMeal) {
      meal = favourites.find((favMeal) => favMeal.idMeal === idMeal);
    } else {
      meal = meals.find((meal) => meal.idMeal === idMeal);
    }

    // console.log(meal);
    setSelectedMeal(meal);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    fetchMeals(allMealsUrl);
  }, []);

  useEffect(() => {
    if (!searchTerm) return;
    fetchMeals(`${allMealsUrl}${searchTerm}`);
  }, [searchTerm]);

  return (
    <AppContext.Provider
      value={{
        meals,
        loading,
        setSearchTerm,
        fetchRandomMeal,
        showModal,
        selectMeal,
        selectedMeal,
        closeModal,
        favourites,
        addFavourites,
        removeFavourites,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
