import React, { Component } from 'react';
import Axios from 'axios'
import { MDBInput,MDBBtn } from 'mdbreact'
import './Add.css'
import {withRouter} from 'react-router-dom'

class Add extends Component {
  constructor(props){
    super(props);
    this.state = {
      activity : []
    }
    this.onSubmit = this.onSubmit.bind(this)
    
  }

 

  componentDidMount(){
    this.getActivity()
  }

  getActivity = () => {
      Axios.get("http://localhost:2000/identity")
      .then((res => {
          this.setState({activity : res.data})
          console.log(this.state.activity);
          
      }))
      .catch((err => {
        console.log(err);
      } ))
  }

  postWithAxios = () => {
    let newNama = this.InputNama.value;
    let newUsia = this.InputAge.value;
    let newPekerjaan = this.InpuJob.value
    console.log(newNama);
    
    return Axios.post("http://localhost:2000/identity",{
        nama : newNama,
        usia : newUsia,
        pekerjaan : newPekerjaan
    })
  }
  onSubmit = (e) => {
     e.preventDefault() 
     let newNama = this.InputNama.value;
     let newUsia = this.InputAge.value;
     let newPekerjaan = this.InpuJob.value;
     console.log(newNama,newUsia,newPekerjaan);
     
     if(newNama === '' || newUsia === '' || newPekerjaan === ''){
      alert('Plesae fill out input')
     }
     else{
      return this.postWithAxios()
      .then(() => {
        return this.getActivity()
        
      })
      .then((res) =>{
         this.onHistory()
        
      })
     }

     
      
  }
  onHistory = () => {
    let {history} = this.props
    if(history) history.push("/")
  }  
  render(){
    let  { nama, usia, pekerjaan } = this.state
    console.log(nama);
    
    
    return (
      <div className = "Add">
        <div className = "Add-form">
        <span className = "Add-span">
          <h2>ADD MEMBER</h2>
        </span>
          <div className = "form-group">
            <MDBInput 
                style = {{color : "white"}}
                label = "Nama" 
                size = "sm"  
                inputRef = {nama => this.InputNama = nama}
                value = {nama} 
                onChange = {e => this.setState({nama : e.target.value})}/>
            <MDBInput 
                value = {usia} 
                style = {{color : "white"}}
                label = "Usia"
                size = "sm" 
                inputRef = {age => this.InputAge = age}
                onChange = {e => this.setState({usia : e.target.value})}
                type = "number"/>
             <MDBInput 
                value = {pekerjaan} 
                style = {{color : "white"}}
                label = "Pekerjaan"
                size = "sm" 
                inputRef = {job => this.InpuJob = job}
                onChange = {e => this.setState({pekerjaan : e.target.value})}
                type = "text"/>
            
            <MDBBtn 
                gradient = "blue"
                className = "Btn"
                
                onClick = {this.onSubmit }
            >
                Submit
            </MDBBtn> 
            <MDBBtn
              color = "danger"
              onClick = {this.onHistory}
              className = "Btn"
            >
             Cancel
            </MDBBtn>
                     
          </div>
        </div>
          
      </div>
    )
  }
}

export default withRouter(Add)