import { Button, Autocomplete, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import { useFormik, FormikErrors } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { brandsSelectors } from '../../store/selectors';
import { v4 as uuidV4 } from 'uuid';
import { brandsActions } from '../../store/actions';

interface FormModel {
  name: string;
  tags: string[];
}

function validateForm(values: FormModel): FormikErrors<FormModel> {
  const errors: FormikErrors<FormModel> = {};

  if (!values.name) {
    errors.name = "Name is required";
  }

  return errors;
}

export const AddEditFlavor: React.FC = () => {
  const dispatch = useDispatch();

  const brandId = useSelector(brandsSelectors.editBrandId)
  const editId = useSelector(brandsSelectors.editFlavorId);

  const editName = useSelector(brandsSelectors.currentFlavorName);
  const editTags = useSelector(brandsSelectors.currentTagList);

  const formik = useFormik({
    initialValues: { name: editName ?? '', tags: editTags ?? [] },
    validate: validateForm,
    onSubmit({ name, tags }, formikHelpers) {
      const id = editId ?? uuidV4();

      if (!brandId) {
        throw new Error('Brand id must not be null');
      }

      dispatch(brandsActions.saveFlavor({ id, brand: brandId!, name, tags }));
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <DialogTitle>{editId ? 'Edit Brand' : 'New Brand'}</DialogTitle>
      <DialogContent sx={{pt: '8px !important', maxWidth: 320}}>
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
        />

        <Autocomplete
          fullWidth
          id="tags"
          value={formik.values.tags as string[]}
          onChange={(_event, value) => formik.setFieldValue('tags', value)}
          onBlur={formik.handleBlur}
          clearOnBlur
          multiple
          freeSolo
          options={[]}
          renderInput={(params) => <TextField 
            variant="outlined" 
            name="tags" label="Tags" {...params} />}
        />
      </DialogContent>
      <DialogActions>
        <Button type="button" onClick={() => dispatch(brandsActions.cacncelEditFlavor())}>Cancel</Button>
        <Button type="submit">Save</Button>
      </DialogActions>
    </form>
  );
}