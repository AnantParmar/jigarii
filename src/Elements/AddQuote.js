import React, { useContext, useState } from 'react'
import '../CSS/AddQuote.css'
import quoteContext from '../context/quotes/quoteContext';
import { useNavigate } from 'react-router-dom';
const AddQuote = () => {
    const {user} = useContext(quoteContext)
    const [quoteTag, setQuoteTag] = useState('');
    const [quote, setQuote] = useState('');
    const navigate = useNavigate();
    const onAddQuote = (e)=> {
        e.preventDefault();
        
        console.log(user)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quote: quote, quoteTag: quoteTag, uid: user.uid })
        };
        fetch('http://localhost:5000/api/quote/addQuote',requestOptions)
        .then(async (response)=>{
            const data = await response.json();
            console.log(data)
            navigate('/')
        })
    }
  return (
    <div id='addQuoteMainDiv'>
      <div id='addQuoteFormDiv' className='formDiv'>
        <form id='addQuoteForm'  onSubmit={onAddQuote}>
            <div id='quoteDiv' className='textareaDiv'>
                <label htmlFor='quote'>Quote</label>
                <textarea name='quote' id='quote' value={quote} onChange={e=> setQuote(e.target.value)}/>
            </div>
            <div id='quoteTagDiv' className='quoteInputDiv'>
                <label htmlFor='quoteTag'>Quote Tag</label>
                <input type='text' name='quoteTag' id='quoteTag' value={quoteTag} onChange={e=> setQuoteTag(e.target.value)} />
            </div>
            {/* <h4 id='error'></h4> */}
            {/* <h5 style={{margin: "10px 0px"}}>Don't have Account? <span style={{color: 'blue', textDecoration: 'Underline', cursor: "pointer"}} onClick={()=>{navigate('/signup')}}>Signup</span></h5> */}
            <div id='addQuoteBtnDiv'>
                <input type='submit' value={"Add Quote"}/>
                <input type='button' value={"Cancle"} onClick={()=>{navigate('/')}}/>
            </div>
        </form>        

      </div>
    </div>
  )
}

export default AddQuote
