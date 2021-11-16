import React, { Component } from 'react'
import { Link, useParams } from 'react-router-dom'
import { withRouter } from "react-router";
import functionPlot from 'function-plot';
import { create, all } from 'mathjs'
const config = { };
const math = create(all, config);


 class Ejercicio extends Component {
  constructor(props){
    super(props);
    this.state={
      data : {
        funcion:"x",
      },
      editado: true,
      interseccion:false,
      maximos:false,
      inflexion:false,
      creciente:false,
      concava:false,
    }
  }
  
  componentDidMount(){
    const id = this.props.match.params.id


  fetch(`/Prueba/VerUsuario?id=${id}`)
  .then((response) => {
    
    return response.json()
  })
  .then((dat) => {    
    console.log(dat[0]);
    const inter = (dat[0].interseccion==="true");
    const max = (dat[0].maximos==="true");
    const creciente =(dat[0].creciente==="true");
    const inflex = (dat[0].inflexion==="true");
    const conca =(dat[0].concava==="true");

    const cambio = dat[0].funcion.replace(',','+');
    const cambioUp = cambio.replace('~','^');
    const cambioDown = cambioUp.replace('?','-');
    this.setState(
      {data:
      {
      funcion:cambioDown,
    },
      interseccion:inter,
      maximos:max,
      inflexion:inflex,
      creciente:creciente,
      concava:conca,
    })

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
      
    } catch (error) {
      console.log(error+"<--error");
    }
  })  
  }


  render() {
    console.log(this.state.data[0]);
    return (
      <>
      <div className="container-fluid mt-5 mb-5">
              <div className=" row justify-content-center align-items-center">
                <div className="col-8 align-self-center text-center">
                  <h1 style={{color: "#172666"}}>EJERCICIO</h1>
                </div>
              </div>
      </div>
      { 
        this.state.editado ?
        (
            <>
            <div className="container-fluid  mt-5 " >
                  <div className="row justify-content-center h-100 align-items-center " >
                    <div className="col-7 align-self-center text-center  rounded  shadow p-3 mb-5 " >
                      <div className="row justify-content-center ">

                        <div className="mb-5">
                            <div id="plano" ></div>
                            <p>{"f(x) = "+this.state.data.funcion }</p> 
                        </div>

                        <div className="col-4 align-self-center">
                          <p>{"Interseccion: "+this.state.interseccion }</p> 
                        </div>
                        <div className="col-4 align-self-center">
                          <p>{"Maximos y Minimos: "+this.state.maximos }</p> 
                        </div>  
                        <div className="col-4 align-self-center">
                          <p>{"Punto de inflexion :"+this.state.inflexion }</p> 
                        </div>  
                        <div className="col-4 align-self-center">
                          <p>{"Creciente: "+this.state.creciente }</p> 
                        </div>  
                        <div className="col-4 align-self-center">
                          <p>{"Concava: "+this.state.concava }</p> 
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
                

            </>
          )
          :
          (<>
            <div class="container-fluid" style={{height:"300px"}}>
                <div class="row justify-content-center h-100 align-items-center" >
                    <div class="col-8 align-self-center text-center" >
                    <div class="alert alert-info" role="alert">
                           ¡Usuario editado con exito!
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

export default withRouter(Ejercicio);
