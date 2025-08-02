import { Route ,Routes} from 'react-router-dom';
import './App.css';
import Signup from './component/Signup';
import Course from './component/CourseList';
import Login from './component/Login';
import AdminDashboard from './component/AdminDashboard';
import ProfilePage from './component/ProfilePage';
import EditCoursePage from "./component/EditCoursePage";
import AllCourses from './component/AllCourses';
function App() {
  return (
    <div className="App">
     
      <Routes>
      
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} /> 
      <Route path="/course" element={<Course />} /> 
      <Route path="/admin" element={<AdminDashboard/>} />
      <Route path="/profile" element={<ProfilePage/>} />
      <Route path="/all-courses" element={<AllCourses />} />
         </Routes>
    </div>
  );
}

export default App;
