import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import "./index.css";
import Estates from "./pages/estate/Estates";
import EstateActivities from "./pages/estateActivity/EstateActivities";
import Pets from "./pages/pet/Pets";
import PetActivities from "./pages/petActivity/PetActivities";
import Vehicles from "./pages/vehicle/Vehicles";
import VehicleActivities from "./pages/vehicleActivity/VehicleActivities";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "vehicles",
    element: <Vehicles />,
  },
  {
    path: "vehicle-activities",
    element: <VehicleActivities />,
  },
  {
    path: "estates",
    element: <Estates />,
  },
  {
    path: "estate-activities",
    element: <EstateActivities />,
  },
  {
    path: "pets",
    element: <Pets />,
  },
  {
    path: "pet-activities",
    element: <PetActivities />,
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);
