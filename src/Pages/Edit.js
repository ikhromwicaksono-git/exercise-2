import React, { Component } from 'react';
import Axios from 'axios'
import { MDBInput,MDBBtn } from 'mdbreact'
import './Add.css'
import {withRouter} from 'react-router-dom'




class Edit extends Component {
  constructor(props){
    super(props);
    this.state = {
      nama : '',
      usia : '',
      pekerjaan : ''
    }
    
  }
  componentDidMount(){
    //console.log(this.props.match);
    this.getActivity()
  }
  
  getActivity = () => {
  
      Axios.get(`http://localhost:2000/identity/${this.props.match.params.id}`)
      .then((res => {
          console.log(res.data.nama);
          this.setState(
            {
              nama : res.data.nama,
              usia : res.data.usia,
              pekerjaan : res.data.pekerjaan
            })
          // console.log(this.state.activity);
          
      }))
      .catch((err => {
        console.log(err);
      } ))
  }
  patchWithAxios = (id) => {
    let updatedNama = this.InputNama.value;
    let updatedUsia = this.InputUsia.value;
    let updatedPekerjaan = this.InputPekerjaan.value
    console.log(updatedNama);
    return Axios.patch(`http://localhost:2000/identity/${id}`,{
        nama : updatedNama,
        usia : updatedUsia,
        pekerjaan : updatedPekerjaan
    })
  }

 
  onSubmit = (e) => {
     e.preventDefault() 
     //let { selectedId } = this.state     
     return this.patchWithAxios(this.props.match.params.id)
     .then(() => {
       return this.getActivity()
       
     })
     .then((res) =>{
        this.onHistory()
        this.InputNama.value = "" 
        this.InputUsia.value = ""
        this.InputPekerjaan = ""
     })
     
    
  }
  onHistory = () => {
    let {history} = this.props
    if(history) history.push("/")
  }  
  render(){
    let  { nama, usia, pekerjaan } = this.state
    console.log(usia);
    
    console.log(this.props.match.params.id)
    return (
      <div className = "Add">
        <div className = "Add-form">
        <span className = "Add-span">
          <h2>UPDATE MEMBER</h2>
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
                label = "Usia"
                style = {{color : "white"}}
                size = "sm" 
                inputRef = {usia => this.InputUsia = usia}
                onChange = {e => this.setState({usia : e.target.value})}
                type = "number"/>
             <MDBInput 
                value = {pekerjaan} 
                label = "Pekerjaan"
                style = {{color : "white"}}
                size = "sm" 
                inputRef = {pekerjaan => this.InputPekerjaan = pekerjaan}
                onChange = {e => this.setState({pekerjaan : e.target.value})}
                type = "text"/>
            
            <MDBBtn 
                gradient = "blue"
                className = "Btn"
               
                onClick = {this.onSubmit}
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

export default withRouter(Edit)