import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import LoadingScreen from './src/screens/LoadingScreen'
import HomeScreen from './src/screens/HomeScreen'
import ListScreen from './src/screens/ListScreen'
import ExerciseScreen from './src/screens/ExerciseScreen'
import IntoScreen from './src/screens/IntoScreen'
import * as firebase from 'firebase'
import LoginScreen2 from './src/screens/LoginScreen2'
import RegisterScreen2 from './src/screens/RegisterScreen2'
import PasswordScreen from './src/screens/PasswordScreen'
import Listt from './src/screens/Listt'


var firebaseConfig = {
  apiKey: "AIzaSyCsvgkLOaBgIetln1vDwxgTJZv-eyd69xw",
  authDomain: "proneck-e8f64.firebaseapp.com",
  databaseURL: "https://proneck-e8f64.firebaseio.com",
  projectId: "proneck-e8f64",
  storageBucket: "proneck-e8f64.appspot.com",
  messagingSenderId: "298742641713",
  appId: "1:298742641713:web:6854fd7a42056104ab1110"
};

firebase.initializeApp(firebaseConfig);

const AppStack = createStackNavigator({
  Home:{
    screen: HomeScreen,
    navigationOptions:{
      headerShown: false
    }
  },
  Lista:{
    screen: ListScreen,
    navigationOptions:{
      headerShown: false
    }
  },
  Exercise:{
    screen: ExerciseScreen,
    navigationOptions:{
      headerShown: false
    }
  },

  ListExercise:{
    screen: Listt,
    navigationOptions:{
      headerShown: false
    }
  }  
  
})

const AuthStack = createSwitchNavigator({
  Login2:{
    screen: LoginScreen2,
    navigationOptions:{
      headerShown: false
    }
  },
  Register2:{
    screen: RegisterScreen2,
    navigationOptions:{
      headerShown: false
    }
  }
})

export default createAppContainer(
  createStackNavigator({
    Into: {
      screen: IntoScreen,
      navigationOptions:{
        headerShown: false
      }
    },
    Loading: LoadingScreen,
    Password:{
      screen: PasswordScreen,
      navigationOptions:{
        headerShown: false
      }
    },
    App: {
      screen: AppStack,
      navigationOptions:{
        headerShown: false
      }
    },
    Auth: {
      screen: AuthStack,
      navigationOptions:{
        headerShown: false
      }
    }
  },
  {
    initialRouteName: "Into"
  }
  )
)
  