import React from "react";
import { CDBTable, CDBTableHeader, CDBTableBody, CDBContainer, CDBBtn } from "cdbreact";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import { db } from './firebase';
//import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import {  onSnapshot, collection } from 'firebase/firestore'


export const Riderpanel = () => {


  const [ndata, setndata] = React.useState([]);
  const [dateTime, setDateTime] = React.useState('');


    const [data, setData] = React.useState([

{
names:['Imran Khan'],
phone:['032678879'],
address: ['395 Nespak'],
model:['Galaxy s10'],

},

{
    names:['Qasim'],
    phone:['032678879'],
    address: ['395 Nespak'],
    model:['Realme 7 prp'],
    
    },

    {
        names:['Junaid'],
        phone:['032678879'],
        address: ['395 Nespak'],
        model:['Realme 7 prp'],
        
        },

        {
            names:['Azam'],
            phone:['032678879'],
            address: ['395 Nespaksssssaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaas'],
            model:['Realme 7 prp'],
            
            }
    
      ])


      React.useEffect(() => {
        let unsub;
        const fetchCards = async () => {
          unsub = onSnapshot(collection(db, 'Inbound'), snapshot => {
            setndata(snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
              
            })))
          })
        }
        
        fetchCards();
        return unsub;
      }, [])


     
        
          const timing = () => {
            setDateTime(null);
            const newDateTime = new Date().toLocaleString();
              setDateTime(newDateTime);
              };


          const dataclick = () => {

          timing();

        //  forwardItemlog();
         // forwardRider();
          }




  return (
    <div className="dashboard d-flex">
      <div>
        <Sidebar/>
      </div>
      <div style={{flex:"1 1 auto", display:"flex", flexFlow:"column", height:"100vh", overflowY:"hidden"}}>
        <Navbar/>
        <div style={{height:"100%"}}>
          <div style={{padding:"20px 5%",height:"calc(100% - 64px)",overflowY:"scroll"}}>

        <div className="d-flex card-section">
		<div className="cards-container">
            


          <div className="card-bg " >
          <CDBContainer>
          <h2 id='createnotice'>Rider Inbound </h2>

{ndata.map((item) => (
<div>

<div className="card" style={{ borderBottom: '3px solid black', padding:'20px', margin:'10px'}} >

 

<br></br>
<strong>Name: </strong> {item.name} <br></br>
<strong>Phone: </strong> {item.phone} <br></br>
<strong>Address: </strong> {item.address} <br></br>
<strong>Model: </strong> {item.model} <br></br>



<div className="col-md-12"  >
<br></br>
<CDBBtn style={{background:"#333", width:'100%' }} flat size="medium" 

onClick={ 
  
  async () => {

    setDateTime(null);
            const newDateTime = new Date().toLocaleString();
              setDateTime(newDateTime);

  try {
    await db.collection("AwaitILogs").add({
      names: item.name,
      residence: item.address,
      cell: item.phone,
      modelz: item.model,
      timez: dateTime,
    });
    console.log("Add Posted!!!");
  } catch (error) {
    console.error(error);
  }

  try {
    await db.collection("RiderInbound").add({
      names: item.name,
      residence: item.address,
      cell: item.phone,
      modelz: item.model,
      timez: dateTime,
    });
    console.log("Add Posted!!!");
  } catch (error) {
    console.error(error);
  }
}}
>
Send To Rider
</CDBBtn>





</div>

</div>
</div>



           ))}



</CDBContainer>
          </div>

          <div className="card-bg w-100 border d-flex flex-column ">
          <h2 id='createnotice'>Rider OutBound </h2>
          
          
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
