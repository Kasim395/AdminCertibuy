import React from "react";
import { CDBTable, CDBTableHeader, CDBTableBody, CDBContainer , CDBBtn} from "cdbreact";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import { db } from "./Firebase/firebase";
import { onSnapshot, collection } from "firebase/firestore";
import { query, where, getDocs, deleteDoc } from "firebase/firestore";

export const Escrow = () => {



  const [rdata, setrdata] = React.useState([]);
  const [pdata, setpdata] = React.useState([]);
  const [edata, setedata] = React.useState([]);

  const [currentDate, setCurrentDate] = React.useState(null);
  const [currentTime, setCurrentTime] = React.useState(null);


  React.useEffect(() => {
    const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();
  setCurrentDate(date);
  setCurrentTime(time);
  }, []);

  



  const handleDelete = async (adId) => {
    try {
      // Query the collection to find the document with the matching adId
      const q = query(collection(db, "add"), where("adID", "==", adId));
      const querySnapshot = await getDocs(q);

      // Delete the document
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
        console.log("Document deleted successfully");
      });
    } catch (error) {
      console.log("Error deleting document:", error);
    }
  };

  const handleDelete2 = async (reportz) => {
    try {
      // Query the collection to find the document with the matching adId
      const q = query(collection(db, "ReportGenerated"), where("adID", "==", reportz));
      const querySnapshot = await getDocs(q);

      // Delete the document
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
        console.log("Document deleted successfully");
      });
    } catch (error) {
      console.log("Error deleting document:", error);
    }
  };











 


  React.useEffect(() => {
    let unsub;
    const fetchCards = async () => {
      unsub = onSnapshot(collection(db, "outBoundPhone"), (snapshot) => {
        setrdata(
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
      unsub = onSnapshot(collection(db, "PaymentAwaiting"), (snapshot) => {
        setpdata(
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
      unsub = onSnapshot(collection(db, "EscrowPayment"), (snapshot) => {
        setedata(
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
        <Sidebar/>
      </div>
      <div style={{flex:"1 1 auto", display:"flex", flexFlow:"column", height:"100vh", overflowY:"hidden"}}>
        <Navbar/>
        <div style={{height:"100%" , backgroundColor: "grey"}}>
        <div style={{padding:"20px 5%",height:"calc(100% - 64px)",overflowY:"scroll"}}>
        <h2 style={{ textAlign: "center", fontWeight:'bold' }}>Escrow </h2>

        <div className="d-flex card-section">
		    <div className="cards-container">
            


          <div className="card-bg w-100 border d-flex flex-column ">
          <h2 id='createnotice'>Report Acceptance</h2>

                  {rdata.map((item) => (
                      <div>
                        <div
                          className="card"
                          style={{
                            borderBottom: "3px solid black",
                            padding: "20px",
                            margin: "10px",
                          }}>
                          <br></br>
                          <strong>AD ID: </strong> {item.adID} <br></br>
                          <strong >Report Acceptance: </strong> <p style={{fontSize:20, textAlign:'center'}}> <b> {item.reportAccepted ? " True" : " False"} </b> </p>
                          <strong>Amount: </strong> {item.amount} <br></br>
                          <strong>Name: </strong> {item.name} <br></br>
                          <strong>Contact: </strong> {item.number} <br></br>
                          <strong>Address: </strong> {item.address} <br></br>
                          <strong>Buyer-ID: </strong> {item.buyerID} <br></br>
                          <strong>Seller-ID: </strong> {item.sellerID} <br></br>
                          

                          <div className="row">

                          <div className="col-md-6">
                            <br></br>
                       
                            <CDBBtn
                              style={{ background: "#333", width: "100%" }}
                              flat
                              size="medium"
                              onClick={async () => {


                                try {
                                  await db.collection("RiderOutboundSafetyLog").add({
                                    names: item.name,
                                    residence: item.address,
                                    cell: item.number,
                                    adIDs: item.adID,
                                    buyer: item.buyerID,
                                    seller: item.sellerID,
                                    deliveryType: "Phone Return"
                                   
                                  });
                                  console.log("Rider Outbound Posted");
                                } catch (error) {
                                  console.error(error);
                                }


                                try {
                                  await db.collection("RiderOutbound").add({
                                    names: item.name,
                                    residence: item.address,
                                    cell: item.number,
                                    adIDs: item.adID,
                                    buyer: item.buyerID,
                                    seller: item.sellerID,
                                    deliveryType: "Phone Return"
                                   
                                  });
                                  console.log("Rider Outbound Posted");
                                } catch (error) {
                                  console.error(error);
                                }


                                setTimeout(() => {
                                  db.collection("outBoundPhone")
                                    .doc(item.id)
                                    .delete();
                                }, 1800);


                              }}>
                              Deliver To Seller
                            </CDBBtn>
                            </div>

                             <div className="col-md-6">
                            <br></br>
                       
                            <CDBBtn
                              style={{ background: "#118C4F", width: "100%" }}
                              flat
                              size="medium"
                              onClick={async () => {


                                try {
                                  await db.collection("PaymentAwaiting").add({
                                    names: item.name,
                                    residence: item.address,
                                    cell: item.number,
                                    adIDs: item.adID,
                                    buyer: item.buyerID,
                                    seller: item.sellerID,
                                    price: item.amount,
                                   
                                  });
                                  console.log("Payment Awaiting Posted");
                                } catch (error) {
                                  console.error(error);
                                }
 

                                try {
                                  await db.collection("RiderOutbound").add({
                                    names: item.name,
                                    residence: item.address,
                                    cell: item.number,
                                    adIDs: item.adID,
                                    buyer: item.buyerID,
                                    seller: item.sellerID,
                                    price: item.amount,
                                    deliveryType: "Phone Delivery"
                                   
                                  });
                                  console.log("Rider Outbound Posted");
                                } catch (error) {
                                  console.error(error);
                                }
 

                                setTimeout(() => {
                                  db.collection("outBoundPhone")
                                    .doc(item.id)
                                    .delete();
                                }, 1800);
                              }}>
                             Deliver To Buyer 
                            </CDBBtn>
                            </div>
                            </div>
                              
                         
                        </div>
                      </div>
                    ))}



          </div>

          <div className="card-bg w-100 border d-flex flex-column ">
          <h2 id='createnotice'>Payments Awaiting</h2>

          {pdata.map((item) => (
                      <div>
                        <div
                          className="card"
                          style={{
                            borderBottom: "3px solid black",
                            padding: "20px",
                            margin: "10px",
                          }}>
                          <br></br>
                          <strong>AD ID: </strong> {item.adIDs} <br></br>
                          <strong >Payment Awaited: </strong> <p style={{fontSize:20, textAlign:'center', color:'green'}}> <b> {item.price} </b> </p>
                          <strong>Name: </strong> {item.names} <br></br>
                          <strong>Contact: </strong> {item.cell} <br></br>
                          <strong>Address: </strong> {item.residence} <br></br>
                          <strong>Buyer-ID: </strong> {item.buyer} <br></br>
                          <strong>Seller-ID: </strong> {item.seller} <br></br>
                          

                          <div className="row">

                          <div className="col-md-12">
                            <br></br>
                       
                            <CDBBtn
                              style={{ background: "#333", width: "100%" }}
                              flat
                              size="medium"
                              onClick={async () => {


                                try {
                                  await db.collection("RiderOutbound").add({
                                    names: item.name,
                                    residence: item.address,
                                    cell: item.number,
                                    adIDs: item.adID,
                                    buyer: item.buyerID,
                                    seller: item.sellerID,
                                   
                                  });
                                  console.log("Rider Outbound Posted");
                                } catch (error) {
                                  console.error(error);
                                }


                                setTimeout(() => {
                                  db.collection("PaymentAwaiting")
                                    .doc(item.id)
                                    .delete();
                                }, 1800);


                              }}>
                             Confirm Payment Receiving
                            </CDBBtn>
                            </div>

                             
                            </div>
                              
                         
                        </div>
                      </div>
                    ))}

          </div>

       
          <div className="card-bg w-100 border d-flex flex-column ">
          <h2 id='createnotice'>Process Payments</h2>

          

          {edata.map((item) => (
                      <div>
                        <div
                          className="card"
                          style={{
                            borderBottom: "3px solid black",
                            padding: "20px",
                            margin: "10px",
                          }}>
                          <br></br>
                          
                          <strong>Date: </strong> {item.date.toDate().toLocaleDateString()} <br></br>
                          <strong>AD ID: </strong> {item.adID} <br></br>
                          <strong>Name: </strong> {item.name} <br></br>
                          <strong >Payment Amount: </strong> <p style={{fontSize:20, textAlign:'center', color:'green'}}> <b> {item.amount} </b> </p>
                          <strong>Payment Method: </strong> {item.paymentMethod} <br></br>
                          <strong>Account Number: </strong> {item.accountNumber} <br></br>
                          <strong>SellerID: </strong> {item.sellerID} <br></br>
                          
                          
                          <div className="row">

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
                                  await db.collection("PaymentsMade").add({
                                   
                                    seller: item.sellerID,
                                    name: item.name,
                                    adIDs: item.adID,
                                    amount: item.amount,
                                    paymentmode: item.paymentMethod,
                                    account: item.accountNumber,
                                    date: currentDate,
                                    time: currentTime
                                   
                                  });
                                  console.log("Payment Log Saved");
                                } catch (error) {
                                  console.error(error);
                                }

                                
                                setTimeout(() => {
                                  db.collection("EscrowPayment")
                                    .doc(item.id)
                                    .delete()
                                    .then(() => {
                                      console.log("Document deleted successfully");
                                    })
                                    .catch((error) => {
                                      console.log("Error deleting document: ", error);
                                    });
                                }, 1800);
           
                                
                                
                                setTimeout(async () => {
                                  const addCollection = await db.collection('add');
                                  const querySnapshot = await addCollection.where('adID', '==', item.adID).get();
                    
                                  if (querySnapshot.empty) {
                                    console.log('No matching documents found');
                                    return;
                                  }
                    
                                  querySnapshot.forEach((doc) => {
                                    doc.ref
                                      .delete()
                                      .then(() => {
                                        console.log('Document deleted successfully');
                                      })
                                      .catch((error) => {
                                        console.log('Error deleting document: ', error);
                                      });
                                  });
                    
                                  
                                }, 1000);
        
                                alert("Payment Made And Logged Successfully!");

                              }}>
                            Payment Made
                            </CDBBtn>
                            </div>

                             
                            </div>
                              
                         
                        </div>
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



               