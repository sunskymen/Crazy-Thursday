import React from 'react'
import style from './Backdrop.module.css'
import ReactDOM from 'react-dom'

export default function Backdrop(props) {
  return ReactDOM.createPortal(<div className={`${style.backdrop} ${props.className}`}>
    {props.children}
  </div>, document.getElementById('backdrop-root'))
}
