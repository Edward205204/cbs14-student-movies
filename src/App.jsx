import "./App.css";
import { router } from "./routes.js";
import { RouterProvider } from "react-router";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
