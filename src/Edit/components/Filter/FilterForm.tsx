import {
  Checkbox,
  FormControl,
  FormLabel,
  ListItemText,
  ListItem,
  List,
  ListItemButton,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Icon,
  ToggleButton,
  ToggleButtonGroup,
  Paper,
} from '@mui/material';
import { equals, uniq, uniqBy } from 'ramda';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FlavorIdRecord } from '../../models/brand';
import { FilterType, FlavorFilter, TagFilter } from '../../models/filter';
import { filterActions } from '../../store/actions';
import { brandsSelectors, filterSelectors } from '../../store/selectors';

export const FilterForm: React.FC = () => {
  const dispatch = useDispatch();

  const currentFilters = useSelector(filterSelectors.filterSettings);
  const tagOptions = useSelector(brandsSelectors.allTags);
  const flavorOptions = useSelector(brandsSelectors.fullFlavorList);
  const expandedBrands = useSelector(filterSelectors.expandedBrands);

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
        <Paper>
          <List disablePadding>
            {tagOptions.map((tag) => (
              <ListItem key={tag} disableGutters disablePadding>
                <ListItemButton onClick={() => toggleTag(tag)}>
                  <Checkbox checked={currentFilters.tags.includes(tag)} />
                  <ListItemText>{tag}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      );
      break;
    case FilterType.Flavors:
      body = flavorOptions.map((entry) => {
        const countSelectorForBrand = currentFilters.flavors.filter(
          (fid) => fid.brand === entry.brand.id,
        ).length;

        return (
          <Accordion
            key={entry.brand.id}
            expanded={expandedBrands.includes(entry.brand.id)}
            onChange={() =>
              dispatch(filterActions.toggleBrandExpanded(entry.brand.id))
            }>
            <AccordionSummary expandIcon={<Icon>expand_more</Icon>}>
              <Typography
                sx={
                  (countSelectorForBrand && {
                    width: '50%',
                    pr: 1,
                    boxSizing: 'border-box',
                  }) ||
                  undefined
                }>
                {entry.brand.name}
              </Typography>
              {!!countSelectorForBrand && (
                <Typography sx={{ color: 'text.secondary' }}>
                  {countSelectorForBrand} selected
                </Typography>
              )}
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {entry.flavorsSorted.map((f) => (
                  <ListItem key={f.id} disableGutters disablePadding>
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
        );
      });
      break;
  }

  return (
    <>
      <FormControl
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContnet: 'center',
          alignItems: 'center',
          pb: 2,
        }}>
        <FormLabel id={typeFieldId + '-label'} sx={{ pb: 1 }}>
          Filter Type
        </FormLabel>
        <ToggleButtonGroup
          fullWidth
          exclusive
          aria-labelledby={typeFieldId + '-label'}
          onChange={typeChange}
          value={currentFilters?.type ?? null}
          color="primary">
          <ToggleButton value={FilterType.Tags} size="small">
            Tags
          </ToggleButton>
          <ToggleButton value={FilterType.Flavors} size="small">
            Flavors
          </ToggleButton>
        </ToggleButtonGroup>
      </FormControl>

      {body}
    </>
  );
};
