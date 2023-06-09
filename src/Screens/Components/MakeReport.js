import React from "react";
import {
  CDBTable,
  CDBTableHeader,
  CDBTableBody,
  CDBContainer,
  CDBInput,
  CDBBtn,
} from "cdbreact";
import SidebarInspector from "../../InspSidebar";
import Navbar from "../../Navbar";
import { db, storage } from "../Firebase/firebase";
import firebase from 'firebase/compat/app';
import { onSnapshot, collection } from "firebase/firestore";
import Dropzone from "react-dropzone";
import "./Makereport.css";
import DropdownPicker from "./Picker";
import { NavLink } from "react-router-dom";

export const MakeReport = (props) => {
  const [ndata, setndata] = React.useState([]);

  const [imageArray, setImageArray] = React.useState([]);

  const { data } = props.location.state;
  const { data2 } = props.location.state;
  const { data3 } = props.location.state;
  const { data4 } = props.location.state;
  const { data5 } = props.location.state;
  const { data6 } = props.location.state;
  const { data7 } = props.location.state;
  const { data11 } = props.location.state;

  const [currentDate, setCurrentDate] = React.useState(null);

  const updateDateTime = () => {
    const now = new Date();
    const date = now.toLocaleDateString();
    setCurrentDate(date);
  };

  React.useEffect(() => {
    updateDateTime();
  }, []);

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

  const [images, setImages] = React.useState([]);

  const handleDrop = (acceptedFiles) => {
    // Create an array of objects with the image file, a unique ID, and other details for uploading
    const newImages = acceptedFiles.map((file) => ({
      id: Date.now(),
      file: file,
      name: file.name,
      type: file.type,
      size: file.size,
    }));
    // Concatenate the new images with the existing images
    setImages([...images, ...newImages]);
  };

  const uploadImages = async () => {
    var files = images.map(function (item) {
      return item.file;
    });

    // Function to upload a single file and return a Promise
    function uploadFile(file) {
      return new Promise(function (resolve, reject) {
        // Generate a unique file name
        var fileName = Date.now() + "_" + file.name;

        // Create a reference to the file location in Firebase Storage
        const imageRef = storage.ref("Ads").child(fileName);

        // Upload the file to Firebase Storage
        imageRef
          .put(file)
          .then(function (snapshot) {
            // File uploaded successfully, get the download URL
            snapshot.ref
              .getDownloadURL()
              .then(function (downloadURL) {
                resolve(downloadURL);
              })
              .catch(function (error) {
                reject(error);
              });
          })
          .catch(function (error) {
            reject(error);
          });
      });
    }

    // Array to store the promises for each file upload
    var uploadPromises = files.map(function (file) {
      return uploadFile(file);
    });

    // Upload all files and retrieve the URLs
    Promise.all(uploadPromises)
      .then(function (downloadURLs) {
        alert("Images Ready!");
        console.log("Files uploaded successfully");
        console.log("Download URLs:", downloadURLs);
        setImageArray(downloadURLs);

        // You can use the downloadURLs as needed (e.g., save them to a database)
      })
      .catch(function (error) {
        console.error("Error uploading files:", error);
      });
  };

  const handleDelete = (id) => {
    // Filter out the image with the specified ID
    setImages(images.filter((img) => img.id !== id));
  };

  const handleOnChange = (event) => {
    setValue(Number(event.target.value));
  };



  const [screencondition, setscreencondition] = React.useState("Excellent");
  const [touchfunc, settouchfunc] = React.useState("Excellent");
  const [brightness, setbrightness] = React.useState("Excellent");
  const [screendefect, setscreendefect] = React.useState("Excellent");

  const [batteryhealth, setbathealth] = React.useState("Excellent");
  const [batteryperformance, setbatperfo] = React.useState("Excellent");
  const [batterydamage, setbatdamage] = React.useState("Excellent");

  const [frontcam, setfrontcam] = React.useState("Excellent");
  const [backcam, setbackcam] = React.useState("Excellent");
  const [qualityfocus, setqualityfocus] = React.useState("Excellent");
  const [camdamage, setcamdamage] = React.useState("Excellent");

  const [powerbtn, setpowerbtn] = React.useState("Excellent");
  const [volumebtn, setvolumebtn] = React.useState("Excellent");
  const [homebtn, sethomebtn] = React.useState("Excellent");
  const [fingerprintSensor, setfingerprintSensor] = React.useState("Excellent");

  const [os, setos] = React.useState("Excellent");
  const [softwaredmg, setsoftwaredmg] = React.useState("Excellent");
  const [virus, setvirus] = React.useState("Excellent");

  const [charger, setcharger] = React.useState("Excellent");
  const [headset, setheadset] = React.useState("Excellent");
  const [accessories, setaccessories] = React.useState("Excellent");

  const [wifi, setwifi] = React.useState("Excellent");
  const [bluetooth, setbluetooth] = React.useState("Excellent");

  const [network, setnetwork] = React.useState("Excellent");
  const [fourg, set4g] = React.useState("Excellent");
  const [pta, setpta] = React.useState("Excellent");

  const [compass, setcompass] = React.useState("Excellent");
  const [gyroscope, setgyroscope] = React.useState("Excellent");
  const [simsd, setsimsd] = React.useState("Excellent");
  const [gps, setgps] = React.useState("Excellent");
  const [dualsim, setdualsim] = React.useState("Excellent");

  const [comment, setcomment] = React.useState("Excellent");
  // value is rating given by admin
  const [value, setValue] = React.useState(1);

  const [name, setname] = React.useState("");
  const [quali, setquali] = React.useState("");
  const [experience, setexperience] = React.useState("");

  const [brand, setbrand] = React.useState("");
  const [model, setmodel] = React.useState("");
  const [imei, setimei] = React.useState("");
  const [warranty, setwarranty] = React.useState("");
  const [color, setbodycolor] = React.useState("");

  const [mobstorage, setmobstorage] = React.useState("Excellent");
  const [avstorage, setavstorage] = React.useState("Excellent");
  const [ram, setram] = React.useState("Excellent");


  const [body, setbody] = React.useState("Excellent");
  const [scratches, setscratches] = React.useState("Excellent");
  const [hjdmg, sethjdmg] = React.useState("Excellent");
  const [cpdmg, setcpdmg] = React.useState("Excellent");


  const [score, setscore] = React.useState(0);

  const [displayscore, setdisplayscore] = React.useState(0);
  const [exteriorscore, setexteriorscore] = React.useState(0);
  const [camerascore, setcamerascore] = React.useState(0);

  React.useEffect(() => {

    let newScore = 0;

    // Screen
  
    if ( screencondition === "Excellent") {
      newScore += 0.4 ;
    }
    if ( touchfunc === "Excellent") {
      newScore += 0.4 ;
    }
    if ( brightness === "Excellent") {
      newScore += 0.4 ;
    }

    if ( screencondition === "Workable") {
      newScore += 0.2 ;
    }
    if ( touchfunc === "Workable") {
      newScore += 0.2 ;
    }
    if ( brightness === "Workable") {
      newScore += 0.2 ;
    }

    //battery
  
    if ( batteryhealth === "Excellent") {
      newScore += 0.4 ;
    }

    if ( batteryperformance === "Excellent") {
      newScore += 0.3 ;
    }
  
    if ( batteryhealth === "Workable") {
      newScore += 0.2 ;
    }

    if ( batteryperformance === "Workable") {
      newScore += 0.2 ;
    }

//camera

    if ( frontcam === "Excellent") {
      newScore += 0.3 ;
    }

    if ( backcam === "Excellent") {
      newScore += 0.3 ;
    }

    if ( qualityfocus === "Excellent") {
      newScore += 0.3 ;
    }


    if ( frontcam === "Workable") {
      newScore += 0.2 ;
    }

    if ( backcam === "Workable") {
      newScore += 0.2 ;
    }

    if ( qualityfocus === "Workable") {
      newScore += 0.2 ;
    }

    //btn

    if ( powerbtn === "Excellent") {
      newScore += 0.3 ;
    }

    if ( volumebtn === "Excellent") {
      newScore += 0.3 ;
    }
    

    if ( powerbtn === "Workable") {
      newScore += 0.2 ;
    }

    if ( volumebtn === "Workable") {
      newScore += 0.2 ;
    }
  
    //Connectivity

    if ( network === "Excellent") {
      newScore += 0.3 ;
    }

    if ( wifi === "Excellent") {
      newScore += 0.3 ;
    }

    if ( bluetooth === "Excellent") {
      newScore += 0.3 ;
    }

    if ( pta === "Yes") {
      newScore += 0.4 ;
    }

    if ( fourg === "Yes") {
      newScore += 0.3 ;
    }


    if ( network === "Workable") {
      newScore += 0.2 ;
    }

    if ( wifi === "Workable") {
      newScore += 0.2 ;
    }

    if ( bluetooth === "Workable") {
      newScore += 0.2 ;
    }
  
    setscore(newScore*(0.8));
  }, [comment]);



  React.useEffect(() => {
  
  setscore( value + score)
  }, [value]);


  React.useEffect(() => {
  
    let ExtScore = 0;

    if ( body === "Excellent") {
      ExtScore += 2.5 ;
    }

    if ( body === "Workable") {
      ExtScore += 1.5 ;
    }

    if ( scratches === "No") {
      ExtScore += 2.5 ;
    }

    if ( hjdmg === "No") {
      ExtScore += 2.5 ;
    }

    if ( cpdmg === "No") {
      ExtScore += 2.5 ;
    }

setexteriorscore(ExtScore);
   
    }, [value]);


    React.useEffect(() => {
  
      let DispScore = 0;

      if ( screencondition === "Excellent") {
        DispScore += 3.3 ;
      }

      if ( touchfunc === "Excellent") {
        DispScore += 3.3;
      }

      if ( brightness === "Excellent") {
        DispScore += 3.3 ;
      }

      if ( screencondition === "Workable") {
        DispScore += 2.1 ;
      }

      if ( touchfunc === "Workable") {
        DispScore += 2.1 ;
      }

      if ( brightness === "Workable") {
        DispScore += 2.1 ;
      }

      setdisplayscore(DispScore);
     
      }, [value]);


      React.useEffect(() => {
  
        let CamScore = 0;
  
        if ( frontcam === "Excellent") {
          CamScore += 3.3 ;
        }

        if ( backcam === "Excellent") {
          CamScore += 3.3 ;
        }

        if ( qualityfocus === "Excellent") {
          CamScore += 3.3 ;
        }
        
        if ( frontcam === "Workable") {
          CamScore += 2.1 ;
        }

        if ( backcam === "Workable") {
          CamScore += 2.1 ;
        }

        if ( qualityfocus === "Workable") {
          CamScore += 2.1 ;
        }
  
        setcamerascore(CamScore);
       
        }, [value]);




  return (
    <div className="dashboard d-flex">
      <div>
        <SidebarInspector />
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
        <div style={{ height: "100%", backgroundColor: "silver" }}>
          <div
            style={{
              padding: "20px 5%",
              height: "calc(100% - 64px)",
              overflowY: "scroll",
            }}>
            <h1 style={{ textAlign: "center" }}>Make Report </h1> <br></br>
            <div style={{ backgroundColor: "white", margin: 20 }}>
              <Dropzone onDrop={handleDrop}>
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p style={{ textAlign: "center" }}>
                      <strong>
                        Drag and drop images here, or click to select files
                      </strong>
                    </p>
                  </div>
                )}
              </Dropzone>
              <div className="image-grid">
                {images.map(({ id, file }) => (
                  <div key={id} className="image-container">
                    <img src={URL.createObjectURL(file)} alt="uploaded image" />
                    <button onClick={() => handleDelete(id)}>X</button>
                  </div>
                ))}
              </div>
            </div>
            <div style={{display:'flex', justifyContent:'center'}}>
              <button onClick={uploadImages} title="Click me">
                Upload Pictures
              </button>
            </div>
            <br></br>
            <div className="d-flex card-section">
              <div
                className="cards-container"
                style={{ backgroundColor: "grey" }}>
                <div
                  className="card"
                  style={{
                    borderBottom: "3px solid black",
                    padding: "20px",
                    margin: "10px",
                  }}>
                  <h3
                    style={{
                      borderBottom: "2px solid black",
                      paddingBottom: 11,
                    }}>
                    About Inspector
                  </h3>

                  <label id="mylabel"> Name:</label>
                  <CDBInput
                    type="search"
                    size="md"
                    hint="Enter Name"
                    className="mb-n4 mt-n3 input-nav"
                    value={name}
                    onChange={(event) => setname(event.target.value)}
                  />

                  <label id="mylabel"> Qualification:</label>
                  <CDBInput
                    type="search"
                    size="md"
                    hint="Enter Qualification"
                    className="mb-n4 mt-n3 input-nav"
                    value={quali}
                    onChange={(event) => setquali(event.target.value)}
                  />

                  <label id="mylabel">Experience:</label>
                  <CDBInput
                    type="search"
                    size="md"
                    hint="Enter Experience"
                    className="mb-n4 mt-n3 input-nav"
                    value={experience}
                    onChange={(event) => setexperience(event.target.value)}
                  />
                </div>

                <div
                  className="card"
                  style={{
                    borderBottom: "3px solid black",
                    padding: "20px",
                    margin: "10px",
                  }}>
                  <h3
                    style={{
                      borderBottom: "2px solid black",
                      paddingBottom: 11,
                    }}>
                    About Device
                  </h3>

                  <label id="mylabel"> Brand:</label>
                  <CDBInput
                    type="search"
                    size="md"
                    hint="Enter Brand"
                    className="mb-n4 mt-n3 input-nav"
                    value={brand}
                    onChange={(event) => setbrand(event.target.value)}
                  />

                  <label id="mylabel"> Model:</label>
                  <CDBInput
                    type="search"
                    size="md"
                    hint="Enter Model"
                    className="mb-n4 mt-n3 input-nav"
                    value={model}
                    onChange={(event) => setmodel(event.target.value)}
                  />

                  <label id="mylabel"> Imei Number:</label>
                  <CDBInput
                    type="search"
                    size="md"
                    hint="Enter Imei"
                    className="mb-n4 mt-n3 input-nav"
                    value={imei}
                    onChange={(event) => setimei(event.target.value)}
                  />

                  <label id="mylabel"> Warranty Status:</label>
                  <CDBInput
                    type="search"
                    size="md"
                    hint="Enter Warranty"
                    className="mb-n4 mt-n3 input-nav"
                    value={warranty}
                    onChange={(event) => setwarranty(event.target.value)}
                  />

                </div>


                <div
                  className="card"
                  style={{
                    borderBottom: "3px solid black",
                    padding: "20px",
                    margin: "10px",
                  }}>
                  <h3
                    style={{
                      borderBottom: "2px solid black",
                      paddingBottom: 11,
                    }}>
                    Exterior Report
                  </h3>
                  <br></br>

                  
                  <label id="mylabel">Body Condition:</label>{" "}
                  <DropdownPicker
                    defaultValue="Excellent"
                    onChange={(newValue) => setbody(newValue)}
                  />
                  <label id="mylabel">Visible Scratches/Dents ?</label>{" "}
                  <DropdownPicker
                    defaultValue="Excellent"
                    onChange={(newValue) => setscratches(newValue)}
                  />
                  <label id="mylabel">Headphone Jack Damaged?</label>{" "}
                  <DropdownPicker
                    defaultValue="Excellent"
                    onChange={(newValue) => sethjdmg(newValue)}
                  />
                  <label id="mylabel">Charging Port Damaged?</label>{" "}
                  <DropdownPicker
                    defaultValue="Excellent"
                    onChange={(newValue) => setcpdmg(newValue)}
                  />

                 <label id="mylabel"> Body Color:</label>
                  <CDBInput
                    type="search"
                    size="md"
                    hint="Enter Body Color"
                    className="mb-n4 mt-n3 input-nav"
                    value={color}
                    onChange={(event) => setbodycolor(event.target.value)}
                  />

                </div>

                <div
                  className="card"
                  style={{
                    borderBottom: "3px solid black",
                    padding: "20px",
                    margin: "10px",
                  }}>
                  <h3
                    style={{
                      borderBottom: "2px solid black",
                      paddingBottom: 11,
                    }}>
                    Display Report
                  </h3>
                  <br></br>
                  <label id="mylabel">Screen Condition:</label>{" "}
                  <DropdownPicker
                    defaultValue="Excellent"
                    onChange={(newValue) => setscreencondition(newValue)}
                  />
                  <label id="mylabel">TouchScreen Response:</label>{" "}
                  <DropdownPicker
                    defaultValue="Excellent"
                    onChange={(newValue) => settouchfunc(newValue)}
                  />
                  <label id="mylabel">Brightness & Clarity:</label>{" "}
                  <DropdownPicker
                    defaultValue="Excellent"
                    onChange={(newValue) => setbrightness(newValue)}
                  />
                  <label id="mylabel">Dead Pixels & Burns:</label>{" "}
                  <DropdownPicker
                    defaultValue="Excellent"
                    onChange={(newValue) => setscreendefect(newValue)}
                  />
                </div>

                <div
                  className="card"
                  style={{
                    borderBottom: "3px solid black",
                    padding: "20px",
                    margin: "10px",
                  }}>
                  <h3
                    style={{
                      borderBottom: "2px solid black",
                      paddingBottom: 11,
                    }}>
                    Battery Report
                  </h3>
                  <label id="mylabel">Battery Health:</label>{" "}
                  <DropdownPicker
                    defaultValue="Excellent"
                    onChange={(newValue) => setbathealth(newValue)}
                  />
                  <label id="mylabel">Battery Performance:</label>{" "}
                  <DropdownPicker
                    defaultValue="Excellent"
                    onChange={(newValue) => setbatperfo(newValue)}
                  />
                  <label id="mylabel">Swelling & Damage:</label>{" "}
                  <DropdownPicker
                    defaultValue="Excellent"
                    onChange={(newValue) => setbatdamage(newValue)}
                  />
                </div>

                <div
                  className="card"
                  style={{
                    borderBottom: "3px solid black",
                    padding: "20px",
                    margin: "10px",
                  }}>
                  <h3
                    style={{
                      borderBottom: "2px solid black",
                      paddingBottom: 11,
                    }}>
                    Camera Report
                  </h3>
                  <label id="mylabel">Front Camera Status:</label>{" "}
                  <DropdownPicker
                    defaultValue="Excellent"
                    onChange={(newValue) => setfrontcam(newValue)}
                  />
                  <label id="mylabel">Back Camera Status:</label>{" "}
                  <DropdownPicker
                    defaultValue="Excellent"
                    onChange={(newValue) => setbackcam(newValue)}
                  />
                  <label id="mylabel">Image Quality & Focus:</label>{" "}
                  <DropdownPicker
                    defaultValue="Excellent"
                    onChange={(newValue) => setqualityfocus(newValue)}
                  />
                  <label id="mylabel">Camera Issues:</label>{" "}
                  <DropdownPicker
                    defaultValue="Excellent"
                    onChange={(newValue) => setcamdamage(newValue)}
                  />
                </div>

                <div
                  className="card"
                  style={{
                    borderBottom: "3px solid black",
                    padding: "20px",
                    margin: "10px",
                  }}>
                  <h3
                    style={{
                      borderBottom: "2px solid black",
                      paddingBottom: 11,
                    }}>
                    Connectivity Report
                  </h3>
                  <label id="mylabel">Pta Approved</label>{" "}
                  <DropdownPicker
                    defaultValue="Excellent"
                    onChange={(newValue) => setpta(newValue)}
                  />
                  <label id="mylabel">Network Status:</label>{" "}
                  <DropdownPicker
                    defaultValue="Excellent"
                    onChange={(newValue) => setnetwork(newValue)}
                  />
                  <label id="mylabel">4g Enabled:</label>{" "}
                  <DropdownPicker
                    defaultValue="Excellent"
                    onChange={(newValue) => set4g(newValue)}
                  />
                  <label id="mylabel">Wifi Status:</label>{" "}
                  <DropdownPicker
                    defaultValue="Excellent"
                    onChange={(newValue) => setwifi(newValue)}
                  />
                  <label id="mylabel">Bluetooth Status:</label>{" "}
                  <DropdownPicker
                    defaultValue="Excellent"
                    onChange={(newValue) => setbluetooth(newValue)}
                  />
                </div>

                <div
                  className="card"
                  style={{
                    borderBottom: "3px solid black",
                    padding: "20px",
                    margin: "10px",
                  }}>
                  <h3
                    style={{
                      borderBottom: "2px solid black",
                      paddingBottom: 11,
                    }}>
                    Hardware Report
                  </h3>
                  <label id="mylabel">Power Button Status:</label>{" "}
                  <DropdownPicker
                    defaultValue="Excellent"
                    onChange={(newValue) => setpowerbtn(newValue)}
                  />
                  <label id="mylabel">Volume Button Status:</label>{" "}
                  <DropdownPicker
                    defaultValue="Excellent"
                    onChange={(newValue) => setvolumebtn(newValue)}
                  />
                  <label id="mylabel">Home Button status:</label>{" "}
                  <DropdownPicker
                    defaultValue="Excellent"
                    onChange={(newValue) => sethomebtn(newValue)}
                  />
                  <label id="mylabel">Finger Print Status:</label>{" "}
                  <DropdownPicker
                    defaultValue="Excellent"
                    onChange={(newValue) => setfingerprintSensor(newValue)}
                  />
                </div>

                <div
                  className="card"
                  style={{
                    borderBottom: "3px solid black",
                    padding: "20px",
                    margin: "10px",
                  }}>
                  <h3
                    style={{
                      borderBottom: "2px solid black",
                      paddingBottom: 11,
                    }}>
                    OS Report
                  </h3>
                  <label id="mylabel">Operating System Version:</label>

                  <CDBInput
                    type="search"
                    size="md"
                    hint="Enter Os Version"
                    className="mb-n4 mt-n3 input-nav"
                    onChange={(event) => setos(event.target.value)}
                  />

                  <label id="mylabel">Software Issues:</label>
                  <DropdownPicker
                    defaultValue="Excellent"
                    onChange={(newValue) => setsoftwaredmg(newValue)}
                  />
                  <label id="mylabel">Viruses In Storage:</label>
                  <DropdownPicker
                    defaultValue="Excellent"
                    onChange={(newValue) => setvirus(newValue)}
                  />
                </div>

                <div
                  className="card"
                  style={{
                    borderBottom: "3px solid black",
                    padding: "20px",
                    margin: "10px",
                  }}>
                  <h3
                    style={{
                      borderBottom: "2px solid black",
                      paddingBottom: 11,
                    }}>
                    Storage Report
                  </h3>
                  <label id="mylabel"> Total Storage:</label>
                  <CDBInput
                    type="number"
                    size="md"
                    hint="Enter Total Storage"
                    onChange={(event) => setmobstorage(event.target.value)}
                  />
                  <label id="mylabel"> Storage Available:</label>
                  <CDBInput
                    type="number"
                    size="md"
                    hint="Enter Storage Available"
                    onChange={(event) => setavstorage(event.target.value)}
                  />

                  <label id="mylabel"> Ram Available:</label>
                  <CDBInput
                    type="number"
                    size="md"
                    hint="Enter Ram"
                    className="mb-n4 mt-n3 input-nav"
                    onChange={(event) => setram(event.target.value)}
                  />
                </div>

                <div
                  className="card"
                  style={{
                    borderBottom: "3px solid black",
                    padding: "20px",
                    margin: "10px",
                  }}>
                  <h3
                    style={{
                      borderBottom: "2px solid black",
                      paddingBottom: 11,
                    }}>
                    Additional Report
                  </h3>
                  <label id="mylabel">Gyroscope Status:</label>{" "}
                  <DropdownPicker
                    defaultValue="Excellent"
                    onChange={(newValue) => setgyroscope(newValue)}
                  />
                  <label id="mylabel">Compass Status:</label>{" "}
                  <DropdownPicker
                    defaultValue="Excellent"
                    onChange={(newValue) => setcompass(newValue)}
                  />
                  <label id="mylabel">SD Card / Sim Tray Status:</label>{" "}
                  <DropdownPicker
                    defaultValue="Excellent"
                    onChange={(newValue) => setsimsd(newValue)}
                  />
                  <label id="mylabel">Dual Sim Status:</label>{" "}
                  <DropdownPicker
                    defaultValue="Excellent"
                    onChange={(newValue) => setdualsim(newValue)}
                  />
                  <label id="mylabel">Gps Status:</label>{" "}
                  <DropdownPicker
                    defaultValue="Excellent"
                    onChange={(newValue) => setgps(newValue)}
                  />
                </div>

                <div
                  className="card"
                  style={{
                    borderBottom: "3px solid black",
                    padding: "20px",
                    margin: "10px",
                  }}>
                  <h3
                    style={{
                      borderBottom: "2px solid black",
                      paddingBottom: 11,
                    }}>
                    Accesssories Report
                  </h3>
                  <label id="mylabel">Charger Status:</label>{" "}
                  <DropdownPicker
                    defaultValue="Excellent"
                    onChange={(newValue) => setcharger(newValue)}
                  />
                  <label id="mylabel">Earphones Status:</label>{" "}
                  <DropdownPicker
                    defaultValue="Excellent"
                    onChange={(newValue) => setheadset(newValue)}
                  />
                  <label id="mylabel">Additional Accessories:</label>{" "}
                  <DropdownPicker
                    defaultValue="Excellent"
                    onChange={(newValue) => setaccessories(newValue)}
                  />
                </div>

                <div
                  className="card"
                  style={{
                    borderBottom: "3px solid black",
                    padding: "20px",
                    margin: "10px",
                  }}>
                  <h3
                    style={{
                      borderBottom: "2px solid black",
                      paddingBottom: 11,
                    }}>
                    Inspector Comment
                  </h3>
                  <label id="mylabel">Verdict:</label>{" "}
                  <textarea
                    placeholder="Enter Comment"
                    onChange={(event) => setcomment(event.target.value)}
                    rows={6}
                  />
                  <br></br>
                  <label id="mylabel">Give Rating:</label>{" "}
                  <select value={value} onChange={handleOnChange}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </select>
                </div>
              </div>
            </div>
            <div style={{ margin: 20 }}>
              <CDBBtn
                style={{ background: "#333", width: "100%", margin: 40 }}
                flat
                size="large"
                className="border-0 ml-auto px-2 my-2"
                onClick={async () => {

                if( name.length > 2 && quali.length > 2 && experience.length > 2 && comment.length > 2 &&
                brand.length>2 && model.length>2 && imei.length>2 &&
                warranty.length>2 && color.length>2  && os.length>2 ) 
                
                {


                  const query = db
                    .collection("TrackingPhone")
                    .where("adID", "==", data3);

                  query.get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                      // Use the "update" method to update the document
                      return doc.ref.update({
                        status: [
                          { status: 'Collected from seller', isCompleted: true },
                          {
                            status: "Arrived at inspection centre",
                            isCompleted: true,
                          },
                          {
                            status: "Technician inspecting the phone ",
                            isCompleted: true,
                          },

                          { status: "Phone Inspected", isCompleted: true },
                          { status: "Report Generated", isCompleted: true },
                          { status: "Buyer Accepted", isCompleted: false },
                          { status: "Phone Delivered", isCompleted: false },
                        ],
                      });
                    });
                  });

                  console.log("Document Tracking updated successfully");

                  try {
                    await db.collection("ReportGenerated").add({
                      sellername: data,
                      sellercontact: data2,
                      selleraddress: data7,
                      sellerID: data5,
                      buyerID: data4,
                      adID: data3,
                      amount: data6,

                      inspector: name,
                      qualification: quali,
                      experience: experience,
                      date: currentDate,

                      pictures: imageArray,

                      brand: brand,
                      model: model,
                      imeiSerialNumber: imei,
                      warranty: warranty,

                      screenCondition: screencondition,
                      touchscreenFunctionality: touchfunc,
                      displayBrightnessAndClarity: brightness,
                      presenceOfDeadPixels: screendefect,

                      batteryHealthCondition: batteryhealth,
                      batteryPerformance: batteryperformance,
                      signsOfSwellingOrDamage: batterydamage,

                      frontCameraFunctionality: frontcam,
                      rearCameraFunctionality: backcam,
                      imageQualityAndFocus: qualityfocus,
                      signsOfDamageOrIssues: camdamage,

                      wifiFunctionality: wifi,
                      cellularNetworkConnectivity: network,
                      bluetoothFunctionality: bluetooth,
                      Fourg: fourg,
                      pta: pta,

                      powerButton: powerbtn,
                      volumeButtons: volumebtn,
                      homeButton: homebtn,
                      fingerprintSensor: fingerprintSensor,

                      operatingSystemVersion: os,
                      softwareIssuesOrErrors: softwaredmg,
                      signsOfMalwareOrViruses: virus,

                      chargerIncluded: charger,
                      earphonesIncluded: headset,
                      otherAccessoriesIncluded: accessories,

                      gyroscope: gyroscope,
                      compass: compass,
                      simsd: simsd,
                      dualsim: dualsim,
                      gps: gps,

                      comments: comment,
                      inspectorrating: value,

                      phonestorage: mobstorage,
                      availablestorage: avstorage,
                      availableram: ram,

                      phonescore: score.toFixed(1),
                      displayscore:displayscore.toFixed(1),
                      exteriorscore:exteriorscore.toFixed(1),
                      camerascore: camerascore.toFixed(1),

                      bodycondition: body,
                      bodycolor: color,
                      visiblescratches:scratches,
                      headphonejack: hjdmg,
                      chargeport:cpdmg,


                    });

                    alert("Report Uploaded Sucessfully!");
                    console.log("Add Posted!!!");
                  
                    setTimeout(() => {
                   db.collection("CreateReports").doc(data11).delete();  
                   }, 300);
               

                    setTimeout(() => {
                      window.location.href = "/reports";
                    }, 3000);
                  } catch (error) {
                    console.error(error);
                  }

                }

                else
                {
                  alert("Error: Complete All Fields!");
                }

                  // Update the document
                }}>
                Submit Report
              </CDBBtn>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};
