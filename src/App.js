import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Next } from "react-bootstrap/esm/PageItem";
import "./App.css";
// import { reorderProductMap } from "./reorder";
import initialData from "./initialData";

function App() {
  const [products, setProducts] = useState(initialData);

  const test = () => {
    products.columnOrder.map((columnId) => {
      const column = products.columns[columnId];
      const _products = column.productIds.map((productId) => products.products[productId]);

      return column.title;
    });
  };

  const allProducts = Object.values(products.products).map((product, i) => (
    <Draggable
      draggableId={product.id} //must be the same as key, avoid using index as id
      key={product.id}
      index={i}
    >
      {(provided) => (
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
  ));

  const dragStartHandler = () => {
    //Block updates here as per best practice
  };

  const getList = (id) => {
    products.products(id);
    return id;
  };

  /**
   * Moves an item from one list to another list.
   */
  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };

  const dragEndHandler = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const productItems = Object.values(products.products);

      //Get the dragged item
      const draggedItem = productItems[result.source.index];

      //Deletes dragged item from current index
      productItems.splice(result.source.index, 1);

      //Adds dragged item to new index
      productItems.splice(result.destination.index, 0, draggedItem);

      //Creates new data
      const newData = {
        ...products,
        products: productItems,
      };
      setProducts(newData);
      return;
    } else {
      test();
      // const productItems = Object.values(products.products);
      // const draggedItem = productItems[result.source.index];
      // const sourceColumns = source.droppableId;
      // const destColumns = destination.droppableId;
    }
  };
  //   const item = products[source.droppableId];

  //   console.log(item);

  // //Removes product item from original
  // const oldProductItems = [...products];
  // oldProductItems.splice(source.index, 1);

  // //Insert into next

  // const destinationn = [...destination];

  // // destination.splice(destination.index, 0, oldProductItems)

  // console.log(destinationn.splice(destination.index, 0, oldProductItems));

  // next.splice(destination.index, 0, source.index);

  // if (source.droppableId === destination.droppableId) {
  //   console.log("ran");
  // }

  // setProducts(resultt);

  // let start = products[source.droppableId];
  // let finish = products[destination.droppableId];
  // if (start === finish) {
  //   let updatedProducts = products.map((product) => {
  //     if (product.id === source.droppableId) {
  //       product.splice(source.index, 1);
  //       product.splice(destination.index, 0, draggableId);
  //     }
  //     return product;
  //   });

  //   console.log(updatedProducts);
  //   setProducts(updatedProducts);
  // }
  // };

  return (
    <div className='container'>
      {/*       
      {Object.values(products.products).map((product, index) => (
        <p key={index}>
          <span>{product.name}</span>
        </p>
      ))}
      ; */}

      <DragDropContext onDragEnd={dragEndHandler} onDragStart={dragStartHandler}>
        <Droppable droppableId='boxOne' direction='horizontal'>
          {(provided, snapshot) => (
            <div
              className='row'
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ backgroundColor: snapshot.isDraggingOver ? "blue" : "grey" }}
            >
              {allProducts}

              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <Droppable droppableId='boxTwo'>
          {(provided, snapshot) => (
            <div className='row' ref={provided.innerRef} style={{ backgroundColor: snapshot.isDraggingOver ? "blue" : "grey" }}>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default App;

//https://github.com/atlassian/react-beautiful-dnd/blob/master/stories/src/multiple-horizontal/quote-app.jsx
