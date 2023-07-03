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




const SidebarInspector = () => {

  const history = useHistory();






  React.useEffect(() => {
    const tokens = localStorage.getItem('Inspector');
    const isAuthenticateds = checkTokenValidity(tokens);

    if (!isAuthenticateds) {
      logoutAndRedirect();
    }
  }, []);


  const checkTokenValidity = (tokens) => {
   
    if (tokens) {
      
      return true;
    }
    return false;
  };

  const logoutAndRedirect = () => {
   
    localStorage.removeItem('Inspector');
   
    history.replace('/inspector');
    window.location.replace('/inspector'); 
  };

  const handleLogout = async () => {
    try {

      localStorage.removeItem('Inspector');
      localStorage.removeItem('inspauthstate');
      await firebase.auth().signOut();
      history.replace('/inspector');
        
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
              to="/reports"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem
                icon="sticky-note"
              >
                Report Requests
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

export default SidebarInspector;
