import { Link } from 'react-router-dom';
import { useState } from 'react';

import { Card, CardActionArea, CardContent, CardMedia, Skeleton, Typography } from '@mui/material';

import { Character } from '../../types/api';
import { statusColor } from '../../utils/statusColor';

const CharacterCard = ({ char, isLoading }: { char: Character; isLoading: boolean }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  return (
    <Card sx={{ width: 220, height: 350 }}>
      <CardActionArea
        component={Link}
        to={'/character/' + char.id}
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', height: '100%' }}
      >
        <div style={{ position: 'relative', height: '200px', width: '100%' }}>
          {!imgLoaded && (
            <Skeleton
              sx={{ position: 'absolute', width: '100%', height: '100%', top: 0 }}
              animation="wave"
              variant="rectangular"
            />
          )}
          {!isLoading && (
            <CardMedia
              onLoad={() => setImgLoaded(true)}
              component="img"
              image={char.image}
              alt={'picture of ' + char.name}
              height={200}
            />
          )}
        </div>
        <CardContent
          sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between', width: '85%' }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {!isLoading ? char.name : <Skeleton />}
          </Typography>
          <Typography variant="body2" color={statusColor[char.status]} fontWeight={600}>
            {!isLoading ? char.status : <Skeleton width={'30%'} />}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CharacterCard;