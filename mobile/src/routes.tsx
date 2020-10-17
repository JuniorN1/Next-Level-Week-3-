import React from 'react';
import{NavigationContainer} from '@react-navigation/native';
import{createStackNavigator} from '@react-navigation/stack';
const {Navigator,Screen} = createStackNavigator();
import OrphanageMap from './pages/OrphanageMap';
import OrpganageDetails from './pages/OrphanageDetails';

import OrphanageData from './pages/CreateOrphanage/OrphanageData';
import OrphanagePosition from './pages/CreateOrphanage/SelectMapPosition';
import Header from './components/Header';
export default function Routes(){

    return  (
            <NavigationContainer >
                    <Navigator screenOptions={{headerShown:false}}>
                        <Screen component={OrphanageMap}  name="OrphanageMap" />
                        <Screen
                            component={OrpganageDetails}  
                            name="OrpganageDetails"
                            options={{
                                headerShown:true,
                                header:()=><Header showCancel={false} title="Orfanato"/>,
                            
                            }} 
                        />
                        <Screen component={OrphanageData}  
                            name="OrphanageData" 
                            options={{
                                headerShown:true,
                                header:()=><Header title="Informe os dados"/>,
                            
                            }} 
                            />
                        <Screen component={OrphanagePosition}  
                            name="OrphanagePosition"
                            options={{
                                headerShown:true,
                                header:()=><Header title="Selecione no mapa"/>,
                            
                            }} 
                         />
                    </Navigator>

            </NavigationContainer>


    );


    

}