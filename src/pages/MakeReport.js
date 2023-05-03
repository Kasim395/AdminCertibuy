import React from "react";
import { CDBTable, CDBTableHeader, CDBTableBody, CDBContainer } from "cdbreact";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import { db } from "./firebase";
import { onSnapshot, collection } from "firebase/firestore";
import Dropzone from 'react-dropzone';
import "./Makereport.css";
import DropdownPicker from './Picker';

export const MakeReport = () => {

  const [ndata, setndata] = React.useState([]);

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
    // Create an array of objects with the image file and a unique ID
    const newImages = acceptedFiles.map(file => ({ id: Date.now(), file }));
    // Concatenate the new images with the existing images
    setImages([...images, ...newImages]);
  };

  const handleDelete = (id) => {
    // Filter out the image with the specified ID
    setImages(images.filter(img => img.id !== id));
  };


 const [selectedValue, setSelectedValue] = React.useState('');

// const handlePickerChange = (newValue) => {
//    setSelectedValue(newValue);
//  };



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
        <div style={{ height: "100%", backgroundColor: "silver" }}>
          <div
            style={{
              padding: "20px 5%",
              height: "calc(100% - 64px)",
              overflowY: "scroll",
            }}>
                <h1>Make Report</h1> <br></br>
            <div className="d-flex" >

               
              <CDBContainer style={{backgroundColor:'grey'}}>

      <div style={{backgroundColor:'white'}}>
      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag and drop images here, or click to select files</p>
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

<br></br>

<div className="row">

<div className="col-6" style={{backgroundColor:'green'}}>

    
ggs

</div>

<div className="col-6" style={{backgroundColor:'orange'}}>

<DropdownPicker defaultValue="good" onChange={(newValue) => setSelectedValue(newValue)} />
<p>You selected: {selectedValue}</p>


</div>


</div>



              </CDBContainer>


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
