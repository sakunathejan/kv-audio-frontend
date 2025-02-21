import { RxDashboard } from "react-icons/rx";
import { FaRegBookmark } from "react-icons/fa";
import { MdOutlineSpeaker } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { Link, Route, Routes } from "react-router-dom";
import AddItemPage from "./addItemPage";
import AdminItemPage from "./adminItemPage";

export default function AdminPage()
{
    return(
        <div className="w-full h-screen flex">
            <div class="w-[200px] h-full bg-green-200">
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
            <div className="w-[calc(100vw-200px)]">
                <Routes path="/*">
                  <Route path="/bookings" element={<h1>Booking</h1>}/>
                  <Route path="/items" element={<AdminItemPage/>}/>
                  <Route path="/items/add" element={<AddItemPage/>}/>
                </Routes>
            </div>
        </div>
    )
}