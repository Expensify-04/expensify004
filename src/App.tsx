import {useState} from "react";
import {RouterProvider} from "react-router-dom";
import AppRouter from "./Router/AppRouter";

function App() {
  return (
    <>
      <RouterProvider router={AppRouter} />
    </>
  );
}

export default App;
