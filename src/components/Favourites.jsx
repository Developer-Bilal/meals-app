import { useGlobalContext } from "../Context";

const Favourites = () => {
  const { favourites, selectMeal, removeFavourites } = useGlobalContext();

  return (
    <section className="favorites">
      <div className="favorites-content">
        <h5>Favourites</h5>
        <div className="favorites-container">
          {favourites.map((item) => {
            const { idMeal, strMealThumb: image } = item;

            return (
              <div key={idMeal} className="favorite-item">
                <img
                  src={image}
                  className="favorites-img img"
                  onClick={() => selectMeal(idMeal, true)}
                  alt="favourites"
                />
                <button
                  className="remove-btn"
                  onClick={() => removeFavourites(idMeal)}
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Favourites;
