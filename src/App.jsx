import './App.css'
import ProductCard  from './components/productCard'

function App() {
  

  return (
    <div>
        {/*Product 01*/}
      <ProductCard name="Audio Setup" 
      price="3250/-" 
      description="jjddbsdbbbk kdfhfhdghd uhfhdfjdhhd" 
      productUrl="https://img.drz.lazcdn.com/g/kf/S6cfb0ee8d9f74ebb9660fd04b3622e364.jpg_400x400q75.jpg_.webp"/>

       {/*Product 02*/}
      <ProductCard name="Live Sound Card and Audio Interface"
      price="5800/-"
      description="Live Sound Card and Audio Interface with DJ Mixer Effects and Voice Changer,Prefect for Streaming/Podcasting/Gaming"
      productUrl="https://img.drz.lazcdn.com/g/kf/Sd2b375e96ffc480192cf6e196d5ebe46w.jpg_720x720q80.jpg_.webp"/>

    </div>
  )
}

export default App
