import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./ui/AppLayout.jsx";
import Home from "./ui/Home.jsx";
import Register from "./pages/Register.jsx";
import DoctorRegisterForm from "./features/Authentication/DoctorRegisterForm.jsx";
import Login from "./pages/Login.jsx";
import DoctorClinicInfo from "./pages/DoctorClinicInfo.jsx";
import DoctorUploadFilesForm from "./features/Authentication/DoctorUploadFilesForm.jsx";
import DoctorRegisterWizard from "./features/Authentication/DoctorRegisterWizard.jsx";
import PatientRegisterForm from "./features/Authentication/PatientRegisterForm.jsx";
import PatientRegisterFormWizard from "./features/Authentication/PatientRegisterFormWizard.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import DrInfo from "./features/Appointments/DrInfo.jsx";
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import AllDoctors from "./pages/AllDoctors.jsx";
import PatientDashboard from "./pages/PatientDashboard.jsx";
import { Toaster } from "react-hot-toast";
import DoctorCard from "./ui/DoctorCard.jsx";
import Appointm

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/doctors",
        element: <AllDoctors />,
      },
      {
        path: "/contactus",
        element: <ContactUs />,
      },
    ],
  },
  {
    path: "/patient/dashboard",
    element: <PatientDashboard />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/register/doctors",
    element: <DoctorRegisterWizard />,
  },

  {
    path: "/register/patients",
    element: <PatientRegisterFormWizard />,
  },
  {
    path: "/patient/dashboard",
    element: <PatientDashboard />,
  },
  {
    path: "/doctor/info",
    element: <DrInfo />,
  },
]);

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {" "}
        <RouterProvider router={router} />
      </QueryClientProvider>
      <Toaster position="top-center" />
    </>
  );
}

export default App;
