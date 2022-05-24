import React from 'react';

const currentYear = new Date();

const Footer = () => {
    return (
        <div className='text-center' style={{'backgroundColor': '#212529'}}>
            <p className='text-white m-0 py-3'>{ currentYear.getFullYear() } &copy; All Right Reserved by <a href="https://github.com/tanvinpavel"> Tanvin Pavel </a></p>
        </div>
    );
};

export default Footer;