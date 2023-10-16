import { CircularProgress } from '@mui/material';
import React from 'react';
import { createUseStyles } from 'react-jss';
import { CSSTransition } from 'react-transition-group';

const useStyles = createUseStyles({
  loaderContainer: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 6,
  },
  loaderCtEnter: {
    opacity: 0,
  },
  loaderCtEnterActive: {
    opacity: 1,
    transition: 'opacity ease-in .3s',
    transitionProperty: 'opacity',
  },
  loaderCtExit: {
    opacity: 1,
  },
  loaderCtExitActive: {
    opacity: 0,
    transition: 'opacity ease-out .3s',
    transitionProperty: 'opacity',
  },
});

const FetchOverlay: React.FC<Props> = ({ isFetching }) => {
  const classes = useStyles();
  const loaderCtClasses = {
    enter: classes.loaderCtEnter,
    enterActive: classes.loaderCtEnterActive,
    exit: classes.loaderCtExit,
    exitActive: classes.loaderCtExitActive,
  };

  return (
    <CSSTransition in={isFetching} classNames={loaderCtClasses} timeout={500} unmountOnExit mountOnEnter>
      <div className={classes.loaderContainer}>
        <CircularProgress sx={{ position: 'sticky', top: '49%' }} />
      </div>
    </CSSTransition>
  );
};

type Props = {
  isFetching: boolean;
};

export default FetchOverlay;
