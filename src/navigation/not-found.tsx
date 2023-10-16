import { Typography, Button } from '@mui/material';
import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router-dom';

import PaddingWrapper from 'components/padding-wrapper';
import { MAIN } from 'constants/routes';

const useStyles = createUseStyles({
  notFoundCt: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 32px - 56px)', // top and bottom paddings from PaddingWrapper
  },
});

const NotFount = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <PaddingWrapper wrapperClassName={classes.notFoundCt}>
      <Typography variant="h2" component="h1">
        Page not found
      </Typography>
      <Button onClick={() => navigate(MAIN)}>Nav to main</Button>
    </PaddingWrapper>
  );
};

export default NotFount;
