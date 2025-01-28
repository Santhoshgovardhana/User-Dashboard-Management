import {BrowserRouter,Route,Routes} from "react-router-dom"
import UserList from "./components/UserList";
import './App.css'

const App=() =>  (
  
<BrowserRouter>
<Routes>
<Route path="/" element={<UserList/>}/>
</Routes>
</BrowserRouter>

)


  
export default App