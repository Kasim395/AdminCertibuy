import React from "react";
import { CDBContainer, CDBBtn } from "cdbreact";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import { db } from "./Firebase/firebase";
import { onSnapshot, collection } from "firebase/firestore";
import { NavLink } from "react-router-dom";


export const ItemLog = () => {
  
  const [ndata, setndata] = React.useState([]);
  const [ndata2, setndata2] = React.useState([]);

 

  React.useEffect(() => {
    let unsub;
    const fetchCards = async () => {
      unsub = onSnapshot(collection(db, "AwaitILogs"), (snapshot) => {
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
      unsub = onSnapshot(collection(db, "Incentre"), (snapshot) => {
        setndata2(
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

  const [Loading, setIsLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");
  
  React.useEffect(() => {
    let unsub;
    const fetchCards = async () => {
      unsub = onSnapshot(collection(db, "ItemLogs"), (snapshot) => {
        const filteredData = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((item) =>
          String(item.Model).toLowerCase().includes(searchQuery) ||
          String(item.PhoneOwner).toLowerCase().includes(searchQuery) ||
          String(item.AdminName).toLowerCase().includes(searchQuery) ||
          String(item.AdID).toLowerCase().includes(searchQuery)||
          String(item.Brand).toLowerCase().includes(searchQuery) ||
          String(item.OwnerContact).toLowerCase().includes(searchQuery)||
          String(item.RiderName).toLowerCase().includes(searchQuery)||
          String(item.DateTime).toLowerCase().includes(searchQuery)||
          String(item.ImeiNumber).toLowerCase().includes(searchQuery)
            // item.Model.includes(searchQuery.toLowerCase().models)
            
          )
          .slice(0, 3); // modify this line to get the first 3 items
        setData(filteredData);
        setIsLoading(false);
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

<h1 style={{ textAlign: "center" }}>Item Logs   </h1>
            <div className="d-flex card-section">

              <div className="cards-container">
                <div className="card-bg ">
                  
                    <h2 id="createnotice">Mobiles Inbound </h2>

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
                          <strong>Name: </strong> {item.names} <br></br>
                          <strong>Phone: </strong> {item.cell} <br></br>
                          <strong>Address: </strong> {item.residence} <br></br>
                          <strong>Model: </strong> {item.models} <br></br>
                          <strong>Date/Time: </strong> {item.date} @ {item.time} <br></br>
                          <div className="col-md-12">
                            <br></br>

                            <CDBBtn
                              style={{ background: "#333", width: "100%" }}
                              flat
                              size="medium"
                              onClick={async () => {

                               

                                const query = db.collection("TrackingPhone").where("adID", "==", item.adIDs);

                                // Update the document
                                query.get()
                                    .then((querySnapshot) => {
                                        querySnapshot.forEach((doc) => {
                                            // Use the "update" method to update the document
                                            return doc.ref.update({
                                                status: [
                                                   
                                                    { status: 'Arrived at inspection centre', isCompleted: true },
                                                    { status: 'Technician inspecting the phone ', isCompleted: true },
                                                    
                                    { status: 'Phone Inspected', isCompleted: false },
                                    { status: 'Report Generated', isCompleted: false },
                                    { status: 'Buyer Accepted', isCompleted: false },
                                          { status: 'Phone Delivered', isCompleted: false },
                                                ]
                                            });
                                        });
                                    })
                                    
                                        console.log("Document Tracking updated successfully");
                                      

                                try {
                                  await db.collection("Incentre").add({
                                    names: item.names,
                                    residence: item.residence,
                                    cell: item.cell,
                                    buyerID: item.buyer,
                                    sellerID: item.seller,
                                    amount: item.price,
                                    adID: item.adIDs,
                                    modelz: item.models

                                  });
                                  console.log("Add Posted!!!");
                                } catch (error) {
                                  console.error(error);
                                }

                                db.collection("AwaitILogs")
                                  .doc(item.id)
                                  .delete();
                              }}>
                              Confirm Receiving
                            </CDBBtn>
                          </div>
                        </div>
                      </div>
                    ))}
                 
                </div>

                <div className="card-bg ">
                  <h2 id="createnotice">Mobiles In Centre </h2>

                  {ndata2.map((item) => (
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
                        <strong>Phone: </strong> {item.cell} <br></br>
                        <strong>Address: </strong> {item.residence} <br></br>
                        <strong>Model: </strong> {item.modelz} <br></br>
                        <strong>Date/Time: </strong> {item.timez} <br></br>
                        <div className="col-md-12">
                          <br></br>

                          <NavLink
                            exact
                            to={{
                              pathname: "/createlog",
                              state: {
                                datas: item.names,
                                datas2: item.cell,
                                datas3: item.modelz,
                                datas4: item.adID,
                                datas5: item.buyerID,
                                datas6: item.sellerID,
                                datas7: item.amount,
                                datas8: item.residence,
                                datas9: item.id
                              },
                            }}
                            activeClassName="activeClicked">
                            <CDBBtn
                              style={{ background: "#333", width: "100%" }}
                              flat
                              size="medium"

                             >
                              Create Item Log
                            </CDBBtn>
                          </NavLink>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="card-bg  ">
                  <h2 id="createnotice"> Search Item Logs</h2>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: 15,
                      height: 55,
                    }}>
                    <input
                      style={{ width: "80%" }}
                      placeholder="Search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  {Data.map((item) => (
                    <div>
                      <div
                        className="card"
                        style={{
                          borderBottom: "3px solid black",
                          padding: "10px",
                          margin: "10px",
                        }}>
                        <CDBBtn
                          style={{
                            background: "red",
                            width: 40,
                            alignSelf: "flex-end",
                            marginTop: "-1%",
                          }}
                          flat
                          size="small"
                          onClick={async () =>
                            db.collection("ItemLogs").doc(item.id).delete()
                          }>
                          {" "}
                          <text style={{ fontWeight: "bold", fontSize: 16 }}>
                            {" "}
                            X{" "}
                          </text>{" "}
                        </CDBBtn>

                        <div className="row">
                          <div className="col-6">
                            <strong>Name: </strong> {item.PhoneOwner} <br></br>
                            <br></br>
                            <strong>Phone: </strong> {item.OwnerContact} <br></br>
                            <br></br>
                            <strong>Address: </strong> {item.address}{" "} <br></br>
                            <br></br>
                            <strong>Date/Time: </strong>  {item.DateTime} <br></br>
                            <br></br>
                            <strong>Seller ID: </strong> {item.seller} <br></br>
                            
                           
                          </div>

                          <div className="col-6">
                          <strong>brand: </strong> {item.Brand} <br></br>
                            <br></br>
                            <strong>Model: </strong> {item.Model} <br></br>
                            <br></br>
                            <strong>Imei: </strong> {item.ImeiNumber} <br></br>
                            <br></br>
                            <strong>Ad ID: </strong> {item.adIDs} <br></br>
                            <br></br>
                            <strong>Accessories: </strong> {item.Accessories} <br></br>
                            <br></br>
                            <strong>Comments: </strong> {item.Comments} <br></br>
                            <br></br>
                          </div>
                        </div>

                        <div className="col-md-12">
                          <br></br>

                    
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
