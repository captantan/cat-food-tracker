import * as React from 'react';
import { NavLink as NavLinkBase, NavLinkProps } from 'react-router-dom';

export const CustomNavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps & {
	activeClassName: string
}>((props, ref) => (
	<NavLinkBase
		ref={ref}
		{...props}
		className={({ isActive }) => {
			return (isActive ? props.activeClassName : '') + ' ' + props.className;
		}}
	/>
));