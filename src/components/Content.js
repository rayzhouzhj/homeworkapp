import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { isMobile } from 'react-device-detect';
import config from '../config.json'

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const grid = 8;

const getItemStyle = (isMobile, isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    // margin: `0 ${grid}px 0 0`,
    margin: isMobile ? `0 0 ${grid}px 0` : `0 ${grid}px 0 0`,
    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'white',

    // styles we need to apply on draggables
    ...draggableStyle,
});

const getListStyle = (isMobile, isDraggingOver) => {
        let style;
        if(isMobile){
            style = {
                background: isDraggingOver ? 'lightblue' : 'lightgrey',
                padding: grid,
                width: 250,
            }
        } else {
            style = {
                background: isDraggingOver ? 'lightblue' : 'lightgrey',
                display: 'flex',
                padding: grid,
                overflow: 'auto',
            }
        }

        console.log(style);
        return style;
    };

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = { type: "sentence", data: [] };
        this.onDragEnd = this.onDragEnd.bind(this);

        this.logState = this.logState.bind(this);
        // this.setStateHandler = this.setStateHandler.bind(this);
    }

    componentWillMount() {

        fetch(`http://${config.host}/getquestion`, {
            method: 'get',
        })
            .then(response => {
                console.log(response.headers.u);

                return response.json();
            })
            .then(json => {
                // json.isMobile = false;
                json.direction = isMobile? 'vertical' : 'horizontal';

                console.log(json);
                this.setState(json);
            });
    }

    logState() {
        console.log(this.state);
    }

    onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(
            this.state.data,
            result.source.index,
            result.destination.index
        );

        let newState = this.state;
        newState.data = items;
        console.log(newState);
        this.setState(newState);
    }

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {
        return (

            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable" direction={this.state.direction}>
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(isMobile,snapshot.isDraggingOver)}
                            {...provided.droppableProps}
                        >

                            {
                                this.state.data.map((element, index) => (
                                    <Draggable key={index} draggableId={element.index} index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    isMobile,
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}
                                            >
                                                {element.content}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}

                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        );
    }
}

export default Content;
