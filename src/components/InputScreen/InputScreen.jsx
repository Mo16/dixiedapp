import React, {useState} from 'react'

const InputScreen = ({handleAddress}) => {
  const [value, setValue] = useState("")
  const handleAddressValue = (addr) => {
    handleAddress(addr);
};
  return (
    <div>
        <input type="text" name="" id="" className='w-full p-2 mt-4 rounded-sm ' onChange={(e) => setValue(e.target.value)} />
        <button onClick={() => handleAddressValue(value)} className='mt-4 bg-slate-400 w-full p-2 rounded-sm text-white font-bold hover:bg-blue-800 transition-all ease-in-out '>Next</button>
    </div>
  )
}

export default InputScreen