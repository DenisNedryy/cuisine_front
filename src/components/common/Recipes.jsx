import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { getRecipes } from "../../services/recipes";
import { getFavorites } from "../../services/favorites";
import { isUserConnected } from "../../services/auth";

import { usePagination } from "../../hooks/usePagination";
import { Recipe } from "../common/Recipe";
import { Page } from "./Page";

export function Recipes({
    recipesData,
    onUpdateFav,
    isSearching = false
}) {
    const [recipes, setRecipes] = useState([]);
    const [paramUrl, setParamUrl] = useState({
        page: 1,
        category: null,
        tag: null
    });

    const location = useLocation();
    const pagination = usePagination(recipes);

    useEffect(() => {
        controllerRecipes();
    }, [location.search, recipesData]);

    async function controllerRecipes() {
        try {
            let myRecipes = recipesData;

            // On appelle l'API uniquement si aucune recette
            // n'est déjà fournie dans les props.
            if (!myRecipes) {
                const resRecipes = await getRecipes();
                myRecipes = resRecipes.data.recipes;
            }

            const urlParamsData = getUrlParams();
            setParamUrl(urlParamsData);

            const filteredRecipes = filterRecipesWithParams(
                urlParamsData,
                myRecipes
            );

            const recipesWithFavorites = await addFavoritesToData(
                filteredRecipes
            );

            setRecipes(recipesWithFavorites);

            setTimeout(resetScrollToTop, 10);
        } catch (error) {
            console.error(
                "Erreur lors de la récupération des recettes :",
                error
            );
        }
    }

    async function addFavoritesToData(recipesToUpdate) {
        const userResponse = await isUserConnected();

        if (!userResponse.data.isUser) {
            return recipesToUpdate.map((recipe) => ({
                ...recipe,
                fav: false
            }));
        }

        const favoritesResponse = await getFavorites();
        const favorites = favoritesResponse.data.favorites;

        const favoritesIds = favorites.map(
            (favorite) => favorite._id
        );

        return recipesToUpdate.map((recipe) => ({
            ...recipe,
            fav: favoritesIds.includes(recipe._id)
        }));
    }

    function filterRecipesWithParams(params, recipesToFilter) {
        if (!params.category && !params.tag) {
            return recipesToFilter;
        }

        return filterRecipes(params, recipesToFilter);
    }

    function filterRecipes(params, recipesToFilter) {
        const selectedFilters = [
            params.category,
            params.tag
        ].filter(Boolean);

        return recipesToFilter.filter((recipe) => {
            const matchesCategory = selectedFilters.includes(
                recipe.category
            );

            const matchesTag = recipe.tags?.some((tag) =>
                selectedFilters.includes(tag.tag)
            );

            return matchesCategory || matchesTag;
        });
    }

    function getUrlParams() {
        const searchParams = new URLSearchParams(location.search);

        return {
            page: Number(searchParams.get("page")) || 1,
            category: searchParams.get("category"),
            tag: searchParams.get("tag")
        };
    }

    function resetScrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    const activeFilter = paramUrl.category || paramUrl.tag;

    return (
        <div className="recipePage">
            <div className="recipes__legend">
                {!isSearching && (
                    <div className="recipes__legend_difficulty__container">
                        <div className="recipes__legend__difficulty">
                            <div className="recipes__legend__difficulty--facile" />
                            <div className="recipes__legend__difficulty--moyen" />
                            <div className="recipes__legend__difficulty--difficile" />
                        </div>
                    </div>
                )}

                {isSearching && (
                    <>
                        <p className="legendDifficulté">
                            Nos recettes
                        </p>

                        <div className="recipes__legend__tags">
                            <h2>
                                {activeFilter
                                    ? `Trouvez votre prochaine recette correspondant à « ${activeFilter} ».`
                                    : "Trouvez votre prochaine recette parmi toutes les catégories."}
                            </h2>

                            <p>
                                Des idées gourmandes pour toutes vos
                                envies, du quotidien aux grandes
                                occasions.
                            </p>
                        </div>
                    </>
                )}
            </div>

            <div className="recipes">
                {pagination.filterArticleByPage.map((recipe) => (
                    <div key={recipe._id}>
                        <Recipe
                            recipe={recipe}
                            onUpdate={
                                onUpdateFav || controllerRecipes
                            }
                        />
                    </div>
                ))}
            </div>

            <div className="recipePage__content__pagination">
                <div className="recipePage__content__pagination__left pageCube">
                    <i className="fa-solid fa-angle-left" />
                </div>

                <div className="recipePage__content__pagination__pages">
                    <Page
                        pageInfo={pagination}
                        category={paramUrl.category}
                    />
                </div>

                <div className="recipePage__content__pagination__right pageCube">
                    <i className="fa-solid fa-angle-right" />
                </div>
            </div>
        </div>
    );
}