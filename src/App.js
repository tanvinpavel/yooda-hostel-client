import { Routes, Route, Navigate } from "react-router-dom";
import Home from './views/Home/Home';
import Header from './views/Header/Header';
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

function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout/>}>
          {/* public route */}
          <Route path="/" element={<Home/>} />
          <Route path="/home" element={<Navigate to="/" />} />

          <Route path="/search" element={<Search/>} />
          <Route path="/distributeMeal" element={<DistributeMeal/>} />
          <Route path="/memo/:id" element={<MonthlyMemo/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />

          {/* private route */}
          <Route element={<PrivateRoute/>}>
            <Route path="/addMeal" element={<AddMeal/>} />
            <Route path="/allMeal" element={<AllMeal/>} />
            <Route path="/update/:id" element={<Update/>} />
            <Route path="/allStudent" element={<AllStudent/>} />
            <Route path="/student/update/:id" element={<StudentUpdate/>} />
            <Route path="/addStudent" element={<AddStudent/>} />
          </Route>
        </Route>
      </Routes>
  );
}

export default App;
