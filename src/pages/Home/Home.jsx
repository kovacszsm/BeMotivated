import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import Footer from "../../components/Footer/Footer";


function Home() {
    return (
        <div className="home-page">
            <header>
                <div className="logo">
                    <h1>BeMotivated</h1>
                </div>
                <nav>
                    <a href="#features_link">Funkciók</a>
                    <a href="#packages_link">Csomagok</a>
                    <Link to="/login" className="login-btn">Belépés</Link>
                    <Link to="/registration" className="register-btn">Regisztráció</Link>
                </nav>
            </header>

            <section className="hero">
                <h2>Segítünk az időbeosztásod optimalizálásában és a személyes céljaid elérésében.</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non suscipit ex. Ut mattis ligula sit amet metus tempor imperdiet.</p>
                <Link to="/registration" className="cta">Regisztrálok</Link>
            </section>

            <div className="content">
                <section className="features" id="features_link">
                    <h2>Fedezd fel a funkcióinkat</h2>
                    <p>Fő funkcióink, amik sokat segíthetnek neked</p>

                    <div className="feature-cards">
                        <div className="feature-card">
                            <div className="icon">🌙</div>
                            <h3><span>#1</span> Alvási idő és rutinok tervezése</h3>
                            <p>A program lehetőséget ad a felhasználónak, hogy megadja a foglalkozását és annak napi időbeosztását, az alváshoz szükséges óraszámot, valamint a reggeli és esti rutinjához szükséges időt. Ezek alapján kiszámítja, hogy mikor kell elkezdenie az esti rutint, hogy az alvási igény teljesüljön, és elegendő idő maradjon a reggeli rutinhoz a foglalkozás előtt.</p>
                        </div>

                        <div className="feature-card">
                            <div className="icon">⏳</div>
                            <h3><span>#2</span> Szabadidő kiszámítása és beosztása</h3>
                            <p>A program az elfoglaltságok időbeosztása, az alvási idő és a rutinok figyelembevételével kiszámítja a felhasználó szabadidejét. Ezt követően a felhasználó megtervezheti, hogy milyen tevékenységekre szeretné fordítani a szabadidejét, például edzésre vagy tanulásra.</p>
                        </div>

                        <div className="feature-card">
                            <div className="icon">🎯</div>
                            <h3><span>#3</span> Célok és függőségek nyomon követése</h3>
                            <p>A funkció hasznos azok számára, akik szeretnének leszokni káros szokásokról, például a dohányzásról, vagy fenntartani egyéb motivációkat, mint az edzés. A felhasználó beállíthatja például a napi maximális cigarettaszámot, amelyet el szeretne érni. Minden egyes cigaretta után rögzítheti a fogyasztást, így nyomon követheti és motiválhatja magát arra, hogy ne lépje túl a kitűzött határt.</p>
                        </div>

                        <div className="feature-card">
                            <div className="icon">👥</div>
                            <h3><span>#4</span> Játékos felhasználói rendszer</h3>
                            <p>A program szintlépési rendszert kínál, ahol a felhasználók XP-t gyűjthetnek a napi teendőik teljesítésével. Emellett egy “streak” funkció is elérhető, amely nyomon követi, hány egymást követő napon teljesítik a céljaikat, ezzel további motivációt biztosítva.</p>
                        </div>

                        <div className="feature-card">
                            <div className="icon">🎉</div>
                            <h3><span>#5</span> Kihívások és fejlődési lehetőségek</h3>
                            <p>A program napi, heti és havi kihívásokat kínál a felhasználóknak, amelyek ösztönzik a fejlődést és új dolgok kipróbálását. A kihívások teljesítéséért a felhasználók XP-t kapnak, így további motivációt nyújtanak a céljaik eléréséhez.</p>
                        </div>

                        <div className="feature-card">
                            <div className="icon">📊</div>
                            <h3><span>#6</span> Haladás elemzése és jelentések</h3>
                            <p>A program lehetőséget biztosít a felhasználóknak, hogy nyomon kövessék fejlődésüket, beleértve a céljaik, szokásaik és napi teendőik alakulását. Vizualizálja a streak-eket, az XP-k és szintek gyarapodását, valamint elemzi az időbeosztást és a kihívások teljesítését. Az átlátható jelentések segítenek a felhasználóknak mérni eredményeiket és motiválják őket a további fejlődésre.</p>
                        </div>
                    </div>
                </section>

                <section className="packages" id="packages_link">
                    <h2>Fedezd fel a csomagjainkat</h2>
                    <p>Válaszd ki a céljaidnak megfelelő csomagot</p>

                    <div className="package-cards">
                        <div className="package-card starter">
                            <h3>Kezdő</h3>
                            <p className="price">0 Ft</p>
                            <p className="subtitle">Örökké ingyenes</p>
                            <ul>
                                <li><p><i className="check">✔</i> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></li>
                                <li><p><i className="check">✔</i> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></li>
                                <li><p><i className="cross">✖</i> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></li>
                                <li><p><i className="cross">✖</i> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></li>
                            </ul>
                        </div>

                        <div className="package-card premium">
                            <h3>Prémium</h3>
                            <p className="price">500 Ft /hónap</p>
                            <p className="discount"><span className="strike">6000 Ft/év</span> ➔ <span className="highlight">4200 Ft/év</span></p>
                            <ul>
                                <li><p><i className="check">✔</i> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></li>
                                <li><p><i className="check">✔</i> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></li>
                                <li><p><i className="check">✔</i> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></li>
                                <li><p><i className="check">✔</i> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></li>
                            </ul>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>

        </div>
    );
}

export default Home;
