import axios from "axios";
//import { useSelector } from "react-redux";
//const u= useSelector(s=>s.user.arrUser)
//const p= useSelector(s=>s.product.arrProduct)
 const baseUrl="http://13.60.247.207/"
 
 export const enter=async(name,password)=>{
 const res= await axios.post(baseUrl+"user/login ",{
    "name":name,
    "password":password
    }
  )
return res.data}
  

  // product
 export const newProduct= async(prod)=>{
 const res= await axios.post(baseUrl+"product",{
    "id":0,
    "name":prod.name ,
    "description": prod.description,
    "imgUrl": prod.imgUrl,
    "content": prod.content,
    "price": prod.price,
    "isCooling": true,
    "company": prod.company,
    "prodDate": prod.prodDate
  })
  return res.data
 }

 export const fetchAllProducts= async()=>{
  const res= await axios.get(baseUrl+"product")
  return res.data
}

export const fetchProductByID= async(id)=>{
const res= await axios.get(baseUrl+"product/"+id)
return res.data
} 

export const deleteProd= async(id)=>{
  const res= await axios.delete(baseUrl+"product/"+id)
  return res.data
  } 

  export const putProd= async(id,product)=>{
    const res= await axios.put(baseUrl+"product/"+id,{
      "id":product.id,
      "name":product.name,
      "description":product.description,
      "imgUrl":product.imgUrl,
      "content":product.content,
      "isCooling":  product.isCooling,
      "company": product.company,
      "prodDate":product.prodDate
    })
    return res.data
    }
 

// user
  export const fetchAllUsers=async()=>{
    const res =await axios.get(baseUrl+"user")
    return res.data
    }

 export const newUser=async(user)=>{
  const res=await axios.post(baseUrl+"user",{
   // "id": u[u.length -1]+1,
    "tz": user.tz,
    "name": user.name,
    "password": user.password,
    "telephone": user.telephone
  })
  return res.data
 }



// order
 export const newOrder= async(order)=>{
  const res = await axios.post(baseUrl+"order",{
  "id":0,
  "orderDate": order.orderDate,
  "dueDate": order.dueDate,
  "userId": order.userId,
  "cart": order.cart
  })
  return res.data
   }

 export const fetchAllOrders= async()=>{
   const res= await axios.get(baseUrl+"order")
   return res.data
 }

 export const fetchOrderByID= async(id)=>{
   const res= await axios.get(baseUrl+"order/"+ id)
   return res.data
 }

 export const deleteOrd= async(id)=>{
  const res= await axios.delete(baseUrl+"order/"+ id)
  return res.data
}
 
