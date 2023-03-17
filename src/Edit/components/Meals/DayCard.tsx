import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Icon,
  IconButton,
  Typography,
} from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import {
  eatenAmountDisplays,
  MealDayViewModel,
  mealListTypeDate,
} from '../../models/meal';
import { mealActions } from '../../store/actions';

export const DayCard: React.FC<{ date: MealDayViewModel }> = ({ date }) => {
  const dispatch = useDispatch();

  return (
    <Card sx={{ w: '100%', mb: 3 }} key={date.date}>
      <CardHeader
        title={date.formatted}
        titleTypographyProps={{ variant: 'h6', component: 'h3' }}
        sx={{ pb: 0 }}></CardHeader>
      <CardContent>
        {mealListTypeDate.map((mealType, mltdIndex) => (
          <Box
            key={mealType.meal}
            sx={{ pb: mltdIndex !== mealListTypeDate.length - 1 ? 2 : 0 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                borderBottomWidth: '1px',
                borderBottomStyle: 'solid',
                borderBottomColor: mealType.color,
                color: mealType.color,
              }}>
              <Typography
                variant="h6"
                color="inherit"
                component="h4"
                sx={{ flex: '1 1 auto' }}>
                {mealType.title}
              </Typography>
              <IconButton
                color="inherit"
                onClick={() =>
                  dispatch(
                    mealActions.newMeal({
                      date: date.date,
                      meal: mealType.meal,
                    }),
                  )
                }
                aria-label="Enter meal">
                <Icon>add_circle</Icon>
              </IconButton>
            </Box>
            {date.meals[mealType.meal].length ? (
              date.meals[mealType.meal].map((m, i) => (
                <Box
                  key={m.id}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto auto',
                    gridTemplateRows: m.notes ? 'auto auto' : 'auto',
                    gap: 1,
                    mb: i !== date.meals[mealType.meal].length - 1 ? 2 : 0,
                  }}>
                  <Box>
                    <Typography variant="body1" gutterBottom={false}>
                      {m.flavorName}
                    </Typography>
                    <Typography
                      variant="caption"
                      component="p"
                      gutterBottom={false}>
                      {m.brandName}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body1"
                    textAlign="right"
                    sx={{ alignSelf: 'center' }}>
                    {m.amount && eatenAmountDisplays[m.amount]}
                  </Typography>
                  {m.notes && (
                    <Typography
                      variant="caption"
                      component="p"
                      gutterBottom
                      sx={{ gridColumnStart: 1, gridColumnEnd: 4, gridRow: 2 }}>
                      {m.notes}
                    </Typography>
                  )}
                  <Box sx={{ gridColumn: 3, gridRow: 1, alignSelf: 'center' }}>
                    <IconButton
                      onClick={() => dispatch(mealActions.editMeal(m.id))}
                      aria-label="Edit Meal"
                      color="primary">
                      <Icon>edit</Icon>
                    </IconButton>
                  </Box>
                </Box>
              ))
            ) : (
              <Box>
                <Typography variant="caption">
                  No entries for this meal
                </Typography>
              </Box>
            )}
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};
