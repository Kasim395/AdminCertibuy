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
import { useHistory } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { SearchAds } from "./Screens/SearchListings";
import { SearchPayment } from "./Screens/SearchPayments";

//routes file

const Routes = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const allowedUserId = '9ADJmb7rsIhyPLD1gCS6lzmg6q33';
  const history = useHistory();
  

  React.useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        // User is signed in
        const token = await user.getIdToken();
        localStorage.setItem('firebaseToken', token);

        // Check if the user ID is allowed
        if (user.uid === allowedUserId) {
          setIsAuthenticated(true);
        } else {
          // Unauthorized user
          await firebase.auth().signOut();
          setIsAuthenticated(false);
        }
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

      // Check if the user ID is allowed
      if (user.uid === allowedUserId) {
        const token = await user.getIdToken();
        localStorage.setItem('firebaseToken', token);
        setIsAuthenticated(true);
      } else {
        // Unauthorized user
        await firebase.auth().signOut();
        setIsAuthenticated(false);
        alert('Error: No Record Of Any Such User');
      }
    } catch (error) {
      console.log('Error:', error.message);
      alert('Incorrect Credentials');
    }
  };

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      setIsAuthenticated(false);
      history.push('/login'); // Redirect to the login screen after logout
      window.location.replace('/login'); // Replace the current URL with the login URL to clear the history stack
    } catch (error) {
      console.log('Error:', error.message);
    }
  };

  return (
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
        <Route path="/searchpayments" component={SearchPayment} />
        <Route path="/makereport" component={MakeReport} />
        <Route component={Hero404} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;




