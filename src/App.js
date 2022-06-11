import { Routes, Route, Navigate } from "react-router-dom";
import Home from './views/Home/Home';
import AddMeal from './views/AddMeal/AddMeal';
import AllMeal from './views/AllMeal/AllMeal';
import Update from './views/Update/Update';
import AddStudent from './views/AddStudent/AddStudent';
import AllStudent from './views/AllStudent/AllStudent';
import StudentUpdate from './views/StudentUpdate/StudentUpdate';
import DistributeMeal from './views/DistributeMeal/DistributeMeal';
import MonthlyMemo from "./views/MonthlyMemo/MonthlyMemo";
import Search from "./views/Search/Search";
import Login from "./views/Login/Login";
import Signup from "./views/Signup/Signup";
import PrivateRoute from "./views/PrivateRoute/PrivateRoute";
import Layout from "./views/Layout/Layout";
import NotAllowed from "./views/Unauthorized/NotAllowed";
import PersistentLogin from "./views/PersistentLogin/PersistentLogin";

function App() {

  const roleList = {
      "Admin": 8274,
      "MealManager": 4397,
      "User": 3986
  } 
  
  return (
      <Routes>
        <Route path="/" element={<Layout/>}>
{/*                       <== PUBLIC Route ==>                                */}
          <Route path="/" element={<Home/>} />
          <Route path="/home" element={<Navigate to="/" />} />

          <Route path="/search" element={<Search/>} />
          <Route path="/distributeMeal" element={<DistributeMeal/>} />
          <Route path="/memo/:id" element={<MonthlyMemo/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/unauthorized" element={<NotAllowed/>} />

{/*                       <== PRIVATE Route ==>                                */}
          <Route element={<PersistentLogin/>}>
            <Route element={<PrivateRoute allowRoles={[roleList.Admin]}/>}>
              <Route path="/allStudent" element={<AllStudent/>} />
              <Route path="/student/update/:id" element={<StudentUpdate/>} />
              <Route path="/addStudent" element={<AddStudent/>} />
            </Route>

            <Route element={<PrivateRoute allowRoles={[roleList.Admin, roleList.MealManager]}/>}>
              <Route path="/addMeal" element={<AddMeal/>} />
              <Route path="/allMeal" element={<AllMeal/>} />
              <Route path="/update/:id" element={<Update/>} />
            </Route>
          </Route>
        </Route>
      </Routes>
  );
}

export default App;
