import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/auth/setUserSlice";
import { auth, googleAuthProvider } from "../../services/auth/firebase";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { User } from "../../types/User";

const useSignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const SignInWithGoogle = async () => {
    try {
      const res = await auth.signInWithPopup(googleAuthProvider);
      const { user } = res;
      if (user) {
        const derivedUser: User = {
          displayName: user.displayName || "Anonymous",
          email: user.email || "",
        };
        dispatch(setUser(derivedUser));
        navigate("/dashboard");
        toast.success("You have successfully signed in.");
      } else {
        toast.error("User information could not be retrieved.");
      }
    } catch (error) {
      if (error) {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return {
    SignInWithGoogle,
  };
};

export default useSignIn;
