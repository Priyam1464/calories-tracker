import {useState} from 'react'
function useMealState()
{
const [mealState,setMealState]=useState({
    breakfast:[],lunch:[],dinner:[],mealType:""
  })


  return [mealState,setMealState]
}

export default useMealState