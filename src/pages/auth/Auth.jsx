import { useState } from "react";
import { SignUpForm } from "../../components/forms/SignUpForm";
import { LogInForm } from "../../components/forms/LogInForm";
import auth_bg_1 from "../../assets/pictures/bg/auth_bg_1.png";
import bg_auth_mobile from "../../assets/pictures/bg/bg_auth_mobile.png";


export function Auth() {

    const [isLogin, setIsLogin] = useState(true);
    return (
        <div className="auth">
            <div className="auth__selectionPage">
                <div className="auth__selectionPage__header">
                    <img src={bg_auth_mobile} alt="bd" />
                    <div><h2 className={`bgDeep-${!isLogin}`} onClick={() => setIsLogin(false)}>Inscription</h2>   <h2 className={`bgDeep-${isLogin}`} onClick={() => setIsLogin(true)}>Connexion</h2></div>
                </div>
                {isLogin ? (<h1>Bon <span className="red">Retour !</span></h1>) : (<h1>Bienvenue !</h1>)}
                {isLogin ? (<LogInForm update={setIsLogin} />) : (<SignUpForm update={setIsLogin} />)}
            </div>
            <div className="authBanner">
                <img src={auth_bg_1} alt="bd" />
            </div>
        </div>
    );
}