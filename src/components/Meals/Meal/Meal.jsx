import React from 'react'
import style from './Meal.module.css'
import Counter from '../../UI/Counter/Counter'



export default function Meal(props) {
  return (
    <div className={style.meal}>
      <div className={style.imgBox}>
        <img src={props.meal.img} alt='gbg'/>
      </div>
      <div className={style.descBox}>
        <h2 className={style.title}>{ props.meal.title }</h2>
        {
          props.noDesc?null:<p className={style.desc}>{props.meal.desc}</p>
        }
        
        <div className={style.floor}>
          <span className={style.price}>{ props.meal.price }</span>
          <Counter meal={props.meal}></Counter>
        </div>
      </div>
    </div>
  )
}
