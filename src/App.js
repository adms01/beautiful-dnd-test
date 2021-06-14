import "./App.css";
import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import initialData from "./initialData";
import Column from "./Column";

function App() {
  const [data, setData] = useState(initialData);

  const onDragEndHandler = (result) => {
    // destination is the end position and source is the start
    const { destination, source, draggableId } = result;

    // droppableId is located in column, and index is the number of products in that column
    // console.log(source.index, source.droppableId);
    // console.log(destination?.index, destination?.droppableId); //If you put it anywhere it may not have a destination

    // console.log(result)

    // Return bc dnd was stopped midway
    if (!destination) {
      return;
    }

    // If you put it in the same place just return it
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    //  droppable location of starting source
    const start = data.columns[source.droppableId]; // state.columns은 객체임. {id: "column-2", title: "In progress", taskIds: []} 꼴
    const finish = data.columns[destination.droppableId];

 

    // Logic of moving within a droppable
    if (start === finish) {
      // Returns products of newly created column in form of an array
      const newProductIds = Array.from(start.productIds);

  

      // Splicing the array and adding a new one
      newProductIds.splice(source.index, 1); // Delete current index
      newProductIds.splice(destination.index, 0, draggableId); // Put the corresponding draggableId in the index of the drop place (do not delete as splice 0)

      // new column
      const newColumn = {
        ...start,
        productIds: newProductIds,
      };

      // Create a new state by putting the old state and new information
      const newData = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };

      console.log(newColumn.id)



      setData(newData);
      return;
    }

    // Moving to another droppable
    const startProductIds = Array.from(start.productIds);
    startProductIds.splice(source.index, 1);
    const newStart = {
      ...start,
      productIds: startProductIds,
    };

    const finishProductIds = Array.from(finish.productIds);
    finishProductIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      productIds: finishProductIds,
    };

    const newData = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setData(newData);
  };

  return (
    <DragDropContext onDragEnd={onDragEndHandler}>
      <div className='container'>
        {data.columnOrder.map((columnId) => {
          const column = data.columns[columnId];
          const _products = column.productIds.map((productId) => data.products[productId]);
          
          return <Column key={column.id} column={column} products={_products} />;
        })}
      </div>
    </DragDropContext>
  );
}

export default App;
