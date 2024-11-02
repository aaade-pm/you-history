import { useDispatch } from "react-redux";
import { auth } from "../../services/auth/firebase";
import toast from "react-hot-toast";
import { clearUser } from "../../redux/slices/auth/setUserSlice";

const UseSignOut = () => {
  const dispatch = useDispatch();

  const SignOutWithGoogle = async () => {
    try {
      await auth.signOut();
      dispatch(clearUser());
      toast.success("You have successfully signed out.");
    } catch (error) {
      if (error) {
        toast.error("An error occurred. Please try again.");
      }
    }
  };
  return {
    SignOutWithGoogle,
  };
};

export default UseSignOut;
