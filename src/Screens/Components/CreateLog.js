import React from "react";
import { CDBBtn, CDBIframe, CDBView } from "cdbreact";
import Sidebar from "../../Sidebar";
import Navbar from "../../Navbar";
import "./CreateLog.css";
import QRCode from "qrcode.react";
import { db } from "../Firebase/firebase";
import { onSnapshot, collection } from "firebase/firestore";

export const CreateLog = (props) => {

  const { datas } = props.location.state;
  const { datas2 } = props.location.state;
  const { datas3 } = props.location.state;
  const { datas4 } = props.location.state;
  const { datas5 } = props.location.state;
  const { datas6 } = props.location.state;
  const { datas7 } = props.location.state;
  const { datas8 } = props.location.state;

  const { datas9 } = props.location.state;


  const [adminName, setAdminName] = React.useState("");
  const [riderName, setRiderName] = React.useState("");
  const [phoneOwnerName, setPhoneOwnerName] = React.useState(datas);
  const [phoneOwnerContact, setPhoneOwnerContact] = React.useState(datas2);
  const [adId, setAdId] = React.useState("");
  const [brand, setBrand] = React.useState("");
  const [model, setModel] = React.useState(datas3);
  const [imeiNumber, setImeiNumber] = React.useState("");
  const [listOfAccessories, setListOfAccessories] = React.useState("");
  const [comments, setComments] = React.useState("");
  const [dateTime, setDateTime] = React.useState("");
  const [id, setId] = React.useState("");


  React.useEffect(() => {
    const newDateTime = new Date().toLocaleString();
    setDateTime(newDateTime);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    downloadQRCode();

    setTimeout(() => {
      postitemlog();
    }, 100);

 setTimeout(() => {


  
      db.collection("Incentre").doc(datas9).delete()
    }, 200);
    
    alert("Log Saved!");
  };

  const downloadQRCode = () => {
    const canvas = document.getElementById("qr-code");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "qr-code.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const postitemlog = async () => {

    try {
      // Add a new document to the "add" collection with the specified fields
      await db.collection("ItemLogs").add({
        AdminName: adminName,
        RiderName: riderName,
        PhoneOwner: datas,
        OwnerContact: datas2,
        Brand: brand,
        Model: datas3,
        ImeiNumber: imeiNumber,
        adIDs: datas4,
        Accessories: listOfAccessories,
        Comments: comments,
        DateTime: dateTime,
        buyer: datas5,
        seller: datas6,
        price: datas7,
        address: datas8
      });

      // Log a message to the console if the document was added successfully
      console.log("Item Log Posted!!!");
    } catch (error) {
      // Log any errors to the console
      console.error(error);
    }


    try {
      await db.collection("CreateReports").add({
        
        PhoneOwner: datas,
        OwnerContact: datas2,
        Brand: brand,
        Model: datas3,
        adIDs: datas4,
        buyer: datas5,
        seller: datas6,
        price: datas7,
        address: datas8
       
      });
      console.log("Create Reports Posted!!!");
    } catch (error) {
      console.error(error);
    }





  };

  return (
    <div className="d-flex profile">
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
        <div style={{ height: "100%" }}>
          <div
            style={{
              height: "calc(100% - 64px)",
              padding: "20px 5%",
              overflowY: "scroll",
            }}>
            <div style={{ margin: "0 auto", maxWidth: "1320px" }}>
              <div>
                <div class="containerilog">
                  <h2 id="createnotice">Create Item Log </h2>
                  <div id="noticediv">
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-sm">
                          <label id="input-label">Admin Name: </label>
                          <br></br>
                          <input
                            id="input-field"
                            type="text"
                            onChange={(e) => setAdminName(e.target.value)}
                          />
                        </div>

                        <div className="col-sm">
                          <label id="input-label">Rider Name:</label>
                          <br></br>
                          <input
                            id="input-field"
                            type="text"
                            onChange={(e) => setRiderName(e.target.value)}
                          />
                        </div>
                      </div>

                      <br></br>

                      <div className="row">
                        <div className="col-sm">
                          <label id="input-label"> Owner Name:</label>
                          <br></br>
                          <input style={{backgroundColor:'#D3D3D3'}}
                            id="input-field"
                            type="text"
                           value={datas}  
                          />
                        </div>
                        <div className="col-sm">
                          <label id="input-label"> Owner Contact:</label>
                          <br></br>
                          <input style={{backgroundColor:'#D3D3D3'}}
                            id="input-field"
                            type="text"
                            value={datas2}
                          />
                        </div>
                      </div>
                      <br></br>

                      <div className="row">
                        <div className="col-sm">
                          <label id="input-label">Ad Id:</label>
                          <br></br>
                          <input style={{backgroundColor:'#D3D3D3'}}
                            id="input-field"
                            type="text"
                            value={datas4}
                          />
                        </div>
                        <div className="col-sm">
                          <label id="input-label">Brand:</label>
                          <br></br>
                          <input
                            id="input-field"
                            type="text"
                            onChange={(e) => setBrand(e.target.value)}
                          />
                        </div>
                      </div>
                      <br></br>
                      <div className="row">
                        <div className="col-sm">
                          <label id="input-label">Model:</label>
                          <br></br>
                          <input style={{backgroundColor:'#D3D3D3'}}
                            id="input-field"
                            type="text"
                           value={datas3}
                          />
                        </div>

                        <div className="col-sm">
                          <label id="input-label">IMEI Number:</label>
                          <br></br>
                          <input
                            id="input-field"
                            type="text"
                            onChange={(e) => setImeiNumber(e.target.value)}
                          />
                          <br></br>
                        </div>
                      </div>

                      <br></br>

                      <div className="row">
                        <div className="col-sm">
                          <label id="input-label">List Of Accessories:</label>{" "}
                          <br></br>
                          <textarea
                            id="list-of-accessories"
                            onChange={(e) =>
                              setListOfAccessories(e.target.value)
                            }></textarea>
                        </div>
                        <div className="col-sm">
                          <label id="input-label">Comments:</label> <br></br>
                          <textarea
                            id="comments"
                            onChange={(e) =>
                              setComments(e.target.value)
                            }></textarea>
                        </div>
                      </div>

                      <br></br>

                      <CDBBtn
                        type="submit"
                        style={{ background: "#333", width: "100%" }}
                        flat
                        size="medium"
                        className="border-0 ml-auto px-2 my-2"
                        onClick={handleSubmit}>
                        {" "}
                        Save Log
                      </CDBBtn>
                    </form>

                 
                    
                      <div>
                        <h3>Phone ID: {datas4}</h3>
                      </div>
                   
                    <br></br>
                    <div
                      class="input-container"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "20",
                      }}>
                      <label id="input-label">QR Code:</label>
                      <QRCode
                        id="qr-code"
                        value={datas4}
                        size={256}
                        style={{ float: "inline-end" }}
                      />
                    </div>
                  </div>
                </div>

              
              </div>
              

              
              <footer className="d-flex mx-auto py-4">
                <small className="mx-auto my-1 text-center">
                  &copy; Certified Buy, 2023. All rights reserved.
                </small>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
