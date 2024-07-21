import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

//pages
import { GetRecipeForm, Home, Login, Register } from "./pages";

//layouts
import RootLayout from "./layout/RootLayout.jsx";
import ErrorPage from "./pages/ErrorPage";

//actions
import { action as RegisterAction } from "./pages/Register";
import { action as LoginAction } from "./pages/Login";
import { action as AddRecipeAction } from "./pages/GetRetcipeForm.jsx";

// componet
import Protect from "./components/Protect";

//context
import { useGlobalContext } from "./hooks/useGlobalContext.js";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import Cart from "./pages/Cart";
import ToDoList from "./pages/RecipeList.jsx";

function App() {
  const { user, dispatch, isAuthReady } = useGlobalContext();
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <Protect user={user}>
          <RootLayout />
        </Protect>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/todos",
          element: <ToDoList />,
        },
        {
          path: "/add-recipe",
          element: <GetRecipeForm />,
          action: AddRecipeAction,
        },
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
      action: LoginAction,
    },
    {
      path: "/register",
      element: user ? <Navigate to="/" /> : <Register />,
      action: RegisterAction,
    },
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch({ type: "LOG_IN", payload: user });
      dispatch({ type: "IS_AUTH_READY" });
    });
  }, []);

  return <>{isAuthReady && <RouterProvider router={routes} />}</>;
}

export default App;
