import { updateRecipe } from "../../../services/recipes";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export function ImageUpdateForm() {

    const navigate = useNavigate();
    const inputRef = useRef(null);

    const [preview, setPreview] = useState("");
    const [isDragging, setIsDragging] = useState(false);

    const [answer, setAnswer] = useState({
        state: false,
        color: false,
        msg: "Recette créée"
    });

    async function handleSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const recipeId = getRecipeId();

        const res = await updateRecipe(recipeId, formData);

        displayAnswer(res);
    }

    function displayAnswer(res) {
        if (res) {
            setTimeout(() => {
                setAnswer((prevState) => ({
                    ...prevState,
                    state: false,
                    color: true,
                    msg: "Recette modifiée"
                }));
            }, 2000);

            setAnswer((prevState) => ({
                ...prevState,
                state: true,
                color: true,
                msg: "Recette modifiée"
            }));
        } else if (!res) {
            setTimeout(() => {
                setAnswer((prevState) => ({
                    ...prevState,
                    state: false,
                    color: true,
                    msg: "Recette modifiée"
                }));
            }, 2000);

            setAnswer((prevState) => ({
                ...prevState,
                state: true,
                color: false,
                msg: "Impossible de modifier la recette"
            }));
        }
    }

    function getRecipeId() {
        const str = window.location.href;
        const url = new URL(str);

        return url.searchParams.get("recipeId");
    }

    function getUrlParams() {
        const str = window.location.href;
        const url = new URL(str);

        return {
            page: url.searchParams.get("page") || 1,
            category: url.searchParams.get("category") || "",
            tag: url.searchParams.get("tag") || "",
            recipeId: url.searchParams.get("recipeId") || null,
            update: url.searchParams.get("update") || null
        };
    }

    function handleReturn(e) {
        e.preventDefault();

        const params = getUrlParams();

        navigate(
            `/focus?page=${params.page}&recipeId=${params.recipeId}&category=${params.category}&tag=${params.tag}`
        );
    }

    function handleImage(file) {
        if (!file) return;

        /*
         * Place le fichier dans l'input.
         * Ainsi, new FormData(form) fonctionne exactement comme avant.
         */
        const dataTransfer = new DataTransfer();

        dataTransfer.items.add(file);
        inputRef.current.files = dataTransfer.files;

        setPreview(URL.createObjectURL(file));
    }

    function handleInputChange(e) {
        const file = e.target.files?.[0];

        handleImage(file);
    }

    function handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();

        setIsDragging(false);

        const file = e.dataTransfer.files?.[0];

        handleImage(file);
    }

    function handleDragEnter(e) {
        e.preventDefault();
        e.stopPropagation();

        setIsDragging(true);
    }

    function handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();

        setIsDragging(true);
    }

    function handleDragLeave(e) {
        e.preventDefault();
        e.stopPropagation();

        if (!e.currentTarget.contains(e.relatedTarget)) {
            setIsDragging(false);
        }
    }

    function openFileSelector() {
        inputRef.current?.click();
    }

    function handleDropzoneKeyDown(e) {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openFileSelector();
        }
    }

    function removeImage(e) {
        e.preventDefault();
        e.stopPropagation();

        setPreview("");

        if (inputRef.current) {
            inputRef.current.value = "";
        }
    }

    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    return (
        <>

            <div className="formEtapeHeader">

                <h2>
                    Completer les{" "}
                    <span className="red">informations</span> 
                </h2>
            </div>



            <div className="formEtage__header"  onClick={handleReturn}>
                <div
                    className="formEtage__header__previousPage"
                   
                >
                    <i className="fa-solid fa-arrow-left" />
                </div>

                <h2>Revenir à la recette</h2>
            </div>
            <div className="formEtape">
                <div className="formEtape__header">
                    <i className="fa-solid fa-info" />

                    <p>Informations générales</p>
                </div>


                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name</label>

                        <input
                            type="text"
                            name="name"
                            placeholder="Ex: Poulet tikka massala"
                        />
                    </div>

                    <div>
                        <label>Nb de personnes</label>

                        <input
                            type="number"
                            name="servings"
                            placeholder="Ex: 10"
                        />
                    </div>

                    <div>
                        <label>Temps de cuisson (min)</label>

                        <input
                            type="number"
                            name="cook_time"
                            placeholder="Ex: 25"
                        />
                    </div>

                    <div>
                        <label>Temps de préparation (min)</label>

                        <input
                            type="number"
                            name="prep_time"
                            placeholder="Ex: 15"
                        />
                    </div>

                    <div>


                        <input
                            aria-label="image"
                            ref={inputRef}
                            type="file"
                            name="img_url"
                            accept="image/jpeg,image/png,image/webp"
                            hidden
                            onChange={handleInputChange}
                        />

                        <div
                            className={`imageDropzone ${isDragging
                                ? "imageDropzone--active"
                                : ""
                                }`}
                            role="button"
                            tabIndex={0}
                            onClick={openFileSelector}
                            onKeyDown={handleDropzoneKeyDown}
                            onDragEnter={handleDragEnter}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            {preview ? (
                                <div className="imageDropzone__preview">
                                    <img
                                        src={preview}
                                        alt="Aperçu de la nouvelle image"
                                    />

                                    <button
                                        type="button"
                                        className="imageDropzone__remove"
                                        aria-label="Supprimer l’image"
                                        onClick={removeImage}
                                    >
                                        <i className="fa-solid fa-xmark" />
                                    </button>

                                    <div className="imageDropzone__overlay">
                                        Cliquez ou déposez une autre image
                                    </div>
                                </div>
                            ) : (
                                <div className="imageDropzone__empty">
                                    <div className="imageDropzone__icon">
                                        <i className="fa-solid fa-cloud-arrow-up" />
                                    </div>

                                    <p>
                                        Glissez-déposez votre image ici
                                    </p>

                                    <span>
                                        ou cliquez pour parcourir vos
                                        fichiers
                                    </span>

                                    <small>
                                        JPG, PNG ou WEBP
                                    </small>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="answerButtons">
                        <button
                            type="submit"
                            className="btn btn-suivant"
                        >
                            Modifier
                        </button>

                        <div className={`state-${answer.state}`}>
                            <p
                                className={`btn answer-${answer.color}`}
                            >
                                {answer.msg}
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}