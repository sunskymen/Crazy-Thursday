import React, {useContext} from 'react'
import style from './Counter.module.css'
import cartContext from '../../../store/cart/cartContext'


export default function Counter(props) {
  const ctx = useContext(cartContext)

  return (
    <div className={style.box}>
      {
        (props.meal.amount && props.meal.amount !== 0) ? (
          <>
            <button className={style.sub} onClick={()=>ctx.cartDispatch({type:'SUB',obj:props.meal})}>-</button>
            <span className={style.count}>{props.meal.amount}</span>
          </> 
        ): ''
      }
      <button className={style.add} onClick={()=>ctx.cartDispatch({type:'ADD',obj:props.meal})}>+</button>
    </div>
  )
}
