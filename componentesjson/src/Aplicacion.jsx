import React, { Component } from 'react';
import { Link,Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie/es6';

import Usuario from './usuario.jsx';

const cookies = new Cookies(); 
class Aplicacion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articulos: [],
      loading: true,
    }
  }

  /*cerrarSesion(){
    cookies.remove('id', {path:"/"});
    cookies.remove('nombre', {path:"/"});
    cookies.remove('paterno', {path:"/"});
    cookies.remove('materno', {path:"/"});
  }*/



  componentWillMount() {
        
      fetch('/Prueba/ObtenerInfo')
      .then((response) => {
    
        return response.json()
      })
      .then((art) => {    
        this.setState({ articulos: art, loading : false})
        console.log(this.state.articulos);  
        console.log(this.state.articulos.funcion);
      })  
   
    
}

  render() {

    /*if(!cookies.get("nombre")){
      console.log("adios pemrros");
      console.log(cookies.get("id"));
      console.log(cookies.get("nombre"));
      console.log(cookies.get("paterno"));
      console.log(cookies.get("materno"));
      
      return (<Redirect to="/Prueba/"/>)

    }*/
    return (
      <div>
      { 
        this.state.loading?
        (
          <div>loading...</div>
        )

        :
        (
          <>
            <div className="container-fluid cabezera mb-5" style={{background: "#172666", height:"50px"}}>
              <div className="row justify-content-center align-items-center h-100">
                <div className="col-12 align-self-center text-center">
                  <div className="row justify-content-center align-items-center h-100">
                    <div className="col-3 align-self-center text-center text-light "><Link style={{paddingLeft: 13, textDecoration: 'none', color:"white"}} to="/crear">Crear Ejercicio</Link></div>
                    <div className="col-3 align-self-center text-center text-light "><Link style={{paddingLeft: 13, textDecoration: 'none', color:"white"}} to="/Prueba/" >Cerrar Sesion</Link></div>  
                    <div className="col-6 align-self-center text-center text-light "><h2 >ESCOM</h2></div>  
                  
                  </div>
                </div>
              </div>
            </div>
              <table className="table hadow-sm p-3 mb-5 bg-body rounded" border="1">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th className="border-start">Acciones</th>
                                      
                </tr>
              </thead>
              <tbody >  
                {this.state.articulos.map(art => {
                  
                  console.log("entra");  
                  const cambio = art.funcion.replace(/\,/g,'+');
                  const cambioUp = cambio.replace(/\~/g,'^');
                  const cambioDown = cambioUp.replace(/\?/g,'-');

                 console.log(art);
                  return (
                    <Usuario key={art.id} id={art.id}  funcion={cambioDown}/>
                  );
                })}
              </tbody>
              </table>
          </>
        )
      }
      </div>
    );
  }
   
}

export default Aplicacion;

