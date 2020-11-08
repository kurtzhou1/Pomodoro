import React,{useState,useEffect,useRef} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {IState} from '../libs/common'
import {HAS_DONE_ITEM,REMOVE_TODOLIST} from '../constant'
import styles from './styles/css.module.scss'
import { PauseOutlined, CaretRightOutlined,StepForwardOutlined } from '@ant-design/icons';

const Clock:React.FC<{isDone?:boolean}> = () => {
    const defaultWorkTime = 25;
    const defaulBreakTime = 5;

    const dispatch = useDispatch()

    const [percentage, setPercentage] = useState<number>(100); // 圓的圓周
    const nowDoingItem = useSelector((state:IState)=> state.todos[state.value] ? state.todos[state.value].toDoList : '')
    
    // 工作時間
    const workTime = defaultWorkTime * 60
    const workTimeFormat = new Date(workTime*1000).toISOString().substr(11,8)
    const [remainWorkSecond, setRemainWorkSecond] = useState<string>(workTimeFormat)

    // 休息時間
    const breakTime = defaulBreakTime * 60
    const breakTimeFormat = new Date(breakTime*1000).toISOString().substr(11,8)
    const [remainBreakSecond, setremainBreakSecond] = useState<string>(breakTimeFormat)

    // 顯示工作or休息時間Time
    const isWorkTime  = useRef<boolean>(true) //判斷現在是工作還是休息

    // 暫停時間
    const storeWorkRemainTime = useRef(workTime) // 傳出工作剩餘時間
    const storeBreakRemainTime = useRef(breakTime)
    const timeIDRef =  useRef(0)// timeoutId 提供clear使用
    const [isTimeStart,setIsTimeStart] = useState(false)
    const [isTimePause,setIsTimePause] = useState(false)

    const timeHandle = (time:number) => {
        const nowTime = Date.now()
        return window.setInterval(()=>{
            let remainTime = 0
            const pastTime = (Date.now() - nowTime) / 1000
            remainTime = time - pastTime < 0 ? 0 : time - pastTime
            const timeFormat = new Date(Math.round(remainTime)*1000).toISOString().substr(11,8)
            isWorkTime.current ? setRemainWorkSecond(timeFormat) : setremainBreakSecond(timeFormat)
            isWorkTime.current ? storeWorkRemainTime.current = remainTime : storeBreakRemainTime.current = remainTime
            //處理圓圈動畫
        },1000)  
    }

    const TimeStart = () => {
        storeWorkRemainTime.current = workTime;
        if(nowDoingItem !== ''){
            timeIDRef.current = timeHandle(workTime)
            setIsTimeStart(true)
        }else{
            alert('請點擊左下角輸入代辦事件')
        }
    }

    const pauseTime = () => {
        if(!isTimePause){
            clearInterval(timeIDRef.current)
            setIsTimePause(true)
        }
    }

    const continueTime = () => {
        if(isTimePause){
            timeIDRef.current = timeHandle(storeWorkRemainTime.current)
            setIsTimePause(false)
        }
    }

    const addhasDoneItem = (value:string) => {
        dispatch({
            type: HAS_DONE_ITEM,
            payload: {addItem:value}
        })
    }

    const removeEvent = () =>{
        dispatch({
          type: REMOVE_TODOLIST,
          payload: { removeId:0 },
        });
      }


// 關於圓 start

    // 寬度 / 2  - 線的寬度 / 2
    const radius = () => {
        return 120 / 2 - 10 / 2;
    };

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
        let percentageCurrent = Math.round(storeWorkRemainTime.current / 15)
        setPercentage(percentageCurrent)
        if(storeWorkRemainTime.current <= 0 && isWorkTime.current){
            isWorkTime.current = false // 改成休息時間
            clearInterval(timeIDRef.current) // 暫停
            timeIDRef.current = timeHandle(breakTime) // 重啟休息時間
            addhasDoneItem(nowDoingItem)
        }
    },[storeWorkRemainTime.current])

    useEffect(()=>{
        let percentageCurrent = Math.round(storeWorkRemainTime.current / 15)
        setPercentage(percentageCurrent)
       if (storeBreakRemainTime.current <= 0 && !isWorkTime.current){
            setIsTimeStart(false)
            clearInterval(timeIDRef.current)
            removeEvent() //刪除已完成項目
            isWorkTime.current = true // 改回工作時間
            setIsTimePause(false) // 暫停時間改回true
            setRemainWorkSecond(workTimeFormat)
        }
    },[storeBreakRemainTime.current])

    return(
        <div className={styles.timerWrap}>
            <div  className={styles.timerContainer}>
                <div className={styles.timeInfo}>
                    <div>
                        {!isWorkTime.current ? '✔ 已完成':'✘ 未完成'}
                    </div>
                    {isWorkTime.current ? 
                        <div>
                            <div>{isTimePause ? '暫停中' : nowDoingItem}</div>
                            <div>{remainWorkSecond}</div>
                        </div>  :
                        <div>
                            休息時間{remainBreakSecond}
                        </div>
                    }
                    {isWorkTime.current ? isTimeStart  ?
                        <div className={styles.iconWrap}>
                            <div onClick={()=> pauseTime()}>
                                <PauseOutlined />
                            </div>
                            <div onClick={()=> continueTime()}>
                                <StepForwardOutlined />
                            </div>
                        </div> :
                        <div onClick={()=> TimeStart()}>
                            <CaretRightOutlined />
                        </div> : ''
                    }
                </div>
                <svg className={styles.svg} width="60%" viewBox="0 0 200 200">
                    <circle
                    className={styles.timer}
                    fill="transparent"
                    strokeWidth="5"
                    stroke="#84fab0"
                    r="55"
                    cx={circleOffset()}
                    cy={circleOffset()}
                    />
                    <circle
                    className={styles.timer}
                    fill="transparent"
                    strokeWidth="5"
                    stroke="#8fd3f4"
                    r="55"
                    cx={circleOffset()}
                    cy={circleOffset()}
                    strokeDasharray={circumference()}
                    strokeDashoffset={progress()}
                    strokeLinecap="round"
                    />
                </svg>
            </div>
        </div>
    )
}

export default Clock


// https://dotblogs.com.tw/wasichris/2019/12/11/111627