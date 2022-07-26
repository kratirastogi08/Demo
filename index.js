const abc=(input)=>{
    const obj={}
    input.split("").forEach((item)=>{
        if(obj.hasOwnProperty(item))
        {
            obj[item] ++ 
        }
        else{
            obj[item]=1
        }
    })
    let max=0
    let d=""
    Object.keys(obj).forEach(item=>{
        if(obj[item]>max)
        {
            max=obj[item]
            d=item
        }
        })
    return d
    
}
abc("pinki")