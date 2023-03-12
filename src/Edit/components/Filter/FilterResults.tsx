import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { filterSelectors } from '../../store/selectors';

export const FilterResults: React.FC = () => {
  const results = useSelector(filterSelectors.filtered);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell>Meal</TableCell>
          <TableCell>Brand</TableCell>
          <TableCell>Flavor</TableCell>
          <TableCell>Amount</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {results.map((res) => (
          <TableRow key={res.id}>
            <TableCell>{res.date}</TableCell>
            <TableCell>{res.meal}</TableCell>
            <TableCell>{res.brandName}</TableCell>
            <TableCell>{res.flavorName}</TableCell>
            <TableCell>{res.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
