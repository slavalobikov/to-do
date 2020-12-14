import React, {useState} from 'react';

import s from "./InputToDo.module.css";
import {compose} from "redux";
import {connect} from "react-redux";
import {AddZ} from "../../Redux/Reducers/ToDoReducer";


const InputToDo = (props) => {
    const [value, setValue] = useState('');

    let IdNewMessage;

    if (!props.z[0]) {
        IdNewMessage = 1;
    } else {
        IdNewMessage = props.z[props.z.length - 1].id + 1;
    }

    const addToDo = () => {

        if (!value) {
            return
        }

        props.AddZ(value, IdNewMessage, IdNewMessage );
        setValue('')
    }

    return (
        <div>

               <div  className={s.addField}>
                    <input type="text"
                           value={value}
                           onChange={(e) => {setValue(e.currentTarget.value)}}
                           placeholder={'Введите свою задачу'}
                           onKeyDown={(e) => { if (e.keyCode === 13) {
                                   addToDo()
                               }}
                           }

                    />
                    <button onClick={() => {addToDo()}}  className={s.addBtn}>+</button>
                </div>


        </div>
    );
};
let mapStateToProps = (state) => {
    return {
        z: state.ToDoReducer.z,

    }
};

export default compose(
    connect(mapStateToProps, {
        AddZ,
    }),
) (InputToDo);

