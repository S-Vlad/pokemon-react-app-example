import { createUseStyles } from 'react-jss';

import { MEDIA_QUERIES } from 'constants/media-queries';

export const useStyles = createUseStyles({
  avatarCt: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },
  avatar: {
    width: '100%',
    objectFit: 'contain',
    maxHeight: 420,
    maxWidth: 420,
  },
  typesCt: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    display: 'flex',
    flexWrap: 'wrap',
    columnGap: 5,
    rowGap: 5,
  },
  type: {
    padding: 5,
    borderRadius: 5,
    color: '#fff',
    fontWeight: 700,
    outline: '1px solid white',
    textTransform: 'capitalize',

    '&.poison': {
      backgroundColor: '#a040a0',
    },
    '&.normal': {
      backgroundColor: '#a8a878',
    },
    '&.grass': {
      backgroundColor: '#78c850',
    },
    '&.ground': {
      backgroundColor: '#e0c068',
    },
    '&.fighting': {
      backgroundColor: '#c03028',
    },
    '&.rock': {
      backgroundColor: '#b8a038',
    },
    '&.steel': {
      backgroundColor: '#b8b8d0',
    },
    '&.fire': {
      backgroundColor: '#f08030',
    },
    '&.electric': {
      backgroundColor: '#f8d030',
    },
    '&.flying': {
      backgroundColor: '#a890f0',
    },
    '&.psychic': {
      backgroundColor: '#f85888',
    },
    '&.bug': {
      backgroundColor: '#a8b820',
    },
    '&.dragon': {
      backgroundColor: '#7038f8',
    },
    '&.water': {
      backgroundColor: '#6890f0',
    },
    '&.ice': {
      backgroundColor: '#98d8d8',
    },
    '&.dark': {
      backgroundColor: '#705848',
    },
    '&.ghost': {
      backgroundColor: '#705898',
    },
    '&.fairy': {
      backgroundColor: '#ffaec9',
    },
  },
  description: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    rowGap: 32,
    marginTop: 32,
    width: '100%',

    [MEDIA_QUERIES.min768]: {
      display: 'flex',
      flexDirection: 'row',
      rowGap: 0,
      columnGap: 32,
    },
  },
});
