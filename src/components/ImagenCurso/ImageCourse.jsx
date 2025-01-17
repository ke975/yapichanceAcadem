import foto from "../../assets/Excell.jpg"
import foto1 from "../../assets/marketing.jpg"
import foto2 from "../../assets/Inseminacion.jpg"
import foto3 from "../../assets/FacebookAds.jpg"
import foto4 from "../../assets/Programing.jpg"
import foto5 from "../../assets/Dieno.jpg"
import "../../assets/css/gallery.css"

export function BannerPhoto(){
    return(

        <div className="background">
        <div className="container p-5">
            <div className="row ">
            <div className="col-md-4  mt-2">
                <img src={foto} alt="Foto Inse" className="img-fluid rounded-3 shadow p-3 mb-5 bg-body-tertiary rounded hover-effect"/>
            </div>
            <div className="col-md-4  mt-2">
                <img src={foto1} alt="Foto Inse" className="img-fluid rounded-3 shadow p-3 mb-5 bg-body-tertiary rounded hover-effect"/>
            </div>
            <div className="col-md-4  mt-2">
                <img src={foto2} alt="Foto Inse" className="img-fluid rounded-3 shadow p-3 mb-5 bg-body-tertiary rounded hover-effect"/>
            </div>
            <div className="col-md-4  mt-2">
                <img src={foto3} alt="Foto Inse" className="img-fluid rounded-3 shadow p-3 mb-5 bg-body-tertiary rounded hover-effect"/>
            </div>
            <div className="col-md-4  mt-2">
                <img src={foto4} alt="Foto Inse" className="img-fluid rounded-3 shadow p-3 mb-5 bg-body-tertiary rounded hover-effect"/>
            </div>
            <div className="col-md-4  mt-2">
                <img src={foto5} alt="Foto Inse" className="img-fluid rounded-3 shadow p-3 mb-5 bg-body-tertiary rounded hover-effect"/>
            </div>
            </div>


        </div>
        </div>
    )
 
}