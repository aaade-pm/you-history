// src/hooks/useAuth.ts
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/auth/supabase";
import { RootState } from "../../redux/store";
import {
  setUser,
  clearUser,
  setLoading,
} from "../../redux/slices/auth/authSlice";
import toast from "react-hot-toast";
import { useCallback, useEffect } from "react";

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const loading = useSelector((state: RootState) => state.auth.loading);

  // Function to sign in with Spotify
  const SignInWithSpotify = async (): Promise<void> => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "spotify",
        options: {
          redirectTo: "http://localhost:5174/",
        },
      });
      if (error) throw error;
      toast.success("Redirecting to Spotify for authentication...");
    } catch (error) {
      if (error) {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  // Handle sign-out
  const signOut = useCallback(async (): Promise<void> => {
    await supabase.auth.signOut();
    dispatch(clearUser());
    navigate("/");
    toast.success("You have been signed out.");
    console.log("Signed out");
  }, [dispatch, navigate]);

  // Handle token refresh
  const refreshToken = useCallback(async (): Promise<void> => {
    try {
      const { data, error } = await supabase.auth.refreshSession();
      if (error) throw error;
      dispatch(setUser(data.session)); // Update Redux with new tokens
    } catch (error) {
      if (error === "JWT expired") {
        signOut();
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  }, [dispatch, signOut]);

  useEffect(() => {
    const fetchSession = async (): Promise<void> => {
      const { data } = await supabase.auth.getSession();
      if (data?.session) {
        dispatch(setUser(data?.session));
        navigate("/dashboard");
      }
      dispatch(setLoading(false));
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          dispatch(setUser(session));
          navigate("/dashboard");
        } else {
          dispatch(clearUser());
          navigate("/");
        }
      }
    );

    // Set an interval to refresh the token
    const tokenRefreshInterval = setInterval(async () => {
      const session = await supabase.auth.getSession();
      const expiresIn = session.data?.session?.expires_in || 3600; // Default 1 hour
      const expirationTime = session.data?.session?.expires_at;
      const currentTime = Math.floor(Date.now() / 1000);

      if (expirationTime && expirationTime - currentTime < expiresIn / 2) {
        refreshToken();
      }
    }, 1000 * 60 * 30); // Check every 30 minutes

    return () => {
      authListener?.subscription.unsubscribe();
      clearInterval(tokenRefreshInterval);
    };
  }, [dispatch, navigate, refreshToken]);

  return { user, loading, SignInWithSpotify, signOut };
};

export default useAuth;
