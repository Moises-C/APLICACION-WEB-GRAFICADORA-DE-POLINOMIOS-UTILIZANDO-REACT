import React, { Component } from 'react'
import { Link, useParams } from 'react-router-dom'
import functionPlot from 'function-plot';
import { create, all } from 'mathjs'


  let contentsBounds = document.body.getBoundingClientRect();
  let width = 100;
  let height = 80;
  let ratio = contentsBounds.width / width;
  width *= 7;
  height *= 7;
  const config = { };
  const math = create(all, config);
export default class CrearUsuario extends Component {

    constructor(props){
        super(props);
        this.state={
          data : {
            funcion:"",
            username:"",
            password:"",
            apellidopaterno:"",
            apellidomaterno:"",
          },
          creado: true,
          interseccion:true,
          maximos:false,
          inflexion:true,
          creciente:false,
          concava:true,

        }
        this.insertar=this.insertar.bind(this)
        this.handleInputChange=this.handleInputChange.bind(this);
      }
      
     
      
      handleInputChange (e){
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
          [name]: value
        });
        this.setState({
            data:{
                ...this.state.data,
                [e.target.name]:e.target.value,
            },


        });

        console.log(e.target.name+e.target.value);
        console.log(this.state);
    }

    componentDidUpdate(){
      try {

        const derivada = math.derivative(this.state.data.funcion,"x").toString();
        functionPlot({
          target: "#plano",
          width : 400,
          height: 300,
          yAxis: { domain: [-1, 3] },
          grid: true,
          data: [
            {
              fn: this.state.data.funcion,
              derivative: {
                fn: derivada,
                updateOnMouseMove: true
              }
            }
          ]
        });
        console.log(derivada);
      } catch (error) {
      }
    }

  
    
    
      insertar() {
        
        
        console.log(this.state.data);
        const cambio = this.state.data.funcion.replace(/\+/g,',');
        const cambioUp = cambio.replace(/\^/g,'~');
        const cambioDown = cambioUp.replace(/\-/g,'?');
        console.log(cambio);
        console.log(cambioUp);
        console.log(cambioDown);
        if(this.state.data.funcion!=""){

          fetch(`http://localhost:8084/Prueba/Insertar?interseccion=${this.state.interseccion}&maximos=${this.state.maximos}&inflexion=${this.state.inflexion}&creciente=${this.state.creciente}&concava=${this.state.concava}&funcion=${cambioDown}`)
          .then((response) => {
            
            return response.json()
          })
          .then((dat) => {    
            if(dat.length>0){
              const respuesta = dat[0];
              this.setState({creado:false}) 
            }else{
              alert("ERROR AL CREAR USUARIO")
            }
          })  
          
          }else{
            alert("Falta una funcion a evaluar")
          }
        }
        render() {
          return (
            <>
            <div className="container-fluid mt-5 mb-5 ">
              <div className=" row justify-content-center align-items-center">
                <div className="col-8 align-self-center text-center">
                  <h1 style={{color: "#172666"}}>CREAR EJERCICIO</h1>
                </div>
              </div>
            </div>
            { 
              this.state.creado ?
              (
                <div className="container-fluid  mt-5 " >
                  <div className="row justify-content-center h-100 align-items-center " >
                    <div className="col-7 align-self-center text-center  rounded  shadow p-3 mb-5 " >
                      <div className="row justify-content-center ">

                        <div className="mb-5">
                            <div id="plano" ></div>
                            <h1>{"f(x)"}</h1> <input type="text" placeholder="Funcion" name="funcion" onChange={this.handleInputChange}/>
                          </div>

                        <div className="col-6 align-self-center">

                          <div className="row justify-content-start">
                            <div className="col-12 text-start " >
                            <label>
                                  Interseccion
                                  <input
                                    className="ms-2 form-check-input" 
                                    name="interseccion"
                                    type="checkbox"
                                    checked={this.state.interseccion}
                                    onChange={this.handleInputChange} />
                                </label>
                            </div>
                          </div>
                          <div className="row justify-content-start">
                            <div className="col-12 text-start">
                            <label>
                                Maximos y minimos
                                <input
                                  className="ms-2 form-check-input" 
                                  name="maximos"
                                  type="checkbox"
                                  checked={this.state.maximos}
                                  onChange={this.handleInputChange} />
                              </label>
                            </div>
                          </div>          
                          <div className="row justify-content-start">          
                            <div className="col-12 text-start">
                            <label>
                                Puntos de inflexion
                                <input
                                  className="ms-2 form-check-input" 
                                  name="inflexion"
                                  type="checkbox"
                                  checked={this.state.inflexion}
                                  onChange={this.handleInputChange} />
                              </label>
                            </div>
                          </div>
                          <div className="row justify-content-start">
                            <div className="col-12 text-start">
                            <label>
                                Creciente/Decreciente
                                <input
                                  className="ms-2 form-check-input" 
                                  name="creciente"
                                  type="checkbox"
                                  checked={this.state.creciente}
                                  onChange={this.handleInputChange} />
                              </label>
                            </div>
                          </div>
                          <div className="row justify-content-start">
                            <div className="col-12 text-start">
                            <label>
                                Concava Up/Down Intervals  
                                <input
                                  className="ms-2 form-check-input" 
                                  name="concava"
                                  type="checkbox"
                                  checked={this.state.concava}
                                  onChange={this.handleInputChange} />
                              </label>
                            </div>
                          </div>

                        </div>  
                        <div className="col-4 align-self-center">
                          <button className="btn btn-secondary btn-lg btn-block" type="button" onClick={this.insertar}>Guardar</button>
                        </div>     
                      </div>  
                    </div>
                  </div>


                  <div className="row justify-content-center h-100 align-items-center" >
                    <div className="col-8 align-self-center text-center" >
                      <h1><Link style={{paddingLeft: 13, textDecoration: 'none'}} to="/tabla">Regresar</Link></h1>
                    </div>
                  </div>

                </div>
                
               
                )
                :
                (<>
                  <div className="container-fluid" style={{height:"300px"}}>
                      <div className="row justify-content-center h-100 align-items-center" >
                          <div className="col-8 align-self-center text-center" >
                          <div className="alert alert-info" role="alert">
                                 ¡Usuario creado con exito!
                          </div>
                          </div>
                          <div className="col-8 align-self-center text-center" >
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
