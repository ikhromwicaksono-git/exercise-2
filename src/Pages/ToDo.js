import React, { Component } from 'react';
import Axios from 'axios'
import './ToDo.css';
import { Table, Button } from 'reactstrap'
import Select from 'react-select'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

class ToDo extends Component {
  constructor(props){
    super(props);
    this.state = {
        activity : [],
        filteredData : ""
    }
    
  }
  componentDidMount(){
    this.getActivity()
  }

  getActivity = () => {
    Axios.get("http://localhost:2000/identity")
    .then((res => {
        console.log(res.data);
        this.setState(
          {
            activity : res.data,
            
        })
        console.log(this.state.activity);
          
    }))
  }
  _handleSearchChange = event => {
    this.setState({ filteredData: event.target.value });
  }
  
  
  renderActitivy = () => {
    
      return this.state.activity.map((tasks,index) => {
          return (
            <tr key = {tasks.id}>
                <th   
                  scope = "row" 
                  className = "Number"
                >
                  {index + 1}
                </th>
                <td>
                  {tasks.nama}
                </td>
                <td className = "Date">
                    {tasks.usia}
                </td>
                <td>
                  {tasks.pekerjaan}
                </td>
                <td className = "Action">
                    <Button 
                    color = "info" 
                    value = "EDIT" 
                    size = "sm" 
                    className = "Edit" 
                    onClick = {() => {this.editActivity(tasks.id)}}
                    >EDIT
                   </Button>
                   <Button 
                    color = "danger"  
                    value = "DELETE" 
                    size = "sm" 
                    onClick = {() => {if(window.confirm('Delete the item?'))this.deleteActivity(tasks.id)}}
                   >DELETE
                   </Button>
                </td>
            </tr>
          )
      })
  }
  editActivity = (id) => {
    this.onHistoryEdit(id)
   
  }  
  deleteActivity = (id) => {
     Axios.delete(`http://localhost:2000/identity/${id}`)
     .then((res => {
       console.log(res.data);
       this.getActivity()
     }))
  }
  deleteAllItem = () => {
    let { activity } = this.state
    let arr = []
    for(let i = 0; i < activity.length; i++){
        arr.push(activity[i].id)
    }
    for(let i = 0; i < arr.length; i++){
      Axios.delete(`http://localhost:2000/identity/${arr[i]}`)
      .then((res => {
        console.log(res.data);
        this.getActivity()
      }))
    } 
  }
  onHistoryEdit = (id) => {
      let { history } = this.props 
      if(history){
        history.push('/edit/' + id)
      } 
  }
  
  render (){
    console.log(this.state.activity);
    let { activity } = this.state
    let arr = []
    for(let i = 0; i < activity.length; i++){
        arr.push(activity[i].id)
    }
    console.log(arr);
    
    
    return (
      <div className = "ToDo">
        <div>
          <Select options = {this.state.activity} />
        </div>
      <br/>
      <br/>
          <Table dark bordered size = 'sm'>
            <thead>
              <tr>
                <th className = "Number">No</th>
                <th>Nama</th>
                <th className = "Date-head">Usia</th>
                <th>Pekerjaan</th>
                <th className = "Action">Action</th>
              </tr>
            </thead>
            <tbody>
              {this.renderActitivy()}
            </tbody>
      </Table>
      <Link to ='/add'>
         <Button 
            color = "primary" 
            size = "sm"> 
            ADD
      </Button>
      
      </Link>
      <Button
        size = "sm"
        onClick = {this.deleteAllItem}
      >
        Delete All Data
      </Button>
     
      </div>
     
      
    );
  }
  
}


export default withRouter(ToDo);
