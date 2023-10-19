import { useState, useCallback, useEffect, useRef } from 'react'



function App() {
  
  const [length , setLength] = useState(8)
  const [numbersAllowed , setNumbersAllowed] = useState(false)
  const [charAllowed , setCharAllowed] = useState(false)
  const [password , setPassword] = useState('')


  const generatePassword = useCallback(()=>{
    let pass=""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numbersAllowed){
      str+="1234567890"
    }
    if(charAllowed){
      str+="!@#$%^&*()_+"
    }
    for(let i=1;i<length;i++){
      const char = Math.floor(Math.random() * str.length + 1)
      pass+=str.charAt(char)
    }
    setPassword(pass)
  },[numbersAllowed,length,charAllowed])

  useEffect(()=>{
    generatePassword() 
  },[length,numbersAllowed,charAllowed])

  const copyToClipboard = () =>{
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
  }

  const passwordRef = useRef(null)
  

  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
        <h1 className='text-white text-center my-2'>Password Generator</h1>
          <div className='flex shadow rounded-lg overflow-hidden mb-4'>
              <input
              type="text"
              className='outline-none w-full px-2 py-1 rounded-md'
              value={password}
              placeholder='password'
              readOnly
              ref={passwordRef}

              />
              <button 
              className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
              onClick={copyToClipboard}
              >Copy</button>
          </div>
          <div className='flex text-sm gap-x-2'>
              <div className='flex items-center gap-x-1'>
                <input 
                type="range"
                className='cursor-pointer'
                min={6}
                max={25}
                value={length}
                onChange={(e)=>setLength(e.target.value)}
                name="" 
                id="" 
                />
                <label htmlFor="length">Length : {length}</label>
              </div>
              <div>
                <input 
                type="checkbox"
                defaultChecked={numbersAllowed}
                onChange={()=>{
                  setNumbersAllowed((prev) => !prev)
                }} 
                name="" 
                id="" 
                />
                <label htmlFor="numbers">Numbers</label>
              </div>
              <div>
                <input 
                type="checkbox"
                defaultChecked={charAllowed}
                onChange={()=>{
                  setCharAllowed((prev)=>!prev)
                }} 
                name="" 
                id=""
                 />
                 <label htmlFor="characters">Characters</label>
              </div>
          </div>
    </div>
  )
}

export default App
