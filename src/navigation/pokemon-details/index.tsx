import { Typography, Button, useMediaQuery } from '@mui/material';

import classNames from 'classnames';
import { useNavigate, useParams } from 'react-router-dom';

import { usePokemonDetails } from 'api/get-pokemon-details';
import { Component as NotFound } from 'navigation/not-found';

import FetchOverlay from 'components/fetch-overlay';
import PaddingWrapper from 'components/padding-wrapper';
import PageMetaHeader from 'components/page-meta-header';

import PokemonStats from './components/stats';
import { useStyles } from './components/styles';

export const Component: React.FC = () => {
  const classes = useStyles();
  const { name } = useParams();
  const navigate = useNavigate();
  const isLessThen768 = useMediaQuery('(max-width:768px)');
  const { data, isFetching, isLoading } = usePokemonDetails(name as string);

  if (isFetching) {
    return <FetchOverlay isFetching />;
  }

  // is loading first time
  if (!isLoading && !data) {
    return <NotFound />;
  }

  if (!data) {
    return null;
  }

  const handleBackClick = () => navigate(-1);
  const pokemonName = data.name.charAt(0).toUpperCase() + data.name.slice(1);

  const renderTypes = () => (
    <div className={classes.typesCt}>
      {data.types.map((type) => (
        <div key={type} className={classNames(classes.type, type)}>
          {type}
        </div>
      ))}
    </div>
  );

  return (
    <PaddingWrapper WrapperComponent='article'>
      <PageMetaHeader
        title={`${pokemonName} Pokémon page`}
        description={`This is ${pokemonName} personal page, where you can learn about Pokémon stats, abilities, and other information.`}
        type='article'
      />

      <Button onClick={handleBackClick} sx={{ position: isLessThen768 ? 'relative' : 'absolute' }}>
        Back
      </Button>

      <Typography
        variant='h1'
        component='h1'
        sx={{
          ...(isLessThen768 && { fontSize: '56px' }),
          textAlign: 'center',
          textTransform: 'capitalize',
        }}
      >
        {data.name}
      </Typography>

      <div className={classes.description}>
        <div>
          <div className={classes.avatarCt}>
            <img className={classes.avatar} src={data.sprites.front_default} />

            {renderTypes()}
          </div>

          <Typography variant='h6' component='div' sx={{ marginTop: 2 }}>
            Height: {data.height}, Weight: {data.weight}
          </Typography>
        </div>

        <PokemonStats stats={data.stats} />
      </div>
    </PaddingWrapper>
  );
};
