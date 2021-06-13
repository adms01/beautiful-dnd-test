import React from "react";
import "./App.css";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Product from "./Product";

function Column({ column, products }) {
  return (
    <div className=''>
      <Droppable droppableId={column.id} direction='horizontal'>
        {(provided, snapshot) => (
          <div
            className='row'
            {...provided.droppableProps}
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
            style={{ backgroundColor: snapshot.isDraggingOver ? "blue" : "grey" }}
          >
            {products.map((product, index) => (
              <Product key={product.id} product={product} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default Column;
