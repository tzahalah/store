// import { TextField } from "@mui/material";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect ,useState} from 'react';
import { fetchProducts } from './Features/Product/ProductSlice'
import { useNavigate } from 'react-router-dom';
import {  changeStatus, login ,clearCurrentUser} from './Features/User/UserSlice';
import { Link, BrowserRouter, Routes,Route } from 'react-router-dom'
import ProductList from './Features/Product/ProductList';
import { ShoppingBasket } from '@mui/icons-material';
import SignUp from './SignUp';
import { red } from '@mui/material/colors';





const Login = () => {
   let nav= useNavigate()
  const prod = useSelector(s => s.product.arrProducts)
  const userStatus = useSelector(s => s.user.status)
  const dis = useDispatch()
const [message,setMessage]= useState("")
const [show,setShow]=useState("false")
  let user = {
    name: "",
    password: ""
  }

  useEffect(() => { fetchProduct() }, [])
  const fetchProduct = async () => {
    dis(fetchProducts())
  }

 
  const checkIsValid = () => {
   setMessage(" ")
    if (user.name == "Admin" && user.password == "admin22")
     { dis(changeStatus("Admin"))
    nav("/ProductList")
      }
    else
      dis(login(user));
   
     if ( userStatus != 'user')
        { setMessage("..משתמש לא קיים")
        }
     else 
     nav('/ProductList')
  }

  return ( <>
  <br/><br/><br/><br/>
<TextField required id="outlined-basic" label="user-name" variant="outlined"  onChange={(e)=>user.name=e.target.value }></TextField><br/><br/>
<TextField required type="password" id="filled-basic" label="password" variant="filled"  onChange={(e)=>user.password=e.target.value}></TextField><br/> 
<Button variant="outlined" onClick={checkIsValid} >Login</Button>
{message}
<br/><br/>
{message=="משתמש לא קיים" &&<Button  variant="outlined"  onClick={()=>{nav("/SignUp")}} >Sign up</Button>}
 {/* <button onClick={p}></button>  */}

      </> );
}

      export default Login;
