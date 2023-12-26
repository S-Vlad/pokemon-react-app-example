import { Card, CardActionArea, Typography } from '@mui/material';
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';

import { PokemonShort } from 'api/types';
import { POKEMON_DETAILS } from 'constants/routes';

const useStyles = createUseStyles({
  pokemonCt: {
    width: 300,
    color: 'inherit',
    textDecoration: 'inherit',
  },
});

const PokemonItem: React.FC<Props> = ({ data, name }) => {
  const classes = useStyles();

  return (
    <Link to={`${POKEMON_DETAILS}/${name}`} className={classes.pokemonCt}>
      <Card>
        <CardActionArea sx={{ padding: 2 }}>
          <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
            Pokemon:
          </Typography>
          <Typography variant='h5'>{data.name.toUpperCase()}</Typography>
        </CardActionArea>
      </Card>
    </Link>
  );
};

type Props = {
  data: PokemonShort;
  name: string;
};

export default PokemonItem;
