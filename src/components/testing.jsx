import { useState } from "react"

export default function Testing(){
    const[count, setCount] = useState(0)
    const [itemName , setItemName] = useState("Coconut")

    return(
        <div className="w-full  h-screen bg-blue-300 flex flex-col justify-center items-center">
            <h1 className="text-6xl">{count}{itemName}s</h1>
            
            <button className="w-[200px] h-[60px] bg-black text-white rounded-lg text-3xl" onClick={()=>
                    {
                        const newCount = count + 1
                        setCount(newCount)
                    }
                }>
                Count
            </button>

            <div className="w-full flex justify-evenly items-center p-4 ">
                <button className="w-[200px] h-[60px] bg-black text-white rounded-lg text-3xl" 
                    
                    onClick={()=>{setItemName("Coconut")}}>                    
                   
                    Coconut
                </button>

                <button className="w-[200px] h-[60px] bg-black text-white rounded-lg text-3xl"
                    
                    onClick={()=>{setItemName("Banana")}}>
                    Banana
                </button>

                <button className="w-[200px] h-[60px] bg-black text-white rounded-lg text-3xl"
                
                    onClick={()=>{setItemName("Apple")}}>
                    Apple
                </button>

                <button className="w-[200px] h-[60px] bg-black text-white rounded-lg text-3xl"
                    onClick={()=>{setItemName("Other")}}>
                    Other
                </button>

            </div>

        </div>
    )
}