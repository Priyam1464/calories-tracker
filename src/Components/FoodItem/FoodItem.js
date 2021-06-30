import React,{useContext} from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import MealContext from "../../Context/MealContext"

const useStyles = makeStyles({
  root: {
    display:"flex",
    justifyContent:"flex-start",
     width:600,
     marginTop:10,
     marginLeft:10,
     marginRight:10
  },
  media: {
    height: 140,
    width:300,
    marginLeft:10,
    marginTop:10
  },
  fab:{
      alignSelf:"flex-end",
      marginBottom:10,
      marginRight:10,
      width:50,
      height:50
  }
});


export default function FoodItem(props)
{
  const history = useHistory();
  const  {mealState,setMealState}=useContext(MealContext)  
    const classes = useStyles();

    const redirect = () => {
      history.push('/')
    }

    return (
      <Card  className={classes.root}>
          <CardMedia 
            className={classes.media}
            image={props.imgUri}
          />
          <CardContent className={classes.content}>
            <Typography align="left"  variant="h5" component="h2">
             {props.foodItem}
            </Typography>
            <Typography align="left" variant="body2" color="textSecondary" component="p">
             {props.calories[0]}
            </Typography>
          </CardContent>
          <Fab onClick={()=>
          {setMealState(
          {...mealState,[mealState.mealType]:[...mealState[mealState.mealType],{item:props.foodItem,
          calories:props.calories[0]}],mealCalories:{...mealState.mealCalories,[mealState.mealType]:(mealState.mealCalories[mealState.mealType]+props.calories[0]),
          total:mealState.mealCalories.total+props.calories[0]}})
          redirect()}} className={classes.fab} color="primary" aria-label="add">
        <AddIcon />
        </Fab>
      </Card>
    );

}