import React from "react"
import Lottoryitem from "./LotteryItem"
import './hot.css';



const Hot = ()=> {
    return (
        <div>
            <div className="hot-header">
                <span>กำลังจะหมด </span>
                
            </div>

            <div className="hot-body">
                
                <Lottoryitem/>
                <Lottoryitem/>
                <Lottoryitem/>
                <button  className="other"> ดูเพิ่มเติม</button>
            </div>
           

        </div>

    )
}
export default Hot
