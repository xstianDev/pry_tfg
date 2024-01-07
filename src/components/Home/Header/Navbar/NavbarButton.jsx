import React from "react";
import PropTypes from "prop-types";

const NavbarButton = (props) => {
    const {id, text, href} = props.btn;

    return (
        <div className="navbar-button" key={ id }>
            <a href={ href }>
                { text }
            </a>
        </div>
    )
}

NavbarButton.propTypes = {
    btn: PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        href: PropTypes.string.isRequired,
    }).isRequired
};

// NavbarButton.defaultProp = {
//     btn: {
//         id: 0,
//         text: '',
//         href: '/',
//     }
// };

export default NavbarButton;
