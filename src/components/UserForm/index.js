
import "./index.css"

const UserForm=(props) => {
    const {details,clickedDelete}=props
    const {id,username,name,email}=details
    const clickedDel=() => {
        clickedDelete(id)
    }
    return(
        
        <tr className="data-cell">
        <td className="item">{id}</td>
        <td className="item">{username}</td>
        <td className="item">{name}</td>
        <td className="item">{email}</td>
        <td className="item">
            <button className="delete-button" onClick={clickedDel}>
            <img className="delete-image" src='https://assets.ccbp.in/frontend/react-js/money-manager/delete.png' alt="delete"/>
            </button>
        </td>
    </tr> 
    
    )
}

export default UserForm
