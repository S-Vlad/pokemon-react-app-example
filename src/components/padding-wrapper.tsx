import classNames, { Argument as ClassNameType } from 'classnames';
import React, { ReactNode } from 'react';
import { createUseStyles } from 'react-jss';

import { MEDIA_QUERIES } from '../constants/media-queries';

const useStyles = createUseStyles({
  paddingWrapper: {
    paddingTop: 32,
    paddingBottom: 56,
    paddingLeft: 16,
    paddingRight: 16,

    [MEDIA_QUERIES.min768]: {
      paddingLeft: 24,
      paddingRight: 24,
    },
    [MEDIA_QUERIES.min1440]: {
      paddingLeft: 0,
      paddingRight: 0,
      display: 'flex',
      justifyContent: 'center',
    },
  },
  wrapper: {
    [MEDIA_QUERIES.min1440]: {
      width: 1216,
    },
  },
});

const PaddingWrapper: React.FC<Props> = ({
  children,
  containerClassName,
  style,
  wrapperClassName,
  WrapperComponent = 'div',
  wrapperStyle,
}) => {
  const classes = useStyles();

  return (
    <div className={classNames(classes.paddingWrapper, containerClassName)} style={style}>
      <WrapperComponent className={classNames(classes.wrapper, wrapperClassName)} style={wrapperStyle}>
        {children}
      </WrapperComponent>
    </div>
  );
};

type Props = {
  children: ReactNode;
  containerClassName?: ClassNameType;
  style?: React.CSSProperties;
  wrapperClassName?: ClassNameType;
  WrapperComponent?: 'article' | 'div' | 'nav' | 'section';
  wrapperStyle?: React.CSSProperties;
};

export default PaddingWrapper;
