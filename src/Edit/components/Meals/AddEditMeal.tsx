import { Button, DialogActions, DialogContent, DialogTitle, TextField, Select, MenuItem, IconButton, Icon, Typography } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { formatISO, subDays } from 'date-fns';
import { useFormik, FormikErrors } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidV4 } from 'uuid';
import { EatenAmount, MealEntry, MealFormModel } from '../../models/meal';
import { mealActions } from '../../store/actions';
import { brandsSelectors, mealSelectors } from '../../store/selectors';
import { mealListTypeDate } from './MealList';

export const AddEditMeal: React.FC = () => {
  const dispatch = useDispatch();

  const editId = useSelector(mealSelectors.editId);
  const isEdit = !!editId;
  const isConfirmDelete = useSelector(mealSelectors.isConfirmDelete);

  const currentData = useSelector(mealSelectors.currentData);
  const initialValues = useSelector(mealSelectors.initialFormValues);
  const brands = useSelector(brandsSelectors.brandSelectList);
  const flavorsForBrand = useSelector(brandsSelectors.getFlavorsForBrand);

  const validate = React.useCallback((values: MealFormModel) => {
    const errors: FormikErrors<MealFormModel> = {};

    if (!values.date) {
      errors.date = 'Date is required';
    }

    if (!values.meal) {
      errors.meal = 'Meal is required';
    }

    if (!values.brand) {
      errors.brand = 'Brand is required';
    } else if (!brands.some((b) => b.id === values.brand)) {
      errors.brand = 'Invalid brand';
    } else {
      const flavors = flavorsForBrand(values.brand);

      if (values.flavor && !flavors.some((f) => f.id === values.flavor)) {
        errors.flavor = 'Invalid flavor';
      }
    }

    if (!values.flavor) {
      errors.flavor = 'Flavor is required';
    }

    return errors;
  }, [brands, flavorsForBrand])

  const formik = useFormik<MealFormModel>({
    initialValues,
    validate,
    onSubmit(values, formikHelpers) {
      let meal: MealEntry;

      if (currentData) {
        meal = {
          ...currentData,
          date: formatISO(values.date, { representation: 'date' }),
          meal: values.meal,
          amount: values.amount || null,
          brand: values.brand!,
          flavor: values.flavor!,
          notes: values.notes,
        }
      } else {
        meal = {
          id: uuidV4(),
          date: formatISO(values.date, { representation: 'date' }),
          meal: values.meal,
          amount: values.amount || null,
          brand: values.brand!,
          flavor: values.flavor!,
          notes: values.notes,
          order: 0, //TODO: make this dynamic
        }
      }

      dispatch(mealActions.saveMeal(meal));
    },
  });

  const [prevBrand, setPrevBrand] = React.useState(formik.values.brand);

  if (prevBrand !== formik.values.brand) {
    // brand changed
    // clear flavor when brand changes
    setPrevBrand(formik.values.brand);
    formik.setFieldValue('flavor', '');
    formik.setFieldTouched('favor', false);
  }

  const mealFieldId = React.useId();
  const amountFieldId = React.useId();
  const brandFieldId = React.useId();
  const flavorFieldId = React.useId();

  if (isConfirmDelete) {
    return (
      <>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogContent>
        <Typography variant="body1">This action cannot be undone.</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dispatch(mealActions.noDelete())}>No</Button>
        <Button color="warning" onClick={() => dispatch(mealActions.yesDelete(editId!))}>Yes</Button>
      </DialogActions>
      </>
    )
  } else {
  return (
    <form onSubmit={formik.handleSubmit}>
      <DialogTitle>{editId ? 'Edit Meal' : 'New Meal'}</DialogTitle>
      <DialogContent sx={{ pt: '8px !important' }}>
        <DatePicker
          disableFuture
          disabled={isEdit}
          label="Date"
          inputFormat="PPPP"
          value={formik.values.date}
          onChange={(d) => formik.setFieldValue('date', d)}
          renderInput={(params) => (<TextField
            fullWidth
            id="date"
            name="date"
            type="date"
            onBlur={formik.handleBlur}
            error={formik.touched.date && Boolean(formik.errors.date)}
            helperText={(formik.touched.date && formik.errors.date as string) || ' '}
            {...params}
          ></TextField>)}
        ></DatePicker>

        {!isEdit && <ButtonGroup sx={{ mb: 3 }}>
          <Button onClick={() => formik.setFieldValue('date', subDays(new Date(), 1))}>Yesterday</Button>
          <Button onClick={() => formik.setFieldValue('date', new Date())}>Today</Button>
        </ButtonGroup>}

        <FormControl fullWidth
          disabled={isEdit}
            error={formik.touched.meal && Boolean(formik.errors.meal)}>
          <InputLabel id={'label-' + mealFieldId}>Meal</InputLabel>
          <Select
            labelId={'label-' + mealFieldId}
            aria-describedby={'helper-' + mealFieldId}
            id="meal"
            name="meal"
            label="Meal"
            value={formik.values.meal}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          >
            {mealListTypeDate.map((mt) => (
              <MenuItem key={mt.meal} value={mt.meal}>{mt.title}</MenuItem>
            ))}
          </Select>
          <FormHelperText id={'helper-' + mealFieldId}>
            {(formik.touched.meal && formik.errors.meal) || ' '}
          </FormHelperText>
        </FormControl>

        <FormControl fullWidth
            error={formik.touched.brand && Boolean(formik.errors.brand)}>
          <InputLabel id={'label-' + brandFieldId}>Brand</InputLabel>
          <Select
            labelId={'label-' + brandFieldId}
            aria-describedby={'helper-' + brandFieldId}
            id="brand"
            name="brand"
            label="Brand"
            value={formik.values.brand}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          >
            {brands.map((b) => (
              <MenuItem key={b.id} value={b.id}>{b.name}</MenuItem>
            ))}
          </Select>
          <FormHelperText id={'helper-' + brandFieldId}>
            {(formik.touched.brand && formik.errors.brand) || ' '}
          </FormHelperText>
        </FormControl>

        <FormControl fullWidth
            error={formik.touched.flavor && Boolean(formik.errors.flavor)}>
          <InputLabel id={'label-' + flavorFieldId}>Flavor</InputLabel>
          <Select
            labelId={'label-' + flavorFieldId}
            aria-describedby={'helper-' + flavorFieldId}
            id="flavor"
            name="flavor"
            label="Flavor"
            value={formik.values.flavor}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          >
            {(formik.values.brand ? flavorsForBrand(formik.values.brand) : []).map((f) => (
              <MenuItem key={f.id} value={f.id}>{f.name}</MenuItem>
            ))}
          </Select>
          <FormHelperText id={'helper-' + flavorFieldId}>
            {(formik.touched.flavor && formik.errors.flavor) || ' '}
          </FormHelperText>
        </FormControl>

        <FormControl fullWidth
            error={formik.touched.amount && Boolean(formik.errors.amount)}>
          <InputLabel id={'label-' + amountFieldId}>Amount</InputLabel>
          <Select
            labelId={'label-' + amountFieldId}
            aria-describedby={'helper-' + amountFieldId}
            id="amount"
            name="amount"
            label="Amount"
            value={formik.values.amount}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          >
            <MenuItem value={''} sx={{ color: 'lightgrey' }}>Unset</MenuItem>
            <MenuItem value={EatenAmount.Unknown}>Unknown</MenuItem>
            <MenuItem value={EatenAmount.None}>None</MenuItem>
            <MenuItem value={EatenAmount.Little}>Little</MenuItem>
            <MenuItem value={EatenAmount.Some}>Some</MenuItem>
            <MenuItem value={EatenAmount.Half}>Half</MenuItem>
            <MenuItem value={EatenAmount.Most}>Most</MenuItem>
            <MenuItem value={EatenAmount.All}>All</MenuItem>
          </Select>
          <FormHelperText id={'helper-' + amountFieldId}>
            {(formik.touched.amount && formik.errors.amount) || ' '}
          </FormHelperText>
        </FormControl>

        <TextField
          variant='outlined'
          fullWidth
          id="notes"
          name="notes"
          label="Notes"
          multiline
          value={formik.values.notes}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.notes && Boolean(formik.errors.notes)}
          helperText={(formik.touched.notes && formik.errors.notes) || ' '}
        ></TextField>
      </DialogContent>
      <DialogActions>
        {isEdit && (<IconButton color="warning" type="button" onClick={() => dispatch(mealActions.deleteMeal())}>
          <Icon>delete</Icon>
          </IconButton>)}
        <Button type="button" onClick={() => dispatch(mealActions.cancelEditMeal())}>Cancel</Button>
        <Button type="submit">Save</Button>
      </DialogActions>
    </form>
  );
            }
}