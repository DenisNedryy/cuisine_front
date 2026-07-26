import { useAuth } from "../../contexts/AuthContext";
import { NavLink } from "react-router-dom";
import { recipesMenuData } from "../../data/menus";

export function MobileNavigation() {

  const { state, dispatch } = useAuth();


  function leaveNav(e) {
    setTimeout(() => {
      dispatch({ type: "SET_MOBILE", payload: false });
    }, 100);

  }

  return (
    <div className="MobileNavigation">
      <div className="MobileNavigation__header"><i className="fa-solid fa-xmark" onClick={(e) => leaveNav(e)}></i></div>
      <div className="MobileNavigation__body">
        <NavLink to="/" className={({ isActive }) => isActive ? "mobileMenuActive" : ""} onClick={(e) => leaveNav(e)}>
          <p>Accueil</p>
        </NavLink>
        <NavLink to="/recipes" className={({ isActive }) => isActive ? "mobileMenuActive" : ""} onClick={(e) => leaveNav(e)}>
          <p>Recettes</p>
        </NavLink>
        <NavLink to="/favorites" className={({ isActive }) => isActive ? "mobileMenuActive" : ""} onClick={(e) => leaveNav(e)}>
          <p>Favoris</p>
        </NavLink>
        <NavLink to="/populars" className={({ isActive }) => isActive ? "mobileMenuActive" : ""} onClick={(e) => leaveNav(e)}>
          <p>Populaires</p>
        </NavLink>
        {state.isConnected && <NavLink to="/create?form-create-etape=1" className={({ isActive }) => isActive ? "mobileMenuActive" : ""} onClick={(e) => leaveNav(e)}>
          <p>Create</p>
        </NavLink>}
      </div>
    </div>
  );

}