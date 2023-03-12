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
  ListItem,
  List,
  ListItemButton,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Icon,
} from '@mui/material';
import { FormikErrors, useFormik } from 'formik';
import { equals, uniq, uniqBy, unnest } from 'ramda';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FlavorIdRecord } from '../../models/brand';
import {
  FilterDefinition,
  FilterType,
  FlavorFilter,
  TagFilter,
} from '../../models/filter';
import { filterActions } from '../../store/actions';
import { brandsSelectors, filterSelectors } from '../../store/selectors';

export const FilterForm: React.FC = () => {
  const dispatch = useDispatch();

  const currentFilters = useSelector(filterSelectors.filterSettings);
  const tagOptions = useSelector(brandsSelectors.allTags);
  const flavorOptions = useSelector(brandsSelectors.fullFlavorList);

  const typeFieldId = React.useId();

  const typeChange = (_event: unknown, value: string) => {
    switch (value) {
      case FilterType.Tags:
        dispatch(
          filterActions.updateFilters({ type: FilterType.Tags, tags: [] }),
        );
        break;
      case FilterType.Flavors:
        dispatch(
          filterActions.updateFilters({
            type: FilterType.Flavors,
            flavors: [],
          }),
        );
        break;
    }
  };

  const toggleTag = (tag: string) => {
    let nVal: TagFilter;
    if (!currentFilters || currentFilters.type !== FilterType.Tags) {
      nVal = { type: FilterType.Tags, tags: [tag] };
    } else if (currentFilters.tags.includes(tag)) {
      nVal = {
        ...currentFilters,
        tags: currentFilters.tags.filter((t) => t !== tag),
      };
    } else {
      nVal = {
        ...currentFilters,
        tags: uniq(currentFilters.tags.concat(tag)),
      };
    }

    dispatch(filterActions.updateFilters(nVal));
  };

  const toggleFlavor = (flavor: FlavorIdRecord) => {
    let nVal: FlavorFilter;
    if (!currentFilters || currentFilters.type !== FilterType.Flavors) {
      nVal = { type: FilterType.Flavors, flavors: [flavor] };
    } else if (currentFilters.flavors.includes(flavor)) {
      nVal = {
        ...currentFilters,
        flavors: currentFilters.flavors.filter((t) => !equals(t, flavor)),
      };
    } else {
      nVal = {
        ...currentFilters,
        flavors: uniqBy(equals, currentFilters.flavors.concat(flavor)),
      };
    }

    dispatch(filterActions.updateFilters(nVal));
  };

  let body: React.ReactNode | React.ReactNode[];
  switch (currentFilters?.type) {
    case FilterType.Tags:
      body = (
        <List>
          {tagOptions.map((tag) => (
            <ListItem key={tag}>
              <ListItemButton onClick={() => toggleTag(tag)}>
                <Checkbox checked={currentFilters.tags.includes(tag)} />
                <ListItemText>[{tag}]</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      );
      break;
    case FilterType.Flavors:
      body = flavorOptions.map((entry) => (
        <Accordion key={entry.brand.id}>
          <AccordionSummary expandIcon={<Icon>expand_more</Icon>}>
            <Typography>{entry.brand.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {entry.flavorsSorted.map((f) => (
                <ListItem key={f.id}>
                  <ListItemButton onClick={() => toggleFlavor(f.filterId)}>
                    <Checkbox
                      checked={currentFilters.flavors.some((cf) =>
                        equals(cf, f.filterId),
                      )}
                    />
                    <ListItemText>{f.name}</ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ));
      break;
  }

  return (
    <>
      <FormControl>
        <FormLabel id={typeFieldId + '-label'}>Type</FormLabel>
        <RadioGroup
          row
          aria-labelledby={typeFieldId + '-label'}
          name="type"
          onChange={typeChange}
          value={currentFilters?.type}>
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

      {body}
    </>
  );
};
