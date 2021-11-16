import React from 'react'
import ReactDOM from "react-dom";
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";


import Aplicacion from './Aplicacion.jsx'
import CrearUsuario from './CrearUsuario.jsx';
import Editar from './Editar.jsx';
import  Ejercicio  from './Ejercicio.jsx';
import Eliminar from './Eliminar.jsx';
import  IniciarSesion  from './IniciarSesion.js';


export const Inicio = () => {
    return (
       
       <>
        
        <Router>
        <div>
          {/* Un <Switch> mira a través de sus hijos <Route>s y 
          ejecuta el primero que coincida con el URL actual. */}
          <Switch>
            <Route path="/ejercicio/:id">
              <Ejercicio  />
            </Route>
            <Route path="/eliminar/:id">
              <Eliminar />
            </Route>
            <Route path="/editar/:id">
              <Editar/>
            </Route>
            <Route path="/crear">
              <CrearUsuario/>
            </Route>
            <Route path="/tabla">
              <Aplicacion />
            </Route>
            <Route path="/">
              <IniciarSesion />
            </Route>
          </Switch>
        </div>
        </Router>
       </>
    )
}

const wrapper = document.getElementById("tabla");
wrapper ? ReactDOM.render(<Inicio />, wrapper) : false;