import city from "../../assets/pictures/video/city.mp4";
import sushi from "../../assets/pictures/bg/aaaa.png";

export function Banner() {
    return (
        <section className="home__banner">
            <div className="home__banner__annonce">
                <h1>Marre de commander des sushis ?</h1>
                <p>
                    Passez derrière les fourneaux et réalisez-les comme un chef
                    ... Après avoir ajouté la recette.
                </p>
            </div>
            {/* <video
                src={city}
                autoPlay
                muted
                loop
                playsInline
                className="home__banner__bg"
            /> */}<img src={sushi} className="home__banner__bg" alt="femme mangeant sushi"/>


        </section>
    );
}