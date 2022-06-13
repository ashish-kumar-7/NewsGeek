import "./App.css";

import React, { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {

  const [progress, setprogress] = useState(0)

  const showProgress = (progres) => {
    setprogress(progres);
  };

  const pageSize = 15;
  const apiKey = process.env.REACT_APP_API_KEY;
  
    return (
      <Router>
        <div>
          <Navbar />
          <LoadingBar color="#f11946" progress={progress} />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <News
                  showProgress={showProgress}
                  key="general"
                  apiKey={apiKey}
                  pageSize={pageSize}
                  country="in"
                  category="general"
                />
              }
            />
            <Route
              exact
              path="/business"
              element={
                <News
                  showProgress={showProgress}
                  key="business"
                  apiKey={apiKey}
                  pageSize={pageSize}
                  country="in"
                  category="business"
                />
              }
            />
            <Route
              exact
              path="/entertainment"
              element={
                <News
                  showProgress={showProgress}
                  key="entertainment"
                  apiKey={apiKey}
                  pageSize={pageSize}
                  country="in"
                  category="entertainment"
                />
              }
            />
            <Route
              exact
              path="/science"
              element={
                <News
                  showProgress={showProgress}
                  key="science"
                  apiKey={apiKey}
                  pageSize={pageSize}
                  country="in"
                  category="science"
                />
              }
            />
            <Route
              exact
              path="/health"
              element={
                <News
                  showProgress={showProgress}
                  key="health"
                  apiKey={apiKey}
                  pageSize={pageSize}
                  country="in"
                  category="health"
                />
              }
            />
            <Route
              exact
              path="/sports"
              element={
                <News
                  showProgress={showProgress}
                  key="sports"
                  apiKey={apiKey}
                  pageSize={pageSize}
                  country="in"
                  category="sports"
                />
              }
            />
            <Route
              exact
              path="/technology"
              element={
                <News
                  showProgress={showProgress}
                  key="technology"
                  apiKey={apiKey}
                  pageSize={pageSize}
                  country="in"
                  category="technology"
                />
              }
            />
          </Routes>
        </div>
      </Router>
    );
  }

export default App;
