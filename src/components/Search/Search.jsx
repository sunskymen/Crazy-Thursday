import React, { useEffect, useState } from 'react'
import style from './Search.module.css'
import {SearchOutlined} from '@ant-design/icons'


export default function Search(props) {
  
  const [keyword, setKeyword] = useState('')
  
  useEffect(() => {
    const timer = setTimeout(() => {
    props.filterData(keyword)
      
    }, 300);
    return () => {
      clearTimeout(timer)
    }
  }, [keyword, props])
  
  const saveKeyword = (e) => {
    setKeyword(e.target.value.trim())
  }
  
  return (
    <div className={style.main}>
      <div className={style.search}>
        <SearchOutlined className={style.icon} />
        <input type="text" placeholder='请输入关键字' value={keyword} onChange={saveKeyword} />
      </div>
    </div>
  )
}
