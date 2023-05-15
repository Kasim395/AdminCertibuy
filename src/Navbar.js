import React from "react";
import { Header } from "./Navbar.style";
import { CDBNavbar, CDBInput, CDBSidebarHeader } from "cdbreact";

const Navbar = () => {

//  <CDBInput type="search" size="md" hint="Search" className="mb-n4 mt-n3 input-nav"/>

	return (
        <Header style={{background:"#333", color:"#fff"}}>

           <h2
           style={{color:"inherit", textAlign: "center" ,padding:6, fontWeight:'bold'}}>
           Certified Buy
           </h2>

          
        </Header>
	);
}

export default Navbar;
