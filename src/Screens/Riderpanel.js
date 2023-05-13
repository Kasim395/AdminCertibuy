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
  const [dateTime, setDateTime] = React.useState("");
  const [currentDate, setCurrentDate] = React.useState(null);
  const [currentTime, setCurrentTime] = React.useState(null);

  const [myname, setmyname] = React.useState("i am qasim");

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

  const updateDateTime = () => {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    setCurrentDate(date);
    setCurrentTime(time);
  };



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
              <h1 style={{ textAlign: "center" }}>Rider Panel   </h1>
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

                               
                             updateDateTime()



                                try {
                                  await db.collection("AwaitILogs").add({
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
