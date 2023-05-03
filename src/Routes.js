import React, { Fragment } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Tables } from "./pages/Tables";
import { Hero404 } from "./pages/Hero404";
import { Profile } from "./pages/Profile";
import { Riderpanel } from "./pages/Riderpanel";
import { ItemLog } from "./pages/ItemLog";
import { Reports } from "./pages/Report";
import { Escrow } from "./pages/Escrow";
import { Searchlisting } from "./pages/Searchlisting";
import { MakeReport } from "./pages/MakeReport";

const Routes = () => {

  return (
    <Fragment>
      <BrowserRouter>
        <Route exact path="/" render={() => <Dashboard/> } />
        <Route path="/tables" component={Tables} />
        <Route path="/hero404" component={Hero404} />
        <Route path="/profile" component={Profile} />
        <Route path="/riderpanel" component={Riderpanel} />
        <Route path="/itemlog" component={ItemLog} />
        <Route path="/reports" component={Reports} />
        <Route path="/escrow" component={Escrow} />
        <Route path="/searchlisting" component={Searchlisting} />
        <Route path="/makereport" component={MakeReport} />

      </BrowserRouter>
    </Fragment>
  );
};

export default Routes;
