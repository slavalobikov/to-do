/*
/!*

import React from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {DeleteOutlined, FormOutlined} from '@ant-design/icons';



import s from './ToDo.module.css'
import {compose} from "redux";
import {connect} from "react-redux";


/!*
{id:0, isCheck: false, text:'Дороу', isDone: false, isEdit:false, order: 1},
*!/

const initialDataF = (props) => {

    console.log('dima', props)
    return {

        tasks: {
            'task-1': {id: 'task-1', text: 'Take out the grabage', isDone: false, isEdit: false,},
            'task-2': {id: 'task-2', text: 'DimaAMDa', isDone: true, isEdit: false,},
            'task-3': {id: 'task-3', text: 'Henesi', isDone: false, isEdit: true,},
            'task-4': {id: 'task-4', text: 'GRAD', isDone: false, isEdit: false,},
        },
        columns: {
            'column-1': {
                id: 'column-1',
                taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
            }
        },
        columnOrder:[ 'column-1']
    }
}

/!*
const initialData = {
    tasks: {
        'task-1': {id: 'task-1', text: 'Take out the grabage', isDone: false, isEdit: false,},
        'task-2': {id: 'task-2', text: 'DimaAMDa', isDone: true, isEdit: false,},
        'task-3': {id: 'task-3', text: 'Henesi', isDone: false, isEdit: true,},
        'task-4': {id: 'task-4', text: 'GRAD', isDone: false, isEdit: false,},
    },
    columns: {
        'column-1': {
            id: 'column-1',
            taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
        }
    },
    columnOrder:[ 'column-1']
}
*!/

const ContainerTwo = styled.div`
  margin-bottom: 8px;
  background-color: ${props => (props.isDragging ? 'lightGreen' : 'white')};
`;

class Task extends React.Component {
    render() {

        return (
            <Draggable draggableId={this.props.task.id} index={this.props.index}>
                {(provided, snapshot) => (
                    <ContainerTwo
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        isDragging={snapshot.isDragging}
                    >

                        <div className={s.item}>
                            {this.props.task.isDone
                                ? <button  className={s.radioTrue} ></button>
                                : <button  className={s.radioFalse}></button>}
                            <span className={cn({
                                [s.textFalse]: this.props.task.isDone === true
                            })}>

                                {this.props.task.isEdit
                                && <input type="text"
/!*                                    /!*onBlur={() => { editToDoMessage(td.id, isEditValue, td.isEdit, td.text)}}*!/
                                                        onChange={(e) => {setIsEdit(e.currentTarget.value)}}
                                                        value={td.text || isEditValue} autoFocus={true} *!/

                                                        />}
                                {!this.props.task.isEdit && this.props.task.text}

                            </span>
                            <span  className={s.delete}><DeleteOutlined /></span>
                            <span  className={s.delete}><FormOutlined /></span>
                        </div>
                    </ContainerTwo>
                )}
            </Draggable>
        );
    }
}

class Column extends React.Component {
    render() {
        return (
                <Droppable droppableId={this.props.column.id}>
                    {(provided, snapshot) =>
                        <TaskList
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            isDraggingOver={snapshot.isDraggingOver}
                        >
                            {this.props.tasks.map((task, index) => (
                                <Task key={task.id} task={task} index={index} />
                            ))}
                            {provided.placeholder}
                        </TaskList>
                    }
                </Droppable>
        );
    }
}

const Container = styled.div`

`;

const TaskList = styled.div`

  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
`;


class ToDo extends React.Component {
    state = initialDataF();

    onDragStart = () => {
        document.body.style.color = 'orange';
        document.body.style.transition = 'background-color 0.2s ease';
    }

    onDragUpdate = update => {
        const { destination } = update;
        const opacity = destination
            ? destination.index /Object.keys(this.state.tasks).length
            : 0;
        document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`
    }

    onDragEnd = result => {

        document.body.style.color = 'inherit';
        document.body.style.backgroundColor = 'inherit';

        const {destination, source, draggableId } = result;

        if(!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        const column = this.state.columns[source.droppableId];
        const newTaskIds = Array.from(column.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        const newColumn = {
            ...column,
            taskIds: newTaskIds,
        };

        const newState = {
            ...this.state,
            columns: {
                ...this.state.columns,
                [newColumn.id]: newColumn,
            },
        };

        this.setState(newState);
    };
    render() {
        return (
            <DragDropContext
                onDragEnd={this.onDragEnd}
            >
                {this.state.columnOrder.map((columnId) => {
                    const column = this.state.columns[columnId];
                    const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

                    return <Column key={column.id} column={column} tasks={tasks} />;
                })}
            </DragDropContext>
        )
    }
}

/!*export default ToDo;*!/
/!*let mapStateToProps = (state) => {
    return {
        z: state.ToDoReducer.z,

    }
};*!/

/!* compose(
    connect(mapStateToProps, {

    }),
)(initialDataF)*!/

export default ToDo;

*!/


import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {range, inRange} from 'lodash';
import styled from 'styled-components';
import {compose} from "redux";
import {connect} from "react-redux";
import s from './ToDo.module.css'
import cn from 'classnames'
import {DeleteOutlined, FormOutlined, SaveOutlined} from '@ant-design/icons';

const POSITION = {x: 0, y: 0};

const Draggable = ({children, id, onDrag, onDragEnd}) => {
    const [state, setState] = useState({
        isDragging: false,
        origin: POSITION,
        translation: POSITION
    });

    const handleMouseDown = useCallback(({clientX, clientY}) => {
        setState(state => ({
            ...state,
            isDragging: true,
            origin: {x: clientX, y: clientY}
        }));
    }, []);

    const handleMouseMove = useCallback(({clientX, clientY}) => {
        const translation = {x: clientX - state.origin.x, y: clientY - state.origin.y};

        setState(state => ({
            ...state,
            translation
        }));

        onDrag({translation, id});
    }, [state.origin, onDrag, id]);

    const handleMouseUp = useCallback(() => {
        setState(state => ({
            ...state,
            isDragging: false
        }));

        onDragEnd();
    }, [onDragEnd]);

    useEffect(() => {
        if (state.isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);

            setState(state => ({...state, translation: {x: 0, y: 0}}));
        }
    }, [state.isDragging, handleMouseMove, handleMouseUp]);

    const styles = useMemo(() => ({
        cursor: state.isDragging ? '-webkit-grabbing' : '-webkit-grab',
        transform: `translate(${state.translation.x}px, ${state.translation.y}px)`,
        transition: state.isDragging ? 'none' : 'transform 500ms',
        zIndex: state.isDragging ? 2 : 1,
        position: state.isDragging ? 'absolute' : 'relative'
    }), [state.isDragging, state.translation]);

    return (
        <div style={styles} onMouseDown={handleMouseDown}>
            {children}
        </div>
    );
};
const HEIGHT = 46;

const ToDo = (props) => {
    const items = props.z
    const [state, setState] = useState({
        order: items,
        dragOrder: items, // items order while dragging
        draggedIndex: null
    });

    const handleDrag = useCallback(({translation, id}) => {
        const delta = Math.round(translation.y / HEIGHT);
        const index = state.order.indexOf(id);
        const dragOrder = state.order.filter(index => index !== id);

        if (!inRange(index + delta, 0, items.length)) {
            return;
        }

        dragOrder.splice(index + delta, 0, id);

        setState(state => ({
            ...state,
            draggedIndex: id,
            dragOrder
        }));
    }, [state.order, items.length]);

    const handleDragEnd = useCallback(() => {
        setState(state => ({
            ...state,
            order: state.dragOrder,
            draggedIndex: null
        }));
    }, []);

    return (
        <div>
            {items.map(index => {
                const isDragging = state.draggedIndex === index;
                const top = state.dragOrder.indexOf(index) * (HEIGHT );
                const draggedTop = state.order.indexOf(index) * (HEIGHT);

                return (
                    <Draggable
                        key={index.id}
                        id={index}
                        onDrag={handleDrag}
                        onDragEnd={handleDragEnd}
                    >
                        <Rect
                            isDragging={isDragging}
                            top={isDragging ? draggedTop : top}
                        >
                            <div className={cn(s.item, {

                            })}>



                                {index.isDone
                                    ? <button  className={s.radioTrue} ></button>
                                    : <button  className={s.radioFalse}></button>}
                                <span className={cn({
                                    [s.textFalse]: index.isDone === true
                                })}>
                    {index.isEdit
                    && <input type="text"
                               />}
                  {!index.isEdit && index.text}
                </span>

                                <span  className={s.delete}>{/!*<CloseOutlined  />*!/}<DeleteOutlined /></span>
                                <span  className={s.delete}>{/!*<CloseOutlined  />*!/}<FormOutlined /></span>


                            </div>
                        </Rect>
                    </Draggable>
                );
            })}
        </div>
    );
};





const Rect = styled.div.attrs(props => ({
    style: {
        transition: props.isDragging ? 'none' : 'all 500ms'
    }
}))`
  width: 600px;
  position: absolute;
  top: ${( {top} ) => top }px;




`;


let mapStateToProps = (state) => {
    return {
        z: state.ToDoReducer.z,


    }
};

export default compose(
    connect(mapStateToProps, {

    }),
) (ToDo);
*/

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
            return
        }

        props.EditToDO(id, isEditValueF, isEditF);
        setIsEdit(td);



    };

    let ToDoElements = props.z.map(td => (
        <div
            key={td.id}>
            <div className={s.item}>
                {td.isDone
                    ? <button onClick={() => {props.TooggleIsDoneTrue(td.id, td.isDone)}} className={s.radioTrue} ></button>
                    : <button onClick={() => {props.TooggleIsDoneTrue(td.id, td.isDone)}} className={s.radioFalse}></button>}
                <span className={cn({
                    [s.textFalse]: td.isDone === true
                })}>
                    {td.isEdit
                    && <input type="text"
                              onBlur={() => { editToDoMessage(td.id, isEditValue, td.isEdit, td.text)}}
                              onChange={(e) => {setIsEdit(e.currentTarget.value)}}
                              value={td.text || isEditValue} autoFocus={true}
                               />}
                    {!td.isEdit && td.text}

                </span>
                <span onClick={() => { props.DeleteToDO(td.id)}} className={s.delete}><DeleteOutlined /></span>
                <span onClick={() => { editToDoMessage(td.id, isEditValue, td.isEdit, td.text)} }  className={s.delete}><FormOutlined /></span>
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