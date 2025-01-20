import React from "react";
import {
  Typography,
  Box,
} from "@mui/material";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Router from "./Routes";


const App = () => {
  return (
    <>

      <Box display={'flex'} flexDirection={'column'} sx={{
        height: '100vh'
      }}>
        <Header />
        <Router />
        <Footer />
      </Box>

      {/* Footer */}

    </>
  );
};

export default App;
