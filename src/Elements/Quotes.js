import React, {useContext} from 'react'
import '../CSS/Quotes.css'
import quoteContext from "../context/quotes/quoteContext"
import Quote from './Quote'
const Quotes = () => {
  const {quotes} = useContext(quoteContext)
  return (
    <div id='quotesMainDiv'>
      {quotes.map((item)=>{
        return (
          <Quote key={item.docId} data={item.docData} user={item.user}/>
        )
      })}
    </div>
  )
}

export default Quotes
