import './App.css';
import Meals from './components/Meals/Meals';
import {useState, useEffect,useReducer} from 'react'
import Cart from './components/Cart/Cart';
import cartContext from './store/cart/cartContext'
import Search from './components/Search/Search';
import useFetch from './hooks/useFetch';
import _ from 'lodash'
// 获取store仓库数据
import {useSelector} from 'react-redux'
// 初始数据
/* const mealsData = [
  {
      id: '1',
      title: '汉堡包',
      desc: '百分百纯牛肉配搭爽脆酸瓜洋葱粒与美味番茄酱经典滋味让你无法抵挡！',
      price: 12,
      img: '/img/meals/1.png'
  },
  {
      id: '2',
      title: '双层吉士汉堡',
      desc: '百分百纯牛肉与双层香软芝，加上松软面包及美味酱料，诱惑无人能挡！',
      price: 20,
      img: '/img/meals/2.png'
  },
  {
      id: '3',
      title: '巨无霸',
      desc: '两块百分百纯牛肉，搭配生菜、洋葱等新鲜食材，口感丰富，极致美味！',
      price: 24,
      img: '/img/meals/3.png'
  }, {
      id: '4',
      title: '麦辣鸡腿汉堡',
      desc: '金黄脆辣的外皮，鲜嫩幼滑的鸡腿肉，多重滋味，一次打动您挑剔的味蕾！',
      price: 21,
      img: '/img/meals/4.png'
  }, {
      id: '5',
      title: '板烧鸡腿堡',
      desc: '原块去骨鸡排嫩滑多汁，与翠绿新鲜的生菜和香浓烧鸡酱搭配，口感丰富！',
      price: 22,
      img: '/img/meals/5.png'
  }, {
      id: '6',
      title: '麦香鸡',
      desc: '清脆爽口的生菜，金黄酥脆的鸡肉。营养配搭，好滋味的健康选择！',
      price: 14,
      img: '/img/meals/6.png'
  }, {
      id: '7',
      title: '吉士汉堡包',
      desc: '百分百纯牛肉与香软芝士融为一体配合美味番茄醬丰富口感一咬即刻涌现！',
      price: 12,
      img: '/img/meals/7.png'
  }
]; */
// 使用useReducer, 初始化
const cartReduer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      let newData = [...state]
      // 假如购物车不存在商品, 添加商品并设置数量为1
      const isexistence = newData.findIndex(item => item.id === action.obj.id)
      if (isexistence===-1) {
        const obj = _.cloneDeep(action.obj)
        obj.amount = 1
        newData.push(obj)
      } else {
        newData.forEach(item => {
          if (item.id === action.obj.id) {
            item.amount++
          }
        })
      };
      return newData
    case 'SUB':
      let newCartData = []
      state.forEach(item => {
        if (item.id === action.obj.id) {
          item.amount--
        }
        if (item.amount !== 0) {
          newCartData.push(item)
        }
      })
      return newCartData
    case 'CLEAR':
      state.forEach(item=>delete item.amount)
      return []
    default:
      return state
  }
}

function App() {
  // 存储商品数据
  const [data, setData] = useState([])
  const initData = useSelector(state=>state.student)
  // 从store中获取初始化数据 , 给 data 存储
  useEffect(() => {
    const arr = _.cloneDeep(initData.mealsData)
    setData(arr)
  },[initData.mealsData,initData])

  // 存储购物车数据
  const [cartData, cartDispatch] = useReducer(cartReduer, [])

  const [total, setTotal] = useState(0)
  const [count, setCount] = useState(0)
  
  // 自定义hooks 测试strapi  http://localhost:1337/api/students
  const { fn} = useFetch({url:'students', method:'get'})
  useEffect(() => {
    fn()
  },[fn])

  useEffect(() => {
    // 总价
    const sum = cartData.reduce((pre,item) => {
      return pre = pre + item.amount * item.price
    }, 0)
    setTotal(sum)
    // 总数
    let length = 0
    cartData.forEach(item => {
      if (item.amount!==0) {
        length++
      }
    })
    setCount(length)
  },[cartData])

  // 搜索
  const filterData = (keyword) => {
    if (keyword === '') {
      setData(initData.mealsData)
    } else {
      const newData = initData.mealsData.filter(item => item.title.indexOf(keyword) !== -1)
      setData(newData)
    };
  }

  return (
    <cartContext.Provider value={{cartData,total,count,cartDispatch}}>
      <div>
        <Search filterData={filterData}></Search>
        <Meals mealsData={data}></Meals>
        <Cart></Cart>
      </div>
    </cartContext.Provider>
    
  )
}

export default App;
