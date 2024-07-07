import { useState } from 'react';

import { Box, Chip, Divider, Skeleton, Stack, Typography } from '@mui/material';

import { Character } from '../../types/api';
import { statusColor } from '../../utils/statusColor';

const CharacterDetails = ({ character }: { character: Character }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  if (!character) return null;

  return (
    <Box sx={{ m: 4 }}>
      <Box pb={4}>
        <Stack direction="row" justifyContent="flex-start" alignItems="flex-start" gap={4}>
          <div style={{ position: 'relative', height: '30vw', width: '30vw' }}>
            {!imgLoaded && (
              <Skeleton
                sx={{ position: 'absolute', top: 0, width: '100%', height: '100%' }}
                animation="wave"
                variant="rectangular"
              />
            )}
            <img
              style={{ width: '100%', height: '100%' }}
              src={`${character?.image}`}
              alt={'picture of ' + character?.name}
              onLoad={() => setImgLoaded(true)}
            />
          </div>
          <Stack direction="column" justifyContent="flex-start" alignItems="flex-start" flexGrow={1}>
            <Typography gutterBottom variant="h4" component="div">
              {character?.name}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              Episodes: {character?.episode?.length}
            </Typography>
          </Stack>
        </Stack>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Typography gutterBottom variant="body2">
          Special marks
        </Typography>
        <Stack direction="row" spacing={1}>
          <Chip sx={{backgroundColor: statusColor[character.status]}} label={character?.status} size="small" />
          <Chip label={character?.gender} size="small" />
          <Chip label={character?.species} size="small" />
        </Stack>
      </Box>
    </Box>
  );
};

export default CharacterDetails;