import * as React from "react";
import logo from "./logo.svg";
//import "./App.css";
import { useMediaQuery, ThemeProvider, CssBaseline, ThemeOptions, AppBar, Toolbar, Link, MenuItem, Menu, Container } from "@mui/material";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import { createTheme } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Services from "./pages/Services";
import Appointments from "./pages/Appointments";
import Pets from "./pages/Pets";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import BookAppointment from './pages/BookAppointment';
import Page404 from './pages/Page404';
import FullService from "./components/FullService";
import AppointmentReschedule from "./components/AppointmentReschedule";
import AppointmentCancel from "./components/AppointmentCancel";
import PetInfo from "./pages/PetInfo";
import PetRecord from "./pages/PetRecordPage";
import PetsNew from "./pages/CreatePet";
import UpdatePet from "./pages/UpdatePet";
import AppointmentXstate from "./pages/AppointmentXstate";

const themeOptions: ThemeOptions = {
  palette: {
    background: {
      default: '#fff',
    },
    primary: {
      main: 'rgba(63,150,181,0.55)',
      light: 'rgba(125,184,208,0.71)',
      dark: 'rgba(44,120,126,0.64)',
    },
    secondary: {
      main: '#f50057',
    },
  },
};
const theme = createTheme(themeOptions);
function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Container sx={{height:"75%"}}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/appointment/xstate" element={<AppointmentXstate />}></Route>
          <Route path="/services" element={<Services />}></Route>
          <Route path="/services/:service_code" element={<FullService />}></Route>
          <Route path="/appointments" element={<Appointments />}></Route>
          <Route path="/appointments/book" element={<AppointmentXstate />}></Route>
          <Route path="/appointments/:appointmentId/reschedule" element={<AppointmentReschedule />}></Route>
          <Route path="/appointments/:appointmentId/cancel" element={<AppointmentCancel />}></Route>
          <Route path="/pets" element={<Pets />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/pets/:petId" element={<PetInfo />}></Route>
          <Route path="/pets/:petId/update" element={<UpdatePet />}></Route>
          <Route path="/pets/:petId/record" element={<PetRecord />}></Route>
          <Route path="/pets/new" element={<PetsNew />}></Route>
          <Route path="*" element={<Page404 />}> </Route>
        </Routes> 
      </Container>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
