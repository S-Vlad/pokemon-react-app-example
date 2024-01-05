import { Button, Typography } from '@mui/material';
import { FallbackProps } from 'react-error-boundary';
import { createUseStyles } from 'react-jss';

import PaddingWrapper from './padding-wrapper';

const useStyles = createUseStyles({
  fallbackComponentCt: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 32px - 56px)', // top and bottom paddings from PaddingWrapper
  },
});

const FallbackComponent: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  const classes = useStyles();

  return (
    <PaddingWrapper wrapperClassName={classes.fallbackComponentCt}>
      <Typography variant='h2' component='h1'>
        {error.message}
      </Typography>
      <Button onClick={resetErrorBoundary}>Refresh</Button>
    </PaddingWrapper>
  );
};

export default FallbackComponent;
