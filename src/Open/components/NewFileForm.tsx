import { Button, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useFormik, FormikErrors } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { NavigateFunction } from 'react-router';
import { store } from '../../store/configure';
import { newFileActions } from '../store/actions';

interface FormModel {
  name: string;
}

const invalidChars = [
  '<', '>', ':', '"', '\\', '/', '|', '?', '*'
]

function validateForm(values: FormModel): FormikErrors<FormModel> {
  const errors: FormikErrors<FormModel> = {};

  if (!values.name) {
    errors.name = "Name is required";
  } else if (invalidChars.some((ic) => values.name.includes(ic))) {
    errors.name = 'May not include: < > : " \\ / | ? *';
  }

  return errors;
}

export const NewFileForm: React.FC<{path: string, navigator: NavigateFunction}> = (props) => {
  const dispatch = useDispatch() as typeof store.dispatch;

  const formik = useFormik({
    initialValues: { name: '' },
    validate: validateForm,
    onSubmit({ name }, formikHelpers) {
      dispatch(newFileActions.createFile(props.path + '/' + encodeURIComponent(name), props.navigator));
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <DialogTitle>New File</DialogTitle>
      <DialogContent sx={{pt: '8px !important'}}>
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
        <Button type="button" onClick={() => dispatch(newFileActions.closeDialog())}>Cancel</Button>
        <Button type="submit">Save</Button>
      </DialogActions>
    </form>
  );
}