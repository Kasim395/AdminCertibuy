import React from "react";
import { CDBBtn, CDBIframe, CDBView } from "cdbreact";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import "./Profile.css"
import QRCode from 'qrcode.react';
import { db } from './firebase';
import {  onSnapshot, collection } from 'firebase/firestore'

import AlertBox from './Alertboxs';

export const Profile = (props) => {

	const { datas } = props.location.state;
	const { datas2 } = props.location.state;
	const { datas3 } = props.location.state;
	const { datas4 } = props.location.state;



	const [adminName, setAdminName] = React.useState('');
	const [riderName, setRiderName] = React.useState('');
	const [phoneOwnerName, setPhoneOwnerName] = React.useState('');
	const [phoneOwnerContact, setPhoneOwnerContact] = React.useState('');
	const [adId, setAdId] = React.useState('');
	const [brand, setBrand] = React.useState('');
	const [model, setModel] = React.useState({datas3});
	const [imeiNumber, setImeiNumber] = React.useState('');
	const [listOfAccessories, setListOfAccessories] = React.useState('');
	const [comments, setComments] = React.useState('');
	const [dateTime, setDateTime] = React.useState('');
	const [id, setId] = React.useState('');
  


	const myfuncz = () => {
		
	const newDateTime = new Date().toLocaleString();
    setDateTime(newDateTime);

	//setId(generatedCode)

		};


		React.useEffect(() => {
	
	const alphanumericCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let generatedCode = '';
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * alphanumericCharacters.length);
      generatedCode += alphanumericCharacters[randomIndex];
	  setId(generatedCode)
    }
		
		}, [])


		React.useEffect(() => {
	
			myfuncz()
		
		}, [model])
		
	
	

	const handleSubmit = (e) => {
	  e.preventDefault();
	  
	  // Generate a random non-repeatable ID
	 
	//  downloadQRCode();

	myfuncz()

	setTimeout(() => {
	postitemlog()
	//downloadQRCode()
	  }, 1200);
	  alert('Log Saved!');
    
	};


	  
		const downloadQRCode = () => {
		  const canvas = document.getElementById('qr-code');
		  const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
		  const downloadLink = document.createElement('a');
		  downloadLink.href = pngUrl;
		  downloadLink.download = 'qr-code.png';
		  document.body.appendChild(downloadLink);
		  downloadLink.click();
		  document.body.removeChild(downloadLink);
		};


		const postitemlog = async () => {
			try {
			   
				
			  // Add a new document to the "add" collection with the specified fields
			  await db.collection('ItemLogs').doc(id).set({
				AdminName: adminName,
				RiderName: riderName,
				PhoneOwner: phoneOwnerName,
				OwnerContact: phoneOwnerContact,
				Brand:brand,
				Model: model,
				ImeiNumber: imeiNumber,
				AD_ID: adId,
				Accessories:listOfAccessories,
				Comments: comments,
				DateTime: dateTime,
				LogID:id,
			
			  });
			  
			  // Log a message to the console if the document was added successfully
			  console.log('Item Log Posted!!!');
			} catch (error) {
			  // Log any errors to the console
			  console.error(error);
			}
		  };

		  
		  const [query, setQuery] = React.useState('');
		  const [results, setResults] = React.useState([]);
		
		  const handleSearch = async () => {
			const collectionRef = db.collection('ItemLogs');
			const querySnapshot = await collectionRef.where('Brand', '>=', query).get();
			const matchingDocs = querySnapshot.docs.map((doc) => doc.data());
			setResults(matchingDocs);
		  };




	return (
		<div className="d-flex profile">
			<div>
      	<Sidebar/>
			</div>
      <div style={{flex:"1 1 auto", display:"flex", flexFlow:"column", height:"100vh", overflowY:"hidden"}}>
      	<Navbar/>
      	<div style={{height:"100%"}}>
					<div style={{height:"calc(100% - 64px)", padding:"20px 5%", overflowY:"scroll"}}>
						<div style={{margin:"0 auto", maxWidth:"1320px"}}>
							
								<div>
									
										
    <div class="containerilog">
				
	<h2 id='createnotice'>Create Item Log  </h2>
	<div id='noticediv'>
				  
		<form onSubmit={handleSubmit}>
		
	
	    <div className="row" >
		<div className="col-sm"  >  
		 <label id="input-label" >Admin Name: </label>
		<br></br>
         <input id="input-field"  type="text"  onChange={(e) => setAdminName(e.target.value)}  />
		 </div>
		 
		 <div className="col-sm">
        <label id="input-label" >Rider Name:</label>
		<br></br>
        <input id="input-field"  type="text"  onChange={(e) => setRiderName(e.target.value)} />
		</div>
		</div>
		

		<br></br>


		<div className="row" >
		<div className="col-sm" >
		<label id="input-label" > Owner Name:</label>
		<br></br>
        <input id="input-field"  type="text" defaultValue= {datas}  onChange={(e) => setPhoneOwnerName(e.target.value)} />
		</div>
		<div className="col-sm" >

		<label id="input-label" > Owner Contact:</label>
		<br></br>
        <input id="input-field"
		
	  type="text" defaultValue= {datas2}   onChange={(e) => setPhoneOwnerContact(e.target.value)}  />
      </div>
	  </div>
     <br></br>

	 <div className="row" >
	 <div className="col-sm" >
       <label id="input-label" >Ad Id:</label>
	   <br></br>
        <input id="input-field"  type="text"  onChange={(e) => setAdId(e.target.value)} />
		</div>
		<div className="col-sm" >
        <label id="input-label" >Brand:</label>
		<br></br>
        <input id="input-field" type="text"  onChange={(e) => setBrand(e.target.value)} />
		</div>
		</div>
		<br></br>
		<div className="row" >
		<div className="col-sm" >
        <label id="input-label">Model:</label>
		<br></br>
        <input id="input-field"  type="text" defaultValue= {datas3}  onChange={(e) => setModel(e.target.value)} />
        </div>
		
		<div className="col-sm" >
        <label id="input-label">IMEI Number:</label>
		<br></br>
        <input id="input-field"  type="text" onChange={(e) => setImeiNumber(e.target.value)} />
		<br></br>
		</div>
		</div>

		<br></br>

		<div className="row" >
        <div className="col-sm" >
        <label id="input-label">List Of Accessories:</label> <br></br>
        <textarea id="list-of-accessories" onChange={(e) => setListOfAccessories(e.target.value)} ></textarea>
		</div>
		<div className="col-sm" >
        <label id="input-label">Comments:</label> <br></br>
        <textarea id="comments" onChange={(e) => setComments(e.target.value)}></textarea>
		</div>
        </div>

       <br></br>

		 <CDBBtn type="submit" style={{background:"#333", width:'100%' }} flat size="medium" 
		 className="border-0 ml-auto px-2 my-2"  onClick={handleSubmit} > Save Log</CDBBtn>
                
      </form>

      {/* Display the generated ID */}
      {id && (
        <div>
          <h3>Generated ID: {id}</h3>
        </div>
      )}


      <br></br>
      <div class="input-container" style={{display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '20',}}> 
	  
	  <label id="input-label"  >QR Code:</label>
      <QRCode id="qr-code" value={id} size={256} style={{float:'inline-end'}} />
     </div>

  
				 </div>
				  </div>
									

				  <div class="containerilog">

<h3>haha {}</h3>
<div>
     
    </div>


				  </div>




								</div>
								<div className="mini-container">
									<div>
					          <div className="card shadow border-0">
					            <img
					              alt="cardImg"
					              className="img-fluid"
					              style={{objectFit:"cover"}}
					              src="/img/cardImage.png"
					            />
					            <div className="p-3">
					              <h3>Basic</h3>
					              <p>This is just a card text Get important notifications about you or activity you've missed </p>
					              <CDBBtn style={{background:"#333", border:"none"}}>
					                Button
					                </CDBBtn>
					            </div>
					          </div>
									</div>
									<div>
					          <div className="card shadow border-0 h-75 mx-auto" style={{backgroundImage:"url('https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547_960_720.jpg')"}}>
					            <div className="p-3 d-flex flex-column h-100 w-100">
					              <h4 className="mt-3 text-white">Heading</h4>
					              <p className="text-white">Paragraph</p>
					              <div className="d-flex justify-content-center mt-auto">
					                <CDBBtn color="light" flat circle>
					                  Button
					                </CDBBtn>
					              </div>
					            </div>
					          </div>
				          </div>
				        </div>
							

							<div className="cards-container2">
								<div>
				          <div className="card shadow border-0">
				            <img
				              alt="cardImg"
				              className="img-fluid"
				              style={{objectFit:"cover"}}
				              src="/img/cardImage.png"
				            />
				            <img alt="cardImg" className="mx-auto border rounded-circle" style={{marginTop:"-5rem"}} width="130px" src="/img/pane/pane4.png" />
				            <div className="p-3 d-flex flex-column align-items-center mb-4 text-center">
				              <h4 style={{fontWeight:"600"}}>Sammy Russo</h4>
				              <p>Senior Software Developer</p>
				              <p className="text-muted">Detroit, USA</p>
				              <div className="d-flex justify-content-center flex-wrap">
				                <CDBBtn className="mr-2" size="small" color="dark"><i className="fas fa-user-plus"></i> Connect</CDBBtn>
				                <CDBBtn size="small" color="warning"> Send Message </CDBBtn>
				              </div>
				            </div>
				          </div>
								</div>
								<div>
									<div className="card shadow border-0">
										<div>
											<img src="/img/pages/promotionImage2.png" alt="Project" className="img-fluid"/>
										</div>
										<div className="card-body">
											<h4 className="card-title mb-3">
												<span style={{fontWeight:"600"}}>Project Name</span>
											</h4>
											<p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, error amet numquam iure provident voluptate esse quasi, veritatis totam voluptas.</p>
										</div>
										<div className="card-footer">
											<a className="p-2" href="#profile">
												Live Preview
												<i className="far fa-image ml-1"></i>
											</a>
										</div>
									</div>
								</div>
								<div>
									<div className="card shadow border-0">
										<div>
											<img src="/img/pages/promotionImage.png" alt="Project" className="img-fluid"/>
										</div>
										<div className="card-body">
											<h4 className="card-title text-center mb-3" style={{fontWeight:"600"}}>
												Card Title
											</h4>
											<p className="card-text text-center ">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, error amet numquam iure provident voluptate esse quasi, veritatis totam voluptas.</p>
										</div>
										<div className="card-footer text-center">
											<a className="p-2" href="#profile">Live Preview<i className="far fa-image ml-1"></i></a>
										</div>
									</div>
								</div>
								<div>
				          <div className="card shadow border-0">
				            <div className="p-3">
							
				            </div>
				            <CDBView>
				              <CDBIframe src="https://www.youtube.com/embed/xnczyP2jSR0"></CDBIframe>
				            </CDBView>
				            <div className="p-3">
				              <CDBBtn color="dark" flat outline circle>
				                Button
				              </CDBBtn>
				            </div>
				          </div>
								</div>
							</div>
			        <footer className="d-flex mx-auto py-4">
			          <small className="mx-auto my-1 text-center">&copy; Devwares, 2020. All rights reserved.</small>
			        </footer>
				    </div>
					</div>
				</div>
			</div>
		</div>

	);
}
