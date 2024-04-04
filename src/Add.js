import {useState} from "react";

export default function Add({handleCreate}) {
    const [val, setVal] = useState('')
    return (
        <>
            <input value={val} onChange={e => setVal(e.target.value)}/>
            <button onClick={() => {
                setVal('')
                handleCreate(val)
            }}>Add</button>
        </>
    )
}