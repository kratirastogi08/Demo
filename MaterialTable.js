import MaterialTable from 'material-table'
import React, { useEffect, useState } from 'react'


 const MaterialTableDemo = () => {
    const [tableData,setTableData]=useState([])
    const columns=[{title:"Name",field:"name",sorting:false,cellStyle:{color:"blue"},headerStyle:{color:"white"}},
    {title:"Email",field:"email"} ,
     {title:"Phone Number",field:"phno", align:"center",customSort:(a,b)=>a.phno.length-b.phno.length},   
     {title:"Age",field:"age",emptyValue:()=><em>null</em>,defaultSort:"asc",searchable:false,export:false,
       render:(rowData)=><div style={{background:rowData.age>18?"green":"red"}}>{rowData.age}</div>
    } ,
     {title:"Gender",field:"gender",lookup:{Male:"M",Female:"F"}} ,
     {title:"Cilty",field:"city"},
     {title:"Currency",field:"currency", type:"currency",currencySetting:{currencyCode:"INR",minimumFractionDigits:0}} ]

     useEffect(()=>{
         setTableData([
          {name:"Raj",email:"raj@gmail.com",phno:"9919876352",age:null,gender:"Male",city:"Lucknow"},
          {name:"Ruhi",email:"ruhi@gmail.com",phno:"9919876352",age:"28",gender:"Female",city:"Noida"},
          {name:"Arya",email:"arya@gmail.com",phno:"9919876352",age:"22",gender:"Female",city:"Lucknow"},
        ])
     },[])
  return (
    <div>
        <MaterialTable columns={columns}
        icons={{Add:()=><button>Add</button>}}
          data={tableData}
          editable={{
            onRowAdd:(newRow)=>new Promise((resolve,reject)=>{
              setTableData([...tableData,newRow])
              resolve()
            }),
            onRowUpdate:(oldData,newData)=>new Promise((resolve,reject)=>{
              const data=[...tableData]
              data[oldData.tableData.id]=newData
              setTableData(data)
              resolve()

            }),
            onRowDelete:(selectedRow)=>new Promise((resolve,reject)=>{
                 const updatedData=[...tableData]
                 updatedData.splice(selectedRow.tableData.id,1)
                 setTableData(updatedData)
                 resolve()
            })
          }}
          options={{sorting:true,search:false,searchText:"Raj",searchFieldAlignment:"left",searchAutoFocus:true,searchFieldStyle:{},paging:true,pageSizeOptions:[5,10,20,25],pageSize:2,paginationType:"stepped",exportButton:true,exportAllData:true,exportFileName:"Table Data",
            addRowPosition:"first",actionsColumnIndex:-1,selection:true,showSelectAllCheckbox:false,showTextRowsSelected:false,
            selectionProps:(rowData)=>({disabled:rowData.name==='Raj'}),columnsButton:true,rowStyle:(data,index)=>index%2==0?{background:"black"}:null,
            headerStyle:{background:"green"}
        }}
        actions={[{icon:()=><button>Click me</button>,tooltip:"Click Me",onClick:(e,data)=>console.log(data),
         isFreeAction:true // if selection enabled, would show in header only after checkbox is checked
      }]}
      onSelectionChange={(selectedRows)=>console.log(selectedRows)}
        ></MaterialTable>
    </div>
  )
}

export default MaterialTableDemo
