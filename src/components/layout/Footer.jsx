import logo from "/src/assets/pictures/logo/logo.png";


export function Footer() {

    return (
        <>
            <footer>
                <div className="footer__container">
                    {/* <div className="footer__logo">
                        <img src={logo} alt="logo" />
                        <p>Cuisine plus, une solution de rappel</p>
                    </div> */}
                    <div className="footer__content">
                        <div className="footer__block">
                            <p>De Societate Cuisine</p>
                            <p>Societas Cuisine est locus ubi ars culinaria et innovatio conveniunt. Condita anno MMXXV, haec societas specialiter versatur in praeparatione et distributione ciborum exquisitorum, quibus sapor et qualitas summo honore habentur.</p>
                        </div>
                        <div className="footer__block">
                            <p>De Missionem nostram</p>
                            <p>Missionem nostram constituimus ut omnibus clientibus nostris cibaria sana, delectabilia et sustinenda praebeamus. Chef nostri periti, una cum technicis gastronomicis, novas recetas creant quae traditionem et modernitatem iungunt.</p>
                        </div>
                        <div className="footer__block">
                            <p>De Praeterea</p>
                            <p>Praeterea, Cuisine non solum de cibis optimis curat, sed etiam de impactu ambientali. Itaque, ut planetae nostrae consulamus, ingredientes locales et organicos praeferimus, et processus nostros ad minimum vestigium oecologicum redigimus.</p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}