import React, { Component } from 'react'
import { Link, useParams } from 'react-router-dom'
import { withRouter } from "react-router";
import functionPlot from 'function-plot';
import { create, all } from 'mathjs'
const config = { };
const math = create(all, config);



 class Editar extends Component {
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
    this.editar=this.editar.bind(this)
    this.handleInputChange=this.handleInputChange.bind(this);
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


  editar() {
    const opcion = confirm("¿Seguro que deseas editar?");
    if (opcion == true) {

      const cambio = this.state.data.funcion.replace(/\+/g,',');
        const cambioUp = cambio.replace(/\^/g,'~');
        const cambioDown = cambioUp.replace(/\-/g,'?');  
      console.log(this.state.data);
      fetch(`http://localhost:8084/Prueba/EditarUsuario?id=${this.props.match.params.id}&interseccion=${this.state.interseccion}&maximos=${this.state.maximos}&inflexion=${this.state.inflexion}&creciente=${this.state.creciente}&concava=${this.state.concava}&funcion=${cambioDown}`)
      .then((response) => {
          
          return response.json()
      })
      .then((dat) => {    
          if(dat.length>0){
              const respuesta = dat[0];
              this.setState({editado:false}) 
          }else{
              alert("ERROR AL CREAR USUARIO")
          }
      })  
    }
}

componentDidMount(){
  const id = this.props.match.params.id
  console.log(id);

  fetch(`/Prueba/VerUsuario?id=${id}`)
  .then((response) => {
    
    return response.json()
  })
  .then((dat) => {    
    console.log(dat);

    const inter = (dat[0].interseccion==="true");
    const max = (dat[0].maximos==="true");
    const creciente =(dat[0].creciente==="true");
    const inflex = (dat[0].inflexion==="true");
    const conca =(dat[0].concava==="true");
    const cambio = dat[0].funcion.replace(/\,/g,'+');
    const cambioUp = cambio.replace(/\~/g,'^');
    const cambioDown = cambioUp.replace(/\?/g,'-');
    this.setState(
      {data:
      {
      funcion:cambioDown,
      username:dat[0].nombre,
      password:dat[0].password,
      apellidopaterno:dat[0].paterno,
      apellidomaterno:dat[0].materno,
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
      console.log(derivada);
    } catch (error) {
      console.log(error+"<--error");
    }
  })  
}



  render() {

    return (
      <>
      <div className="container-fluid mt-5 mb-5">
              <div className=" row justify-content-center align-items-center">
                <div className="col-8 align-self-center text-center">
                  <h1 style={{color: "#172666"}}>EDITAR</h1>
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
                            <h1>{"f(x)"}</h1> <input type="text" value={this.state.data.funcion} placeholder="Funcion" name="funcion" onChange={this.handleInputChange}/>
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
                          <button className="btn btn-secondary btn-lg btn-block" type="button" onClick={this.editar}>Guardar</button>
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

export default withRouter(Editar);
