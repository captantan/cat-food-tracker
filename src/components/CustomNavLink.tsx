import * as React from 'react';
import { NavLink as NavLinkBase, NavLinkProps } from 'react-router-dom';

export const CustomNavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps & {
	activeClassName: string
}>(({activeClassName, ...props}, ref) => (
	<NavLinkBase
		ref={ref}
		{...props}
		className={({ isActive }) => {
			return (isActive ? activeClassName : '') + ' ' + props.className;
		}}
	/>
));