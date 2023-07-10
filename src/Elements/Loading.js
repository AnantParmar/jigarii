import React, {useContext} from 'react'
import '../CSS/Loading.css'
import quoteContext from '../context/quotes/quoteContext';
const Loading = () => {
    const {loading} = useContext(quoteContext)
  return (
    <div id='loadingMainDiv' style={{position: "fixed", top: "50%", left: "50%", transform: 'translate(-50%, 0)', width: "50px", height: "50px", display: loading?'block':'none'}}>
        <div className="center">
            <div className="wave"><span style={{visibility:"hidden"}}>hhdkjhdf</span></div>
            <div className="wave"><span style={{visibility:"hidden"}}>hhdkjhdf</span></div>
            <div className="wave"><span style={{visibility:"hidden"}}>hhdkjhdf</span></div>
            <div className="wave"><span style={{visibility:"hidden"}}>hhdkjhdf</span></div>
            <div className="wave"><span style={{visibility:"hidden"}}>hhdkjhdf</span></div>
            <div className="wave"><span style={{visibility:"hidden"}}>hhdkjhdf</span></div>
            
        </div>
    </div>
  )
}

export default Loading
