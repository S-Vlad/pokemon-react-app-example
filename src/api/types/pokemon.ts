export type PokemonShort = {
  name: string;
  url: string;
};

export type PokemonResponse = {
  id: number;
  height: number;
  name: string;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  stats: { base_stat: number }[];
  types: { type: { name: string } }[];
  weight: number;
};

export type Pokemon = {
  id: number;
  height: number;
  name: string;
  sprites: {
    front_default: string;
  };
  stats: {
    hp: number;
    attack: number;
    defense: number;
    'special-attack': number;
    'special-defense': number;
    speed: number;
  };
  types: string[];
  weight: number;
};

export type PokemonsResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonShort[];
};
