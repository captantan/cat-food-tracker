import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  ListSubheader,
  MenuItem,
  Radio,
  RadioGroup,
  Chip,
  Select,
  ListItemText,
  Box,
} from '@mui/material';
import { FormikErrors, useFormik } from 'formik';
import { unnest } from 'ramda';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FilterDefinition, FilterType } from '../../models/filter';
import { filterActions } from '../../store/actions';
import { brandsSelectors, filterSelectors } from '../../store/selectors';

interface FormModel {
  type: FilterType;
  tags: string[];
  flavors: string[]; //FlavorIdRecord as json
}

function validate(values: FormModel): FormikErrors<FormModel> {
  const errors: FormikErrors<FormModel> = {};

  if (!values.type) {
    errors.type = 'Type is required';
  }

  switch (values.type) {
    case FilterType.Tags:
      if (!values.tags || !values.tags.length) {
        errors.tags = 'Must select at least 1 tag to filter on';
      }
      break;
    case FilterType.Flavors:
      if (!values.flavors || !values.flavors.length) {
        errors.flavors = 'Must select at least 1 flavor to filter on';
      }
      break;
  }
  return errors;
}

const initialValue: FormModel = {
  type: FilterType.Tags,
  tags: [],
  flavors: [],
};

export const FilterForm: React.FC = () => {
  const dispatch = useDispatch();

  const savedFilters = useSelector(filterSelectors.filterSettings);
  const tagOptions = useSelector(brandsSelectors.allTags);
  const flavorOptions = useSelector(brandsSelectors.fullFlavorList);

  const formik = useFormik<FormModel>({
    initialValues: savedFilters
      ? {
          type: savedFilters.type,
          tags: savedFilters.type === FilterType.Tags ? savedFilters.tags : [],
          flavors:
            savedFilters.type === FilterType.Flavors
              ? savedFilters.flavors
              : [],
        }
      : initialValue,
    validate,
    onSubmit: (values) => {
      let filterDef: FilterDefinition;

      switch (values.type) {
        case FilterType.Tags:
          filterDef = { type: FilterType.Tags, tags: values.tags };
          break;
        case FilterType.Flavors:
          filterDef = { type: FilterType.Flavors, flavors: values.flavors };
          break;
      }

      dispatch(filterActions.viewResults(filterDef));
    },
  });

  const typeFieldId = React.useId();
  const tagFieldId = React.useId();
  const flavorFieldId = React.useId();

  let body: React.ReactNode | React.ReactNode[];

  switch (formik.values.type) {
    case FilterType.Tags:
      body = (
        <FormControl
          fullWidth
          error={formik.touched.tags && Boolean(formik.errors.tags)}>
          <InputLabel id={tagFieldId + '-label'}>Tags</InputLabel>
          <Select
            multiple
            labelId={tagFieldId + '-label'}
            aria-describedby={tagFieldId + '-helper'}
            id={tagFieldId}
            name="tags"
            label="Tags"
            value={formik.values.tags}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}>
            {tagOptions.map((t) => (
              <MenuItem key={t} value={t}>
                [{t}]
              </MenuItem>
            ))}
          </Select>
          <FormHelperText id={tagFieldId + '-helper'}>
            {(formik.touched.tags && formik.errors.tags) || ' '}
          </FormHelperText>
        </FormControl>
      );
      break;
    case FilterType.Flavors:
      body = (
        <FormControl
          fullWidth
          error={formik.touched.flavors && Boolean(formik.errors.flavors)}>
          <InputLabel id={flavorFieldId + '-label'}>Flavors</InputLabel>
          <Select
            multiple
            labelId={flavorFieldId + '-label'}
            aria-describedby={flavorFieldId + '-helper'}
            id={flavorFieldId}
            name="flavors"
            label="Flavors"
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            value={formik.values.flavors}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}>
            {unnest(
              flavorOptions.map((b) =>
                [
                  <ListSubheader key={b.brand.id}>
                    {b.brand.name}
                  </ListSubheader>,
                ].concat(
                  b.flavorsSorted.map((f) => (
                    <MenuItem key={b.brand.id + f.id} value={f.filterId}>
                      <Checkbox
                        checked={formik.values.flavors.includes(f.filterId)}
                      />
                      <ListItemText primary={f.name} />
                    </MenuItem>
                  )),
                ),
              ),
            )}
          </Select>
          <FormHelperText id={flavorFieldId + '-helper'}>
            {(formik.touched.flavors && (formik.errors.flavors as string)) ||
              ' '}
          </FormHelperText>
        </FormControl>
      );
      break;
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl>
        <FormLabel id={typeFieldId + '-label'}>Type</FormLabel>
        <RadioGroup
          aria-labelledby={typeFieldId + '-label'}
          name="type"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.type}>
          <FormControlLabel
            value={FilterType.Tags}
            control={<Radio />}
            label="Tags"
          />
          <FormControlLabel
            value={FilterType.Flavors}
            control={<Radio />}
            label="Flavors"
          />
        </RadioGroup>

        {body}
      </FormControl>
    </form>
  );
};
