import { Button, Chip, DialogActions, DialogContent, DialogTitle, Icon, IconButton, Box, TextField, Typography } from '@mui/material';
import { useFormik, FormikErrors } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { brandsSelectors } from '../../store/selectors';
import { v4 as uuidV4 } from 'uuid';
import { brandsActions } from '../../store/actions';

interface FormModel {
  name: string;
  tag: string;
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

  const [tags, setTags] = useState(editTags);

  const formik = useFormik({
    initialValues: { name: editName ?? '', tag: '' },
    validate: validateForm,
    onSubmit({ name }, formikHelpers) {
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

        <Box sx={{pb: 3}}>
          {tags.map((t, i) => (
            <Chip
              key={t}
              label={t}
              onDelete={() => {
                const newTags = [...tags]
                newTags.splice(i, 1);
                setTags(newTags);
              }}
              sx={{
                mb: 1, mr: 1
              }}
            />
          ))}
        </Box>

        <TextField
          variant='outlined'
          fullWidth
          id="tag"
          name="tag"
          label="New Tag"
          value={formik.values.tag}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <IconButton type="button" onClick={() => {
          if (formik.values.tag) {
            setTags([...tags, formik.values.tag]);
            formik.setFieldValue('tag', '');
          }
        }}>
          <Icon>add</Icon>
        </IconButton>
      </DialogContent>
      <DialogActions>
        <Button type="button" onClick={() => dispatch(brandsActions.cacncelEditFlavor())}>Cancel</Button>
        <Button type="submit">Save</Button>
      </DialogActions>
    </form>
  );
}