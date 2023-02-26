import { Button, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import { useFormik, FormikErrors } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { brandsSelectors } from '../../store/selectors';
import { v4 as uuidV4 } from 'uuid';
import { brandsActions } from '../../store/actions';

interface FormModel {
  name: string;
}

function validateForm(values: FormModel): FormikErrors<FormModel> {
  const errors: FormikErrors<FormModel> = {};

  if (!values.name) {
    errors.name = "Name is required";
  }

  return errors;
}

export const AddEditBrand: React.FC = () => {
  const dispatch = useDispatch();

  const editId = useSelector(brandsSelectors.editBrandId);
  const isEdit = !!editId;

  const editName = useSelector(brandsSelectors.currentBrandName);

  const formik = useFormik({
    initialValues: { name: editName ?? '' },
    validate: validateForm,
    onSubmit({ name }, formikHelpers) {
      const id = editId ?? uuidV4();
      dispatch(brandsActions.saveBrand({ id, name }));
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <DialogTitle>{editId ? 'Edit Brand' : 'New Brand'}</DialogTitle>
      <DialogContent sx={{pt: '8px !important'}}>
        {editId && <div>
          <Typography variant="overline" gutterBottom={false} sx={{ lineHeight: 1.5 }}>Current Name</Typography>
          <Typography variant="body1" gutterBottom sx={{ mb: 3 }}>{editName}</Typography>
        </div>}
        <TextField
          variant='outlined'
          fullWidth
          id="name"
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={(formik.touched.name && formik.errors.name) || ' '}
        ></TextField>
      </DialogContent>
      <DialogActions>
        <Button type="button" onClick={() => dispatch(brandsActions.cancelEditBrand())}>Cancel</Button>
        <Button type="submit">Save</Button>
      </DialogActions>
    </form>
  );
}