import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRecipe } from "../../../services/recipes";

export function FormEtape4() {
    const navigate = useNavigate();
    const inputRef = useRef(null);

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");
    const [isDragging, setIsDragging] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [answer, setAnswer] = useState({
        state: false,
        color: false,
        msg: ""
    });

    function displayAnswer(success, message) {
        setAnswer({
            state: true,
            color: success,
            msg: message
        });

        if (success) {
            setTimeout(() => {
                localStorage.removeItem(
                    "cuisine-form-create-etape"
                );

                navigate("/");
            }, 2000);

            return;
        }

        setTimeout(() => {
            setAnswer((previousState) => ({
                ...previousState,
                state: false
            }));
        }, 2500);
    }

    function handleImage(file) {
        setAnswer((previousState) => ({
            ...previousState,
            state: false
        }));

        if (!file) {
            return;
        }

        const acceptedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp"
        ];

        if (!acceptedTypes.includes(file.type)) {
            setImage(null);
            setPreview("");

            displayAnswer(
                false,
                "Formats acceptés : JPG, PNG et WEBP."
            );

            if (inputRef.current) {
                inputRef.current.value = "";
            }

            return;
        }

        const maxSize = 5 * 1024 * 1024;

        if (file.size > maxSize) {
            setImage(null);
            setPreview("");

            displayAnswer(
                false,
                "L’image ne doit pas dépasser 5 Mo."
            );

            if (inputRef.current) {
                inputRef.current.value = "";
            }

            return;
        }

        setImage(file);
    }

    function handleDrop(event) {
        event.preventDefault();
        event.stopPropagation();

        setIsDragging(false);

        const file = event.dataTransfer.files?.[0];

        handleImage(file);
    }

    function handleDragEnter(event) {
        event.preventDefault();
        event.stopPropagation();

        setIsDragging(true);
    }

    function handleDragOver(event) {
        event.preventDefault();
        event.stopPropagation();

        setIsDragging(true);
    }

    function handleDragLeave(event) {
        event.preventDefault();
        event.stopPropagation();

        /*
         * Évite de désactiver l’état actif lorsque le curseur
         * passe simplement sur un enfant de la zone.
         */
        if (!event.currentTarget.contains(event.relatedTarget)) {
            setIsDragging(false);
        }
    }

    function removeImage(event) {
        event.preventDefault();
        event.stopPropagation();

        setImage(null);
        setPreview("");

        setAnswer((previousState) => ({
            ...previousState,
            state: false
        }));

        if (inputRef.current) {
            inputRef.current.value = "";
        }
    }

    useEffect(() => {
        if (!image) {
            setPreview("");
            return;
        }

        const imageUrl = URL.createObjectURL(image);

        setPreview(imageUrl);

        return () => {
            URL.revokeObjectURL(imageUrl);
        };
    }, [image]);

async function handleSubmit(event) {
    event.preventDefault();

    if (!image) {
        displayAnswer(false, "Image manquante.");
        return;
    }

    const storedData = localStorage.getItem(
        "cuisine-form-create-etape"
    );

    console.log("Données localStorage :", storedData);

    if (!storedData) {
        displayAnswer(
            false,
            "Les informations des étapes précédentes sont manquantes."
        );

        return;
    }

    let previousData;

    try {
        previousData = JSON.parse(storedData);
    } catch (error) {
        console.error(
            "Erreur de lecture du localStorage :",
            error
        );

        displayAnswer(
            false,
            "Les informations de la recette sont invalides."
        );

        return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    /*
     * On remplace l’image récupérée par le formulaire par celle
     * stockée dans le state. Cela fonctionne aussi en drag and drop.
     */
    formData.delete("img_url");
    formData.append("img_url", image);

    Object.entries(previousData).forEach(([key, value]) => {
        if (value === null || value === undefined) {
            return;
        }

        if (
            typeof value === "string" ||
            typeof value === "number" ||
            typeof value === "boolean"
        ) {
            formData.append(key, String(value));
        } else {
            formData.append(key, JSON.stringify(value));
        }
    });

    /*
     * Permet de vérifier les données réellement envoyées.
     */
    for (const [key, value] of formData.entries()) {
        console.log(key, value);
    }

    try {
        setIsSubmitting(true);

        setAnswer((previousState) => ({
            ...previousState,
            state: false
        }));

        const response = await createRecipe(formData);

        console.log("Réponse createRecipe :", response);

        if (!response) {
            displayAnswer(
                false,
                "Impossible de créer la recette."
            );

            return;
        }

        displayAnswer(
            true,
            "Recette créée."
        );
    } catch (error) {
        console.error(
            "Erreur lors de la création de la recette :",
            error
        );

        const errorMessage =
            error.response?.data?.message ||
            error.response?.data?.error ||
            "Impossible de créer la recette.";

        displayAnswer(false, errorMessage);
    } finally {
        setIsSubmitting(false);
    }
}

    function openFileSelector() {
        if (isSubmitting) {
            return;
        }

        inputRef.current?.click();
    }

    function handleDropzoneKeyDown(event) {
        if (
            event.key === "Enter" ||
            event.key === " "
        ) {
            event.preventDefault();
            openFileSelector();
        }
    }

    return (
        <>
            <div className="formEtapeHeader">
                <p>
                    Étape <span className="red">4</span> sur{" "}
                    <span className="red">4</span>
                </p>

                <h2>
                    Ajouter une{" "}
                    <span className="red">image</span>
                </h2>
            </div>

            <div className="formEtape">
                <div className="formEtape__header">
                    <i className="fa-regular fa-image" />

                    <div>
                        <p>Photo de la recette</p>

                        <span>
                            Ajoutez une photo nette et appétissante
                            pour illustrer votre recette.
                        </span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="form4">
                    <input
                        ref={inputRef}
                        type="file"
                        name="img_url"
                        accept="image/jpeg,image/png,image/webp"
                        hidden
                        disabled={isSubmitting}
                        onChange={(event) => {
                            handleImage(
                                event.target.files?.[0]
                            );
                        }}
                    />

                    <div className="imageDropzoneWrapper">
                        <div
                            className={`imageDropzone ${
                                isDragging
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
                                        alt="Aperçu de la recette"
                                    />

                                    <button
                                        type="button"
                                        className="imageDropzone__remove"
                                        aria-label="Supprimer l’image"
                                        disabled={isSubmitting}
                                        onClick={removeImage}
                                    >
                                        <i className="fa-solid fa-xmark" />
                                    </button>

                                    <div className="imageDropzone__overlay">
                                        Cliquez ou déposez une autre
                                        image
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
                                        ou cliquez dans cette zone pour
                                        parcourir vos fichiers
                                    </span>

                                    <small>
                                        JPG, PNG ou WEBP — 5 Mo maximum
                                    </small>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="answerButtons">
                        <button
                            type="submit"
                            className="btn btn-suivant"
                            disabled={isSubmitting}
                        >
                            {isSubmitting
                                ? "Publication..."
                                : "Publier la recette"}
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