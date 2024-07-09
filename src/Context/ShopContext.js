import React, { createContext, useState } from "react";
import all_products from '../Components/Assets/all_product.js'

export const ShopContext = createContext(null)

const getDefaultCart = ()=>{
    let cart = {};
    for(let index=0; index<all_products.length; index++){
        cart[index]=0
    }
    return cart;
}

const ShopContextProvider = (props)=>{
    
    const [cartItems, setCartItems] = useState(getDefaultCart())

    const addToCart = (itemId) =>{
        setCartItems((prev)=>({...prev, [itemId]: prev[itemId]+1}))
        
    }
    //console.log(cartItems)

    const removeFromCart = (itemId) =>{
        console.log("inside remove from cart")
        setCartItems((prev)=>({...prev, [itemId]: prev[itemId]-1}))
    }

    const getTotalCartItems =()=>{
        let totalItem =0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                totalItem+=cartItems[item];
            }
        }
        return totalItem;
    }

    const getTotalCartAmount = ()=>{

        let totalAmount = 0;

        for(let item=0; cartItems.length>0; item++){
            console.log("inside loop")
            let itemInfo = all_products.find((product)=>product.id===Number(item.id))
                totalAmount+=itemInfo.new_price * cartItems[item];
                console.log(totalAmount);
        }
        return totalAmount;
        
        /*for(const item in cartItems){
            console.log("inside for loop")
            if(cartItems[item]>0)
            {
                console.log("inside if")
                let itemInfo = all_products.find((product)=>product.id===Number(item.id))
                totalAmount+=itemInfo.new_price * cartItems[item];
            }
            return totalAmount;
        }*/
    }


    const contextValue = {getTotalCartItems, getTotalCartAmount, all_products, cartItems, addToCart, removeFromCart}
    



    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}   

export default ShopContextProvider;