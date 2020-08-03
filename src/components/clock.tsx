import React,{useState,useEffect,useRef} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {IState} from '../libs/common'
import {TIME_START} from '../constant/index'

const Clock:React.FC= ()=>{

    const dispatch = useDispatch();

    // 工作時間
    const workTime = useSelector((state:IState) => state.time.workTime)
    const countWorkTime = new Date(workTime*60*1000).toISOString().substr(11,8)
    const [remainWorkSecond, setRemainWorkSecond] = useState<string>(countWorkTime)

    // 休息時間
    const breakTime = useSelector((state:IState) => state.time.breakTime)
    const countBreakTime = new Date(breakTime*60*1000).toISOString().substr(11,8)
    const [remainBreakSecond, setremainBreakSecond] = useState<string>(countBreakTime)

    // 暫停時間
    const [pauseTime,setpauseTime] = useState(true)
    const storeRemainTime = useRef(workTime) // 傳出remainTime
    const timeIDRef =  useRef(0)// timeoutId 提供clear使用

    const timeHandle = (time:number) => {
        
        const nowTime = Date.now()
      
        return window.setInterval(()=>{
            let remainTime = 0
            const pastTime = (Date.now() - nowTime) / 1000
            remainTime = time*60 - pastTime < 0 ? 0 : time*60 - pastTime
            console.log('remainTime=>>',remainTime)
            const timeFormat = new Date(Math.round(remainTime)*1000).toISOString().substr(11,8)
            time === breakTime ? setremainBreakSecond(timeFormat) : setRemainWorkSecond(timeFormat)
                storeRemainTime.current = remainTime
            //檢查是否結束
        },1000)
      
    }
    const TimeStart = () => {
        timeIDRef.current = timeHandle(workTime)
    }

    const stopTime = ()=> {
        clearInterval(timeIDRef.current)
    }

    

    useEffect(()=>{
        if(storeRemainTime.current <= 0){
            stopTime()
            timeIDRef.current = timeHandle(breakTime)
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
            <div onClick={()=> stopTime()}>
                暫停
            </div>
            <div>
                繼續
            </div>
        </>
    )
}

export default Clock


// https://dotblogs.com.tw/wasichris/2019/12/11/111627