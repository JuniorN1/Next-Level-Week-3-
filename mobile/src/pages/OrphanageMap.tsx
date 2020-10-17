import React,{useEffect,useState} from 'react';
import { StyleSheet, Text, View,Dimensions  } from 'react-native';
import mapMarker from '../images/map-marker.png';
import MapView,{PROVIDER_GOOGLE,Marker,Callout} from 'react-native-maps';
import {Feather} from '@expo/vector-icons';
import{useNavigation,useFocusEffect} from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../services/api';

interface OrphangeItem{
  id:number;
  name:string;
  latitude:number;
  longitude: number;
}
export default function(){
  const [orphanages,setOrphanages]=useState<OrphangeItem[]>([]);
  const navigation = useNavigation();
  
  function handleNativationToOrphanageDetails(id:number){
      navigation.navigate('OrpganageDetails',{id});
  }
  function handleNativationToCreateOrphanage(){
    navigation.navigate('OrphanagePosition');
}
async function loadOrphanages(){
  try{ 
      await api.get('orphanages').then(response=>{
        setOrphanages(response.data);
      });

  }catch(error){
    console.log(error);
  }
}
useFocusEffect(()=>{
  loadOrphanages();
       
    
    
  });
    return(

        <View style={styles.container} >
        {/* <Text>Hello Nlw3!</Text> */}
        <MapView
          provider={PROVIDER_GOOGLE} 
          initialRegion={{
            latitude:-6.1902058,
            longitude:-38.2231755,
            latitudeDelta:0.008,
            longitudeDelta:0.008,
          }}
          style={styles.mapStyle}
        >
       { orphanages.map(orphanage=>{
         return(
          <Marker
          key={orphanage.id}
          icon={mapMarker}
          calloutAnchor={{
            x:2.7,
            y:0.8,
          }}
          coordinate={{
            latitude:orphanage.latitude,
            longitude:orphanage.longitude,
          }} 
         
        > 
          <Callout tooltip onPress={()=>handleNativationToOrphanageDetails(orphanage.id)}>
            <View style={styles.calloutContainer}>
              <Text style={styles.calloutText}>{orphanage.name}</Text>
            </View>
          </Callout>
        </Marker>
         );
       })}
        </MapView>
       <View style={styles.footer}>  
         <Text style={styles.footerText}>{orphanages.length} Orfanatos encontrados</Text>
         <RectButton style={styles.creatOrphanageButton} onPress={handleNativationToCreateOrphanage} >
            <Feather name="plus" size={20} color="#fff"/>
         </RectButton>
       </View>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
  
    },
  
    mapStyle: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },  
    calloutContainer:{
      width:160,
      height:46,
      paddingHorizontal:16,
      backgroundColor:'rgba(255,255,255,0.8)',
      borderRadius:16,
      justifyContent:'center',
     
  
    },calloutText:{
       color:'#0089a5',
       fontSize:14,
       fontFamily:"Nunito_700Bold",
  
    },
    footer:{
      position:"absolute",
      left:24,
      right:24,
      bottom:32,
  
      backgroundColor:"#FFF",
      borderRadius:20,
      height:56,
      paddingLeft:24,
  
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      
      elevation:3,
  
  
    },
    footerText:{
      fontFamily:"Nunito_700Bold",
  
      color:"#8fa7b3",
  
    },
    creatOrphanageButton:{
  
      width:56,
      height:56,
      backgroundColor:"#15c3d6",
      borderRadius:20,
      
      justifyContent:'center',
      alignItems:'center',
    }
  });
  