import { Typography, Button, useMediaQuery } from '@mui/material';
import classNames from 'classnames';
import { useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { useNavigate, useParams } from 'react-router-dom';

import FetchOverlay from 'components/fetch-overlay';
import PaddingWrapper from 'components/padding-wrapper';
import { MEDIA_QUERIES } from 'constants/media-queries';
import { useAppDispatch, useAppSelector } from 'hooks/index';
import { fetchPokemonDetails } from 'store/pokemons/thunks/fetch-pokemon-details';

import PokemonStats from './components/stats';

const useStyles = createUseStyles({
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

const PokemonDetails: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const { name } = useParams();
  const navigate = useNavigate();
  const isLessThen768 = useMediaQuery('(max-width:768px)');

  const { charsByName } = useAppSelector((s) => s.pokemons);

  const currentChar = charsByName[name as string];

  useEffect(() => {
    if (!currentChar) {
      const promise = dispatch(fetchPokemonDetails(name as string));

      return () => promise.abort();
    }
  }, [currentChar, name]);

  if (!currentChar) {
    return <FetchOverlay isFetching />;
  }

  const handleBackClick = () => navigate(-1);

  const renderTypes = () => (
    <div className={classes.typesCt}>
      {currentChar.types.map((type) => (
        <div key={type} className={classNames(classes.type, type)}>
          {type}
        </div>
      ))}
    </div>
  );

  return (
    <PaddingWrapper WrapperComponent="article">
      <Button onClick={handleBackClick} sx={{ position: isLessThen768 ? 'relative' : 'absolute' }}>
        Back
      </Button>

      <Typography
        variant="h1"
        component="h1"
        sx={{
          ...(isLessThen768 && { fontSize: '56px' }),
          textAlign: 'center',
          textTransform: 'capitalize',
        }}
      >
        {currentChar.name}
      </Typography>

      <div className={classes.description}>
        <div>
          <div className={classes.avatarCt}>
            <img className={classes.avatar} src={currentChar.sprites.front_default} />

            {renderTypes()}
          </div>

          <Typography variant="h6" component="div" sx={{ marginTop: 2 }}>
            Height: {currentChar.height}, Weight: {currentChar.weight}
          </Typography>
        </div>

        <PokemonStats stats={currentChar.stats} />
      </div>
    </PaddingWrapper>
  );
};

export default PokemonDetails;
