import React from "react";
import { CDBTable, CDBTableHeader, CDBBtn, CDBContainer } from "cdbreact";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "./Firebase/firebase";

export const SearchAds = () => {



  React.useEffect(() => {
    let unsub;
    const fetchCards = async () => {
      unsub = onSnapshot(collection(db, "add"), (snapshot) => {
        setData(
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
      unsub = onSnapshot(collection(db, "add"), (snapshot) => {
        const filteredData = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((item) =>
          String(item.title).toLowerCase().includes(searchQuery) ||
          String(item.description).toLowerCase().includes(searchQuery) ||
          String(item.price).toLowerCase().includes(searchQuery) ||
          String(item.date).toLowerCase().includes(searchQuery) ||
          String(item.adID).toLowerCase().includes(searchQuery) ||
          String(item.sellerID).toLowerCase().includes(searchQuery) 


          )

          .slice(0, 1); // modify this line to get the first 3 items
        setData(filteredData);
        setLoading(false);
      });
    };
    fetchCards();
    return unsub;
  }, [searchQuery]);


  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handleNext = () => {
   // setCurrentIndex((prevIndex) => (prevIndex + 1) % Data.length);
    setCurrentIndex(currentIndex+1);
  };

  const handlePrevious = () => {
  //  setCurrentIndex((prevIndex) => (prevIndex - 1 + Data.length) % Data.length);
    setCurrentIndex(currentIndex-1);
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

<h2 style={{ textAlign: "center", fontWeight:'bold' }}>Search Ads  </h2>


<div style={{backgroundColor:'#E1D9D1', borderRadius:40, height:'650px'}}>
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



              
                {Data.map((item) => (
                  
                  <div
                  className="card d-flex flex-column align-items-center"
                  style={{
                    borderRadius: 35,
                    backgroundColor: "#429E9D",
                    borderWidth: 4,
                    borderColor: "black",
                    width: "100%",
                    margin: "0 auto",
                    height:'600px'
                  }}
                >
                  <CDBBtn
                    style={{
                      background: "red",
                      width: 40,
                      alignSelf: "flex-end",
                      marginBottom: "2%",
                    }}
                    flat
                    size="small"
                    onClick={async () => db.collection("add").doc(item.id).delete()}
                  >
                    <text style={{ fontWeight: "bold", fontSize: 16 }}>X</text>
                  </CDBBtn>
                
                  <div className="row">

                    <div className="col-6">
                    
                    <h5
                        className="card-title"
                        style={{
                          textAlign: "center",
                          fontWeight: "bold",
                          marginBottom: 31,
                        }}
                      >
                        {item.title}
                      </h5>
                      <div className="row">
                        <div className="col-6">
                          <strong>Price: </strong> {item.price}
                        </div>
                        <div className="col-6">
                          <strong>Date: </strong> {item.date}
                        </div>
                      </div>
                      <strong>
                        <br />
                        Description:
                      </strong>{" "}
                      {item.description} <br />
                  
                    
                    </div>
                
                    <div className="col-6">

                      <div style={{marginBottom:'6%', borderWidth: 4,
                          borderColor: "brown"}}>
                            
                      {item.image && Array.isArray(item.image) && item.image.length > 0 ? (
                        <img
                          src={item.image[currentIndex]}
                          alt="ad-img"
                          style={{ width: "100%", height: 250, borderRadius: 20,  }}
                        />
                      ) : null}
                      <div className="row">
                        <div className="col-6">
                          <button onClick={handlePrevious}>Previous</button>
                        </div>
                        <div className="col-6">
                          <button onClick={handleNext}>Next</button>
                        </div>
                      </div>
                      </div>

                      {/* Rest of the card content */}
                     
                      <div>
                      <br />
                      <strong>Seller ID: </strong> {item.sellerID} <br />
                      <br />
                      <strong>Ad ID: </strong> {item.adID} <br />
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
  );
};