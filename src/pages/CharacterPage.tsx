import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import characterStore from '../stores/character-store';
import CharacterDetails from '../components/CharacterDetails/CharacterDetails';
import { LinearProgress } from '@mui/material';

const CharacterPage = observer(() => {
  const params = useParams();
  const { character, isLoading, error, getCharacter, clearCharacter } = characterStore;

  useEffect(() => {
    if (params.id) getCharacter(+params.id);
    return () => {
      clearCharacter();
    };
  }, []);

  if (isLoading) return <LinearProgress />;
  if (error) return <div> {error} </div>;
  return character && <CharacterDetails character={character} />;
});

export default CharacterPage;