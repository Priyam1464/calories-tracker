import React,{useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Link} from 'react-router-dom'
import MealContext from '../../Context/MealContext'
import MealItems from '../MealItems/MealItems'
import Header from "../Header/Header"
import ProgressBar from "../ProgressBar/ProgressBar"

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  column:{
    display:"flex",
    flexDirection:"column"
  }
}));

export default function MealTracker() {
  const classes = useStyles();
   const {mealState,setMealState}=useContext(MealContext)
   console.log("Meal tracker",mealState)
  return (
    <>
    <Header/>
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Breakfast</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className={classes.column}>
        <MealItems mealItems={mealState["breakfast"]}/>
        <Link to={{pathname:"/searchItem"}}><Button onClick={()=>setMealState({...mealState,mealType:"breakfast"})} variant="contained" color="primary">
            Add Something
        </Button>
        </Link>
        </div>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Lunch</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className={classes.column}>
        <MealItems mealItems={mealState["lunch"]}/>
        <Link to={{pathname:"/searchItem"}}><Button onClick={()=>setMealState({...mealState,mealType:"lunch"})} variant="contained" color="primary">
            Add Something
        </Button>
        </Link>
        </div>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography className={classes.heading}>Dinner</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className={classes.column}>
        <MealItems mealItems={mealState["dinner"]}/>
        <Link to={{pathname:"/searchItem"}}><Button onClick={()=>setMealState({...mealState,mealType:"dinner"})} variant="contained" color="primary">
            Add Something
        </Button>
        </Link>
        </div>
        </AccordionDetails>
      </Accordion>
      <ProgressBar totalCalories={mealState.mealCalories.total} initialCalories={mealState.mealCalories.initialCalories}/>
    </div>
    </>
  );
}
