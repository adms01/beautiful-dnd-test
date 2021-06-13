import React, {useState} from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import './App.css'
import {reorderProductMap} from './reorder'




function App() {

  const [products, setProducts] = useState([
    {
      id:  '1',
      name: 'Tshirt1',
      url: '/images/t-shirt1.jpeg',

    },
  
    {
      id: '2',
      name: 'Tshirt2',
      url: '/images/t-shirt2.jpg',
    },
  
    {
      id: '3',
      name: 'Tshirt3',
      url: '/images/t-shirt3.jpg',
    },
  ]);
  
  
  const allProducts = products.map((product, i) => (


    <Draggable 
    
    draggableId={product.id}  //must be the same as key, avoid using index as id
      key={product.id}
      index={i}
     
     
      
  
      >
        

        {(provided) => (
    <div className='item'
    ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        
        
          
          >
        


  
      <div>
        <div>
          <img src={product.url} className='productI'/>
        </div>
  
        <div className='text-center'>
  
            <h4>{product.name}</h4>
            <button variant='primary'>Add to cart</button>
  
        </div>
      </div>
  

    </div>

      )}
    </Draggable>
  
  
  ))






  const dragStartHandler = () => {

    //Block updates here as per best practice

  }


  const dragEndHandler = (result) => {

    // console.log(result)

    // const productItems = [...products];

    // const [orderedProducts] = productItems.splice(result.source.index, 1)
    // productItems.splice(result.destination?.index, 0, orderedProducts)

    // setProducts(productItems)

    // console.log(result)


    if (!result.destination) {
      return;
    }



    setProducts(

      reorderProductMap({

        productMap: products,
        source: result.source,
        destination: result.destination,


      })



    )






  }





  
  return (
    <div className="container">
      <DragDropContext onDragEnd={dragEndHandler}  onDragStart={dragStartHandler}>




        <Droppable 
        
        droppableId="boxOne"
        direction='horizontal'
        
      
        >

          {(provided, snapshot) => (
          <div className='row' 
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey' }}
          
       

          >
          {allProducts}

          {provided.placeholder}


          </div>

          )}

        </Droppable>





 
        <Droppable droppableId="boxTwo"

        
        >


          {(provided, snapshot) => (
            
            <div className='row'

            
           
            ref={provided.innerRef}
            style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey' }}
            
            >


              


{provided.placeholder}

            </div>
         

          )}


        



        </Droppable>
 

        


        




    
      </DragDropContext>

   

    </div>
    
    
  )
}

export default App;



//https://github.com/atlassian/react-beautiful-dnd/blob/master/stories/src/multiple-horizontal/quote-app.jsx