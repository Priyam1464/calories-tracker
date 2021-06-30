import React,{useState} from 'react';
import './App.css';
import SearchItem from './Components/SearchItem/SearchItem'
import MealTracker from './Components/MealTracker/MealTracker';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import MealContext from './Context/MealContext'

//const AppContext = React.createContext('light');
function App() {
  const [mealState,setMealState]=useState({
    breakfast:[],lunch:[],dinner:[],mealType:"",mealCalories:{breakfast:0,lunch:0,dinner:0,total:0,initialCalories:2000}
  })
  return (
   
    <div className="App">
      <Router>
    <MealContext.Provider value={{mealState:mealState,setMealState:setMealState}}>
       <Switch>
         <Route exact path="/" >
              <MealTracker/>
           </Route>
         <Route path="/searchItem" exact >
              <SearchItem/>
           </Route> 
         </Switch>
         </MealContext.Provider>
      </Router> 
    </div>
  );
}

export default App;
