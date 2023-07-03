import React from "react";
import { 
  CDBBtn,
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem } from "cdbreact";
import { NavLink } from "react-router-dom";
import firebase from 'firebase/compat/app';
import { useHistory } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';




const Sidebar = () => {

  const history = useHistory();
  const allowedUserId = '9ADJmb7rsIhyPLD1gCS6lzmg6q33';




  React.useEffect(() => {
    const token = localStorage.getItem('firebaseToken');
    const isAuthenticated = checkTokenValidity(token);

    if (!isAuthenticated) {
      logoutAndRedirect();
    }
  }, []);



  const checkTokenValidity = (token) => {
   
    if (token) {
      
      return true;
    }
  
    
    return false;
  };


  const logoutAndRedirect = () => {
   
    localStorage.removeItem('firebaseToken');

   
    history.replace('/');
    window.location.replace('/'); 
  };


  const handleLogout = async () => {
    try {
      localStorage.removeItem('firebaseToken');
      await firebase.auth().signOut();
      history.replace('/');
     ;
        
    } catch (error) {
      console.log('Error:', error.message);
    }
  };

 

  return (
    <div
      className={`app`}
      style={{ display: "flex", height: "100%", overflow:"scroll initial"}}
    >
      <CDBSidebar
        textColor="#fff"
        backgroundColor="#333"
      >
        <CDBSidebarHeader
          prefix={
            <i className="fa fa-bars fa-large"></i>
          }
        >
          <a href="/" className="text-decoration-none" style={{color:"inherit"}}>
           Admin Panel
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink
              exact
              to="/"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem
                icon="columns"
              >
                dashboard
              </CDBSidebarMenuItem>
            </NavLink>

            <NavLink
              exact
              to="/searchads"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem
                icon="search"
              >
                Search Ads
              </CDBSidebarMenuItem>
            </NavLink>
           

            <NavLink
              exact
              to="/riderpanel"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem
                icon="motorcycle"
              >
                Rider Panel
              </CDBSidebarMenuItem>
            </NavLink>

            <NavLink
              exact
              to="/itemlog"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem
                icon="clipboard"
              >
                Item Log
              </CDBSidebarMenuItem>
            </NavLink>


            
          



            <NavLink
              exact
              to="/escrow"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem
                icon="wallet"
              >
                Escrow
              </CDBSidebarMenuItem>
            </NavLink>

            <NavLink
              exact
              to="/searchpayments"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem
                icon="search"
              >
                Search Payments
              </CDBSidebarMenuItem>
            </NavLink>

          
          </CDBSidebarMenu>
          <CDBSidebarMenu>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBBtn
        onClick={handleLogout}
        >

LOG OUT

        </CDBBtn>

        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: "20px 5px"
            }}
          >
            Good Bye
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
}

export default Sidebar;
