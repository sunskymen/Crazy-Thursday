import React,{useContext,useState} from 'react'
import style from './Cart.module.css'
import bag from '../../assets/bag.png'
import cartContext from '../../store/cart/cartContext'
import CartDetail from './CartDetail/CartDetail'


export default function Cart() {
  const ctx = useContext(cartContext)
  const [showDetail, setShowDetail] = useState(false)

  // 显示商品详情
  const toggleDetail = () => {
    setShowDetail(preState => !preState)
  }
  return (
    <div className={style.main} onClick={toggleDetail}>
      {/* 购物车详情 */}
      {
        showDetail && <CartDetail setShowDetail={setShowDetail}></CartDetail>
      }
      <div className={style.icon}>
        <img src={bag} alt="购物袋" />
        {
          ctx.count !== 0 ?<span className={style.count}>{ ctx.count }</span>:null
        }
      </div>
      {
        ctx.total !==0?<p className={style.price}>{ ctx.total }</p>:<p className={style.space}>未选购商品</p>
      }
      <button className={`${style.btn} ${ctx.count===0? style.disable:'' }`}>
        去结算
      </button>
    </div>
  )
}
