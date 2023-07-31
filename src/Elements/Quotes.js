import React, {useContext} from 'react'
import '../CSS/Quotes.css'
import quoteContext from "../context/quotes/quoteContext"
import Quote from './Quote'
const Quotes = () => {
  const {quotes,data} = useContext(quoteContext)
  const checkLikedQuote = (docId)=>{
    for(var i = 0; i<data.length;i++) {
      if(data[i].quote == docId)
      return true;
    }
    
    return false;
  }
  return (
    <div id='quotesMainDiv'>
      {quotes.map((item)=>{
        return (
          <Quote docId={item.docId} data={item.docData} dataUser={item.user} liked={checkLikedQuote(item.docId)}/>
        )
      })}
    </div>
  )
}

export default Quotes
