import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SchoolInfo from './pages/School-Info/SchoolInfo';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import LogInPage from './pages/LogInPage/LogInPage';
import RegisterKids from './pages/RegisterKids/RegisterKids';
import ControlPanel from './pages/ControlPanel/ControlPanel';
import AllStudent from './pages/AllStudents/AllStudents';
import Home from './pages/Home/Home';
import AddStudent from './components/AddStudents/AddStudents';
import AllTeachers from './pages/AllTeachers/AllTeachers';
import AddTeacher from './components/AddTechers/AddTeachers';
import ForgetPasswordPage from './pages/ForgetPasswordPage/ForgetPasswordPage';
import Planning from './components/Planning/Planning';
import GenderStatistics from './components/GenderStatistics/GenderStatistics';
import EditStudent from './components/EditStudent/EditStudent';
import EditTeacher from './components/EditTeacher/EditTeacher';
import IotStudents from './pages/IotStudents/IotStudents';
import MechaStudents from './pages/MechaStudents/MechaStudents';
import SoftStudents from './pages/SoftStudents/SoftStudents';
import PrepaStudents from './pages/PrepaStudents/PrepaStudents';
import RoboticsPage from './pages/RoboticsPage/RoboticsPage';
import ProgrammingPage from './pages/ProgrammingPage/ProgrammingPage';
import AiProgramPage from './pages/AiProgramPage/AiProgramPage';
import BusinessPage from './pages/BusinessPage/BusinessPage';
function App() {
  const isAuthenticated =true;
  return (
    <div className="App">
       <Router>
        <Routes>
          <Route path="/" element={<SchoolInfo/>} />
          <Route path="/robotics" element={<RoboticsPage/>}/>
          <Route path="/programming" element ={<ProgrammingPage/>}/>
          <Route path="/aiprogram" element={<AiProgramPage/>}/>
          <Route path='/business' element={<BusinessPage/>}/>
          <Route path="/registerkids" element={<RegisterKids/>}/>
          <Route path="/signup" element={<SignUpPage/>} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/forget-password" element={<ForgetPasswordPage/>}/>
          {/* Define the base route for Control Panel */}
          <Route path="/controlpannel" element={isAuthenticated ? <ControlPanel/> : <Navigate to="/login" />} >
            {/* Define the nested route for /controlpannel/allstudents */}
            <Route path="home" element={<Home/>} />
            <Route path="allstudents" element={<AllStudent/>} />
            <Route path="prepastudents" element={<PrepaStudents/>} />
            <Route path="softstudents" element={<SoftStudents/>} />
            <Route path="mechastudents" element={<MechaStudents/>} />
            <Route path="iotstudents" element={<IotStudents/>} />
            <Route path="addstudent" element={<AddStudent/>}/>
            <Route path="editstudent/:id"element={<EditStudent/>}/>
            <Route path="allteachers" element={<AllTeachers/>}/>
            <Route path="editteacher/:id" element={<EditTeacher/>}/>
            <Route path="addteacher" element={<AddTeacher/>}/>
            <Route path="planning" element={<Planning/>}/>
            <Route path="statistics" element={<GenderStatistics/>}/>
          </Route>
        </Routes>
      </Router> 

    </div>
  );
}

export default App;
