
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className='container'>
                    <h2>GESTIÓN DE TAREAS DIARIAS  || DEPÓSITO</h2>

            <div className="row">

                <div className="col">
                    <Link to="/deposito/tareas" className="btn btn-primary">Organizar tareas</Link>
                </div>

                <div className="col">
                    <Link to="/TareasACompletar" className="btn btn-primary">Tareas pendientes</Link>
                </div>
                
                <div className="col">
                    <Link to="/devoluciones" className="btn btn-primary">Ver Devoluciones</Link>
                </div>
            </div>
        </div>
    );
}

export default Home;
