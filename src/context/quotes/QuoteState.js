import react, { useState } from "react";
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
    const getQuotes = async () => {
        setLoading(true)
        const response = await fetch(`http://localhost:5000/api/quote/getQuotes`, {
            method: "GET", 
            headers: {
              "Content-Type": "application/json",
            }
          });
        const json = await response.json();
        setLoading(false)
        console.log(json)
        setQuotes(json)
        console.log(quotes)
        // const requestOptions = {
        //     method: 'GET',
        //     headers: { 'Content-Type': 'application/json' },
        // };

        // fetch('http://localhost:5000/api/quote/getQuotes',requestOptions)
        // .then(async (response)=>{
        //     const resPonse = await response.json();
        //     console.log(resPonse)
        //     const newArray = resPonse.map((item) => ({
        //         docId : item.docId,
        //         data: item.docData
        //       }));
        //       console.log(newArray)
        //     setQuotes(resPonse)
        //     console.log(quotes)
        //     // setUser(resPonse.user)
        // })
        // .catch((error)=>{
        //     console.log(error)
        // })
    }
    return (
        <QuoteContext.Provider value={{user,data,imgURL,quotes,loading, setUser,setData,getUser,setImgURL,getQuotes}}>
            {props.children}
        </QuoteContext.Provider>
    )
}

export default QuoteState;