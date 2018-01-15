import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import 'normalize.css'
import * as localStore from './localStore'
//按 es6 的规范 import * as obj from "xxx" 会将 "xxx" 中所有 export 导出的内容组合成一个对象返回
class App extends Component {
  constructor(props){
    super(props)
    this.state={
      newTodo:'',
      todoList:localStore.load('todoList')||[]
    }
  }
  render() {
    let todos=this.state.todoList
        .filter((item)=>!item.deleted)
        .map((item,index)=>{
          return (
            <li key={index}>
              <TodoItem todo={item} onToggle={this.toggle.bind(this)}
              onDelete={this.delete.bind(this)}/>
            </li>
          )
        })


    return (
      <div className="App">
        <h1>我的待办</h1>
        <div className="inputWrapper">
          <TodoInput content={this.state.newTodo}
                     onChange={this.changeTitle.bind(this)}
                     onSubmit={this.addTodo.bind(this)}/>
        </div> 
        <ol className="todoList">
          {todos}
        </ol>
      </div>
    );
  }
  componentDidUpdate(){
      localStore.save('todoList',this.state.todoList)
  }
  toggle(e,todo){
      todo.status=todo.status==='completed'?'':'completed'
      this.setState(this.state)

  }
  changeTitle(event){
      this.setState({
          newTodo:event.target.value,
          todoList:this.state.todoList
      })

  }
  //传入一个函数
  //形参event等待被传入e
  addTodo(event){

      this.state.todoList.push({
          id:idMaker(),
          title:event.target.value,
          status:null,
          deleted:false
      })
      this.setState({
          newTodo:'',
          todoList:this.state.todoList
      })

  }
  delete(event,todo){
      todo.deleted=true
      this.setState(this.state)

  }
}

export default App;

let  id =0

function idMaker(){
    id+=1
    return id
}