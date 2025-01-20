import { configureStore } from "@reduxjs/toolkit";
import authSlice from './slicess/authSlice'

const loadState = () => {
    try {
      const serializedState = localStorage.getItem("authState");
      if (serializedState === null) return undefined;
      return JSON.parse(serializedState);
    } catch (err) {
      console.error("Could not load state from local storage", err);
      return undefined;
    }
  };

export const store = configureStore({
    reducer: {
        auth: authSlice,
    },
    preloadedState: loadState(),
})

store.subscribe(() => {
    try {
      const serializedState = JSON.stringify(store.getState());
      localStorage.setItem("authState", serializedState);
    } catch (err) {
      console.error("Could not save state to local storage", err);
    }
  });