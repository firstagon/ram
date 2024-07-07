import { Box } from '@mui/material';
import CharacterCard from '../CharacterCard/CharacterCard';

import { Character } from '../../types/api';

interface CharactersProps {
  characters: Character[] | null;
  isLoading: boolean;
}

const CharactersList = (props: CharactersProps) => {
  const { characters, isLoading } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '90%',
        mb: 2,
        gap: 2,
      }}
    >
      {characters?.map((el) => <CharacterCard isLoading={isLoading} char={el} key={el.id} />)}
    </Box>
  );
};

export default CharactersList;