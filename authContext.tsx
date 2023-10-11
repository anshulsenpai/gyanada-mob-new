import React, { createContext, useReducer, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define the initial state and action types for the auth context
interface AuthState {
  token: string | null;
  loading: boolean;
}

type AuthAction = { type: "SIGN_IN"; token: string } | { type: "SIGN_OUT" };

const initialState: AuthState = {
  token: null,
  loading: true,
};

export const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

// Reducer function to handle authentication actions
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "SIGN_IN":
      AsyncStorage.setItem("token", action.token);
      return {
        ...state,
        token: action.token,
        loading: false,
      };
    case "SIGN_OUT":
      AsyncStorage.removeItem("token");
      return {
        ...state,
        token: null,
        loading: false,
      };
    default:
      return state;
  }
};

// AuthProvider component to wrap your application with
export const AuthProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the auth context
export const useAuth = () => useContext(AuthContext);
