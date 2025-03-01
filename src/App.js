import './App.css';
import Wrapper from './components/Wrapper';
import Screen from './components/Screen';
import ButtonBox from './components/ButtonBox';
import Button from './components/Button';
import { useState } from 'react';
const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");
const removeSpaces = (num) => num.toString().replace(/\s/g, "");
const btnValue = [
  ['C', '+-', '%', '/'],
  [7, 8, 9, 'X'],
  [4, 5, 6, "-"],
  [1, 2, 3, '+'],
  [0, '.', '=']
]
function App() {
  const [calc, setCalc] = useState({
    sign: '',
    num: 0,
    res: 0,
  })
  //functional part
  const resetHandler = () => {
    setCalc({
      ...calc,
      sign: '',
      num: 0,
      res: 0,
    })
  }
  const commaHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    setCalc({
      ...calc,
      num: !calc.num.toString().includes('.') ? calc.num + value : calc.num,
    })
  }
  const numHandler = (e) => {
    // e.preventDefault();
    // const value =e.target.innerHTML;
    // if(removeSpaces(calc.num.length<16)){
    //   setCalc({
    //     ...calc,
    //     num:
    //     calc.num===0 && value==='0'
    //     ?
    //     '0'
    //     : removeSpaces(calc.num % 1) ===0 ?
    //     toLocaleString(Number(removeSpaces(calc.num + value)))
    //     :toLocaleString(calc.num +value)  ,
    //     res: !calc.sign?0:calc.res,
    //   })
    e.preventDefault();
    const value = e.target.innerHTML;

    if (removeSpaces(calc.num.length < 16)) {
      setCalc((prevCalc) => {
        let newNum;

        if (prevCalc.num === '0' && value === '0') {
          newNum = '0';
        }
        else {
          newNum = parseFloat((prevCalc.num + value).replace(/^0+/, '') || '0').toString();
        }

        return {
          ...prevCalc,
          num: newNum,
          res: !prevCalc.sign ? 0 : prevCalc.res,
        };
      });
    }
  }
  const signHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    setCalc({
      ...calc,
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0
    })
  }
  const equalHandler = () => {
    if (calc.sign && calc.num) {
      const math = (a, b, sign) =>
        sign === '+' ? a + b :
          sign === '-' ? a - b :
            sign === 'X' ? a * b :
              a / b
      setCalc({
        ...calc,
        res:
          calc.num === "0" && calc.sign === "/" ? "Error" :
          toLocaleString(
            math(
              Number(removeSpaces(calc.res)), 
              Number(removeSpaces(calc.num)),
               calc.sign    )
          ),
        sign: '',
        num: 0,
      })
    }
  }
  const invertHandler = () => {
    setCalc({
      ...calc,
      num: calc.num ? toLocaleString(removeSpaces(calc.num)) * -1 : 0,
      res: calc.res ? toLocaleString(removeSpaces(calc.res))  * -1 : 0,
      sign: '',
    })
  }
  const percentHandler = () => {
    let newNum = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let newRes = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;
    setCalc({
      ...calc,
      num: (newNum /= Math.pow(100, 1)),
      res: (newRes /= Math.pow(100, 1)),
      sign: '',
    })

  }

  //functional part
  return (
    <>
    <div className='text-3xl font-bold underline'>Hello Calcualtor</div>
      <Wrapper>
        <Screen value={calc.num ? calc.num : calc.res} />
        <ButtonBox>
          {
            btnValue.flat().map((btn, i) => (
              <Button key={i}
                className={btn === '=' ? 'equals' : 'btn'}
                value={btn}
                onClick={
                  btn === 'C' ? resetHandler
                    : btn === '+-' ? invertHandler
                      : btn === '%' ? percentHandler
                        : btn === '=' ? equalHandler
                          : btn === '/' || btn === 'X' || btn === '-' || btn === '+' ? signHandler
                            : btn === '.' ? commaHandler :
                              numHandler
                }>
              </Button>
            ))
          }
        </ButtonBox>
      </Wrapper>
    </>
  );
}
export default App;
