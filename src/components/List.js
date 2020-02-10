import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import React from 'react';

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  background: isDragging ? "lightgreen" : "#0062ff",
  color: "white",
  width: "244px",
  margin: "10px 0px",
  padding: "5px 0px",
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "#f0f0f0" : "#ffffff",
});

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

function List(props) {

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const items = reorder(
      props.list,
      result.source.index,
      result.destination.index
    );
    props.dragItemProps(items)
  }

 const deletItem = (index) => {
    props.list.splice(index, 1)
    props.dragItemProps(props.list)
  }

  return (
    <div className="list__items">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
              {props.list.map((item, index) => (
                <div>
                  <Draggable key={index} draggableId={`id-${index}`} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}>
                        <div className="list__itemWrapper">
                          <div className="list__item">
                            {item.value}
                          </div>
                          <div className="list__button">
                            <button className="list__buttonDelete" onClick={() => { deletItem(index) }}></button>
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                </div>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

export default List;