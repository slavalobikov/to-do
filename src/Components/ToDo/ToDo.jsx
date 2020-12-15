import React, {useState} from 'react';
import s from './ToDo.module.css'
import {compose} from "redux";
import {connect} from "react-redux";
import cn from 'classnames'
import {DeleteOutlined, FormOutlined} from '@ant-design/icons';
import {DeleteToDO, EditToDO, TooggleIsDoneTrue} from "../../Redux/Reducers/ToDoReducer";






const ToDo = (props) => {
    const [isEditValue, setIsEdit] = useState('');

    const editToDoMessage = (id, isEditValueF, isEditF, td) => {
        if (!isEditValue && td === '' ) {
            props.DeleteToDO(id)
        }

        props.EditToDO(id, isEditValueF, isEditF);
        setIsEdit(td);



    };

    let ToDoElements = props.z.map(td => (
        <div
            key={td.id}>
            <div className={s.item}>
                <div className={s.leha}>
                    {td.isDone
                        ? <button onClick={() =>
                        {props.TooggleIsDoneTrue(td.id, td.isDone)}} className={s.radioTrue} ></button>
                        : <button onClick={() =>
                        {props.TooggleIsDoneTrue(td.id, td.isDone)}} className={s.radioFalse}></button>}
                    <span className={cn(s.Main, {
                        [s.textFalse]: td.isDone === true
                    })}>
                    {td.isEdit
                    && <input type="text"
                              onBlur={() => { editToDoMessage(td.id, isEditValue, td.isEdit, td.text)}}
                              onChange={(e) => {setIsEdit(e.currentTarget.value)}}
                              onKeyDown={(e) => {
                                  if (e.keyCode === 13 || e.keyCode === 27 ) {
                                      editToDoMessage(td.id, isEditValue, td.isEdit, td.text)
                              }}}
                              value={td.text || isEditValue} autoFocus={true}
                    />}
                        {!td.isEdit && <span>{td.text}</span>}

                </span>
                </div>

                <div className={s.btnHover}>
                    <span onClick={() => { props.DeleteToDO(td.id)}}
                          className={s.delete}><DeleteOutlined /></span>
                    {!td.isEdit &&
                    <span onClick={() => { editToDoMessage(td.id, isEditValue, td.isEdit, td.text)} }
                          className={s.delete}><FormOutlined /></span>}
                </div>

            </div>
        </div>
    ));

    return (
        <div className={s.dima}>
            {ToDoElements}
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
        DeleteToDO,
        TooggleIsDoneTrue,
        EditToDO
    }),
) (ToDo);