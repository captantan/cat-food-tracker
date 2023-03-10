import { Box, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { mealSelectors } from '../../store/selectors';
import { DayCard } from './DayCard';

export const MealList: React.FC = () => {
  const list = useSelector(mealSelectors.mealListVM);

  return (
    <>
      <Box sx={{ maxWidth: 960, width: '100%', m: '0 auto' }}>
        {list.length ? (
          list.map((date) => <DayCard date={date} key={date.date} />)
        ) : (
          <Typography component="p" variant="caption">
            No meals, yet
          </Typography>
        )}
      </Box>
    </>
  );
};
