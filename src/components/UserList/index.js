import {Component} from "react"
import { TailSpin } from 'react-loader-spinner';
import UserForm from "../UserForm"
import "./index.css"

class UserList extends Component {

  state={usersList:[],isAddUserClicked:false,
    username:"",name:"",email:"",id:"",
    isEditUserClicked:false,isDeleteUserClicked:false,
    showError:false,searchInput:"",isLoading:true
}

  componentDidMount()  {
    this.getData()
  }

  getData= async () => {
    const response=await fetch("https://jsonplaceholder.typicode.com/users/")
    const data=await response.json()
    const updatedData=data.map(each => ({
      id:each.id,
      username:each.username,
      name:each.name,
      email:each.email,
    }))
    this.setState({usersList:updatedData,isLoading:false})
  }

  onChangeUsernameInput=(event) => {
    this.setState({username:event.target.value})
}

onChangeId=(event) => {
    this.setState({id:(event.target.value)})
}

onChangeNameInput=(event) => {
    this.setState({name:event.target.value})
}

onChangeEmailInput=(event) => {
    this.setState({email:event.target.value})
}

onChangeSearchInput=(event) => {
    this.setState({searchInput:event.target.value})
}

clicked=() => {
    this.setState({isAddUserClicked:true})
}

clickedEdit=() => {
    const {usersList}=this.state
    if(usersList.length>0) {
    this.setState({isEditUserClicked:true})
    }else {
        this.setState({isEditUserClicked:false})
    }
}

clickedDelete=() => {
    const {usersList}=this.state
    if(usersList.length>0) {
    this.setState({isDeleteUserClicked:true})
    }else {
        this.setState({isDeleteUserClicked:false})
    }
}

ClickedHome=() => {
    this.setState({isAddUserClicked:false,isEditUserClicked:false,isDeleteUserClicked:false,id:"",name:"",email:"",username:"",showError:false})
}

onDelete=(id) => {
    const {usersList}=this.state
    const updatedList=usersList.filter(each => (each.id!==id))
    this.setState({usersList:updatedList})
}

submitAddUserForm= async (event) => {
    event.preventDefault()
    const {username,name,email}=this.state
    if(username !=="" && name!=="" && email!=="") {
    const data={
        username,
        name,
        email,
    }
    try{
    const response=await fetch("https://jsonplaceholder.typicode.com/users/",{
        method:"POST",
        headers: {
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify(data),
    })
    const result=await response.json()
    this.setState(prevState => ({usersList:[...prevState.usersList,result],name:"",username:"",email:""}))
    this.setState({isAddUserClicked:false,showError:false})
    }
    catch (e) {
        console.log("Failed to fetch")
}
}else {
    this.setState({showError:true})
}
}

onSubmitEditForm= async (event) => {
    event.preventDefault()
    const {name,username,id,email,usersList}=this.state
    const isIncludes=usersList.find(each => (each.id===parseInt(id)))
    let solution=null
    if(isIncludes===undefined) {
        solution=false
    }
    else {
        solution=true
    }
    if(username !=="" && name!=="" && email!=="" && id!==""&&id==parseInt(id) && solution) {
        const data={
            username,
            name,
            email,
            id,
        }
        
        const response=await fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
            method:"PUT",
            headers: {
                'Content-Type': 'application/json; charset=UTF-8', 
              },
              body: JSON.stringify(data),
        })
        try {
        const result=await response.json()
        const FilteredData=usersList.filter(each => (each.id!==parseInt(id)))
        this.setState({usersList:FilteredData})
        this.setState(prevState => ({usersList:[...prevState.usersList,result],name:"",username:"",email:"",id:""}))
        this.setState({isEditUserClicked:false,showError:false})
        } catch (e) {
            const FilteredData=usersList.filter(each => (each.id!==parseInt(id)))
            this.setState({usersList:FilteredData})
            this.setState(prevState => ({usersList:[...prevState.usersList,data],name:"",username:"",email:"",id:""}))
            this.setState({isEditUserClicked:false,showError:false})
        }
        }else {
        this.setState({showError:true})
    }
}

onSubmitDeleteForm=async (event) => {
    event.preventDefault()
    const {id,usersList}=this.state
    const isIncludes=usersList.find(each => (each.id===parseInt(id)))
    let solution=null
    if(isIncludes===undefined) {
        solution=false
    }
    else {
        solution=true
    }
    if(id!=="" && id==parseInt(id) && solution) {
        try{
        const response=await fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
            method:"DELETE",
        })
        const FilteredData=usersList.filter(each => (each.id!==parseInt(id)))
        this.setState({usersList:FilteredData})
        this.setState({isDeleteUserClicked:false,id:""})
        this.setState({showError:false})
    }catch (e) {
        console.log("Failed to fetch")
    }
    }else if((id!=="" && id!==parseInt(id)) || solution ||id==="") {
        this.setState({showError:true})
    }
    
}

  getfetchedData=() => {
    const {name,username,email,isAddUserClicked,isEditUserClicked,id,isDeleteUserClicked,showError}=this.state
    if(isAddUserClicked===true){
    return (
        <div className="add-user-container">
            <form className="addUserForm" onSubmit={this.submitAddUserForm}>
                <h1 className="heading">Add User</h1>
                <div className="input-container">
                <label className="label" htmlFor="username">Username</label>
                <input className="input" value={username} type="text" id="username" placeholder="Enter Username" onChange={this.onChangeUsernameInput}/>
                </div>
                <div className="input-container">
                <label className="label" htmlFor="name">Name</label>
                <input className="input" value={name} type="text" id="name" placeholder="Enter Name" onChange={this.onChangeNameInput}/>
                </div>
                <div className="input-container">
                <label className="label" htmlFor="email">Email</label>
                <input className="input" value={email} type="text" id="email" placeholder="Enter Email" onChange={this.onChangeEmailInput}/>
                </div>
                {showError?<p className="error-msg">Please Enter Valid Details</p>:""}
                <button type="submit" className="button-submit">Submit</button>
                
            </form>
            <button className="button-home" onClick={this.ClickedHome}>Go to Home</button>
        </div>
    )
}else if(isEditUserClicked===true) {
    return (
        <div className="add-user-container">
            <form className="editUserForm" onSubmit={this.onSubmitEditForm}>
                <h1 className="heading">Edit User</h1>
                <div className="input-container">
                <label className="label" htmlFor="Id">Id</label>
                <input className="input" value={id} type="text" id="Id" placeholder="Enter id" onChange={this.onChangeId}/>
                </div>
                <div className="input-container">
                <label className="label" htmlFor="username">Username</label>
                <input className="input" value={username} type="text" id="username" placeholder="Enter Username" onChange={this.onChangeUsernameInput}/>
                </div>
                <div className="input-container">
                <label className="label" htmlFor="name">Name</label>
                <input className="input" value={name} type="text" id="name" placeholder="Enter Name" onChange={this.onChangeNameInput}/>
                </div>
                <div className="input-container">
                <label className="label" htmlFor="email">Email</label>
                <input className="input" value={email} type="text" id="email" placeholder="Enter Email" onChange={this.onChangeEmailInput}/>
                </div>
                {showError?<p className="error-msg">Please Enter Valid Details</p>:""}
                <button type="submit" className="button-submit">Submit</button>
                
            </form>
            <button className="button-home" onClick={this.ClickedHome}>Go to Home</button>
        </div>
    )
}else if (isDeleteUserClicked===true) {
    return (
    <div className="add-user-container">
    <form className="delete-form" onSubmit={this.onSubmitDeleteForm}>
        <h1 className="heading">Delete User</h1>
            <div className="input-container">
                <label className="label" htmlFor="Id">Id</label>
                <input className="input" value={id} type="text" id="Id" placeholder="Enter id" onChange={this.onChangeId}/>
                {showError?<p className="error-msg">Please Enter Valid id</p>:""}
            </div>
            <button type="submit" className="button-submit">Submit</button>
    </form>
    <button className="button-home" onClick={this.ClickedHome}>Go to Home</button>
    </div>
    )
}
  }

  getFilteredData=() => {
    const {usersList,searchInput,isLoading}=this.state
    const resultantData=usersList.filter(each => (each.name.toLowerCase().includes(searchInput.toLowerCase())))
    return (
    <div className="main-container">
        <div className="container">
            <div className="nav-bar">
                <div>
                    <h1 className="main-heading">User Management Dashboard</h1>
                </div>
                <div className="button-container">
                    <button className="button" onClick={this.clicked}>
                        <p>Add</p>
                    </button>
                    <button className="button" onClick={this.clickedEdit}>
                        <p>Edit</p>
                    </button>
                    <button className="button" onClick={this.clickedDelete}>
                        <p>Delete</p>
                    </button>
                </div>
            </div>
            <div className="middle-container">
            <div className="search-container">
            <input className="search-input" onChange={this.onChangeSearchInput} value={searchInput} placeholder="Enter Name"/>
            <img className="search-image" src="https://assets.ccbp.in/frontend/react-js/google-search-icon.png" alt="search icon"/>
            </div>
            </div>
            <div className="bottom-container">
                <div className="users-data-container">
                    <table className="table">
                        <thead>
                        <tr className="table-row">
                            <th className="item">id</th>
                            <th className="item">Username</th>
                            <th className="item">Name</th>
                            <th className="item">Email</th>
                            <th className="item">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {isLoading?
                        <tr>
                        <td colSpan="8">
                            <div className="loader-container">
                        <TailSpin
                            height={80}
                            width={80}
                            color="#4fa94d"
                            ariaLabel="loading"
                            visible={true}
                        />
                        </div>
                        </td>
                        </tr>:
                        (resultantData.length>0?(
                            resultantData.map(each => (
                                <UserForm details={each} key={each.id} clickedDelete={this.onDelete}/>
                            ))
                        
                       ):(
                        <tr>
                        <td colSpan="8">
                            <div className="empty-results-container">
                                <h1 className="empty-results-heading">No Results Found</h1>
                            </div>
                        </td>
                        </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    )
  }

  render() {
    const {isEditUserClicked,isAddUserClicked,isDeleteUserClicked}=this.state
    const check=isAddUserClicked || isEditUserClicked || isDeleteUserClicked
  return (
    <div>
        {check?(this.getfetchedData()):
        (this.getFilteredData())}
    </div>
  )
}
}

export default UserList;