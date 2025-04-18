import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Herosection from "./pages/Herosection.jsx";
import Services from "./Components/Services/Services";
import Form from "./Components/Form/Form";
import Login from "./pages/Auth/Login.jsx";
import Signup from "./pages/Auth/Signup.jsx";
import Contact from "./Components/Contact/Contact";
import { useSelector, useDispatch } from "react-redux";
import { userExists, userNotExists } from "./redux/reducers/auth";
import { useEffect } from "react";
import axios from "axios";
// import API from "./Services/API";
// import Dashboard from "./Components/Dashboard/Dashboard";
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard.jsx";
import Doctors from "./Components/Dashboard/Doctors/Doctors.jsx";
import Patients from "./Components/Dashboard/Patients/Patients.jsx";
import Appointments from "./Components/Dashboard/Appointments/BookAppointment.jsx";
import DoctorDashboard from "./Components/DoctorDashboard/DoctorDashboard.jsx";
import ProtectedRoutes from "./Components/Routes/ProtectedRoutes.jsx";
import Userdashboard from "./Components/Dashboard/UserDashboard/Userdashboard.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BookAppointment from "./Components/Dashboard/Appointments/BookAppointment.jsx";
import Chat from "./Components/Chat/Chat.jsx";
import PublicRoutes from "./Components/Routes/PublicRoutes.jsx";

function App() {
  const { user, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER}auth/getUser`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(({ data }) => {
        console.log(data);
        dispatch(userExists(data.user));
      })
      .catch(() => {
        dispatch(userNotExists());
        localStorage.clear();
      });
  }, [dispatch]);
  console.log("user", user);

  return isLoading ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-12 h-12 border-t-4 border-b-4 border-orange-500 rounded-full animate-spin"></div>
    </div>
  ) : (
    <Router>
      <Navbar />
      <Routes>
        <Route element={<PublicRoutes user={user} />}>
          <Route
            path="/"
            element={
              <>
                <Herosection />
                <Footer />
              </>
            }
          />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
        </Route>

        <Route
          path="/Services"
          element={
            <>
              <Services />
              <Footer />
            </>
          }
        />
        <Route
          path="/Contact"
          element={
            <>
              <Contact />
              <Footer />
            </>
          }
        />
        {/* <Route
          path="/appointment"
          element={
            <ProtectedRoutes user={user}>
              <Form />
            </ProtectedRoutes>
          }
        /> */}

        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route element={<ProtectedRoutes user={user} />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/patients" element={<Patients />} />
          <Route
            path="/appointments"
            element={
              <ProtectedRoutes user={user} redirect="/">
                <Appointments />
              </ProtectedRoutes>
            }
          />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/userdashboard" element={<Userdashboard />} />
          <Route path="/bookAppointment" element={<BookAppointment />} />
          <Route path="/chat" element={<Chat />} />
        </Route>
      </Routes>

      <ToastContainer />
    </Router>
  );
}

export default App;
