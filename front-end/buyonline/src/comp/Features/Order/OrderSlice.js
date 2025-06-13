import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllOrders, fetchOrderByID, newOrder } from "../../App/ProjectAPI";
import { Today } from "@mui/icons-material";

const initialState = {
    currentOrder: {
        orderDate: "",
        dueDate: "",
        userId: 0,
        cart: []
    },
    status: "idle",
    arrOrder:[]

}
export const addNewOrder = createAsyncThunk(
    'order/newOrder',
    
    async (arg, thankAPI) => {
        console.log("ji")
        let state= thankAPI.getState().order;
        let today=new Date()
        state.currentOrder.orderDate=today
      // state. currentOrder.dueDate=new Date(today.setDate(today.getDate() + 7));
      // console.log( state. currentOrder.dueDate)
       // let currentUser=thankAPI.getState().user;
       // console.log(currentUser)
       // state.currentOrder.userId=currentUser.id
        console.log(state.currentOrder)

        const res = await newOrder(state.currentOrder)
        return res
    },
)

export const getOrdById = createAsyncThunk(
    'order/getOrdById',
    async ( id,thankAPI) => {
        const res = await fetchOrderByID(id)
        return res
    },
)

export const fetchOrders = createAsyncThunk(
    'order/fetchOrder',
    async ( thankAPI) => {
        const res = await fetchAllOrders()
        return res
    },
)

export const deleteOrder = createAsyncThunk(
    'order/deleteOrder',
    async ( id,thankAPI) => {
        const res = await fetchAllOrders(id)
        return res
    },
)


export const OrderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addProdToCart:
       (state, action) => {
        const {prod, amount}= action.payload
        const newProd={ ...prod, "qty":amount};
            state.currentOrder.cart.push(newProd)
        },
    


        removeProdFromCart: (state, action) => {
           
            let index = state.currentOrder.cart.findIndex(p => p.id === action.payload.id)
            state.currentOrder.cart.splice(index, 1)
        },
        updateProd: (state, action) => {
            const {id,amount}=action.payload
            let prod = state.currentOrder.cart.find(pr => pr.id ===id)
            console.log(id)
            prod.qty=amount;
        }



    },



    extraReducers: (builder) => {
        builder
            .addCase(addNewOrder.fulfilled, (state, {payload}) => {
                state.status = "fulfilled"
                console.log(payload)
                state.arrOrder.push(payload)
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.arrOrder = action.payload
            })
            .addCase(deleteOrder.fulfilled, (state, {payload}) => {
                let index=state.arrOrder.findIndex(o=>o.id===payload.id)
                state.arrOrder.splice(index,1)
            })
            .addCase(getOrdById.fulfilled, (state, {payload}) => {
                state.currentOrder=payload
            })
    },
})
export const { addProdToCart, removeProdFromCart, updateProd } = OrderSlice.actions;
export default OrderSlice.reducer