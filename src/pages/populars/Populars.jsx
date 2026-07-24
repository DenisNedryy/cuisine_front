import { Recipes } from "../../components/common/Recipes";
import { useState, useEffect } from "react";
import { getTop10Recipes } from "../../services/recipes";
import { getRecipe } from "../../services/recipes";


export function Populars() {

    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        controller();
    }, []);

    async function controller() {
        const res = await getTop10Recipes();
        const favIds = res.data.recipes;
        if (!favIds) return;
        if (favIds.length <= 0) {
            setRecipes([]);
            return;
        }

        const recipesIds = favIds.map((ids) => ids._id);

        const favoritesRecipes = (await Promise.all(
            recipesIds.map(async (recipeId) => {
                try {
                    const resFav = await getRecipe(recipeId);
                    return resFav.data.recipe || null;
                } catch (error) {
                    return null;
                }
            })
        )).filter(Boolean);
        setRecipes(favoritesRecipes);
    }

    return (
        <div className="popular__container">
            <p className="popular__container__title">Top 10</p>
            <h2>Les recettes les plus populaires</h2>
            <p className="popular__container__description">voici un top 10 des recettes les plus populaires</p>
            <div className="home">
                {/* 1 article de blog */}
                {recipes && recipes.length > 0 && <Recipes recipesData={recipes} onUpdateFav={controller} />}
            </div>
        </div>
    );
}