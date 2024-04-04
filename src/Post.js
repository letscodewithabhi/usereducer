import {useReducer} from "react";
import List from "./List";
import Add from "./Add";

export default function Post({username}) {
    const [state, dispatch] = useReducer(dispatchFunc, 'Abhi', initialData)

    function handleCreate(text) {
        dispatch({
            type: 'create',
            drafts: {
                id: (state.posts.length) + 1,
                text: text
            }
        })
    }

    function handleUpdate(drafts) {
        dispatch({
            type: 'update',
            drafts
        })
    }

    function handleDelete(id) {
        dispatch({
            type: 'delete',
            id
        })
    }

    return (
        <>
            <Add handleCreate={handleCreate}/>
            <List
                data={state.posts}
                handleUpdate={handleUpdate}
                handleCreate={handleCreate}
                handleDelete={handleDelete}
            />
        </>
    )
}

function dispatchFunc(state, action) {
    switch (action.type) {
        case 'draft': {
            return {
                posts: state.posts,
                drafts: action.drafts
            }
        }
        case 'create': {
            console.log(state.posts)
            console.log(action)
            return {
                posts: [
                    ...state.posts,
                    action.drafts
                ],
                drafts: ''
            }
        }
        case 'update': {
            console.log(state.posts)
            console.log(action)
            return {
                posts: state.posts.map(post => {
                    if (post.id === action.drafts.id) return action.drafts
                    else return post
                }),
                drafts: ''
            }
        }
        case 'delete': {

            return {
                posts: state.posts.filter(post => post.id !== action.id),
                drafts: ''
            }
        }
        default: {
            throw Error('Unknown type ' + action.type)
        }
    }
}

function initialData(username) {
    return {
        posts: [
            {id: 1, text: username + 's Text 1'},
            {id: 2, text: username + 's Text 2'},
            {id: 3, text: username + 's Text 3'}
        ],
        drafts: ''
    }
}