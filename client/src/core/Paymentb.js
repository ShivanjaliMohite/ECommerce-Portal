import React ,{useState}from "react";
import { loadCart,cartEmpty } from "./helper/cartHelper";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { getmeToken,processPayment } from "./helper/paymentbhelper";
import { createOrder} from "./helper/orderHelper";
import { isAuthenticated } from "../auth/helper";
import DropIn from "braintree-web-drop-in-react";
import { useEffect } from "react";

const Paymentb=({products,setReload=f=>f,reload=undefined})=>{
    const [info,setInfo]=useState({
        loading:false,
        success:false,
        clientToken:null,
        error:"",
        instance:{}
    })
    

   // {isAuthenticated()}
   // console.log(isAuthenticated().user._id)
    //const user = isAuthenticated(); // Assuming isAuthenticated() returns the user object
    //const userId = user && user._id;
     const userId=isAuthenticated() && isAuthenticated().user._id
     const token=isAuthenticated() && isAuthenticated().token
   //  console.log(userId)
     //console.log(token)
    //const token=user && user.token
   // const userId=null;
    //const token=null;
    
   /* if(isAuthenticated())
    {
        if(isAuthenticated().user._id && isAuthenticated().token)
        {
            const userId=isAuthenticated().user._id;
            const token=isAuthenticated().token
        }
    }*/

    const showbtdropIn = () => {
        return (
          <div>
            {info.clientToken !== null && products.length > 0 ? (
              <div>
                <DropIn
                  options={{ authorization: info.clientToken }}
                  onInstance={instance => (info.instance = instance)}
                />
                <button className="btn btn-block btn-success" onClick={onPurchase}>
                  Buy
                </button>
              </div>
            ) : (
              <h3>Please login or add something to cart</h3>
            )}
          </div>
        );
      };
    
    const getToken=(userId,token)=>{
      console.log("information:",info)
     //  console.log("token:",token)
       //console.log("id:",userId)
       getmeToken(userId,token).then(info=>{
        if(info.error != null){
            setInfo({...info,error:info.error})
        }
        else{
            const clientToken=info.clientToken
            setInfo({clientToken})
        }
       })
    }
    useEffect(()=>{
        getToken(userId,token)
    },[])
    
    const onPurchase = () => {
        setInfo({ loading: true });
        let nonce;
        let getNonce = info.instance.requestPaymentMethod().then(data => {
          nonce = data.nonce;
          const paymentData = {
            paymentMethodNonce: nonce,
            amount: getAmount()
          };
          processPayment(userId, token, paymentData)
            .then(response => {
              setInfo({ ...info, success: response.success, loading: false });
              console.log("PAYMENT SUCCESS");
              //TODO: empty the cart
              //TODO: force reload
            })
            .catch(error => {
              setInfo({ loading: false, success: false });
              console.log("PAYMENT FAILED");
            });
        });

    };

    const getAmount = () => {
        let amount = 0;
        products.map(p => {
          amount = amount + p.price;
        });
        return amount;
      };
      return (
        <div>
          <h3>Your bill is {getAmount()} $</h3>
          {showbtdropIn()}
        </div>
      );
}

export default Paymentb;