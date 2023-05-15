import React from "react";
import { CDBTable, CDBTableHeader, CDBTableBody, CDBContainer, CDBBtn } from "cdbreact";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import { db } from "./Firebase/firebase";
import { onSnapshot, collection } from "firebase/firestore";
import { NavLink } from "react-router-dom";

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

  return (
    <div className="dashboard d-flex">
      <div>
        <Sidebar />
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
            <div className="d-flex card-section">
              <div className="cards-container">
                {ndata.map((item) => (
                  <div className="card"  style={{ border: "3px solid black", width:'300px', borderRadius:40}}>
                    <div className="card-body" style={{alignContent:'center'}}>
                      <h5 className="card-title"> <strong>Phone ID:</strong>   {item.adIDs}</h5>
                      <p className="card-text"><strong>Brand:</strong> <br></br>{item.Brand}</p>
                      <p className="card-text"><strong>Model:</strong><br></br> {item.Model}</p>
                  
                      <NavLink
                            exact
                            to={{
                              pathname: "/makereport",
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

            <footer className="mx-auto my-3 text-center">
              <small>&copy; Certified Buy, 2023. All rights reserved.</small>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};
