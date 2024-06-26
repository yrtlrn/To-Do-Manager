import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import WorkingPage from "./pages/WorkingPage.tsx";
import { AppProvider } from "./context/context.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<App />} />
      <Route path="/working" element={<WorkingPage />} />
    </Route>
  )
);

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <AppProvider>
    <RouterProvider router={router} />
  </AppProvider>
);
