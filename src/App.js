import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import { onAuthStateChanged } from "firebase/auth";
import auth from "./firebase/firebase.config";
import { useDispatch } from "react-redux";
import { getUser } from "./features/auth/authSlice";

function App() {
  const dispatch = useDispatch();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(getUser(user));
    }
  })
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
