import { useState, useEffect } from "react";
import { getRecipesByResearch } from "../../services/recipes";
import { useLocation, useNavigate } from "react-router-dom";
import { Recipes } from "../../components/common/Recipes";

export function RecipesBySearch() {

    const navigate = useNavigate();
    const location = useLocation();
    const [recipesSearched, setRecipesSearched] = useState([]);
    const [query, setQuery] = useState([]);
    const [isSmallScreen, setIsSmallScreen] = useState(
        window.matchMedia("(max-width: 1299px)").matches
    );

    useEffect(() => {
        init();
    }, [location]);

    async function init() {
        const query = await getUrlParam();
        setQuery(query);
        const res = await getRecipesByResearch(query);
        if (res.data.recipes.length > 0) setRecipesSearched(res.data.recipes);
    }

    async function getUrlParam() {
        const str = window.location.href;
        const url = new URL(str);
        return url.searchParams.get("query");
    }

    function handleSubmit(e) {
        e.preventDefault();

        const form = e.currentTarget;
        const query = form.elements.searchBar.value.trim();

        if (!query) return;

        form.reset();
        navigate(`/recipesBySearch?query=${encodeURIComponent(query)}`);
    }

    return (
        <>

            <div className="recipesBySearch">
                <h2>Résultats pour « {query} »</h2>

                {isSmallScreen && (
                    <form onSubmit={handleSubmit} className="formRecipesBySearch">
                        <input
                            type="text"
                            name="searchBar"
                            placeholder="Rechercher une recette"
                        />
                    </form>
                )}
                <Recipes recipesData={recipesSearched} />
            </div>
        </>
    );
}