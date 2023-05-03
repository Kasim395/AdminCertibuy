import React from "react";
import { 
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem } from "cdbreact";
import { NavLink } from "react-router-dom";

const Sidebar = () => {

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
            Contrast
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
              to="/searchlisting"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem
                icon="user"
              >
                Search Listing
              </CDBSidebarMenuItem>
            </NavLink>

            <NavLink
              exact
              to="/riderpanel"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem
                icon="user"
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
                icon="user"
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
                icon="user"
              >
                Reports
              </CDBSidebarMenuItem>
            </NavLink>



            <NavLink
              exact
              to="/Escrow"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem
                icon="user"
              >
                Escrow
              </CDBSidebarMenuItem>
            </NavLink>


            <NavLink
              exact
              to="/makereport"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem
                icon="user"
              >
                Make Report
              </CDBSidebarMenuItem>
            </NavLink>

          

          
          </CDBSidebarMenu>
          <CDBSidebarMenu>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: "20px 5px"
            }}
          >
            Sidebar Footer
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
}

export default Sidebar;
