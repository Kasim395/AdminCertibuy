import React, { useState } from "react";
import { 
 
  CDBNavLink,
  CDBBtn,
  CDBCollapse } from "cdbreact";
import './Hero404.css';
import { useHistory } from 'react-router-dom';

export const Hero404 = () => {


  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };


	return(
		<div className="hero404">
			<div className="page-container">
				<header className="navigation">
          
        </header>
        <section className="page-body">
					<div className="message404">
						<h4 className="h1 font-weight-bold">Oops</h4>
						<h4 className="h3 my-4">Something has went wrong</h4>
						<p>Sorry about that, hmmm... probably a missing page or the link's incorrect.</p>
						<CDBBtn flat color="dark" className="py-2 btn-block"
            
            onClick={goBack}
            >Back Home</CDBBtn>


					</div>
					<img className="image404" alt="404" src="/img/pages/hero404.png"/>
				</section>
			</div>
		</div>
	);
}
