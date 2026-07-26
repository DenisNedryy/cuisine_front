import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../../../contexts/AuthContext";

export function SearchBar() {
    const navigate = useNavigate();
    const { state, dispatch } = useAuth();

    const [isSmallScreen, setIsSmallScreen] = useState(
        window.matchMedia("(max-width: 1299px)").matches
    );

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 1299px)");

        function handleResize(e) {
            setIsSmallScreen(e.matches);
        }

        mediaQuery.addEventListener("change", handleResize);

        return () => {
            mediaQuery.removeEventListener("change", handleResize);
        };
    }, []);

    function handleSubmit(e) {
        e.preventDefault();

        const form = e.currentTarget;
        const query = form.elements.searchBar.value.trim();

        if (!query) return;

        form.reset();
        navigate(`/recipesBySearch?query=${encodeURIComponent(query)}`);
    }

    function handleClickGlass() {
        closeNavigation();
        navigate(`/recipesBySearch`);
    }

    function closeNavigation() {
        dispatch({
            type: "SET_MOBILE",
            payload: false
        });
    }



    return (
        <div className="searchBar">
            {isSmallScreen ? (
                <div
                    className="searchBar__searchButton"
                    aria-label="Rechercher une recette"
                >
                    <i onClick={handleClickGlass} className="fa-solid fa-magnifying-glass"></i>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="searchBar"
                        placeholder="Rechercher une recette"
                    />
                </form>
            )}

        </div>
    );
}