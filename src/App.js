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

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Navigate to="/home"/>}/>
        <Route path="/home" element={<Home/>} />
        <Route path="/addMeal" element={<AddMeal/>} />
        <Route path="/allMeal" element={<AllMeal/>} />
        <Route path="/update/:id" element={<Update/>} />
        <Route path="/addStudent" element={<AddStudent/>} />
        <Route path="/allStudent" element={<AllStudent/>} />
        <Route path="/student/update/:id" element={<StudentUpdate/>} />
        <Route path="/distributeMeal" element={<DistributeMeal/>} />
      </Routes>
    </>
  );
}

export default App;
