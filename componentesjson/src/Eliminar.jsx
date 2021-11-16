import React, { Component } from 'react'
import { Link, useParams } from 'react-router-dom'
import { withRouter } from "react-router";



 class Eliminar extends Component {
  constructor(props){
    super(props);
    this.state={
      eliminado: false,
    }
  }
  
  componentDidMount(){
    const id = this.props.match.params.id
    const opcion = confirm("¿Seguro que deseas eliminar?");
    if (opcion == true) {
        fetch(`/Prueba/EliminarUsuario?id=${id}`)
        .then((response) => {
        
        return response.json()
        })
        .then((dat) => {    
        console.log(dat);
        this.setState({eliminado:true})
        })  
    }
    
  }


  render() {

    return (
      <>
      { 
        this.state.eliminado ?
        (
          <>
          <div class="container-fluid" style={{height:"300px"}}>
              <div class="row justify-content-center h-100 align-items-center" >
                  <div class="col-8 align-self-center text-center" >
                  <div class="alert alert-info" role="alert">
                         ¡Usuario eliminado con exito!
                  </div>
                  </div>
                  <div class="col-8 align-self-center text-center" >
                      <h1><Link style={{paddingLeft: 13, textDecoration: 'none'}} to="/tabla">Regresar</Link></h1>
                  </div>
              </div>
          </div> 
          
        </>
          )
          :
          (<>
            <div class="container-fluid" style={{height:"300px"}}>
                <div class="row justify-content-center h-100 align-items-center" >
                    <div class="col-8 align-self-center text-center" >
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    <div class="col-8 align-self-center text-center" >
                        <h1><Link style={{paddingLeft: 13, textDecoration: 'none'}} to="/tabla">Regresar</Link></h1>
                    </div>
                </div>
            </div> 
            
          </>
          )
        
        }
      </>
    )
  }
}

export default withRouter(Eliminar);
