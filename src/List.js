import {useState} from "react";

export default function List({data, handleDelete, handleUpdate, handleCreate}) {
    return (
        <>
            <ul>
                {
                    data.map(subData => (
                        <li key={subData.id}>
                            <SubList
                                subdata={subData}
                                handleDelete={handleDelete}
                                handleUpdate={handleUpdate}
                                handleCreate={handleCreate}
                            />
                        </li>
                    ))
                }
            </ul>
        </>
    )
}

function SubList({subdata, handleDelete, handleUpdate, handleCreate}) {
    const [isEditing, setIsEditing] = useState(false)
    const [inputVal, setInputVal] = useState(subdata.text)

    let content
    if (isEditing) {
        content = (
            <>
                <input
                    onChange={e => setInputVal(e.target.value)}
                    value={inputVal}/>
                <button
                    onClick={() => {
                        setIsEditing(false)
                        handleUpdate({

                                id: subdata.id,
                                text: inputVal

                        })
                    }
                    }>Save
                </button>
                <button onClick={() => handleDelete(
                    subdata.id
                )}>Delete
                </button>
            </>
        )
    } else {
        content = (
            <>
                <span key={subdata.id}>{subdata.text}</span>
                <button onClick={() => {
                    setIsEditing(true)
                }}>Edit
                </button>
                <button onClick={() => handleDelete(
                    subdata.id
                )}>Delete
                </button>
            </>
        )
    }

    return (
        <>
            {content}
        </>
    )
}