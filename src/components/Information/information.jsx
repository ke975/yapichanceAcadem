import Computer from "../../assets/computeronline.png"


export function Information(){
    return(
        <div className="container">
            <div className="row">
            <div className="col-md-6 mt-5 p-3">
                <h1 className="mb-3">Acceso Remoto</h1>
                    <p className="mb-5">Con nuestra plataforma de acceso remoto, puedes acceder a tus cursos en cualquier momento y lugar. Además, tenemos una amplia biblioteca de recursos para que puedas seguir aprendiendo sin problemas.</p>
                    <a href="/login" className="btn btn-primary rounded-5 col-md-4">Conoce más</a>
                </div>
                <div className="col-md-6 mt-5">
                <img src={Computer} className="img-fluid" alt="Computer" />
                </div>
               
                </div> 
            
          
        </div>
    )
 
}