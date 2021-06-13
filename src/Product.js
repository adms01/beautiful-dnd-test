import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "./App.css";
function Product({ product, index }) {
  return (
    <Draggable draggableId={product.id} index={index} isDragDisabled={product.id === "task-1"}>
      {(provided, snapshot) => (
        <div className='item' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <div>
            <div>
              <img src={product.url} className='productI' />
            </div>

            <div className='text-center'>
              <h4>{product.name}</h4>
              <button variant='primary'>Add to cart</button>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default Product;
