import { Button, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom'

export const LandingPage: React.FC = () => {
	return (<>
		<Typography>Pick a page to continue</Typography>
		<Button component={Link} to="./brands">Brands</Button>
	</>);
}