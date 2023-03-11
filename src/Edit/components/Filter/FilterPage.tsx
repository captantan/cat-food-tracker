import { Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CenterBox } from '../../../components/CenterBox';
import { filterActions } from '../../store/actions';
import { filterSelectors } from '../../store/selectors';

export const FilterPage: React.FC = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(filterActions.initPage());
  }, []);

  const showResults = useSelector(filterSelectors.showResults);

  return (
    <CenterBox>
      <Typography>Coming soon</Typography>
      {showResults ? (
        <Typography>Results</Typography>
      ) : (
        <Typography>Form</Typography>
      )}
    </CenterBox>
  );
};
