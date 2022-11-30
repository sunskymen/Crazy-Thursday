// 自定义hooks

import { useCallback,useState  } from 'react'

export default function useFetch(reqObj,cb) {
  const [isLoading, setIsLoading] = useState()
  
  const fn = useCallback(async (body) => {
    try {
      setIsLoading(true)
      const res = await fetch('http://localhost:1337/api/' + reqObj.url, {
        method: reqObj.method || 'get',
        headers: {
          "Content-type":"application/json"
        },
        body:body?null: JSON.stringify({data:body})
      })
      if (res.ok) {
      const data = await res.json()
        console.log(data)
        // 成功的回调函数
        cb && cb()
      } else {
        throw new Error('请求错误')
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  }, [cb,reqObj.url,reqObj.method])
  
  return {
    isLoading,
    fn
  }
}
