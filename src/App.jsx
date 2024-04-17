import { useCallback, useEffect, useState, useRef} from 'react'
import './App.css'

function App() {
  const [length,setLength] = useState(6)
  const [characterAllowed,setcharacterAllowed] = useState(false)
  const [numberAllowed,setnumberAllowed] = useState(false)
  const [Password,setPassword] = useState("")

  //ref Hook
  const passWordRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let password = ''
    var string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if(characterAllowed){
      string += '!@#$%^&*(){}'
    }
    if(numberAllowed){
      string += '1234567890'
    }
    for(let i = 1 ; i<=length ; i++){
      const index = Math.floor(Math.random()*string.length);
      password += string[index];
    }
    setPassword(password)

    
  },[length,characterAllowed,numberAllowed,setPassword])


  useEffect( () => {
    passwordGenerator()},[length,characterAllowed,numberAllowed,passwordGenerator]
  )
  
  const copyPassword = useCallback(()=>{
    window.navigator.clipboard.writeText(Password)


  },[Password])

  return (
    <>
    <h1 className='text-3xl text-white'>Password Generator</h1>
    <div className='bg-gray-900 w-full max-w-lg mx-auto mt-8 p-6 rounded-md'>
      <div className='flex shadow rounded-lg text-white overflow-hidden mb-4'>

      <input type="text" placeholder='Password' readOnly className='p-3 outline-none w-full text-black' value={Password} ref={passWordRef}/>
      <button className='p-3 text-white bg-blue-900 hover:bg-blue-800' onClick={copyPassword}>Copy</button>

      </div>
      <div className='flex text-sm items-center align-middle gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range" min={6} max={50} className='cursor-pointer' value={length} onChange={(e)=>{setLength(e.target.value)}}/>
          <label htmlFor="" className='text-white'>Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-2'>
          <input type="checkbox" checked = {numberAllowed} id='numberInput' onChange={()=>{setnumberAllowed(prev => !prev)}}/>
          <label htmlFor="numberInput" className='text-white m-1'>Numbers</label>
        </div>
        <div className='flext items-center gap-x-2'>
          <input type="checkbox" checked = {characterAllowed} id='numberInput' onChange={()=>{setcharacterAllowed(prev => !prev)}}/>
          <label htmlFor="numberInput" className='text-white m-1'>Characters</label>
        </div>
      </div>
    
    </div>
    </>
  )
}

export default App
