import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

import "./App.css";

import React, { useState } from "react";

const App = () => {
  const [progress, setProgress] = useState(10);

  return (
    <div>
      <LoadingBar color="#f11946" setProgress={progress} height={3} />
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route
            exact
            path="/"
            element={
              <News
                setProgress={setProgress}
                key="general"
                category="general"
              />
            }
          />
          <Route
            exact
            path="/Sports"
            element={
              <News setProgress={setProgress} key="sports" category="Sports" />
            }
          />
          <Route
            exact
            path="/Health"
            element={
              <News setProgress={setProgress} key="health" category="Health" />
            }
          />
          <Route
            exact
            path="/Entertainment"
            element={
              <News
                setProgress={setProgress}
                key="entertainment"
                category="Entertainment"
              />
            }
          />
          <Route
            exact
            path="/Science"
            element={
              <News
                setProgress={setProgress}
                key="science"
                category="Science"
              />
            }
          />
          <Route
            exact
            path="/Business"
            element={
              <News
                setProgress={setProgress}
                key="business"
                category="Business"
              />
            }
          />
          <Route
            exact
            path="/Technology"
            element={
              <News
                setProgress={setProgress}
                key="technology"
                category="Technology"
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
