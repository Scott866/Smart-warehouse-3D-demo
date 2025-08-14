import React, { useEffect } from 'react'
import useStore from '../store'

export default function Systems(){
  const { addEvent } = useStore()
  useEffect(()=>{
    addEvent('System boot')
    const id = setInterval(()=>{
      // decay throughput slowly
      useStore.getState().incThroughput(0)
    }, 1000)
    return ()=>clearInterval(id)
  },[])
  return null
}