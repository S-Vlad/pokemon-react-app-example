import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useSearchParams } from 'react-router-dom';

import { usePokemons } from 'api/get-pokemons';
import { PokemonShort } from 'api/types';
import FetchOverlay from 'components/fetch-overlay';
import { QUERY_SEARCH_PARAM } from 'constants/routes';

import Item from './components/item';
import SearchBar from './components/search-bar';
import SEO from 'components/seo';

const useStyles = createUseStyles({
  mainPageCt: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: 24,
  },
  pokemonsCt: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 112, // 40 + 24*2 + 12*2 - sizes from the SearchBar component
    rowGap: 24,
  },
});

const MainPage: React.FC = () => {
  const classes = useStyles();
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState<PokemonShort[]>([]);
  const { data: list, isFetching } = usePokemons();

  const isSearching = !isFetching && list?.results.length;
  const query = searchParams.get(QUERY_SEARCH_PARAM);

  useEffect(() => {
    if (!list) {
      return;
    }

    if (query) {
      const resultItems = list.results.filter((i) => i.name.includes(query));
      setSearchResults(resultItems);
    } else {
      setSearchResults(list.results);
    }
  }, [list, query]);

  return (
    <div className={classes.mainPageCt}>
      <SearchBar />

      {isSearching ? (
        <div className={classes.pokemonsCt}>
          {searchResults.map((item) => (
            <Item data={item} name={item.name} key={item.name} />
          ))}
        </div>
      ) : null}

      <FetchOverlay isFetching={isFetching} />

      {isSearching && !searchResults.length && <Typography variant='h5'>No matching results</Typography>}

      <SEO
        title={`Pokémons page`}
        description={`Find Pokémons and familiarize yourself with their skills, abilities and other characteristics.`}
        type='article'
      />
    </div>
  );
};

export default MainPage;
