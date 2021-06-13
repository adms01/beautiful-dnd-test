import "./App.css";
import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import initialData from "./initialData";
import Column from "./Column";

function App() {
  const [data, setData] = useState(initialData);

  const onDragEndHandler = (result) => {
    // destination이 끝 위치, source가 시작 위치를 의미함
    const { destination, source, draggableId } = result;

    // droppableId는 어느 column에 위치하는지, index는 해당 column에서 몇번째 task인지
    console.log(source.index, source.droppableId);
    console.log(destination?.index, destination?.droppableId); // 아무곳에 놓으면 destination이 없을 수도 있다

    // dnd를 도중에 멈췄으므로(올바른 droppable 위에 두지 않았으므로) 그냥 리턴
    if (!destination) {
      return;
    }

    // 같은 자리에 가져다 두었다면 그냥 리턴
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    // 시작한 source의 droppable 위치
    const start = data.columns[source.droppableId]; // state.columns은 객체임. {id: "column-2", title: "In progress", taskIds: []} 꼴
    const finish = data.columns[destination.droppableId];

    // 한 droppable 내에서 움직이는 로직. 간단함
    if (start === finish) {
      // 새로이 만들어진 해당 컬럼의 task를 array 형태로 반환
      const newProductIds = Array.from(start.productIds);

      // 해당 array를 splic해서 새로 넣는 작업
      newProductIds.splice(source.index, 1); // 현재 index 삭제함
      newProductIds.splice(destination.index, 0, draggableId); // drop한 곳의 index에 해당 draggableId를 넣음 (splice 0 이니 삭제는 안함)

      // 새로운 컬럼
      const newColumn = {
        ...start,
        productIds: newProductIds,
      };

      // 기존 state와 새롭게 바뀐 정보를 넣어 새 state로 만듦
      const newData = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };

      setData(newData);
      return;
    }

    // 다른 droppable로 옮기기
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
