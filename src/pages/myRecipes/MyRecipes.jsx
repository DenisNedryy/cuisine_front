import { useState, useEffect } from "react";
import { allMyRecipes } from "../../services/recipes";
import { Recipes } from "../../components/common/Recipes";
import { getProfilById } from "../../services/auth";

export function MyRecipes() {

    const [recipes, setRecipes] = useState([]);
    const [profilVisited, setProfilVisited] = useState([]);

    useEffect(() => {
        init();
    }, []);

    async function init() {
        const userId = getPramsId();
        const recipesRes = await allMyRecipes(userId);
        setRecipes(recipesRes.data.recipes);

        const getProfilVisited = await getProfilById(userId);
        setProfilVisited(getProfilVisited.data.user.name);

    }

    function getPramsId() {
        const str = window.location.href;
        const url = new URL(str);
        return url.searchParams.get("userId");
    }

    return (
        <>
            <div class="mesRecettes__container">
                <p className="mesRecettes">Recettes de profil</p>
                <h2>Recettes de {"<<"} <span className="capitilize">{profilVisited}</span> {">>"}</h2>
                {recipes && recipes.length > 0 && <Recipes recipesData={recipes} />}
            </div>
        </>
    );
}