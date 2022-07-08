import React,{memo} from 'react'

 const Child = (props) => {
    console.log("here")
  return (
    <div>
        <h1>Child:{props.number}</h1>
    <button onClick={()=>props.changeNumber(Math.random())}>Click to change number</button>
    </div>
    
  )
}

export default memo(Child)