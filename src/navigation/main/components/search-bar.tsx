import { TextField } from '@mui/material';
import { ChangeEvent, useEffect, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import { useSearchParams } from 'react-router-dom';

import { QUERY_SEARCH_PARAM } from 'constants/routes';

const marginTop = 24;
const verticalPadding = 12;
const height = 40 + verticalPadding * 2 + marginTop;

const useStyles = createUseStyles({
  searchBarCt: {
    position: 'fixed',
    zIndex: 1,
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 500,
    height,
    paddingTop: marginTop,
    backdropFilter: 'blur(5px)',
  },
  searchBar: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    paddingTop: verticalPadding,
    paddingBottom: verticalPadding,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
});

const SearchBar: React.FC = () => {
  const classes = useStyles();
  const [searchParams, setSearchParams] = useSearchParams();

  const timer = useRef<Timeout | null>(null);

  useEffect(() => {
    const query = searchParams.get(QUERY_SEARCH_PARAM);

    if (query) {
      handleChange(query);
    }
  }, [searchParams]);

  const handleChange = (value: string) => {
    if (value) {
      setSearchParams({ [QUERY_SEARCH_PARAM]: value });
    } else {
      searchParams.delete(QUERY_SEARCH_PARAM);
      setSearchParams(searchParams);
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      handleChange(e.target.value);
    }, 500);
  };

  return (
    <div className={classes.searchBarCt}>
      <div className={classes.searchBar}>
        <TextField
          label="Character name"
          onChange={handleSearchChange}
          sx={{ width: '300px' }}
          size="small"
          defaultValue={searchParams.get(QUERY_SEARCH_PARAM)}
          autoFocus
        />
      </div>
    </div>
  );
};

type Timeout = ReturnType<typeof setTimeout>;

export default SearchBar;
