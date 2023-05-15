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





const Sidebar = () => {

 


  const handleLogout = async () => {
    try {
      window.location.href = "/";
      await firebase.auth().signOut();
     
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
              to="/reports"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem
                icon="sticky-note"
              >
                Report Requests
              </CDBSidebarMenuItem>
            </NavLink>



            <NavLink
              exact
              to="/Escrow"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem
                icon="wallet"
              >
                Escrow
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
