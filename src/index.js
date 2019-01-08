import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// fake data generator
// const getItems = count =>
//     Array.from({ length: count }, (v, k) => k).map(k => ({
//         id: `item-${k}`,
//         content: `item ${k}`,
//     }));

// a little function to help us with reordering the result
// const reorder = (list, startIndex, endIndex) => {
//     const result = Array.from(list);
//     const [removed] = result.splice(startIndex, 1);
//     result.splice(endIndex, 0, removed);

//     return result;
// };

// const grid = 8;

// const getItemStyle = (isDragging, draggableStyle) => ({
//     // some basic styles to make the items look a bit nicer
//     userSelect: 'none',
//     padding: grid * 2,
//     margin: `0 0 ${grid}px 0`,

//     // change background colour if dragging
//     background: isDragging ? 'lightgreen' : 'grey',

//     // styles we need to apply on draggables
//     ...draggableStyle,
// });

// const getListStyle = isDraggingOver => ({
//     background: isDraggingOver ? 'lightblue' : 'lightgrey',
//     padding: grid,
//     width: 250,
// });

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 ${grid}px 0 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'white',

    // styles we need to apply on draggables
    ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    display: 'flex',
    padding: grid,
    overflow: 'auto',
});

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { type: "sentence", data: [{ index: `item-0`, content: "Sentence 1" }, { index: `item-1`, content: "Sentence 2" }]};
        this.onDragEnd = this.onDragEnd.bind(this);

        this.logState = this.logState.bind(this);
        // this.setStateHandler = this.setStateHandler.bind(this);
    }

    componentWillMount(){
        fetch("http://localhost:3000/getquestion", {
            method: 'get',
            // mode: "no-cors",
        })
        .then(response => {
            return response.json();
        })
        .then(json => {
            this.setState(json);
            // console.log(this.state.type);
            // console.log("Current State: " + this.state.data[0].content);
        });
    }

    logState(){
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

        console.log("New State => ");
        console.log({
            type: this.state.type,
            data: items,
        });

        this.setState({
            type: this.state.type,
            data: items,
        });

        setTimeout(this.logState, 5000);
    }

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable" direction="horizontal">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                            {...provided.droppableProps}
                        >
                       
                            {
                                this.state.data.map((element, index)  => (
                                    <Draggable key={index} draggableId={element.index} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
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

//     render() {
//         return (
//             <DragDropContext onDragEnd={this.onDragEnd}>
//                 <Droppable droppableId="droppable">
//                     {(provided, snapshot) => (
//                         <div
//                             ref={provided.innerRef}
//                             style={getListStyle(snapshot.isDraggingOver)}
//                         >
//                             {this.state.data.map((item, index) => (
//                                 <Draggable key={item.index} draggableId={item.index} index={index}>
//                                     {(provided, snapshot) => (
//                                         <div
//                                             ref={provided.innerRef}
//                                             {...provided.draggableProps}
//                                             {...provided.dragHandleProps}
//                                             style={getItemStyle(
//                                                 snapshot.isDragging,
//                                                 provided.draggableProps.style
//                                             )}
//                                         >
//                                             {item.content}
//                                         </div>
//                                     )}
//                                 </Draggable>
//                             ))}
//                             {provided.placeholder}
//                         </div>
//                     )}
//                 </Droppable>

                
//                 {/* <Droppable droppableId="droppable2">
//                     {(provided, snapshot) => (
//                         <div
//                             ref={provided.innerRef}
//                             style={getListStyle(snapshot.isDraggingOver)}>
                           
//                             This is for placeholder
//                         </div>
//                     )}
//                 </Droppable> */}
                
//             </DragDropContext>
//         );
//     }
// }

// Put the thing into the DOM!
ReactDOM.render(<App />, document.getElementById('root'));
