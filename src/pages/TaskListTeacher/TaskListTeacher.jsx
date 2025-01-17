
import Footer from "../../components/Footer";
import {Navbar} from '../../components/MenuUsers/Menu'
import {TaskListpage } from '../../components/showtask/showTask'

export function TaskCheck(){
    return(
        <>

        <header>

              <Navbar/>
            
        </header>


<div>
   <TaskListpage /> 
</div>

        <footer>
            <Footer/>
        </footer>
        </>
    )
}