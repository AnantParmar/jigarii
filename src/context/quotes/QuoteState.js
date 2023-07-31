import { useState } from "react";
import QuoteContext from "./quoteContext";

const QuoteState = (props)=> {

    const [user, setUser] = useState('');
    const [data, setData] = useState('');
    const [imgURL,setImgURL] = useState('');
    const [loading,setLoading] = useState(false);
    const quotesInitial = [];
    const [quotes, setQuotes] = useState(quotesInitial)
    const getUser = (uid) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch('http://localhost:5000/api/auth/getUser',requestOptions)
        .then(async (response)=>{
            const resPonse = await response.json();
            console.log(resPonse)
            
            // setUser(resPonse.user)
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    const updateLikeCount= (likeCount,updateValue,docId,uid)=> {
        const val = likeCount + updateValue;

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ val: updateValue, docId: docId,uid:uid }) 
            
        };
        fetch('http://localhost:5000/api/quote/updateLikeCount',requestOptions)
        .then(async (response)=>{
            const resPonse = await response.json();
            console.log(resPonse)
            return resPonse.result;
            
            // setUser(resPonse.user)
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    const getQuotes = async () => {
        setLoading(true)
        const response = await fetch(`http://localhost:5000/api/quote/getQuotes`, {
            method: "GET", 
            headers: {
              "Content-Type": "application/json",
            }
          });
        const json = await response.json();
        console.log(json)
        setLoading(false)
        setQuotes(json)

    }
    return (
        <QuoteContext.Provider value={{user,data,imgURL,quotes,loading, setUser,setData,getUser,setImgURL,getQuotes,updateLikeCount}}>
            {props.children}
        </QuoteContext.Provider>
    )
}

export default QuoteState;