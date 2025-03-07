import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import {Footer} from "../../components/Footer/Footer";


export const Home = () =>  {
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
                <p>Ez az alkalmazás egy modern, felhasználóbarát teendőmenedzsment rendszer, amely napi, heti, havi és éves bontásban követi nyomon a felhasználók feladatainak teljesítését.</p>
                <Link to="/registration" className="cta">Regisztrálok</Link>
            </section>

            <div className="content">
                <section className="features" id="features_link">
                    <h2>Fedezd fel a funkcióinkat</h2>
                    <p>Fő funkcióink, amik sokat segíthetnek neked</p>

                    <div className="feature-cards">

                        <div className="feature-card">
                            <div className="icon">⏳</div>
                            <h3><span>#1</span> Teendők megtervezése</h3>
                            <p>A program az elfoglaltságok időbeosztása, az alvási idő és a rutinok figyelembevételével kiszámítja a felhasználó szabadidejét. Ezt követően a felhasználó megtervezheti, hogy milyen tevékenységekre szeretné fordítani a szabadidejét, például edzésre vagy tanulásra.</p>
                        </div>

                        <div className="feature-card">
                            <div className="icon">👥</div>
                            <h3><span>#2</span> Játékos felhasználói rendszer</h3>
                            <p>A program szintlépési rendszert kínál, ahol a felhasználók XP-t gyűjthetnek a napi teendőik teljesítésével. Ezzel biztosítva egyfajta motivációt.</p>
                        </div>

                        <div className="feature-card">
                            <div className="icon">📊</div>
                            <h3><span>#3</span> Statisztikai adatok</h3>
                            <p>A program lehetőséget biztosít a felhasználóknak, hogy nyomon kövessék fejlődésüket, beleértve a céljaik, szokásaik és napi teendőik alakulását. Vizualizálja az XP-k és szintek gyarapodását, valamint elemzi az időbeosztást és a kihívások teljesítését. Az átlátható jelentések segítenek a felhasználóknak mérni eredményeiket és motiválják őket a további fejlődésre.</p>
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
                                <li><p><i className="check">✔</i> Napi teendők beállítása.</p></li>
                                <li><p><i className="check">✔</i> Sötét és világos témák.</p></li>
                                <li><p><i className="cross">✖</i> Profilkép feltöltése.</p></li>
                                <li><p><i className="cross">✖</i> Részletes statisztikai adatok.</p></li>
                            </ul>
                        </div>

                        <div className="package-card premium">
                            <h3>Prémium</h3>
                            <p className="price">500 Ft /hónap</p>
                            <p className="discount"><span className="strike">6000 Ft/év</span> ➔ <span className="highlight">4200 Ft/év</span></p>
                            <ul>
                                <li><p><i className="check">✔</i> Napi teendők beállítása.</p></li>
                                <li><p><i className="check">✔</i> Sötét és világos témák.</p></li>
                                <li><p><i className="check">✔</i> Profilkép feltöltése.</p></li>
                                <li><p><i className="check">✔</i> Részletes statisztikai adatok.</p></li>
                            </ul>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>

        </div>
    );
}
