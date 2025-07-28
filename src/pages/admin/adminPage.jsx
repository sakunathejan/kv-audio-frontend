import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./adminDashboard";
import AddItemPage from "./addItemPage";
import UpdateItemPage from "./updateItemPage";
import AdminItemPage from "./adminItemPage";
import AdminReviewsPage from "./adminReviewsPage";
import AdminInquiriesPage from "./adminInquiriesPage";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-primary">
      <Routes path="/*">
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/add-item" element={<AddItemPage />} />
        <Route path="/update-item/:key" element={<UpdateItemPage />} />
        <Route path="/items" element={<AdminItemPage />} />
        <Route path="/reviews" element={<AdminReviewsPage />} />
        <Route path="/inquiries" element={<AdminInquiriesPage />} />
      </Routes>
    </div>
  );
}