import { Route, Routes } from "react-router-dom";
import Header from "../../components/header";
import Items from "./item";
import Home from "./home";
import Gallery from "./gallery";
import Contact from "./contact";
import ErrorNotFound from "./error";
import ProductOverview from "./productOverview";

export default function HomePage(){
    return(
       <>
            <Header/>
            <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                <Routes path="/*">
                    <Route path="/contact" element={<Contact/>}/>
                    <Route path="/gallery" element={<Gallery/>}/>
                    <Route path="/items" element={<Items/>}/>
                    <Route path="/product/:key" element={<ProductOverview/>}/>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/*" element={<ErrorNotFound/>}/>
                </Routes>
            </main>
        </>
    )
}