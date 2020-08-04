import React,{useState,useEffect,useRef} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {IState} from '../libs/common'

const Clock:React.FC= ()=>{

    // 工作時間
    const workTime = useSelector((state:IState) => state.time.workTime)
    const workTimeFormat = new Date(workTime*60*1000).toISOString().substr(11,8)
    const [remainWorkSecond, setRemainWorkSecond] = useState<string>(workTimeFormat)

    // 休息時間
    const breakTime = useSelector((state:IState) => state.time.breakTime)
    const breakTimeFormat = new Date(breakTime*60*1000).toISOString().substr(11,8)
    const [remainBreakSecond, setremainBreakSecond] = useState<string>(breakTimeFormat)

    // 顯示工作or休息時間Time
    const isWorkTime  = useRef<boolean>(true)

    // 暫停時間
    const storeRemainTime = useRef(workTime) // 傳出remainTime
    const timeIDRef =  useRef(0)// timeoutId 提供clear使用

    const timeHandle = (time:number) => {
        
        const nowTime = Date.now()
      
        return window.setInterval(()=>{
            let remainTime = 0
            const pastTime = (Date.now() - nowTime) / 1000
            remainTime = time*60 - pastTime < 0 ? 0 : time*60 - pastTime
            const timeFormat = new Date(Math.round(remainTime)*1000).toISOString().substr(11,8)
            isWorkTime.current ? setRemainWorkSecond(timeFormat) : setremainBreakSecond(timeFormat)
                storeRemainTime.current = remainTime
            //檢查是否結束
        },1000)
      
    }
    const TimeStart = () => {
        timeIDRef.current = timeHandle(workTime)
    }

    const pauseTime = () => {
        clearInterval(timeIDRef.current)
    }

    const continueTime = () => {
        timeIDRef.current = timeHandle(storeRemainTime.current / 60)
    }

    

    useEffect(()=>{
        if(storeRemainTime.current <= 0 && isWorkTime.current){
            pauseTime()
            timeIDRef.current = timeHandle(breakTime)
            isWorkTime.current = false
        }else if (storeRemainTime.current <= 0 && !isWorkTime.current){
            pauseTime()
            isWorkTime.current = true
        }
    },[storeRemainTime.current])

    return(
        <>
            <div>
                工作時間{remainWorkSecond}
            </div>
            <div>
                休息時間{remainBreakSecond}
            </div>
            <div onClick={()=> TimeStart()}>
                開始
            </div>
            <div onClick={()=> pauseTime()}>
                暫停
            </div>
            <div onClick={()=> continueTime()}>
                繼續
            </div>
        </>
    )
}

export default Clock


// https://dotblogs.com.tw/wasichris/2019/12/11/111627