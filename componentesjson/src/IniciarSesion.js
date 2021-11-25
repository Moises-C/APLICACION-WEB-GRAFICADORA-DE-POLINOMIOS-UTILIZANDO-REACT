import React from 'react'
import  { Component } from 'react'
import { Redirect } from "react-router-dom";
import Cookies from 'universal-cookie/es6';
const cookies = new Cookies();

export default class IniciarSesion extends Component {
    constructor(props){
        super(props);
        this.state = {
            data : {
                username:"",
                password:""
            },
            acceder:false,
        }
        this.handleChange =this.handleChange.bind(this);
        this.iniciarSesion=this.iniciarSesion.bind(this);
    }

     handleChange (e){
        this.setState({
            data:{
                ...this.state.data,
                [e.target.name]:e.target.value,
            }
        });
        console.log(this.state.data);
    }

    
    iniciarSesion() {
            console.log(this.state.data);
            fetch(`http://localhost:8080/Prueba/login?nombre=${this.state.data.username}&password=${this.state.data.password}`)
            .then((response) => {
                return response.json()
            })

            .then((dat) => {    
                if(dat.length>0){
                    const respuesta = dat[0];
                    this.setState({...this.state.data,acceder:true});
                    /*console.log(dat[0].id);
                    console.log(dat[0].nombre);

                    cookies.set('id',dat[0].id, {path:"/"});
                    cookies.set('nombre',dat[0].nombre, {path:"/"});
                    cookies.set('paterno',dat[0].paterno, {path:"/"});
                    cookies.set('materno',dat[0].materno, {path:"/"});
                    
                    console.log(cookies.get("id"));
                    console.log(cookies.get("nombre"));
                    console.log(cookies.get("paterno"));
                    console.log(cookies.get("materno"));
                    */
                  }else{
                    alert("NO SE ENCONTRO USUARIO")
                }
            })  
        
    }

    
    render() {
      
      /*if(cookies.get("nombre")){
        return (
          <Redirect to="/tabla"/>
        )
      }else{*/
        return (
          <>
            {this.state.acceder?(<Redirect to="/tabla"/>)

                :(
                  <section className="vh-100">
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col-sm-6 text-black">
                  
                          <div className="px-5 ms-xl-4">
                            <i className="fas fa-crow fa-2x me-3 pt-5 mt-xl-4" style={{color: "#709085"}} ></i>
                            <span className="h1 fw-bold mb-0">ESCOM</span>
                          </div>
                  
                          <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                  
                            <form style={{width: "23rem"}} >
                  
                              <h3 className="fw-normal mb-3 pb-3" style={{letterspacing: "1px"}} >Log in</h3>
                  
                              <div className="form-outline mb-4">
                                <input type="email" id="form2Example18" name="username"className="form-control form-control-lg" onChange={this.handleChange} />
                                <label className="form-label" htmlFor="form2Example18" >Nombre de Usuario</label>
                              </div>
                  
                              <div className="form-outline mb-4">
                                <input type="password" id="form2Example28" name="password" className="form-control form-control-lg" onChange={this.handleChange} />
                                <label className="form-label" htmlFor="form2Example28">Password</label>
                              </div>
                  
                              <div className="pt-1 mb-4">
                                <button className="btn btn-info btn-lg btn-block" type="button" className="btn btn-primary" onClick={this.iniciarSesion}>Iniciar</button>
                              </div>
                
                  
                            </form>
                  
                          </div>
                  
                        </div>
                        <div className="col-sm-6 px-0 d-none d-sm-block">
                          <img src=".\parallaxESCOM.jpg" alt="Login image" className="w-100 vh-100" style={{objectFit:"cover"}}/>
                        </div>
                      </div>
                    </div>
                  </section>
                )
            }
            </>
        )

      /*}*/

    }
  }
  
  