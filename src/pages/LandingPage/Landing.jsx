import Banner from "../../components/Banner";
import About from "../../components/About";
import Client from "../../components/Client";
import Call from "../../components/Cta";
import Footer from "../../components/Footer"
import Contact from "../../components/Contact"
import { Navbar } from "../../components/Navbar/Navbar";
import { BannerPhoto } from "../../components/ImagenCurso/ImageCourse"
import { Information } from "../../components/Information/information";
export function Landing() {






    return (
        <>
            <header>

                <Navbar />
            </header>

            <div>
                <Banner></Banner>
            </div>

            <div className="mt-5 mb-5">
                <About></About>


            </div>


            <div>
                <BannerPhoto />
            </div>


            <section >
                <Call />
            </section>




            <div>
                <Information />
            </div>


         

       

        




         

            <footer>
                <Footer />
            </footer>


        </>
    )
}