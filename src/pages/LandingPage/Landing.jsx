

import Header from "../../components/Nav";
import Banner from "../../components/Banner";
import About from "../../components/About";
import Client from "../../components/Client";
import Services from "../../components/Services";
import Call from "../../components/Cta";

import Team from "../../components/Team"
import Footer from "../../components/Footer"
import Contact from "../../components/Contact"
import { Navbar } from "../../components/Navbar/Navbar";
export function Landing() {




   

    return (
        <>
<header>

    <Navbar/>
</header>
            <div>
                <Banner></Banner>
            </div>

            <div>
                <Client />
            </div>

            <div className="mt-5 mb-5">
                <About></About>


            </div>

            <section className="mt*5">
                <Services />
            </section>



            <section className="mt-5">
                <Call />
            </section>

          


            <section className="mt-5 mb-3">

                <Team />
            </section>

            <section className="mt-5 mb-5">
                <Contact />
            </section>

            <footer>
                <Footer />
            </footer>


        </>
    )
}