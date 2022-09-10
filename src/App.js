import './App.css';
import { useState, useEffect } from 'react'

function App() {
  const [genValue, setgenValue] = useState('');
  const [rangeValue, setrangeValue] = useState(0);
  const [lowerCaseVal, setLowerCaseVal] = useState('');
  const [includeNum, setincludeNum] = useState('');
  let [count, setCount] = useState(0);
  let val = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

  function changeRange(e) {
    setrangeValue(e)
  }

  function lowerCase(e) {
    setLowerCaseVal('');
    if (e) setLowerCaseVal('lowerCaseVal')
    if (count < 2) setCount(prevCount => prevCount + 1);
  }

  function includeNumbers(e) {
    setincludeNum('');
    if (e) setincludeNum('includeNum')
    if (count < 2) setCount(prevCount => prevCount + 1);
  }

  useEffect(() => {
    if (!includeNum && !lowerCaseVal) {
      setCount(0);
    } else if (!includeNum || !lowerCaseVal) {
      setCount(1)
    }
  }, [count, includeNum, lowerCaseVal])

  function generatePwd() {
    setgenValue('');
    if (!rangeValue || (!includeNum && !lowerCaseVal)) {
      alert('Select at least one Checkbox Value or Range')
    }
    let randomValue = '', value = '';
    if (includeNum && lowerCaseVal && Number(rangeValue) >= 0) {
      for (let index = 0; index < rangeValue; index++) {
        value += val[Math.floor(Math.random(val[index]) * val.length)];
      }
      setgenValue(value);
    } else if (includeNum && Number(rangeValue) >= 0) {
      randomValue = val.filter(Number).map(v => v);
      for (let index = 0; index < rangeValue; index++) {
        value += Math.floor(Math.random(randomValue[index]) * 10);
      }
      setgenValue(value);
    } else if (lowerCaseVal && Number(rangeValue) >= 0) {
      randomValue = val.filter(v => typeof v === 'string').map(v => v);
      for (let index = 0; index < rangeValue; index++) {
        value += randomValue[Math.floor(Math.random(randomValue[index]) * 10)];
      }
      setgenValue(value);
    }
  }

  return (
    <div className="App container d-flex">
      <div className="text-center p-3 pwdGenForm">
        <h3>Password Generator</h3>

        <div className="form-group genValueFormStyle">
          <input type="text" value={genValue} readOnly className='mt-5 form-control' />
          {genValue && <i class="fa fa-copy" onClick={() => navigator.clipboard.writeText(genValue)}></i>}
        </div>

        <div className="text-center formFields p-3">
          
          <div class="form-group">
            <p className='mt-3'>Character Length: <span>{rangeValue}</span></p>
            <input type="range" className='form-control-range rangeSlider' name="range" id="range" min="1" max="10" value={rangeValue} onChange={e => changeRange(e.target.value)} />
          </div>

          <div className='form-check mt-3 p-0'>
            <label htmlFor='lowercase' className='form-check-label'>
              <input type="checkbox" name="lowercase" id="" onChange={e => lowerCase(e.target.checked)} />
              &nbsp; Include Lowercase</label>
          </div>

          <div className='form-check mt-3 p-0'>
            <label htmlFor='lowercase' className='form-check-label'>
              <input type="checkbox" name="numbers" id="" onChange={e => includeNumbers(e.target.checked)} />
              &nbsp; Include Numbers</label>
          </div>

          <div className='m-3 row'>
            <div className="col-md-4">
              <h5>Strength:</h5>
            </div>
            <div className="col-md-8">
              <span>
                {count === 1 && <li style={{ display: 'inline', marginRight: '10px', listStyle: 'none' }}>Medium &nbsp;<span className='yellowColor'></span></li>}

                {count === 2 &&
                  <ul className='p-0 m-0'>
                    <li style={{ display: 'inline', marginRight: '10px', listStyle: 'none' }}>High &nbsp;<span className='yellowColor'></span></li>
                    <li style={{ display: 'inline', marginRight: '10px', listStyle: 'none' }}><span className='yellowColor'></span></li>
                  </ul>
                }
              </span>
            </div>
          </div>

          <button onClick={generatePwd} className='btn btn-info genBtn'>Generate</button>
        </div>
      </div>

    </div>
  );
}

export default App;
