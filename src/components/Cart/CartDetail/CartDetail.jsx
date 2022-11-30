import React,{useContext,useState} from 'react'
import Backdrop from '../../UI/Backdrop/Backdrop'
import { DeleteOutlined } from '@ant-design/icons'
import style from './CartDetail.module.css'
import Meal from '../../Meals/Meal/Meal'
import cartContext from '../../../store/cart/cartContext'
import { Button, Result,Modal } from 'antd';

export default function CartDetail(props) {
  const ctx = useContext(cartContext)
  // 确认删除框
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 确认删除
  const handleOk = (e) => {
    e.stopPropagation()
    ctx.cartDispatch({ type:'CLEAR'})
    setIsModalOpen(false)
  }
  // 取消删除
  const handleCancel = (e) => {
    e.stopPropagation()
    setIsModalOpen(false)
  }
  // 显示对话框
  const showModal = () => {
    setIsModalOpen(true)
  }
  return (
    <Backdrop>
      {/* 取消事件冒泡, 上一级的点击显示隐藏 */}
      <div className={style.main} onClick={e=>e.stopPropagation()}>
        <header className={style.header}>
          <h2 className={style.title}>餐品详情</h2>
          {
            ctx.count===0?null:(<div className={style.del} onClick={showModal}>
              <DeleteOutlined />
              <span>清空购物车</span>
            </div>)
          }
          
        </header>
        <div className={style.content}>
          {
            ctx.count===0?(<Result
              status="warning"
              title="购物车空空如也"
              extra={
                <Button type="primary" key="console" onClick={()=>props.setShowDetail(false)}>
                  去加购
                </Button>
              }
            />):(ctx.cartData.map(item=><Meal noDesc key={item.id} meal={item}></Meal>))
          }
        </div>
        
      </div>
      <Modal title="提示框" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="确认" cancelText="取消" width={300} bodyStyle={{ height: '150rem' }} centered >
        <p>确认清空购物车</p>
      </Modal>
    </Backdrop>
  )
}
