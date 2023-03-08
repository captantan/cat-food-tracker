import { Box, Button, Card, CardContent, CardHeader, Divider, Icon, IconButton, Typography } from '@mui/material';
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
          <CardHeader title={date.formatted} titleTypographyProps={{variant: 'h6', component: 'h3'}} sx={{pb: 0}}>
          </CardHeader>
          <CardContent>
            {mealListTypeDate.map((mealType, mltdIndex) => (
              <Box key={mealType.meal} sx={{pb: mltdIndex !== mealListTypeDate.length - 1 ? 2 : 0}}>
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  borderBottomWidth: '1px',
                  borderBottomStyle: 'solid',
                  borderBottomColor: mealType.color,
                  color: mealType.color,
                }}>
                <Typography variant='h6' color="inherit" component="h4" sx={{flex: '1 1 auto'}}>{mealType.title}</Typography>
                <IconButton
                  color="inherit"
                  onClick={() => dispatch(mealActions.newMeal({date: date.date, meal: mealType.meal}))}
                  aria-label="Enter meal">
                    <Icon>add_circle</Icon>
                  </IconButton>
                </Box>
                {date.meals[mealType.meal].length ? date.meals[mealType.meal].map((m, i) => (
                  <Box key={m.id} sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto auto',
                    gridTemplateRows: 'auto auto',
                    gap: 1,
                    mb: i !== date.meals[mealType.meal].length - 1 ? 1 : 0
                  }}>
                    <Box>
                      <Typography variant="body1" gutterBottom={false}>{m.flavorName}</Typography>
                      <Typography variant="caption">{m.brandName}</Typography>
                    </Box>
                    <Typography variant="body1" textAlign="right" sx={{alignSelf: 'center'}}>{m.amount && eatenAmountDisplays[m.amount]}</Typography>
                    <Typography variant="caption" sx={{gridColumnStart: 1, gridColumnEnd: 3, gridRow: 2}}>{m.notes}</Typography>
                    <Box sx={{gridColumn: 3, gridRow: 1, alignSelf: 'center'}}>
                      <IconButton onClick={() => dispatch(mealActions.editMeal(m.id))} aria-label="Edit Meal" color="primary">
                        <Icon>edit</Icon>
                      </IconButton>
                    </Box>
                  </Box>
                )) : (
                  <Box>
                    <Typography variant="caption">No entries for this meal</Typography>
                  </Box>
                )}
              </Box>
            ))}
          </CardContent>
        </Card>
      )) : <Typography component="p" variant="caption">No meals, yet</Typography>}
    </Box>

  </>)
}