import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router";
import axios from "axios";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import FlightList from "./components/FlightList";
import FlightSearchForm from "./components/FlightSearchForm";
import BookingForm from "./components/BookingForm";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import UserProfile from "./components/UserProfile";

function App() {
  const [user, setUser] = useState(null);
  const history = useNavigate();

  // Fetch user data on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/users/me");
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  const handleLogin = async (formData) => {
    try {
      const response = await axios.post("/auth/login", formData);
      setUser(response.data.user);
      localStorage.setItem("authToken", response.data.token);
      history.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignup = async (formData) => {
    try {
      const response = await axios.post("/users", formData);
      setUser(response.data);
      localStorage.setItem("authToken", response.data.token);
      history.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("authToken");
    history.push("/");
  };

  const handleFlightSearch = async (formData) => {
    try {
      const response = await axios.get("/flight-search", { params: formData });
      return response.data.flights;
    } catch (error) {
      console.error(error);
    }
  };

  const handleBookingSubmit = async (formData) => {
    try {
      await axios.post("/bookings", formData);
      alert("Booking submitted successfully!");
      history.push("/");
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="App">
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route
          exact
          path="/flight-search"
          element={<FlightSearchForm onFlightSearch={handleFlightSearch} />}
        />
        <Route exact path="/flights" element={<FlightList />}></Route>
        <Route
          exact
          path="/bookings"
          element={<BookingForm onBookingSubmit={handleBookingSubmit} />}
        ></Route>
        <Route
          exact
          path="/login"
          element={<LoginForm onLogin={handleLogin} />}
        ></Route>
        <Route
          exact
          path="/signup"
          element={<SignupForm onSignup={handleSignup} />}
        ></Route>
        <Route
          exact
          path="/users/me"
          element={<UserProfile user={user} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
