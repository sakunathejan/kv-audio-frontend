import { RxDashboard } from "react-icons/rx";
import { FaRegBookmark } from "react-icons/fa";
import { MdOutlineSpeaker } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { Link, Route, Routes } from "react-router-dom";

export default function AdminPage()
{
    return(
        <div className="w-full h-screen flex">
            <div class="w-[400px] h-full bg-green-200">
                <button className="w-full  h-[40px] text-[25px] font-bold flex justify-center items-center gap-2">
                    <RxDashboard/>
                    Dashboard
                </button>
                <Link to="/admin/bookings"className="w-full  h-[40px] text-[25px] font-bold flex justify-center items-center gap-2">
                    <FaRegBookmark/>
                    Bookings
                </Link>
                <Link to="/admin/items" className="w-full  h-[40px] text-[25px] font-bold flex justify-center items-center gap-2">
                    <MdOutlineSpeaker/>
                    Items
                </Link>
                <button className="w-full  h-[40px] text-[25px] font-bold flex justify-center items-center gap-2">
                    <FaRegUser/>
                    Users
                </button>
            </div>
            <div className="w-[calc(100vw-400px)] bg-blue-300">
                <Routes path="/*">
                  <Route path="/bookings" element={<h1>Booking</h1>}/>
                  <Route path="/items" element={<h1>Items</h1>}/>
                </Routes>
            </div>
            
        
    </div>
    )
}