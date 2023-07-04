import React from "react";
import { CDBTable, CDBTableHeader, CDBBtn, CDBContainer } from "cdbreact";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "./Firebase/firebase";

export const SearchPayment = () => {



  const [Data, setData] = React.useState(Array(3).fill("default value"));

  const [Loading, setLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");



  React.useEffect(() => {
    let unsub;

    const fetchCards = async () => {
      unsub = onSnapshot(collection(db, "PaymentsMade"), (snapshot) => {
        const filteredData = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((item) =>

          String(item.paymentmode).toLowerCase().includes(searchQuery) ||
          String(item.time).toLowerCase().includes(searchQuery) ||
          String(item.amount).toLowerCase().includes(searchQuery) ||
          String(item.date).toLowerCase().includes(searchQuery) ||
          String(item.adIDs).toLowerCase().includes(searchQuery) ||
          String(item.seller).toLowerCase().includes(searchQuery) ||
          String(item.name).toLowerCase().includes(searchQuery) ||
          String(item.account).toLowerCase().includes(searchQuery) 


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

<h2 style={{ textAlign: "center", fontWeight:'bold' }}>Search Payments Made  </h2>


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



          <div  style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 2,
                height: 35,
              }}>



            </div>

            <div className="d-flex card-section">
              <div className="cards-container">
                {Data.map((item) => (
                  <div
                    className="card"
                    style={{
                      borderRadius: 35,
                      backgroundColor: "#429E9D",
                      borderWidth: 4,
                      borderColor: "black",
                    }}>
                    <CDBBtn
                      style={{
                        background: "red",
                        width: 40,
                        alignSelf: "flex-end",
                        marginBottom: "2%",
                      }}
                      flat
                      size="small"
                      onClick={async () =>
                        db.collection("add").doc(item.id).delete()
                      }>
                      {" "}
                      <text style={{ fontWeight: "bold", fontSize: 16 }}>
                        {" "}
                        X{" "}
                      </text>{" "}
                    </CDBBtn>
                    
                    <h5
                      className="card-title"
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        padding: 6,
                      }}>
                      Payments Log
                    </h5>
                    <div className="row">
                      <div className="col-6">
                        <strong>Amount: </strong> {item.amount}
                      </div>
                      <div className="col-6">
                        <strong>Date: </strong> {item.date} {item.time}
                      </div>
                    </div>

                    <strong>
                      {" "}
                      <br></br>Bank Type:{" "}
                    </strong>{" "}
                    {item.paymentmode} <br></br>


                    
                    <strong>
                      {" "}
                      <br></br>Account No:{" "}
                    </strong>{" "}
                    {item.account} <br></br>
                    <br></br>
                    <strong>Seller ID: </strong> {item.seller} <br></br>
                    <strong>Name: </strong> {item.name} <br></br>
                    <br></br>
                    <strong>Ad ID: </strong> {item.adIDs} <br></br>
                    <div className="map-container"></div>
                  </div>
                ))}
              </div>
            </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
};