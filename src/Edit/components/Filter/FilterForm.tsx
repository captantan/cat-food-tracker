import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { FormikErrors, useFormik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FlavorIdRecord } from '../../models/brand';
import { FilterDefinition, FilterType } from '../../models/filter';
import { filterActions } from '../../store/actions';
import { brandsSelectors, filterSelectors } from '../../store/selectors';

interface FormModel {
  type: FilterType;
  tags: string[];
  flavors: FlavorIdRecord[];
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
  // const tagFieldId = React.useId();
  // const flavorFieldId = React.useId();

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
      </FormControl>
    </form>
  );
};
