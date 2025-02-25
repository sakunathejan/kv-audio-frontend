import { useState } from "react"
import mediaUpload from "../utils/mediaUpload";


export default function Testing(){

    const [file , setFile] = useState(null);
    
    function uploadeFile()
    {
        console.log(file)
        mediaUpload(file).then((url)=>{
            console.log(url)
        })
    }

    return(
        <div className="w-full  h-screen flex flex-col justify-center items-center">
            <input type="file"onChange={(e)=>{setFile(e.target.files[0])}}/>
            <button  onClick={uploadeFile}  className="w-[200px] h-[50px] bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200 mt-6">
                Upload
            </button>
        </div>
    );
}