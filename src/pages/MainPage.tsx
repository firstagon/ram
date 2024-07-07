import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { Box, Pagination } from '@mui/material';
import CharactersList from '../components/CharactersList/CharactersList';
import SearchInput from '../components/Search/SearchInput';
import charsStore from '../stores/characters-store';

const MainPage = observer(() => {
  const { characters, isLoading, error, pages, getCharacters } = charsStore;
  const [searchInput, setSearchInput] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    getCharacters(page);
  }, []);

  const searchSubmit = (payload?: string) => {
    setPage(1);
    getCharacters(null, payload);
  };

  const pageSelectHandler = (e: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    getCharacters(value, searchInput);
  };

  return (
    <Box display="flex" alignItems="center" justifyContent={'center'} flexDirection={'column'}>
      <SearchInput input={searchInput} setInput={setSearchInput} onSubmit={searchSubmit} />
      {error ? (
        <div>{error}</div>
      ) : (
        <>
          <Pagination disabled={isLoading} count={pages} page={page} onChange={pageSelectHandler} sx={{ mb: 2 }} />
          <CharactersList characters={characters} isLoading={isLoading} />
          <Pagination disabled={isLoading} count={pages} page={page} onChange={pageSelectHandler} sx={{ mb: 2 }} />
        </>
      )}
    </Box>
  );
});

export default MainPage;