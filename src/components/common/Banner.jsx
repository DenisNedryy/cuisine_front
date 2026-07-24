import city from "../../assets/pictures/video/cook1.mp4";

export function Banner() {
    return (
        <section className="home__banner">
            <div className="home__banner__annonce">
                <h1>Envie d’un plat gourmand ?</h1>
                <p>
                    En quête d’inspiration pour régaler tout le monde ce mois-ci ?
                </p>
            </div>
            <video
                src={city}
                autoPlay
                muted
                loop
                playsInline
                className="home__banner__bg"
            />


        </section>
    );
}