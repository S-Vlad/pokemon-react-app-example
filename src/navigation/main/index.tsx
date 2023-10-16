import { Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useSearchParams } from 'react-router-dom';

import { PokemonShort } from 'api/types/pokemon';
import FetchOverlay from 'components/fetch-overlay';
import { QUERY_SEARCH_PARAM } from 'constants/routes';
import { useAppDispatch, useAppSelector } from 'hooks/index';
import { POKEMONS_LOADING_KEY } from 'store/pokemons/extra-reducers/add-fetch-pokemons';
import { fetchPokemons } from 'store/pokemons/thunks/fetch-pokemons';

import Item from './components/item';
import SearchBar from './components/search-bar';

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
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const { list, loadingKeys } = useAppSelector((s) => s.pokemons);

  const [searchResults, setSearchResults] = useState<PokemonShort[]>([]);

  const observerTarget = useRef(null);

  const isLoading = loadingKeys.includes(POKEMONS_LOADING_KEY);
  const isSearching = searchResults.length < list.length;
  const query = searchParams.get(QUERY_SEARCH_PARAM);

  useEffect(() => {
    const promise = dispatch(fetchPokemons());

    return () => promise.abort();
  }, []);

  useEffect(() => {
    if (query) {
      const resultItems = list.filter((i) => i.name.includes(query));
      setSearchResults(resultItems);
    } else {
      setSearchResults(list);
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

      <FetchOverlay isFetching={isLoading} />

      {isSearching && !searchResults.length && <Typography variant="h5">No matching results</Typography>}

      <div ref={observerTarget} />
    </div>
  );
};

export default MainPage;
