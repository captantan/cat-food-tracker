import * as React from 'react';
import { NavLink as NavLinkBase, NavLinkProps } from 'react-router-dom';

// It is being given a name?
// eslint-disable-next-line react/display-name
export const CustomNavLink = React.forwardRef<
  HTMLAnchorElement,
  NavLinkProps & {
    activeClassName: string;
  }
>(({ activeClassName, ...props }, ref) => (
  <NavLinkBase
    ref={ref}
    {...props}
    className={({ isActive }) => {
      return (isActive ? activeClassName : '') + ' ' + props.className;
    }}
  />
));
