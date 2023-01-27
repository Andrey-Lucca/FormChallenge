import React, { useState } from 'react';
import  "./App.css"
/*
* CHALLENGE progresso do formulário
* INSTRUÇÕES
Neste desafio sua missão é criar um formulário e seus 4 campos (com controlled inputs),
juntamente com uma barra de progresso que altera-se conforme o usuário preenche os campos.
- Crie também validações para cada campo conforme instruções abaixo.
* BARRA DE PROGRESSO
Para aproveitar estilização já definida, crie:
- a barra com um elemento pai chamado .bar-container e seu filho .bar
* CAMPOS DO FORMULÁRIO:
input - nome completo - válido se digitar no mínimo dois nomes,
input - email - válido se digitar um e-mail,
select - estado civil,
radio - gênero
Para validação de e-mail use a seguinte RegEx: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
* FUNCIONAMENTO
Espera-se que o formulário tenha 4 campos ao todo. Portanto, quando o usuário preencher
o primeiro campo, a barra de progresso deve assumir 25% do tamanho total;
o segundo campo, 50% e assim por diante...
Caso o usuário não tenha definido valores para os elementos de select e radio,
os mesmos não devem ser considerados como preenchidos até então.
Se o usuário preencher um campo e apagar seu valor, este campo deve ser considerado como vazio,
fazendo com que a barra de progresso regrida novamente.
Desabilitar o botão de enviar caso todos os campos não estejam preenchidos/válidos.
Ao enviar, deve-se apresentar um alert javascript com sucesso, limpar todos os campos
do formulário e zerar a barra de progresso novamente.
*/


function App() {
  const [data, setData] = useState({
    fullName: '',
    email: '',
    state: '',
    genre: '',
  })
  
  const handleChange = (ev) =>{
    const {name, value} = ev.target
    
    setData((prev) =>{
      const newData = {...prev, [name]:value}
      return newData
    })
  }

  const progressBar = () =>{
    let value = 0
    const addPercent = 25

    if(data.fullName){
      const explode = data.fullName.split(' ')
      if(explode[1])
      value += addPercent
    }

    if(data.email){
      const pattern = (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      if(pattern.test(data.email))
      value += addPercent
    }

    if(data.state){
      value += addPercent
    }

    if(data.genre){
      value += addPercent
    }
    return value
  }

  const handleClick = () =>{
    alert(`Formulário enviado com sucesso`)
    setData({
    fullName: '',
    email: '',
    state: '',
    genre: '',
    })
  }

  return (
    <div className='app'>
      <h2>Formulário com barra de progresso</h2>
      <main>
      <div className='bar-container'>
        <div className='bar' style={{width:`${progressBar()}%`}}></div>
      </div>
      <div className='formGroup'>
        <label htmlFor='fullName'>Nome completo:</label>
        <input name='fullName' value={data.fullName} onChange={handleChange}/>
      </div>
      <div className='formGroup'>
        <label htmlFor='email'>email:</label>
        <input name='email' value={data.email} onChange={handleChange}/>
      </div>
      <div className='formGroup'>
        <label htmlFor='maritalStatus'>Estado civil</label>
        <select name='state' value={data.state} onChange={handleChange}>
          <option>Selecione</option>
          <option>Solteiro</option>
          <option>Casado</option>
          <option>Divorciado</option>
        </select>
      </div>
      <div className='form-group'>
          <label htmlFor=''>Gênero</label>
          <div className='radios-container'>
            <span>
              <input type='radio' name='genre' value = 'masculino' onChange={handleChange} checked ={data.genre === "masculino"}/> Masculino
            </span>
            <span>
              <input type='radio' name='genre' value = 'feminino' onChange={handleChange} checked ={data.genre === "feminino"}/> Feminino
            </span>
          </div>
        </div>
        <div className='btn-container'></div>
        <button className='btn' onClick={handleClick} disabled ={progressBar() !== 100}>Enviar informações</button>
      </main>
    </div>
  );
}

export default App;
