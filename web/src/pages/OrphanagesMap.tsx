import React,{useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import {FiPlus,FiArrowRight} from 'react-icons/fi';
import {Map,TileLayer,Marker,Popup} from  'react-leaflet';

import Sidebar from '../components/Sidebar';
import '../styles/pages/orphanages-map.css';
import happyMapIcon from '../utils/mpsIcon';
import api from '../services/api';
interface Orphanage{
    id:number;
    latitude:number;
    longitude:number;
    name:string;

}
function OrphanagesMap(){
    const [orphanages,setOrphanages] = useState<Orphanage[]>([]);  
    useEffect(()=>{
        api.get('orphanages').then(response =>{
            setOrphanages(response.data);
        })
    },[]);
    return (
       <div id="page-map">
          <Sidebar/>
            <Map
                center={[-6.1902485,-38.2302136]}
                zoom={15}
                style={{width:'100%',height:'100%'}}

            >
            {orphanages.map(orphanage=>{
                return (
                     <Marker
                     icon={happyMapIcon}
                     position={[orphanage.latitude,orphanage.longitude]}
                     key={orphanage.id}
                 >
                     <Popup className="map-popup"
                         closeButton={false}
                         minWidth={240}
                         maxWidth={240}
                         >
                            {orphanage.name}
                             <Link to={`/orphanages/${orphanage.id}`}>
                                 <FiArrowRight size={20} color="#fff"/>
 
                             </Link>
                         </Popup>
                    </Marker>
                );
                })
                }
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
               
            </Map>
            <Link to="/orphanage/create" className="create-orphanage">
                <FiPlus size={32} color="#fff"/>
            </Link>
       </div>
       
    );
}


export default OrphanagesMap;