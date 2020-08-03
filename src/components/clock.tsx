import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {IState} from '../libs/common'
import {TIME_START} from '../constant/index'

const Clock:React.FC= ()=>{

    const dispatch = useDispatch();
    const workTime = useSelector((state:IState) => state.time.workTime)
    const breakTime = useSelector((state:IState) => state.time.breakTime)
    const [remainWorkSecond, setRemainWorkSecond] = useState(workTime * 60)
    const [remainBreakSecond, setremainBreakSecond] = useState(breakTime * 60)


    const countWorkTime = new Date(workTime*60*1000).toISOString().substr(11,8)
    const countBreakTime = new Date(breakTime*60*1000).toISOString().substr(11,8)
    const nowTime = Date.now()

    const TimeStart = (time:number,isStart:boolean) => {
        const letStart = setInterval(()=>{
            const pastTime = (Date.now() - nowTime) / 1000
            const remainTime = time*60 - pastTime
            if(time === breakTime){
                setremainBreakSecond(remainBreakSecond < 0 ? 0: remainTime)
            }else{
                setRemainWorkSecond(remainTime < 0 ? 0: remainTime)
            }
            if (remainTime <= 0) {
               clearInterval(letStart)
              }
            //檢查是否結束
        },1000)
    }

    
    console.log('remainWorkSecond=>>',Math.round(remainWorkSecond))

    if(Math.round(remainWorkSecond) === 0){
        TimeStart(breakTime,true)
        console.log('breakTimeStart')
    }

    return(
        <>
            <div>
                工作時間{new Date(Math.round(remainWorkSecond)*1000).toISOString().substr(11,8)}
            </div>
            <div>
                休息時間{new Date(Math.round(remainBreakSecond)*1000).toISOString().substr(11,8)}
            </div>
            <div onClick={()=> TimeStart(workTime,true)}>
                開始
            </div>
            <div onClick={()=> TimeStart(workTime,false)}>
                結束
            </div>
        </>
    )
}

export default Clock


// https://dotblogs.com.tw/wasichris/2019/12/11/111627