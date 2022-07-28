import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import styled from 'styled-components';
import {Landing, Error, Register} from "../src/pages";
import {AddJob, AllJobs, Profile, Stats, SharedLayout} from "./pages/dashboard/index.js";


function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<SharedLayout />}>
                  <Route path="stats" element={<Stats />}/>
                  <Route path="all-jobs" element={<AllJobs />}/>
                  <Route path="add-job" element={<AddJob />}/>
                  <Route path="profile" element={<Profile />}/>
              </Route>

              <Route path="/landing" element={<Landing />}/>
              <Route path="/register" element={<Register />}/>
              <Route path="*" element={<Error />}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
