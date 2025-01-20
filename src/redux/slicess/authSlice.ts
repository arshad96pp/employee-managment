import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<{ token: string }>) {
      const { token } = action.payload;

      // Debugging: Verify if payload is received correctly
      console.log("setToken payload:", action.payload);

      state.token = token;

      // User is logged in if a token exists
      state.isLoggedIn = !!token;

      // Store values in local storage
      localStorage.setItem("token", token);
      localStorage.setItem("isLoggedIn", state.isLoggedIn.toString());
    },

    logout(state) {
      state.isLoggedIn = false;
      state.token = null;

      // Remove all stored data from local storage
      localStorage.removeItem("token");
      localStorage.removeItem("isLoggedIn");

      // Redirect to home
      window.location.replace("/");
    },
  },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;
