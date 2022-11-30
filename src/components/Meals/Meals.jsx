import React from "react";
import Meal from "./Meal/Meal";
import style from './Meals.module.css'



const Meals = (props) => {
  return (
    <div className={style.meals}>
      {
        props.mealsData.map(item => <Meal key={item.id} meal={item} ></Meal> )
      }
      
    </div>
  )
}

export default Meals