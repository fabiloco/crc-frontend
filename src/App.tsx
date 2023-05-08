import { ChangeEvent, useState } from 'react'

import './App.css'
import axios from 'axios';

interface Output {
  resultado: string[];
}

function App() {
  const [data, setData] = useState("x^10 + x^9 + x^6 + x^5 + x^2 + 1");
  const [generator, setGenerator] = useState("x^4 + 1");
  const [corrupt, setCorrupt] = useState(false);

  const [output, setOutput] = useState<Output>({resultado: []});

  const onChangeData = (e:ChangeEvent<HTMLInputElement>) => {
    setData(e.target.value);
  };

  const onChangeGenerator = (e:ChangeEvent<HTMLInputElement>) => {
    setGenerator(e.target.value);
  };

  const onSend = async () => {
    if (data && generator) {
      setOutput({resultado: []});

      const body = {

        poly: generator,
        trama: data,
        corructed: corrupt
      }
      console.log(body)
      const res = await axios.post('http://192.168.1.152:3000/crc', body);


      setOutput(JSON.parse(res.data));
    }
  };


  return (
    <>
      <h1>CRC implementation</h1>
      <div className="card">
        <p>
          Input the data value in it's binary or polinomial form
        </p>
        <input value={data} onChange={onChangeData} placeholder='x^9 + x^6 + x^5 + x^2 + 1' />

        <p>
          Input the generator value in it's binary or polinomial form
        </p>

        <input value={generator} onChange={onChangeGenerator} placeholder='x^4 + 1' />


        <div style={{
          display: 'flex'
        }}>
          <input type='checkbox' checked={corrupt} onChange={() => setCorrupt(prevState => !prevState)} placeholder='x^4 + 1' />
          <p>
            Corrupt data?
          </p>
        </div>

        <button onClick={onSend}>
          Send
        </button>
      </div>
      <p className="read-the-docs">
        Output:
      </p>
      {
        output?.resultado.map((value, index) => {
          return (
            <div className='chat-box' key={index} >
              <p >{value}</p>
            </div>
          )
        })
      }
    </>
  )
}

export default App
