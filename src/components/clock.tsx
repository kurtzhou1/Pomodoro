import React,{useState,useEffect,useRef} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {IState} from '../libs/common'
import {REMOVE_TODOLIST} from '../constant'
import TodoList from './ToDoList'
import styles from './styles/css.module.scss'

const Clock:React.FC<{isDone?:boolean}>= () =>{

    const dispatch = useDispatch()

    const [percentage, setPercentage] = useState<number>(100); // 圓的圓周
    
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
    const isWorkTimeUp = useRef<boolean>(false) // Work Time結束，將工作未完成改成已完成

    // 暫停時間
    const storeRemainTime = useRef(workTime) // 傳出remainTime
    const timeIDRef =  useRef(0)// timeoutId 提供clear使用
    const [isTimeStart,setIsTimeStart] = useState(false)

    const timeHandle = (time:number) => {
        
        const nowTime = Date.now()
        return window.setInterval(()=>{
            let remainTime = 0
            const pastTime = (Date.now() - nowTime) / 1000
            remainTime = time*60 - pastTime < 0 ? 0 : time*60 - pastTime
            const timeFormat = new Date(Math.round(remainTime)*1000).toISOString().substr(11,8)
            isWorkTime.current ? setRemainWorkSecond(timeFormat) : setremainBreakSecond(timeFormat)
                storeRemainTime.current = remainTime
            //處理圓圈動畫
            let percentageCurrent = Math.round(remainTime / 15)
            console.log('percentageCurrent=>>',percentageCurrent)
            setPercentage(percentageCurrent => {
                if (percentageCurrent <= 0) {
                  return 100;
                } else {
                  return percentageCurrent - 1 / 10;
                }
              });
        },1000)
      
    }
    const TimeStart = () => {
        timeIDRef.current = timeHandle(workTime)
        setIsTimeStart(true)
    }

    const pauseTime = () => {
        clearInterval(timeIDRef.current)
    }

    const continueTime = () => {
        timeIDRef.current = timeHandle(storeRemainTime.current / 60)
    }

    const deleteItem = () => {
        dispatch({
            type:REMOVE_TODOLIST,
            playload: {}
        })
    }

// 關於圓 start

    // 寬度 / 2  - 線的寬度 / 2
    const radius = () => {
        return 120 / 2 - 10 / 2;
    };

    console.log(radius())

    // 圓的大小的一半，寬度 / 2，拼湊整個圓
    const circleOffset = () => {
        return '50%';
    };

    // 圓周率公式
    const circumference = () => {
        return radius() * 2 * Math.PI;
    };

    // 圓周見圓周乘上百分比除上 100，修改上面 90 參數 100 為滿圓
    const progress = () => {
    return circumference() - (circumference() * percentage) / 100;
    };
    
// 關於圓 end

    useEffect(()=>{
        console.log()
        if(storeRemainTime.current <= 0 && isWorkTime.current){
            pauseTime() // 暫停
            timeIDRef.current = timeHandle(breakTime) // 重啟休息時間
            isWorkTime.current = false // 顯示為休息時間
            isWorkTimeUp.current = true
        }else if (storeRemainTime.current <= 0 && !isWorkTime.current){
            setIsTimeStart(false)
            pauseTime() // 暫停
            // isWorkTime.current = true
        }
    },[storeRemainTime.current])


    return(
        <div  className={styles.timerContainer}>
             <svg className={styles.svg} width="60%" viewBox="0 0 200 200">
                <circle
                className={styles.timer}
                fill="transparent"
                strokeWidth="5"
                stroke="#afdde6"
                r="55"
                cx={circleOffset()}
                cy={circleOffset()}
                />
                <circle
                className={styles.timer}
                fill="transparent"
                strokeWidth="5"
                stroke="#ec6d65"
                r="55"
                cx={circleOffset()}
                cy={circleOffset()}
                strokeDasharray={circumference()}
                strokeDashoffset={progress()}
                strokeLinecap="round"
                />
            </svg>
            <div>
                {isWorkTimeUp.current ? '✔ 已完成':'✘ 未完成'}
            </div>
            <div>
                工作時間{remainWorkSecond}
            </div>
            <div>
            </div>
            <div>
                休息時間{remainBreakSecond}
            </div>
            {isTimeStart ?
                <div onClick={()=> pauseTime()}>
                    暫停
                </div> :
                <div onClick={()=> TimeStart()}>
                    開始
                </div>
            }
            <div onClick={()=> continueTime()}>
                繼續
            </div>
            <div onClick={()=> deleteItem()}>
                刪除
            </div>
        </div>
    )
}

export default Clock


// https://dotblogs.com.tw/wasichris/2019/12/11/111627