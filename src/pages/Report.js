import React from "react";
import { CDBTable, CDBTableHeader, CDBTableBody, CDBContainer } from "cdbreact";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import { db } from "./firebase";
import { onSnapshot, collection } from "firebase/firestore";

export const Reports = () => {
  const [ndata, setndata] = React.useState([]);

  const [data, setData] = React.useState([
    {
      names: ["Imran Khan"],
      phone: ["032678879"],
      address: ["395 Nespak"],
      model: ["Galaxy s10"],
    },

    {
      names: ["Qasim"],
      phone: ["032678879"],
      address: ["395 Nespak"],
      model: ["Realme 7 prp"],
    },

    {
      names: ["Junaid"],
      phone: ["032678879"],
      address: ["395 Nespak"],
      model: ["Realme 7 prp"],
    },

    {
      names: ["Azam"],
      phone: ["032678879"],
      address: ["395 Nespaksssssaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaas"],
      model: ["Realme 7 prp"],
    },
  ]);

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
            <div className="d-flex card-section">
              <div className="cards-container">
                {data.map((item) => (
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{item.names}</h5>
                      <p className="card-text">{item.model}</p>
                      <div className="map-container"></div>
                    </div>
                  </div>
                ))}
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
