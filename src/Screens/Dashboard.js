import React from "react";
import {
  CDBBtn,
  CDBProgress,
  CDBTable,
  CDBTableHeader,
  CDBTableBody,
  CDBContainer,
  CDBLink,
} from "cdbreact";
import { Pie, Bar } from "react-chartjs-2";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import "./Dashboard.css";
import { db } from "./Firebase/firebase";
import { NavLink } from "react-router-dom";
import {
  onSnapshot,
  collection,
  query,
  limit,
  orderBy,
} from "firebase/firestore";
import firebase from "firebase/compat/app";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export const Dashboard = () => {
  const data = {
    chart1: {
      labels: ["Apple", "Samsung", "Xiaomi"],
      datasets: [
        {
          label: "My First dataset",
          backgroundColor: ["green", "blue", "purple"],
          borderWidth: 0,
          data: [35, 40, 25],
        },
      ],
    },
    chart2: {
      labels: ["Apple", "Samsung", "Xiaomi"],
      datasets: [
        {
          label: "My First dataset",
          backgroundColor: "rgba(255, 153, 51, 0.8)",
          borderColor: "rgb(102, 51, 0)",
          data: [65, 59, 75, 81, 56, 55, 40],
        },
        {
          label: "My Second dataset",
          backgroundColor: "#2F80ED",
          borderColor: "rgb(0, 41, 102)",
          data: [38, 48, 60, 79, 96, 47, 80],
        },
      ],
    },
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    legend: { display: false },
    scales: {
      xAxes: [
        {
          ticks: {
            display: false,
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            display: false,
          },
        },
      ],
    },
  };

  const [collectionSize, setCollectionSize] = React.useState(0);
  const [listings, setnumberlistings] = React.useState(0);

  React.useEffect(() => {
    // Reference to your Firestore collection
    const collectionRef = firebase.firestore().collection("ItemLogs");

    // Fetch the documents in the collection
    collectionRef.get().then((querySnapshot) => {
      // Get the size of the QuerySnapshot
      const size = querySnapshot.size;
      setCollectionSize(size);
    });
  }, []);

  React.useEffect(() => {
    // Reference to your Firestore collection
    const collectionRef = firebase.firestore().collection("add");

    // Fetch the documents in the collection
    collectionRef.get().then((querySnapshot) => {
      // Get the size of the QuerySnapshot
      const size = querySnapshot.size;
      setnumberlistings(size);
    });
  }, []);

  const [name, setname] = React.useState("");
  const [notice, setnotice] = React.useState("");
  const [uname, setuname] = React.useState(null);
  const [unotice, setunotice] = React.useState(null);

  const [ndata, setndata] = React.useState([]);
  const [rdata, setrdata] = React.useState([]);
  const [qdata, setqdata] = React.useState([]);

  const [currentDate, setCurrentDate] = React.useState(null);
  const [currentTime, setCurrentTime] = React.useState(null);

  const handleChange = (event) => {
    // Set the code input state to the current value of the input field
    setname(event.target.value);
  };

  const handleChange2 = (event) => {
    // Set the code input state to the current value of the input field
    setnotice(event.target.value);
  };

  const postnotice = async () => {
    try {
      // Add a new document to the "add" collection with the specified fields
      await db.collection("NoticeBoard").add({
        names: name,
        notices: notice,
        dates: currentDate,
        times: currentTime,
      });

      // Log a message to the console if the document was added successfully
      console.log("Add Posted!!!");
    } catch (error) {
      // Log any errors to the console
      console.error(error);
    }
  };

  const updateDateTime = () => {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    setCurrentDate(date);
    setCurrentTime(time);
  };

  React.useEffect(() => {
    updateDateTime();
  }, [notice]);

  React.useEffect(() => {
    let unsub;
    const fetchCards = async () => {
      unsub = onSnapshot(collection(db, "NoticeBoard"), (snapshot) => {
        const sortedDocs = snapshot.docs.sort((a, b) => {
          // First, compare the "dates" field
          const dateComparison = a.data().dates.localeCompare(b.data().dates);

          // If the "dates" are the same, compare the "times" field
          if (dateComparison === 0) {
            return a.data().times.localeCompare(b.data().times);
          }

          // Otherwise, return the comparison based on the "dates" field
          return dateComparison;
        });

        const limitedDocs = sortedDocs.slice(0, 3);

        setndata(
          limitedDocs.map((doc) => ({
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
      unsub = onSnapshot(collection(db, "ReportAd"), (snapshot) => {
        const limitedDocs = snapshot.docs.slice(0, 4);
        setrdata(
          limitedDocs.map((doc) => ({
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
      unsub = onSnapshot(collection(db, "UserQueries"), (snapshot) => {
        const limitedDocs = snapshot.docs.slice(0, 4);
        setqdata(
          limitedDocs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      });
    };

    fetchCards();
    return unsub;
  }, []);

  const dataclick = () => {
    if (name.length > 1 && notice.length > 1) {
      postnotice();
      updateDateTime();
      window.location.reload();
    } else {
      alert("Name or Notice Field is empty!");
    }
  };

  const [reportprice, setReportPrice] = React.useState("");

  const handleReportPriceChange = (event) => {
    // Ensure that only numeric values are entered
    const value = event.target.value.replace(/[^0-9]/g, "");
    setReportPrice(value);
  };

  const [target, settarget] = React.useState(100000);
  const [rprice, setrprice] = React.useState(1000);

  const progressPercentage = ((collectionSize * rprice) / target) * 100;

  const handleTargetPriceChange = (e) => {
    const value = e.target.value;
    settarget(value);
  };

  React.useEffect(() => {
    const storedTarget = localStorage.getItem("targetPrice");
    if (storedTarget) {
      settarget(storedTarget);
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem("targetPrice", target);
  }, [target]);

  const fetchReportPrice = async () => {
    try {
      const docRef = doc(db, "ReportPrice", "xMOTnUjN2rNWT4FybEvI");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const reportPrice = docSnap.data().reportprice;
        // Use the reportPrice value here
        console.log(reportPrice);
        setrprice(reportPrice);
      } else {
        console.log("Document not found");
      }
    } catch (error) {
      console.log("Error fetching document:", error);
    }
  };

  React.useEffect(() => {
    fetchReportPrice();
  }, []);

  // Call the fetchReportPrice function to fetch the reportprice field
  fetchReportPrice();

  const [phoneNumber, setPhoneNumber] = React.useState("923214152205");

  const handleLinkClick = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber}`;
    window.open(whatsappUrl, "_blank");
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
          <div style={{ height: "calc(100% - 64px)", overflowY: "scroll" }}>
            <div className="d-flex card-section">
              <div className="cards-container">
                <div className="card-bg w-100 border d-flex flex-column">
                  <div className="p-4 d-flex flex-column h-100">
                    <div className="d-flex align-items-center justify-content-between">
                      <h4 className="m-0 h5 font-weight-bold text-dark">
                        Profit
                      </h4>
                      <div className="py-1 px-2 bg-grey rounded-circle">
                        <i className="fas fa-suitcase"></i>
                      </div>
                    </div>
                    <h4 className="my-4 text-right text-dark h2 font-weight-bold">
                      Rs {collectionSize * rprice}
                    </h4>
                    <CDBProgress
                      value={progressPercentage}
                      height={18}
                      colors="primary"></CDBProgress>
                    <p className="mt-2 text-success small">
                      <i className="fas fa-angle-up p-0"></i> Target
                      <span
                        style={{ fontSize: "0.95em" }}
                        className="ml-2 font-weight-bold text-muted">
                        Rs {target}
                      </span>
                    </p>

                    <h4 className="m-13 h5 font-weight-bold text-dark">
                      Set Target:
                    </h4>
                    <div className="row">
                      <div className="col-6">
                        <input
                          style={{ background: "white", width: "100%" }}
                          type="number"
                          value={target}
                          onChange={handleTargetPriceChange}
                        />
                      </div>
                    </div>

                    <div>
                      <h4
                        className="m-11 h5 font-weight-bold text-dark"
                        style={{ marginBottom: "10px", marginTop: "9px" }}>
                        Report Price: Rs {rprice}
                      </h4>

                      <h4 className="m-13 h5 font-weight-bold text-dark">
                        Set Report Price:
                      </h4>

                      <input
                        style={{ background: "white", width: "100%" }}
                        type="number"
                        value={reportprice}
                        onChange={handleReportPriceChange}
                      />
                    </div>
                    <CDBBtn
                      style={{ background: "#333", width: "100%" }}
                      onClick={async () => {
                        try {
                          const docRef = doc(
                            db,
                            "ReportPrice",
                            "xMOTnUjN2rNWT4FybEvI"
                          );
                          await updateDoc(docRef, {
                            reportprice: reportprice,
                          });
                          
                          alert("Price Updated!");
                          window.location.reload();
                        } catch (error) {
                          console.error("Error updating document:", error);
                        }
                      }}>
                      Set Report Price
                    </CDBBtn>
                  </div>
                </div>

                <div className="card-bg w-100 border d-flex flex-column">
                  <div className="p-4 d-flex flex-column h-100">
                    <div className="d-flex align-items-center justify-content-between">
                      <h4 className="m-0 h5 font-weight-bold text-dark">
                        Brands
                      </h4>
                      <div className="px-2 py-1 bg-grey rounded-circle">
                        <i className="fas fa-chart-line"></i>
                      </div>
                    </div>

                    <div className="mt-3 d-flex justify-content-between">
                      <CDBContainer
                        style={{
                          width: "250px",
                          height: "150px",
                          margin: "0 -4rem",
                        }}
                        className="p-0">
                        <Pie
                          data={data.chart1}
                          options={
                            ({ responsive: true },
                            { maintainAspectRatio: false },
                            { legend: { display: false } })
                          }
                        />
                      </CDBContainer>
                      <div className="text-right w-25">
                        <p className="m-0">Apple</p>
                        <p className="text-success small">10.57</p>
                        <div>
                          <div
                            className="d-flex align-items-center justify-content-between"
                            style={{ color: "blue" }}>
                            <span
                              style={{
                                fontSize: "3em",
                                margin: "-2rem 0px -1.5rem 0px",
                              }}>
                              &#8226;
                            </span>
                            <span className="small">Samsung</span>
                          </div>

                          <div
                            className="d-flex align-items-center justify-content-between"
                            style={{ color: "green" }}>
                            <span
                              style={{
                                fontSize: "3em",
                                margin: "-2rem 0px -1.5rem 0px",
                              }}>
                              &#8226;
                            </span>
                            <span className="small">Apple</span>
                          </div>

                          <div
                            className="d-flex align-items-center justify-content-between"
                            style={{ color: "purple" }}>
                            <span
                              style={{
                                fontSize: "3em",
                                margin: "-2rem 0px -1.5rem 0px",
                              }}>
                              &#8226;
                            </span>
                            <span className="small">Xiaomi</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h3>Number of Active Listings: {listings}</h3>

                    <a href={`https://wa.me/${phoneNumber}`} onClick={handleLinkClick}>
      {phoneNumber}
    </a>

                  </div>
                </div>

                <div className="card-bg w-100 border d-flex flex-column">
                  <h2 id="createnotice">Create Notice </h2>
                  <div id="noticediv">
                    <form>
                      <label id="noticeB_label">Admin Name: </label>
                      <br></br>

                      <input
                        type="text"
                        placeholder="Enter Name"
                        cols={40}
                        onChange={handleChange}
                        value={name}
                      />
                    </form>
                    <br></br>

                    <label id="noticeB_label">Notice: </label>
                    <br></br>
                    <textarea
                      className="col-sm"
                      placeholder="... Enter Notice"
                      onChange={handleChange2}
                      value={notice}
                      rows={4}
                    />

                    <CDBBtn
                      style={{ background: "#333", width: "100%" }}
                      flat
                      size="medium"
                      className="border-0 ml-auto px-2 my-2"
                      onClick={dataclick}>
                      {" "}
                      Create Notice
                    </CDBBtn>
                  </div>
                </div>

                <div className="card-bg  ">
                  <h2 id="createnotice"> Notice Board </h2>

                  {ndata.map((item) => (
                    <div>
                      <div
                        className="card"
                        style={{
                          borderBottom: "3px solid black",
                          padding: "10px",
                          margin: "10px",
                          backgroundColor: "silver",
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
                            db.collection("NoticeBoard").doc(item.id).delete()
                          }>
                          {" "}
                          <text style={{ fontWeight: "bold", fontSize: 16 }}>
                            {" "}
                            X{" "}
                          </text>{" "}
                        </CDBBtn>
                        <strong>Admin Name:</strong>
                        <br></br>
                        <h5>{item.names}</h5>
                        <strong>Time/Date: </strong>
                        {item.times} / {item.dates} <br></br>
                        <strong>Notice: </strong> <br></br>
                        <textarea
                          id="input-field"
                          type="text"
                          defaultValue={item.notices}
                          rows={3}
                          onChange={(e) => setunotice(e.target.value)}
                        />
                        <div className="col-md-12">
                          <br></br>

                          <CDBBtn
                            style={{ background: "#333", width: "100%" }}
                            flat
                            size="medium"
                            className="border-0 ml-auto px-2 my-2"
                            onClick={async () => {
                              try {
                                // Add a new document to the "add" collection with the specified fields
                                await db
                                  .collection("NoticeBoard")
                                  .doc(item.id)
                                  .set({
                                    names: item.names,
                                    notices: unotice,
                                    dates: currentDate,
                                    times: currentTime,
                                  });

                                // Log a message to the console if the document was added successfully
                                console.log("Add Posted!!!");
                              } catch (error) {
                                // Log any errors to the console
                                console.error(error);
                              }
                            }}>
                            {" "}
                            Update Notice
                          </CDBBtn>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  className="card-bg w-100 border d-flex flex-column "
                  style={{ gridRow: "span 2" }}>
                  <h2 id="createnotice">Reported Ads </h2>

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
                        <strong>Date: </strong> {item.date} <br></br>
                        <strong>Report Cause: </strong> {item.report} <br></br>
                        <strong>Ad ID: </strong> {item.adID} <br></br>
                        <strong>Reported By: </strong> {item.reportedBy}{" "}
                        <br></br>
                        <div className="col-md-12">
                          <br></br>

                          <NavLink
                            exact
                            to={{
                              pathname: "/searchlisting",
                              state: {
                                dataz: item.adID,
                              },
                            }}
                            activeClassName="activeClicked">
                            <CDBBtn
                              style={{ background: "#333", width: "100%" }}
                              flat
                              size="medium"
                              onClick={async () => {
                                setTimeout(() => {
                                  db.collection("ReportAd")
                                    .doc(item.id)
                                    .delete();
                                }, 10000);
                              }}>
                              Check AD
                            </CDBBtn>
                          </NavLink>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  className="card-bg w-100 border d-flex flex-column "
                  style={{ gridRow: "span 2" }}>
                  <h2 id="createnotice">User Queries </h2>

                  {qdata.map((item) => (
                    <div>
                      <div
                        className="card"
                        style={{
                          borderBottom: "3px solid black",
                          padding: "20px",
                          margin: "10px",
                        }}>
                        <CDBBtn
                          style={{
                            background: "red",
                            width: 40,
                            alignSelf: "flex-end",
                            marginTop: "-2%",
                          }}
                          flat
                          size="small"
                          onClick={async () =>
                            db.collection("UserQueries").doc(item.id).delete()
                          }>
                          {" "}
                          <text style={{ fontWeight: "bold", fontSize: 16 }}>
                            {" "}
                            X{" "}
                          </text>{" "}
                        </CDBBtn>
                        <br></br>
                        <strong>Date: </strong> {item.date} <br></br>
                        <strong>Name: </strong> {item.name} <br></br>
                        <strong>Email: </strong> {item.email} <br></br>
                        <strong style={{ paddingTop: 10 }}>Query: </strong>{" "}
                        {item.query} <br></br>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <footer className="mx-auto my-3 text-center">
              <small>
                &copy; Certified Buy Center, 2023 corp. All rights are always
                reserveds.
              </small>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};
