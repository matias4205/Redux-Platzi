import React from 'react';
import { Link } from 'react-router-dom';

const Menu = (props) => {
    return (
        <React.Fragment>
            <nav id="menu">
                <Link to="/">
                    Usuarios
                </Link>
                <Link to="/tareas">
                    Tareas
                </Link>
            </nav>

            <div className="margen">
                { props.children }
            </div>
        </React.Fragment>
    );
};

export default Menu;