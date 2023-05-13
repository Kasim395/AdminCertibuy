import React, { Fragment } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Dashboard } from "./Screens/Dashboard";
import { Hero404 } from "./Screens/Hero404";
import { CreateLog} from "./Screens/Components/CreateLog";
import { Riderpanel } from "./Screens/Riderpanel";
import { ItemLog } from "./Screens/ItemLog";
import { Reports } from "./Screens/Report";
import { Escrow } from "./Screens/Escrow";
import { Searchlisting } from "./Screens/Searchlisting";
import { MakeReport } from "./Screens/Components/MakeReport";

const Routes = () => {

  return (
    <Fragment>
      <BrowserRouter>
        <Route exact path="/" render={() => <Dashboard/> } />
        <Route path="/hero404" component={Hero404} />
        <Route path="/createlog" component={CreateLog} />
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
