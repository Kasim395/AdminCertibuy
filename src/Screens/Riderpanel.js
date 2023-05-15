import React from "react";
import {
  CDBTable,
  CDBTableHeader,
  CDBTableBody,
  CDBContainer,
  CDBBtn,
} from "cdbreact";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import { db } from "./Firebase/firebase";
//import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { onSnapshot, collection } from "firebase/firestore";

export const Riderpanel = () => {
  const [ndata, setndata] = React.useState([]);
  const [odata, setodata] = React.useState([]);

  const [currentDate, setCurrentDate] = React.useState(null);
  const [currentTime, setCurrentTime] = React.useState(null);



  React.useEffect(() => {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    setCurrentDate(date);
    setCurrentTime(time);
  
  
  }, []);


  React.useEffect(() => {
    let unsub;
    const fetchCards = async () => {
      unsub = onSnapshot(collection(db, "inBoundPhone"), (snapshot) => {
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

  React.useEffect(() => {
    let unsub;
    const fetchCards = async () => {
      unsub = onSnapshot(collection(db, "RiderOutboundSafetyLog"), (snapshot) => {
        setodata(
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
              <h2 style={{ textAlign: "center", fontWeight:'bold' }}>Rider Panel   </h2>
            <div className="d-flex card-section">
              <div className="cards-container">
                <div className="card-bg ">
                 
                    <h2 id="createnotice">Rider Inbound </h2>

                    {ndata.map((item) => (
                      <div>
                        <div
                          className="card"
                          style={{
                            borderBottom: "3px solid black",
                            padding: "20px",
                            margin: "10px",
                          }}>
                          <br></br>
                          <strong>Name: </strong> {item.sellerName} <br></br>
                          <strong>Phone: </strong> {item.sellerPhoneNumber}{" "}
                          <br></br>
                          <strong>Address: </strong> {item.sellerAddress}{" "}
                          <br></br>
                          <strong>Model: </strong> {item.model} <br></br>
                          <div className="col-md-12">
                            <br></br>
                            <CDBBtn
                              style={{ background: "#333", width: "100%" }}
                              flat
                              size="medium"
                              onClick={async () => {

                               
                                const now = new Date();
                                const date = now.toLocaleDateString();
                                const time = now.toLocaleTimeString();
                                setCurrentDate(date);
                                setCurrentTime(time);



                                try {
                                  await db.collection("AwaitILogs").add({
                                    names: item.sellerName,
                                    residence: item.sellerAddress,
                                    cell: item.sellerPhoneNumber,
                                    adIDs: item.adID,
                                    buyer: item.buyerID,
                                    seller: item.sellerID,
                                    price: item.amount,
                                    models: item.model,
                                    date: currentDate,
                                    time: currentTime
                                   
                                  });
                                  console.log("Add Posted!!!");
                                } catch (error) {
                                  console.error(error);
                                }

                                try {
                                  await db.collection("RiderInbound").add({
                                    names: item.sellerName,
                                    residence: item.sellerAddress,
                                    cell: item.sellerPhoneNumber,
                                    adIDs: item.adID,
                                    buyer: item.buyerID,
                                    seller: item.sellerID,
                                    price: item.amount,
                                    models: item.model
                                   
                                  });
                                  console.log("Add Posted!!!");
                                } catch (error) {
                                  console.error(error);
                                }
                              }}>
                              Send To Rider
                            </CDBBtn>
                          </div>
                        </div>
                      </div>
                    ))}
                 
                </div>

                <div className="card-bg w-100 border d-flex flex-column ">
                  <h2 id="createnotice">Rider OutBound </h2>


                  {odata.map((item) => (
                      <div>
                        <div
                          className="card"
                          style={{
                            borderBottom: "3px solid black",
                            padding: "20px",
                            margin: "10px",
                          }}>
                          <br></br>
                          <strong>Name: </strong> {item.names} <br></br>
                          <strong>Phone: </strong> {item.cell}{" "}
                          <br></br>
                          <strong>Address: </strong> {item.residence}{" "}
                          <br></br>
                          <strong>Seller ID: </strong> {item.seller} <br></br>


                          <div className="col-md-12">
                            <br></br>
                            <CDBBtn
                              style={{ background: "#8b0000", width: "100%" }}
                              flat
                              size="medium"
                              onClick={async () => {

                                db.collection("RiderOutboundSafetyLog").doc(item.id).delete()
                                
                              }}>
                              Delete Log
                            </CDBBtn>
                          </div>
                        </div>
                      </div>
                    ))}
















                </div>
              </div>
            </div>

            <footer className="mx-auto my-3 text-center" >
              <small>&copy; Certified Buy, 2023. All rights reserved.</small>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};
