import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function FormEtape2() {

    const navigate = useNavigate();
    const [answer, setAnswer] = useState({
        state: false, color: false, msg: "Veuillez remplir tous les champs"
    });

    function submitSelects(e) {
        e.preventDefault();
        const form = e.target;

        const prevData = JSON.parse(localStorage.getItem("cuisine-form-create-etape"));
        const data = { ...prevData };
        console.log(data);
        data.category = form.elements.category.value;
        data.difficulty = form.elements.difficulty.value
        data.description = form.elements.description.value;
        data.tags = [];
        data.tags.push({ tag: form.elements.regions.value });
        data.tags.push({ tag: form.elements.cuisson.value });
        data.tags.push({ tag: form.elements.saisons.value });

        localStorage.setItem("cuisine-form-create-etape", JSON.stringify(data));
        navigate("/create?form-create-etape=3");

    }




    return (
        <>
            <div className="formEtapeHeader">
                <p>Etape <span className="red">2</span> sur <span className="red">4</span></p>
                <h2>Completer les <span className="red">catégories</span></h2>
            </div>
            <div className="formEtape">
                <div className="formEtape__header">
                    <i className="fa-solid fa-info" /><p>Caractéristiques de la recette</p>
                </div>

                <form onSubmit={(e) => submitSelects(e)}>
                    <div className="divSelect">
                        <label htmlFor="category">Catégorie</label>
                        <select id="category" name="category">
                            <option value="entrée">Entrée</option>
                            <option value="plat">Plat</option>
                            <option value="dessert">Dessert</option>
                            <option value="boisson">Boisson</option>
                            <option value="apéro">Apéro</option>
                            <option value="petit-dejeuner">Petit-déjeuner</option>
                        </select>
                    </div>
                    <div className="divSelect">
                        <label htmlFor="difficulty">Difficulté</label>
                        <select id="difficulty" name="difficulty">
                            <option value="facile">Facile</option>
                            <option value="moyen">Moyen</option>
                            <option value="difficile">Difficile</option>
                        </select>
                    </div>
                    <div className="divSelect">
                        <label htmlFor="regions">Régions</label>
                        <select id="regions" name="regions" defaultValue="">
                            <option value="francaise">Française</option>
                            <option value="italienne">Italienne</option>
                            <option value="espagnole">Espagnole</option>
                            <option value="portugaise">Portugaise</option>
                            <option value="grecque">Grecque</option>
                            <option value="britannique-irlandaise">
                                Britannique et irlandaise
                            </option>
                            <option value="allemande-autrichienne">
                                Allemande et autrichienne
                            </option>
                            <option value="scandinave">Scandinave</option>
                            <option value="asiatique">Asiatique</option>
                            <option value="indienne">Indienne</option>
                            <option value="moyen-orientale">Moyen-Orientale</option>
                            <option value="africaine">Africaine</option>
                            <option value="americaine">Américaine</option>
                            <option value="sud-americaine">Sud-Américaine</option>
                            <option value="creole">Créole</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="cuisson">Cuisson</label>
                        <select id="cuisson" name="cuisson">
                            <option value="four">Au four</option>
                            <option value="poele">À la poêle</option>
                            <option value="casserole">À la casserole</option>
                            <option value="vapeur">À la vapeur</option>
                            <option value="grill">Au gril</option>
                            <option value="barbecue">Au barbecue</option>
                            <option value="friteuse">À la friteuse</option>
                            <option value="mijoteuse">À la mijoteuse</option>
                            <option value="micro-ondes">Au micro-ondes</option>
                            <option value="sans-cuisson">Sans cuisson</option>
                        </select>
                    </div>
                    <div className="divSelect">
                        <label htmlFor="saisons">Saisons</label>
                        <select id="saisons" name="saisons">
                            <option value="printemps">printemps</option>
                            <option value="été">été</option>
                            <option value="automne">automne</option>
                            <option value="hiver">hiver</option>
                        </select>
                    </div>
                    <div className="divSelect">
                        <label htmlFor="description">Description</label>
                        <textarea name="description"></textarea>
                    </div>

                    <div className="answerButtons">
                        <button type="submit" className="btn btn-suivant">Suivant</button>
                        <div className={`state-${answer.state}`}>
                            <p className={`btn  answer-${answer.color}`}>{answer.msg}</p>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}