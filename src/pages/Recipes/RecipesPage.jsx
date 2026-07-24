import { Recipes } from "../../components/common/Recipes";

export function RecipesPage() {

    return (
        <>
            <div className="recipePage__bg">
                <div className="recipePage__container">
                    <Recipes isSearching="true" />
                </div>
            </div>
        </>
    );
}