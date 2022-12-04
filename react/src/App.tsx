import { Routes, Route } from "react-router-dom"
import { TeacherDashBoard } from './page/TeacherDashBoard';
import { Teacher } from './HOC/Teacher';
import { StudentDashBoard } from './page/StudentDashBoard';
import { Login } from './page/Login';
import { Student } from './HOC/Student';
import { Registration } from "./page/Registration";


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path='/teacher' element={<Teacher />}>
          <Route path='' element={<TeacherDashBoard />} />
        </Route>
        <Route path='/student' element={<Student />}>
          <Route path='' element={<StudentDashBoard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
