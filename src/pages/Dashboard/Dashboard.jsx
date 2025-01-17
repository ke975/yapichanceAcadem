

import Header from "../../components/Nav";
import Banner from "../../components/Banner";
;
import { Portfolio } from "../../components/Portfolio"

import Footer from "../../components/Footer"
export function Dashboard() {




   

    return (
        <>
            <Header />

            <div>
                <Banner></Banner>
            </div>



            <section>
                <Portfolio />
            </section>



         
         

        

            <footer>
                <Footer />
            </footer>


        </>
    )
}