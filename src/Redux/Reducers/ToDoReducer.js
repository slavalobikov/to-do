const ADD_Z = 'ADD_Z';
const DELETE_TODO = 'DELETE_TODO';
const TOOGGLE_TODO_IS_DONE = 'TOOGGLE_TODO_IS_DONE';
const EDIT_TODO = 'EDIT_TODO';

let initialState = {
    z : [
/*        {
            id:0,
            isCheck: false,
            text:'Дороу',
            isDone: false,
            isEdit:false,

        },
        {
            id:1,
            isCheck: true,
            text: 'выучил',
            isDone: true,
            isEdit:false,
        }*/
    ],
    isMargin: true,
}

const ToDoReducer =(state = initialState, action) => {
    switch (action.type) {
        case ADD_Z:
            let Text = {
                id:action.id,
                isCheck: false,
                text:action.text,
                isDone: false,
                isEdit:false,
            };
            return {
                ...state,
                z: [...state.z, Text]
            }
        case DELETE_TODO:

            return {
                ...state,
                z: state.z.filter(item => item.id !== action.id)
            };
        case TOOGGLE_TODO_IS_DONE:
            return {
                ...state,
                z: state.z.map(u => {
                    if (u.id === action.id) {
                        return {...u, isDone:!action.isDone}
                    } else {
                        return  {...u}
                    }
                })
            };
        case EDIT_TODO:
            return  {
                ...state,
                z: state.z.map(u => {
                    if (u.id === action.id) {
                        return {...u, text:action.text, isEdit: !action.edit}
                    } else {
                        return  {...u}
                    }
                })
            };
        default:
            return state
    }
}

export const AddZ = (text, id) => ({type: ADD_Z, text, id })
export const DeleteToDO = (id, ) => ({type: DELETE_TODO, id});
export const TooggleIsDoneTrue = (id, isDone) => ({type: TOOGGLE_TODO_IS_DONE, id,isDone});
export const EditToDO = (id, text, edit) => ({type: EDIT_TODO, id, text, edit});





export default ToDoReducer;