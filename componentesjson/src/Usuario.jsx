import  { Component } from 'react'
import React from 'react'
import ReactDOM from "react-dom";
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import Cookies from 'universal-cookie/es6';

const cookies = new Cookies();
export default class Usuario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ver:false,
        }
        this.handleInput =this.handleInput.bind(this);  
        this.handleOuput =this.handleOuput.bind(this);
        this.eliminar=this.eliminar.bind(this);      
    }
     handleOuput  (){
        this.setState({ver:false })
        console.log(this.props.id);
    }
     handleInput(){
        console.log(this.props.id);
       
        this.setState({ver:true})
    }
    eliminar(){
        fetch(`/Prueba/EliminarUsuario?id=${this.props.id}`)
      .then((response) => {   
        return response.json()
      })  

    }

 


    render() {
       
        return (
            <>
                {this.state.ver ? 
                (
                <div>
                    <button onClick={this.handleOuput}>Regresar</button>
                </div>
                
                ) 
                :
                (
                <tr key={this.props.id}>
                    <td>{"F(x) ="} {this.props.funcion} </td>
                    <td className="border-start">
                        <div className="container">
                            <div className="row justify-content-start align-items-center">
                                <div className="col-3 border-end  border-primary align-self-center text-center">
                                    <Link style={{paddingLeft: 13, textDecoration: 'none'}} to={`/eliminar/${this.props.id}`}>Eliminar</Link>
                                </div>
                                <div className="col-3 border-end border-primary align-self-center text-center">
                                    <Link style={{paddingLeft: 13, textDecoration: 'none'}} to={`/editar/${this.props.id}`}>Editar</Link>
                                </div>
                                <div className="col-3  align-self-center text-center">
                                    <Link style={{paddingLeft: 13, textDecoration: 'none'}} to={`/ejercicio/${this.props.id}`}>Ver ejercicio</Link>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
                )
                }
            </>
        )
    }
}
