import React from 'react';
import { connect } from 'react-redux';

import Spinner from '../general/Spinner';
import Fatal from '../general/Fatal';

const Comentarios = (props) => {
    const { comentarios, comentariosState } = props;
    
    const mostrarComentarios = () => (
        comentarios.map((item) => (
            <li key={item.id}>
                <b>
                    <u>
                        { item.email }
                    </u>
                </b><br/>
                { item.body }
            </li>
        ))
    )

    if(comentariosState.error){
        return <Fatal message={comentariosState.error} />
    }

    if(comentariosState.loading && !comentarios.length){
        return <Spinner />
    }

    return (
        <ul>
            { mostrarComentarios() }
        </ul>
    );
};

const mapStateToProps = (reducers) => {
    return reducers.publicacionesReducer;
}

export default connect(mapStateToProps)(Comentarios);