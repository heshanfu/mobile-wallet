
import React, { Component } from 'react';
import { Button, Text, ImageBackground, ActivityIndicator, AsyncStorage, StatusBar, StyleSheet, View, Image, Linking } from 'react-native';
import { DrawerNavigator , StackNavigator, SwitchNavigator, DrawerItems } from 'react-navigation'; // Version can be specified in package.json
// Import the different screens
import BackupWallet from './screens/BackupWallet'
import SendReceive from './screens/SendReceive'
import TransactionsHistory from './screens/TransactionsHistory'
import CreateWallet from './screens/CreateWallet'
import CreateNewWallet from './screens/CreateNewWallet'
import CompleteSetup from './screens/CompleteSetup'
import OpenExistingWallet from './screens/OpenExistingWallet'
import SignIn from './screens/SignIn'
import CreateWalletTreeHeight from './screens/CreateWalletTreeHeight'
import CreateWalletHashFunction from './screens/CreateWalletHashFunction'
import ScanQrModal from './screens/ScanQrModal'
import ConfirmTxModal from './screens/ConfirmTxModal'

// import { QRLLIB } from './node_modules/qrllib/build/web-libjsqrl.js'

// AuthLoadingScreen checks if a wallet already exists
// - if yes -> redirects to the app main view
// - if no -> redirects to the CreateWallet view
class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    // check if a wallet was already created

    const walletCreated = await AsyncStorage.getItem('walletcreated');
    // const userToken = await AsyncStorage.getItem('blklk');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.


    this.props.navigation.navigate(walletCreated ? 'App' : 'Auth');


    // this.props.navigation.navigate('Auth');

  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}


const CustomDrawerContentComponent = (props) => (
    <View style={{flex:1, backgroundColor:'#164278', paddingTop:50}}>
        <Image style={{height:80, width:80, alignSelf:'center'}} resizeMode={Image.resizeMode.contain}  source={require('./resources/images/qrl_logo_wallet.png')} />
        <View style={{paddingTop:50}}>
            <DrawerItems {...props}/>
        </View>
        <ImageBackground source={require('./resources/images/lower_drawer_bg.png')} style={{flex:1, height:null, width:null}}>
            <View style={{paddingLeft: 40, paddingTop:50}}>
                <Text style={{color:'white',paddingTop:20}} onPress={() => Linking.openURL('https://theqrl.org/')}>QRL WEBSITE</Text>
                <Text style={{color:'white',paddingTop:20}} onPress={() => Linking.openURL('https://qrl.foundation/')}>QRL FOUNDATION</Text>
                <Text style={{color:'white',paddingTop:20}}>REDDIT</Text>
                <Text style={{color:'white',paddingTop:20}}>DISCORD</Text>
                <Text style={{color:'white',paddingTop:20}}>SUPPORT</Text>
            </View>
    </ImageBackground>
    </View>
)


// MainDrawerMenu
const MainDrawerMenu = DrawerNavigator(
    {
        TransactionsHistory : {
            path: '/',
            screen: TransactionsHistory
        },
        SendReceive : {
            path: '/',
            screen: SendReceive
        },
        BackupWallet :{
            path: '/',
            screen: BackupWallet,
        },
        // CreateNewWallet : {
        //     path: '/',
        //     screen: CreateNewWallet
        // },
    },
    {
        // initialRouteName: 'Wallet',
        initialRouteName: 'TransactionsHistory',
        drawerPosition: 'left',
        contentComponent: CustomDrawerContentComponent,
        contentOptions: {
            labelStyle: {
                color: 'white',
            }
        }
    }
);

// MainDrawerMenu
const MainDrawerModal = DrawerNavigator(
    {
        Main : {
            screen: MainDrawerMenu
        },
        ScanQrModal : {
            screen: ScanQrModal
        },
        ConfirmTxModal : {
            screen: ConfirmTxModal
        },
    }
);



const AuthStack = StackNavigator(
  {
    SignIn: {
      screen: SignIn,
    },
    CreateWalletTreeHeight: {
      screen: CreateWalletTreeHeight,
    },
    CreateWalletHashFunction: {
      screen: CreateWalletHashFunction,
    },
    CompleteSetup: {
      screen: CompleteSetup,
    },
    OpenExistingWallet: {
      screen: OpenExistingWallet,
    },
  },
  {
    initialRouteName: 'SignIn',
    headerMode: 'none'
  }
);


// const AuthStack = StackNavigator({ SignIn: CreateWallet });

export default SwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: MainDrawerModal,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);


// export default MainDrawerMenu
