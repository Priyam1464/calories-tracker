import SearchBar from "material-ui-search-bar";
import { useRef,useState,useContext} from 'react'
import FoodItem from '../FoodItem/FoodItem'
import { makeStyles } from '@material-ui/core/styles';
import MealContext from '../../Context/MealContext'

// *snip*
const useStyles = makeStyles({
    root: {
      display:"flex",
      justifyContent:"center",
      flexDirection:"row",
      flexWrap:"wrap",
      marginTop:10
    }
  });

export default function SearchItem(props)
{
   
const classes = useStyles();
const searchBarItem=useRef(null)
const foodSearches=useRef([])
const [areItemsLoaded,setItemsLoaded]=useState(false)
const  {mealState}=useContext(MealContext)
console.log("Search Item",mealState)

return (
    <>
    <SearchBar
    // dataSource={state.dataSource}
     onChange={value=>searchBarItem.current=value}
     onRequestSearch={()=>{
      fetchItemResults(searchBarItem.current,setItemsLoaded,foodSearches)
     }}
    style={{
      margin: '0 auto',
      maxWidth: 800
    }} 
  />

  <div className={classes.root}>
  {(areItemsLoaded &&foodSearches.current.length>0)? foodSearches.current.map((searchResult,index)=> 
    {
       
        return <FoodItem key={index} foodItem={searchResult.foodName} imgUri={searchResult.imgUri} calories={searchResult.calories}/>
     }):null}
  </div>
</>
)
}



function fetchItemResults(searchItem,setItemsLoaded,foodSearches)
{
 fetch('https://api.edamam.com/api/food-database/v2/parser?ingr='+searchItem+'&app_id=f714a752&app_key=452c2e89a4ef772faa3fb0f85ca3a829',{
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
 })
     .then(foodData=>foodData.json())
     .then(foodDataAsJson=>{
        console.log(foodDataAsJson)
        foodDataAsJson.hints.forEach(eachFoodItem=>{
        const foodID=eachFoodItem.food.foodId
        const foodName=eachFoodItem.food.label
        const imgUri=eachFoodItem.food.image
        //console.log(foodId,imgUri) 
         let promises=[]
         let quantityLabels=[]
         for(let i=0;i<5;i++)
         {
             //console.log(eachFoodItem.measures[i].uri)
            quantityLabels.push(eachFoodItem.measures[i].label)
            promises.push(fetch('https://api.edamam.com/api/food-database/v2/nutrients?app_id=f714a752&app_key=452c2e89a4ef772faa3fb0f85ca3a829',{
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              'Accept': 'application/json',
              'Access-Control-Allow-Origin': '*'
            },
            body:JSON.stringify({ingredients:[{quantity: 1, measureURI:eachFoodItem.measures[i].uri,foodId:foodID}]})}))
           
        }

        Promise.all(promises).then(responses=>Promise.all(responses.map(response=>response.json())))
        .then(jsonResponses=>
        {
            
           foodSearches.current.push({
           foodName:foodName,
           foodId:foodID,
           imgUri:imgUri,
           quantities:quantityLabels,
           calories:jsonResponses.map(jsonResponse=>jsonResponse.calories)
           }
           
        )
            
    
        if(foodSearches.current.length===foodDataAsJson.hints.length)
        {
            
            setItemsLoaded(true)
        }
    }
        )
        .catch(err=>console.log(err))
       
     }
     )
    })
}