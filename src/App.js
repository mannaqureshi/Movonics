import React, { Fragment, useState } from "react";
import { NavBar } from "./components/navbar";
import { Footer } from "./components/footer";
import { Sidebar } from "./components/sidebar";
import { Switch, Route } from "react-router-dom";
import { Dubai } from "./pages/dubai";
import { AbuDhabi } from "./pages/abudhabi";
import { Home } from "./pages/home";
import { Paint } from "./pages/paint";
import { Faqs } from "./pages/faqs";
import { Privacy } from "./pages/privacy";
import { ThankYou } from "./pages/thankyou";

export const App = () => {
  const [isOpened, setiSeOpened] = useState(false);
  const toggleSidebar = () => {
    setiSeOpened(prev => !prev);
  };
  return (
    <Fragment>
      <NavBar toggleSidebar={toggleSidebar}></NavBar>
      <Sidebar toggleSidebar={toggleSidebar} isOpened={isOpened}></Sidebar>
      <div className="page">
        <Switch>
          <Route path="/faqs" exact>
            <Faqs />
          </Route>
          <Route path="/paint" exact>
            <Paint />
          </Route>
          <Route path="/policy" exact>
            <Privacy />
          </Route>
          <Route path="/dubai" exact>
            <Dubai />
          </Route>
          <Route path="/abudhabi" exact>
            <AbuDhabi />
          </Route>
          <Route path="/thankyou" exact>
            <ThankYou />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="">
            <h1>Not Found</h1>
          </Route>
        </Switch>
      </div>
      <Footer></Footer>
    </Fragment>
  );
};
