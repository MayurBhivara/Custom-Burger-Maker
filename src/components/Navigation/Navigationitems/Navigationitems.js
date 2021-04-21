import React from 'react';
import classes from './Navigationitems.css'
import NavigationItem from './Navigationitem/Navigationitem'

const navigationItems = ()=>(
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact name="Burger Builder">Burger Builder</NavigationItem>
        <NavigationItem link="/orders" name="Orders">Orders</NavigationItem>
    </ul>
);

export default navigationItems;