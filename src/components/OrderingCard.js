import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { isMobile } from 'react-device-detect';
import config from '../config.json'
import hardworking from "../assets/images/hardworking.gif"
import haha from "../assets/images/haha.gif"
import ohno from "../assets/images/ohno.gif"

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

        return style;
    };

    const imageStyle = {
        height: "42px", 
        width: "42px"
    }

class OrderingCard extends Component {
    constructor(props) {
        super(props);
        this.state = {type: "", data: [], in: true, statusImg: hardworking};
        this.onDragEnd = this.onDragEnd.bind(this);
        this.refreshData = this.refreshData.bind(this);
    }

    componentDidMount(){
        this.refreshData();
    }

    refreshData() {
        fetch(`http://${config.host}/getquestion/type/reorder`, {
            method: 'get',
        })
            .then(response => {
                return response.json();
            })
            .then(json => {
                json.statusImg = hardworking;
                console.log(json);
                this.setState(json);
            })
            .catch(error => {
                console.log(error);
            });
    }

    validate() {
        console.log(this.state);

        let result = true;
        for(let i = 0; i < this.state.data.length; i++){
            if (i !== this.state.data[i].index) {
                console.log(`${i} not correct`);
                result = false;
                break;
            }
        }

        if(result){
            let newState = this.state;
            newState.statusImg = haha;
            this.setState(newState);
        } else {
            let newState = this.state;
            newState.statusImg = ohno;
            this.setState(newState)
        }
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
            <div>
                <div id="result">
                    <img src={this.state.statusImg} style={imageStyle} alt="hard working..."/>
                </div>
            
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId="droppable" direction={isMobile? 'vertical' : 'horizontal'}>
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={getListStyle(isMobile,snapshot.isDraggingOver)}
                                {...provided.droppableProps}
                            >

                                {
                                    this.state.data.map((element, index) => (
                                        <Draggable key={index} draggableId={"item-" + element.index} index={index}>
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
            </div>
        );
    }
}

export default OrderingCard;
