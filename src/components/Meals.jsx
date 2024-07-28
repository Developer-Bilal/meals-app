import { useGlobalContext } from "../Context";
import { BsHandThumbsUp } from "react-icons/bs";

const Meals = () => {
  const { meals, loading, selectMeal, addFavourites } = useGlobalContext();
  // console.log(meals);

  if (loading) {
    return (
      <section className="section">
        <h4>Loading...</h4>
      </section>
    );
  }

  if (meals.length < 1) {
    return (
      <section className="section">
        <h4>No meals matched your search term. Please try again.</h4>
      </section>
    );
  }

  return (
    <section className="section-center">
      {meals.map((meal) => {
        const { idMeal, strMeal: title, strMealThumb: image } = meal;
        // console.log(m);
        return (
          <article key={idMeal} className="single-meal">
            <img
              src={image}
              alt="Meal-image"
              className="img"
              onClick={() => selectMeal(idMeal)}
            />
            <footer>
              <h5>{title}</h5>
              <button
                className="like-btn"
                onClick={() => addFavourites(idMeal)}
              >
                <BsHandThumbsUp />
              </button>
            </footer>
          </article>
        );
      })}
    </section>
  );
};

export default Meals;
