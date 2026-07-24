import { HOST } from "../../host";
import { toggleFavorites } from "../../services/favorites";
import { useLocation, useNavigate } from "react-router-dom";

export function Recipe({ recipe, onUpdate }) {
    const location = useLocation();
    const navigate = useNavigate();

    function getUrlParams() {
        const params = new URLSearchParams(location.search);

        return {
            page: params.get("page") || 1,
            category: params.get("category") || "",
            tag: params.get("tag") || "",
        };
    }

    function handleOpenRecipe() {
        const params = getUrlParams();

        navigate(
            `/focus?recipeId=${recipe._id}` +
            `&page=${params.page}` +
            `&category=${encodeURIComponent(params.category)}` +
            `&tag=${encodeURIComponent(params.tag)}`
        );
    }

    async function handleFavorites(e) {
        // Empêche le clic sur le cœur d'ouvrir la recette
        e.stopPropagation();

        await toggleFavorites(recipe._id);
        await onUpdate();
    }

    return (
        <div
            className="recipe"

        >
            <div className="recipe__top"
                data-id={recipe._id}
                onClick={handleOpenRecipe}>
                <img
                    src={`${HOST}/api/images/recipes/${recipe.img_url}`}
                    alt={recipe.name}
                />

                <div className="recipe__top__banner">
                    <p>{recipe.name}</p>
                </div>
            </div>

            <div className="recipe__bottom">
                <div
                    className={`recipe__bottom--difficulty difficulty--${recipe.difficulty}`}
                />

                <div className="recipe__bottom--category">
                    {recipe.category}
                </div>

                <div

                    className="recipe__bottom--favorites"
                    onClick={handleFavorites}
                    aria-label={
                        recipe.fav
                            ? "Retirer des favoris"
                            : "Ajouter aux favoris"
                    }
                >
                    <i
                        className={
                            recipe.fav
                                ? "fa-solid fa-heart hearth--true"
                                : "fa-regular fa-heart hearth--false"
                        }
                    />
                </div>
            </div>
        </div>
    );
}