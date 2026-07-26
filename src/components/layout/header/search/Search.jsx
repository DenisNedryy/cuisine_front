
import { SearchBar } from "./SearchBar";
import logo from "../../../../assets/pictures/logo/logo.png";
import logo_avatar from "../../../../assets/pictures/logo/logo_avatar.png";
import { NavLink } from "react-router-dom";
import power from "../../../../assets/pictures/icones/power.png";
import { shutDown, getMyId } from "../../../../services/auth";
import { useAuth } from "../../../../contexts/AuthContext";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSocket } from "../../../../hooks/useSocket";
import { Navigation } from "../navigation/Navigation";

export function Search() {

    const { state, dispatch } = useAuth();
    const [myId, setMyId] = useState(null);
    const location = useLocation();
    const { socket } = useSocket();

    useEffect(() => {
        async function init() {
            const res = await getMyId();
            const id = res.data.userId;
            setMyId(id);
        }
        init();
    }, [location, state]);

    async function shutDownAuth(e) {
        e.preventDefault();
        // comme le socket( chat) disparait quand on supprime son cookie d'auth, si on veut qu'il fonctionne il faut le déconnecter manuellement
        socket.disconnect();
        await shutDown();
        dispatch({ type: "LOGOUT" });
    }

    function toggleNavigation() {
        dispatch({
            type: "SET_MOBILE",
            payload: !state.isMobile
        });
    }



    return (
        <div className="search">
            <div className="search__content">

                {state.isMobile ? (
                <div className="search__content__navigation">
                    <div
                        className="searchBar__miniNavigation"
                        onClick={toggleNavigation}
                        aria-label="Ouvrir le menu"
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </div>
                </div>
                ) : (
                <div className="search__content__navigation">
                    <div
                        className="searchBar__miniNavigation"
                        onClick={toggleNavigation}
                        aria-label="Ouvrir le menu"
                    >
                       <i className="fa-solid fa-bars"></i>
                    </div>
                </div>
                )}

                <div className="search__content__left">
                    <div className="search__logo">
                        <img className="logo_principale" src={logo} />
                        <img className="logo_avatar" src={logo_avatar} />
                    </div>
                    <Navigation />
                </div>
                <div className="search__content__right">
                    <SearchBar />
                    <div className="search__auth">
                        {state.isConnected && myId && <NavLink to={`/profil?userId=${myId}`}><button className="btn search__auth--profil">Profil</button></NavLink>}
                        <NavLink to="/auth"><button className="btn search__auth--auth">Auth</button></NavLink>
                        <button className="btn btn-shutDown"> <img src={power} onClick={(e) => shutDownAuth(e)} /></button>
                    </div>
                </div>
            </div>
        </div>
    );
}