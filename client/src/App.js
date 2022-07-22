import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import styled from 'styled-components';
import {Landing, Error, Register, Dashboard} from "../src/pages";


function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Dashboard />}/>
              <Route path="/landing" element={<Landing />}/>
              <Route path="/register" element={<Register />}/>
              <Route path="*" element={<Error />}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
