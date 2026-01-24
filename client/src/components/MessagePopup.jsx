import "../styles/MessagePopup.css"
import { FaCheck } from "react-icons/fa";
import { FaRegCircleXmark } from "react-icons/fa6";
import { useState } from "react";

const MessagePopup = ({props}) => {

  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup-icon">
          {props.iconType === 'success' ? <FaCheck fill="green" size={48}/>
          : <FaRegCircleXmark fill="red" size={48}/>}
        </div>
        <div className="popup-details">
          <h1>{props.title}</h1>
          <p>{props.message}</p>
        </div>
        <button
        className="popup-btn"
          onClick={props.handlePopupBtnClick}
        >{props.btnText}</button>
      </div>
    </div>
  )
}

export default MessagePopup