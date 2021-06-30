import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);


const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});



export default function ProgressBar({initialCalories,totalCalories}) {
  const classes = useStyles();
  const getProgress=()=>
  {
      return (totalCalories/initialCalories)*100
  }
  return (
    <div className={classes.root}>
      <BorderLinearProgress variant="determinate" value={getProgress()} />
    </div>
  );
}
