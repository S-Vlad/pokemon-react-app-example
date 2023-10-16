import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Pokemon } from 'api/types/pokemon';

const HEADER_TITLES = ['Base', 'Stats'];
const BODY_TITLES = ['HP', 'Attack', 'Defense', 'Sp.Attack', 'Sp.Defense', 'Speed'];
const keys = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];

const PokemonStats: React.FC<Props> = ({ stats }) => {
  const renderHead = () => (
    <TableRow>
      <TableCell sx={{ fontWeight: 700 }}>{HEADER_TITLES[0]}</TableCell>
      <TableCell sx={{ fontWeight: 700 }}>{HEADER_TITLES[1]}</TableCell>
    </TableRow>
  );

  const renderBody = () => {
    return BODY_TITLES.map((i, index) => (
      <TableRow key={i} sx={{ fontWeight: '700' }}>
        <TableCell>{i}:</TableCell>
        <TableCell>{stats[keys[index] as keyof typeof stats]}</TableCell>
      </TableRow>
    ));
  };

  return (
    <TableContainer component={Paper} sx={{ maxWidth: '360px' }}>
      <Table aria-label="stats table">
        <TableHead>{renderHead()}</TableHead>
        <TableBody>{renderBody()}</TableBody>
      </Table>
    </TableContainer>
  );
};

type Props = {
  stats: Pokemon['stats'];
};

export default PokemonStats;
