import { Box, Button, Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { eatenAmountDisplays, Meal } from '../../models/meal';
import { mealActions } from '../../store/actions';
import { mealSelectors } from '../../store/selectors';

export const mealListTypeDate = [
  {meal: Meal.Breakfast, title: 'Breakfast', color: 'purple'},
  {meal: Meal.Lunch, title: 'Lunch', color: 'blue'},
  {meal: Meal.Dinner, title: 'Dinner', color: 'green'},
  {meal: Meal.Snack, title: 'Snack', color: 'orange'},
]

export const MealList: React.FC = () => {
  const list = useSelector(mealSelectors.mealListVM);
  const dispatch = useDispatch();

  return (<>
    <Box sx={{maxWidth: 960, width: '100%', m: '0 auto'}}>
      {list.length ? list.map((date) => (
        <Card sx={{w: '100%', mb: '16px'}} key={date.date}>
          <CardHeader title={date.formatted} titleTypographyProps={{variant: 'h6'}}>
          </CardHeader>
          <CardContent>
            {mealListTypeDate.map((mealType) => (
              <Box key={mealType.meal}>
                <Typography variant='h5' color={mealType.color}>{mealType.title}</Typography>
                <Divider sx={{borderBottomColor: mealType.color}}></Divider>
                {date.meals[mealType.meal].length ? date.meals[mealType.meal].map((m) => (
                  <Box key={m.id} sx={{display: 'grid', gridTemplateColumns: '1fr 1fr auto', gridTemplateRows: 'auto auto', gap: 1}}>
                    <Box>
                      <Typography variant="body1" gutterBottom={false}>{m.flavorName}</Typography>
                      <Typography variant="caption">{m.brandName}</Typography>
                    </Box>
                    <Typography variant="body1">{m.amount && eatenAmountDisplays[m.amount]}</Typography>
                    <Typography variant="caption" sx={{gridColumnStart: 1, gridColumnEnd: 3, gridRow: 2}}>{m.notes}</Typography>
                    <Box sx={{gridColumn: 3, gridRow: 1}}>
                      <Button onClick={() => dispatch(mealActions.editMeal(m.id))}>Edit</Button>
                    </Box>
                  </Box>
                )) : (
                  <Box>
                    <Typography variant="caption">No entries for this meal</Typography>
                  </Box>
                )}
                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'baseline', flexDirection: 'row'}}>
                  <Button onClick={() => dispatch(mealActions.newMeal({date: date.date, meal: mealType.meal}))}>Enter Meal</Button>
                </Box>
              </Box>
            ))}
          </CardContent>
        </Card>
      )) : <Typography component="p" variant="caption">No meals, yet</Typography>}
    </Box>

  </>)
}