import React from 'react';
import { connect } from 'react-redux';

const betatest = ({modules}) =>  (
    <aside>
        <title>Beta TESTE</title>
    <center>
    {modules.map(module=>(
    <div>
      <h3>{module.id}</h3>
      <ul>
      {module.nomes.map(m=>(
          <li><strong>{m.subn}</strong></li>
      ))}
      </ul><br/><br/>
    </div>
    ))}
    </center>

    {console.log(modules)}
    </aside>
 
)

export default connect(state=>({modules:state}))(betatest);