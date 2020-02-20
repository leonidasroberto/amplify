import React, { PureComponent } from 'react';
import Amplify, { Auth } from 'aws-amplify';
import 'bootstrap/dist/css/bootstrap.min.css';
Amplify.configure({
  identityPoolRegion: 'us-east-2',
  userPoolId: 'us-east-2_p65qLgx92',
  userPoolWebClientId: '2va2f2bh1o36q4d2dt6f6qf7k9'
})
///TESTE REDUX



export default class Test extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      oldpass: null,
      newpass: null
    };

  }

  ///TESETE
  teste(){
    Auth.currentAuthenticatedUser().then(res=>{console.log(res)});
    //Auth.essentialCredentials().then(res=>{console.log(res)});
  }

  logout(){
    Auth.signOut({global:true}).then(res=>{console.log(res)}).catch(err=>{console.log(err)});
  }

  token(){
 Auth.currentSession().then(res=>{
   console.log(res.getAccessToken().getJwtToken());
   }).catch(err=>{console.log(err);});
  }

  

  render() {
    return (
      <div>
        <div class='container'>
          <h1>Modificar senha: </h1>
            <div class="row mx-lg-n5">
              <div class="col py-3 px-lg-5 border bg-light">
              Senha atual: <input type="password" class="form-control" name="oldpass" onChange={d =>this.handleChange(d)}/><br/>
              Nova senha: <input type="password" class="form-control" name="newpass" onChange={d =>this.handleChange(d)}/>
              </div>
              <br/>
            <button class="btn btn-primary" onClick={this.ModificPass}>Modificar Senha</button> 
        </div>
        <br/>
        <br/>
         <div class="row mx-lg-n5">
         <div class="col py-3 px-lg-5 border bg-light">
         <button class="btn btn-primary" onClick={this.teste}>Testar</button> <button class="btn btn-primary float-right" onClick={this.logout}>Logout</button><br/><br/>
         <button class="btn btn-primary float-right" onClick={this.token}>Token ?</button>
         </div>
         </div><br/>
       
   </div>
   
   </div>
        
  );
  }
}
