import { useAuth } from "../../contexts/AuthContext";
import { NavLink } from "react-router-dom";
import { menuNavigationMobile } from "../../data/MenuMobile";
import { MenuDeroulantMobile } from "../common/MenuDeroulantMobile";
import power from "../../assets/pictures/icones/power.png";
import { getMyId, shutDown } from "../../services/auth";
import { useState, useEffect } from "react";
import { useSocket } from "../../hooks/useSocket";
import { useNavigate } from "react-router-dom";

export function MobileNavigation() {

  const { state, dispatch } = useAuth();
  const [myId, setMyId] = useState(null);
  const { socket } = useSocket();
  const navigate = useNavigate();

  function leaveNav() {
    setTimeout(() => {
      dispatch({ type: "SET_MOBILE", payload: false });
    }, 100);
  }

  async function shutDownAuth(e) {
    e.preventDefault();
    // comme le socket( chat) disparait quand on supprime son cookie d'auth, si on veut qu'il fonctionne il faut le déconnecter manuellement
    socket.disconnect();
    await shutDown();
    dispatch({ type: "LOGOUT" });
  }

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
    navigate(`/`);
  }

  return (
    <div className="MobileNavigation">
      <div className="MobileNavigation__body">

        <MenuDeroulantMobile data={menuNavigationMobile} onUpdateLeave={leaveNav} />
        <div className="search__auth">
          {state.isConnected && myId && <NavLink to={`/profil?userId=${myId}`}><button className="btn search__auth--profil" onClick={leaveNav}>Profil</button></NavLink>}
          <NavLink to="/auth"><button onClick={leaveNav} className="btn search__auth--auth">Auth</button></NavLink>
          <button className="btn btn-shutDown" onClick={leaveNav}> <img src={power} onClick={(e) => shutDownAuth(e)} /></button>
        </div>
      </div>
    </div>
  );

}