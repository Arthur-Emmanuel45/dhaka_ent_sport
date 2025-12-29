import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css'

const Header = () => {
    return (
        <header className="site-header">
            <div className="container header-inner">
                <Link to="/" className="brand">Dhaka Entertainment News <span className="badge">DEN</span></Link>
                <nav className="main-nav">
                    <NavLink to="/sports" className={({isActive}) => isActive ? 'active' : ''}>Sports</NavLink>
                    <NavLink to="/weekly-Updates" className={({isActive}) => isActive ? 'active' : ''}>Weekly Updates</NavLink>
                    <NavLink to="/technology" className={({isActive}) => isActive ? 'active' : ''}>Technology</NavLink>
                    <NavLink to="/videos" className={({isActive}) => isActive ? 'active' : ''}>Videos</NavLink>
                </nav>
            </div>
        </header>
    );
}

export default Header;
