import React from 'react';
import {FiArrowRight} from 'react-icons/fi';
import {Link} from 'react-router-dom'
import '../styles/pages/landing.css';
import '../styles/global.css';

import logoimg from '../images/Logo.svg';
function Landing(){
    return(
    <div id="page-landing">
        <div className="content-wrapper">
            <img src={logoimg} alt="Happy"/>
          <main>
            <h1>Leve felicidade para o mundo</h1>
              <p>Visite orfanatos e mude o dia de muitas crianças.</p>
          </main>
          <div className="location">
            <strong>Rio Grande do Norte</strong>
            <span>Rafael Fernandes</span>
          </div>
          <Link to="/OrphanagesMap" className="enter-app" >
            
          <FiArrowRight size={26} color="rgba(0,0,0,0.6)"/>

          </Link>
        </div>
    </div>
    );
}


export default Landing;