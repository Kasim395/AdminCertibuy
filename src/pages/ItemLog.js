import React from "react";
import { CDBTable, CDBTableHeader, CDBTableBody, CDBContainer, CDBBtn } from "cdbreact";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import { db } from './firebase';
import {  onSnapshot, collection } from 'firebase/firestore'
import { NavLink } from "react-router-dom";
export const ItemLog = () => {




  const [ndata, setndata] = React.useState([]);
  




      React.useEffect(() => {
        let unsub;
        const fetchCards = async () => {
          unsub = onSnapshot(collection(db, 'AwaitILogs'), snapshot => {
            setndata(snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
              
            })))
          })
        }
        
        fetchCards();
        return unsub;
      }, [])









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
            


          <div className="card-bg " >
          <CDBContainer>
          <h2 id='createnotice'>Mobiles Inbound </h2>

{ndata.map((item) => (
<div>

<div className="card" style={{ borderBottom: '3px solid black', padding:'20px', margin:'10px'}} >

 

<br></br>
<strong>Name: </strong> {item.names} <br></br>
<strong>Phone: </strong> {item.cell} <br></br>
<strong>Address: </strong> {item.residence} <br></br>
<strong>Model: </strong> {item.modelz} <br></br>
<strong>Date/Time: </strong> {item.timez} <br></br>



<div className="col-md-12"  >
<br></br>

<NavLink
              exact
              to={{ pathname: "/profile", state: { datas: item.names , datas2:item.cell, datas3: item.modelz} }}
              activeClassName="activeClicked"
            >
              <CDBBtn style={{background:"#333", width:'100%' }} flat size="medium">

                Create Item Log
              </CDBBtn>



            </NavLink>




</div>

</div>
</div>



           ))}



</CDBContainer>
          </div>

          <div className="card-bg w-100 border d-flex flex-column ">
          <h2 id='createnotice'> Mobiles In Centre</h2>
          
          </div>

          <div className="card-bg w-100 border d-flex flex-column ">
          <h2 id='createnotice'> Search Item Logs</h2>
          
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
