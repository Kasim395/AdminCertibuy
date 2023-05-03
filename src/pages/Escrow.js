import React from "react";
import { CDBTable, CDBTableHeader, CDBTableBody, CDBContainer } from "cdbreact";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";

export const Escrow = () => {
  return (
    <div className="dashboard d-flex">
      <div>
        <Sidebar/>
      </div>
      <div style={{flex:"1 1 auto", display:"flex", flexFlow:"column", height:"100vh", overflowY:"hidden"}}>
        <Navbar/>
        <div style={{height:"100%"}}>
          <div style={{padding:"20px 5%",height:"calc(100% - 64px)",overflowY:"scroll"}}>

        <div className="d-flex card-section">
		<div className="cards-container">
            

          <div className="card-bg w-100 border d-flex flex-column col-sm ">
          <h2 id='createnotice'>Payments</h2>






          </div>

          <div className="card-bg w-100 border d-flex flex-column ">
          <h2 id='createnotice'>Declined Payments</h2>




          </div>

          <div className="card-bg w-100 border d-flex flex-column ">
          <h2 id='createnotice'>Search Record</h2>




          </div>

       


          </div>
         
          </div>


            <footer className="mx-auto my-3 text-center">
                <small>&copy; Devwares, 2020. All rights reserved.</small>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};
