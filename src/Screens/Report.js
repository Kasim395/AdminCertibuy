import React from "react";
import { CDBTable, CDBTableHeader, CDBTableBody, CDBContainer, CDBBtn } from "cdbreact";
import SidebarInspector from "../InspSidebar";
import Navbar from "../Navbar";
import { db } from "./Firebase/firebase";
import { onSnapshot, collection } from "firebase/firestore";
import { NavLink } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import firebase from 'firebase/compat/app';

export const Reports = () => {


  const [ndata, setndata] = React.useState([]);

  React.useEffect(() => {
    let unsub;
    const fetchCards = async () => {
      unsub = onSnapshot(collection(db, "CreateReports"), (snapshot) => {
        setndata(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      });
    };

    fetchCards();
    return unsub;
  }, []);





  const [Data, setData] = React.useState(Array(3).fill("default value"));

  const [Loading, setLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");



  React.useEffect(() => {
    let unsub;

    const fetchCards = async () => {
      unsub = onSnapshot(collection(db, "CreateReports"), (snapshot) => {
        const filteredData = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((item) =>
          String(item.adIDs).toLowerCase().includes(searchQuery) ||
          String(item.Brand).toLowerCase().includes(searchQuery) ||
          String(item.Model).toLowerCase().includes(searchQuery) 

          )

          .slice(0, 3); // modify this line to get the first 3 items
        setData(filteredData);
        setLoading(false);
      });
    };
    fetchCards();
    return unsub;
  }, [searchQuery]);






  return (
    <div className="dashboard d-flex">
      <div>
        <SidebarInspector />
      </div>
      <div
        style={{
          flex: "1 1 auto",
          display: "flex",
          flexFlow: "column",
          height: "100vh",
          overflowY: "hidden",
        }}>
        <Navbar />
        <div style={{ height: "100%", backgroundColor: "grey" }}>
          <div
            style={{
              padding: "20px 5%",
              height: "calc(100% - 64px)",
              overflowY: "scroll",
            }}>
             <h2 style={{ textAlign: "center", fontWeight:'bold' }}>Report Requests  </h2>

             <div style={{backgroundColor:'#E1D9D1', borderRadius:40}}>
             <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 15,
                height: 55,
                paddingTop:'10px' 
              }}>
              <input
                style={{ width: "80%"}}
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

          </div>




             
            <div className="d-flex card-section">
              <div className="cards-container">
                {Data.map((item) => (
                  <div className="card"  style={{ border: "3px solid black", borderRadius:40}}>
                    <div className="card-body" style={{alignContent:'center'}}>
                      <h5 className="card-title"> <strong>Phone ID:</strong>   {item.adIDs}</h5>
                      <p className="card-text"><strong>Brand:</strong> <br></br>{item.Brand}</p>
                      <p className="card-text"><strong>Model:</strong><br></br> {item.Model}</p>
                  
                      <NavLink
                            exact
                            to={{
                              pathname:"/makereport",
                              state: {
                                data: item.PhoneOwner,
                                data2: item.OwnerContact,
                                data3: item.adIDs,
                                data4: item.buyer,
                                data5: item.seller,
                                data6: item.price,
                                data7: item.address,
                                data11: item.id
                              },
                            }}
                            activeClassName="activeClicked">
                            <CDBBtn
                              style={{ background: "#333", width: "100%" }}
                              flat
                              size="medium"
                              onClick={async () => {
                                setTimeout(() => {
                                  db.collection("Incentre")
                                    .doc(item.id)
                                    .delete();
                                }, 20000);
                              }}>
                              Create Report
                            </CDBBtn>
                          </NavLink>


                    </div>
                  </div>
                ))}
              </div>
            </div>
            </div>
            <footer className="mx-auto my-3 text-center">
              <small>&copy; Certified Buy, 2023. All rights reserved.</small>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};
