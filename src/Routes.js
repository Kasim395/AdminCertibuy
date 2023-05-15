import React, { Fragment } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { Dashboard } from "./Screens/Dashboard";
import { Hero404 } from "./Screens/Hero404";
import { CreateLog} from "./Screens/Components/CreateLog";
import { Riderpanel } from "./Screens/Riderpanel";
import { ItemLog } from "./Screens/ItemLog";
import { Reports } from "./Screens/Report";
import { Escrow } from "./Screens/Escrow";
import { Searchlisting } from "./Screens/Searchlisting";
import { MakeReport } from "./Screens/Components/MakeReport";
import LoginPage from "./Screens/Login";

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { SearchAds } from "./Screens/SearchListings";



const Routes = () => {

  const [isAuthenticated, setIsAuthenticated] = React.useState(false);


  React.useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        // User is signed in
        const token = await user.getIdToken();
        localStorage.setItem('firebaseToken', token);
        setIsAuthenticated(true);
      } else {
        // User is signed out
        localStorage.removeItem('firebaseToken');
        setIsAuthenticated(false);
      }
    });

    return () => {
      // Unregister the observer to avoid memory leaks
      unregisterAuthObserver();
    };
  }, []);



  const handleLogin = async (email, password) => {
    try {
      
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      const token = await user.getIdToken();
      localStorage.setItem('firebaseToken', token);

      setIsAuthenticated(true);
    } catch (error) {
      console.log('Error:', error.message);
      alert('Incorrect Credientials');
    }
  };

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      setIsAuthenticated(false);
    } catch (error) {
      console.log('Error:', error.message);
    }
  };

  
  


  return (
    <Fragment>
      <BrowserRouter>
      <Switch>
      <Route exact path="/">
        {isAuthenticated ? (
          <Redirect to="/dashboard" />
        ) : (
          <LoginPage onLogin={handleLogin} />
        )}
      </Route>
      
      <Route
        path="/dashboard"
        render={() =>
          isAuthenticated ? (
            <Dashboard onLogout={handleLogout} />
          ) : (
            <Redirect to="/" />
          )
        }
      />
        <Route path="/createlog" component={CreateLog} />
        <Route path="/riderpanel" component={Riderpanel} />
        <Route path="/itemlog" component={ItemLog} />
        <Route path="/reports" component={Reports} />
        <Route path="/escrow" component={Escrow} />
        <Route path="/searchlisting" component={Searchlisting} />
        <Route path="/searchads" component={SearchAds} />
        <Route path="/makereport" component={MakeReport} />
        <Route component={Hero404} />
        </Switch>
      </BrowserRouter>
    </Fragment>
  );
};



export default Routes;

