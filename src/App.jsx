// src/App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Auth/Login";
import { Dashboard } from "./pages/Dashboard/Dashboard.jsx";
import  {CourseDetails}  from "./pages/sectionCourse/sectionCourses.jsx";
import { CourseVideos } from "./pages/CourseVideos/CourseVideos.jsx";
import { AuthProvider } from "./Context/AuthContext.jsx"; // Importar el AuthProvider
import {Landing} from "./pages/LandingPage/Landing.jsx"
import { UploadTask } from "./pages/uploadTask/uploadTask.jsx";
import { CreateCourse } from "./pages/CreateCourse/CreateCourse.jsx";
import { CreateSectionCourse } from "./pages/CreateSectionCourse/CreateSectionCourse.jsx";
import { CreateTaskForCourse } from "./pages/CreateTaskForCourse/CreateTaskForCourse";
import { CreateVideoForCourse  } from "./pages/CreateVideoForCourse/CreateVideoForCourse.jsx";
import { TaskCheck } from "./pages/TaskListTeacher/TaskListTeacher.jsx";
import PrivateRoute from "./components/PrivateRoutes/PrivateRoute.jsx"; // Importar el componente PrivateRoute

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login"  element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
          <Route path="/curso/:id" element={<PrivateRoute element={<CourseDetails />} />} />
          <Route path="/curso/:id/videos/:sectionId" element={<PrivateRoute element={<CourseVideos />} />} />
          <Route path="/UploadTask" element={<PrivateRoute element={<UploadTask />} />} />
          <Route path="/CreateCourse" element={<PrivateRoute element={<CreateCourse />} />} />
          <Route path="/CreateSectionCourse" element={<PrivateRoute element={<CreateSectionCourse />} />} />
          <Route path="/CreateTaskForCourse" element={<PrivateRoute element={<CreateTaskForCourse />} />} />
          <Route path="/CreateVideoForCourse" element={<PrivateRoute element={<CreateVideoForCourse />} />} />
          <Route path="/TaskCheck" element={<PrivateRoute element={<TaskCheck />} />} />
          </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
