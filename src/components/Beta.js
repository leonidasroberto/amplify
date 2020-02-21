import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Amplify, { Auth } from 'aws-amplify';
import { Link } from 'react-router-dom';
import "rbx/index.css";
import { Button, Navbar } from 'rbx';

//import { Container } from 'react-bootstrap';

Amplify.configure({  
    identityPoolRegion: 'us-east-2',
    userPoolId: 'us-east-2_p65qLgx92',
    userPoolWebClientId: '2va2f2bh1o36q4d2dt6f6qf7k9'
})

export default class Beta extends Component {
  constructor(props) {
    super(props);
    this.state = {
        coUsername: null,
        coEmail: null,
        coPassword: null,
        coCodConfirm: null,
        username: null,
        password: null,
        waitingConfirmation: null,
        userLoggedIn: false,

        newpass: null,
        oldpass: null

    };

    this.createAcount = this.createAcount.bind(this);
    this.confirmReg = this.confirmReg.bind(this);
    this.logIn = this.logIn.bind(this);
    this.ModificPass = this.ModificPass.bind(this);

    
  }

///Pegar informações do formulário
handleChange(d){
    d.preventDefault()
    let stateName = d.target.name;
    let stateValue = d.target.value;

    this.setState({ [stateName] : stateValue })
}

///Criação de contas
  createAcount(){
    let { coUsername, coEmail, coPassword } = this.state;

    console.log(coUsername, coEmail, coPassword);
    
    Auth.signUp({
        username: coUsername,
        password: coPassword,
        attributes: {
            email: coEmail,
        }
    }).then(data =>{
        console.log("DATA AWS: ", data);
        this.setState({waitingConfirmation: true});
    }).catch(erro=>{
        console.log("ERRO: ", erro);
    })

  }

  ///Confirmação de cadastro
  confirmReg(){
      let { coUsername, coCodConfirm } = this.state;

      Auth.confirmSignUp(coUsername, coCodConfirm).catch(data=>{
          //console.log(data)
      }).catch(err=>{
          console.log(err);
      });
  }

  ///Mudar senha
  ModificPass(){
    Auth.currentAuthenticatedUser().then(user=>
      {
        return Auth.changePassword(user, this.state.oldpass, this.state.newpass);
      }).then(res =>{
        console.log(res);
      }).catch(err=>{
        console.log(err);
      });
  }

  ///Função logar
  logIn(){
      let { username, password } = this.state;
    
      Auth.signIn(username, password).then(data=>{
          console.log("DATA: ",data);
          ////Token ID 
          console.log("IDTOKEN ??? -> ", data.signInUserSession.idToken.jwtToken);
          //this.createSession(data.signInUserSession.idToken.jwtToken, data.signInUserSession.accessToken.jwtToken);
          
      }).catch(erro=>{
          console.log("ERRO: ",erro);
      })
  }


  //Sessão fim
  finaliza(){
    Auth.signOut({global:true}).then(res=>{console.log(res)}).catch(err=>{console.log(err)});
  }

  render() {
    return (
      
    <div class="container">
      {console.log(this.props.info)}
      
        <Navbar color="light">
    <Navbar.Brand>
    <Navbar.Item href="#">
      <img src="https://bulma.io/images/bulma-logo.png" alt="" role="presentation" width="112" height="28"/>
        </Navbar.Item>
        <Navbar.Burger />
      </Navbar.Brand>
      <Navbar.Menu>
        <Navbar.Segment align="start">
          <Navbar.Item>Home</Navbar.Item>
          <Navbar.Item>Outros</Navbar.Item>
        </Navbar.Segment>
        <Navbar.Segment align="end">
          <Navbar.Item>
            <Button.Group>
              <Button color="primary">
                <strong>Sign up</strong>
              </Button>
            </Button.Group>
          </Navbar.Item>
        </Navbar.Segment>
      </Navbar.Menu>
    </Navbar>       
            <div>
              
            <h2>Cadastro!</h2>
        
            Nome: <input class="form-control" type="text" name="coUsername" onChange={d =>this.handleChange(d)}/><br/>
            Senha: <input class="form-control" type="password" name="coPassword" onChange={d =>this.handleChange(d)}/><br/>
            Email: <input class="form-control" type="email" name="coEmail" onChange={d =>this.handleChange(d)}/><br/>
            <button class="btn btn-primary" onClick={this.createAcount}>Cadastrar</button>
     
            </div>

            {this.state.waitingConfirmation && (
            <div >
                Confirmar Email:<input class="form-control" name="coCodConfirm" type="text" onChange={d =>this.handleChange(d)}/><br/>
                <button class="btn btn-primary" onClick={this.confirmReg}>Confirmar Código</button>
            </div>
            )}
            <br/><br/>
            <div>
            <h2>Login!</h2>
       
            Nome: <input class="form-control" type="text" name="username" onChange={d =>this.handleChange(d)}/><br/>
            Senha: <input class="form-control" type="password" name="password" onChange={d =>this.handleChange(d)}/><br/>
            <button class="btn btn-primary" onClick={this.logIn}>Logar</button>
      
            </div>
                <br/>
            <button class="btn btn-primary" onClick={this.finaliza}>Finalizar Sessão</button><br/><br/>
            <br/><br/>
            <h1>Modificar senha: </h1>
            <div class="row mx-lg-n5">
              <div class="col py-3 px-lg-5 border bg-light">
              Senha atual: <input type="password" class="form-control" name="oldpass" onChange={d =>this.handleChange(d)}/><br/>
              Nova senha: <input type="password" class="form-control" name="newpass" onChange={d =>this.handleChange(d)}/>
              </div>
              </div><br/>
            <button class="btn btn-primary" onClick={this.ModificPass}>Modificar Senha</button>
            <br/>
    <br/>
    <br/>
            
    </div>
    
    );
  }
}

