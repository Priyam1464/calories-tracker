import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      display:"flex",
      justifyContent:"flex-start",
      flexDirection:"column"
    },
    row:{
        display:"flex",
        justifyContent:"space-between",
        flexDirection:"row"
    },
    end:{
        textAlign:"right"
    }
  });

function MealItems({mealItems})
{
    const classes = useStyles();
    return (
        
           mealItems.map((mealItem,index)=>
            (
                <div className={classes.root}>
                    <div className={classes.row}>
                <p>{index+1}.</p>
                <p>{mealItem.item}</p>
                <p className={classes.end}>{mealItem.calories}</p>
                </div>
                </div>
           ))
    
    )
}

export default MealItems