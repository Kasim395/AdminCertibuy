import React, { Fragment } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { Hero404 } from "./Screens/Hero404";
import { Reports } from "./Screens/Report";
import { useHistory } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import LoginPage2 from "./Screens/Login2";
import { MakeReport } from "./Screens/Components/MakeReport";

const RoutesInspector = () => {
  const [isAuthenticateds, setIsAuthenticateds] = React.useState(false);
  const allowedUserIdS = 'OY2Ns86kE4PlCS7fSwBBdZQCQkJ2';
  const history = useHistory();

  React.useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        localStorage.setItem('Inspector', token);

        const storedInspectorToken = localStorage.getItem('Inspector');
        if (storedInspectorToken && user.uid === allowedUserIdS) {
          setIsAuthenticateds(true);
          
        } 
      } 
    });

    return () => {
      unregisterAuthObserver();
    };
  }, []);

  const handleLogin2 = async (email, password) => {
    try {
      const userCredentials = await firebase.auth().signInWithEmailAndPassword(email, password);
      const user = userCredentials.user;

      if (user.uid === allowedUserIdS) {
        const tokens = await user.getIdToken();
        localStorage.setItem('Inspector', tokens);
        setIsAuthenticateds(true);
      } else {
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
      setIsAuthenticateds(false);
      localStorage.removeItem('Inspector');
      history.push('/inspector');
    } catch (error) {
      console.log('Error:', error.message);
    }
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/inspector">
          {isAuthenticateds ? (
            <Redirect to="/reports" />
          ) : (
            <LoginPage2 onLogin2={handleLogin2} />
          )}
        </Route>

        <Route
          path="/reports"
          render={() => {
            
              return <Reports />;
            
          }}
        />

        <Route path="/makereport" component={MakeReport} />
      </Switch>
    </BrowserRouter>
  );
};

export default RoutesInspector;
