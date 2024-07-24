import { Banner } from "../../components/Banner";
import { About } from "../../components/About";
import { ProductsPreview } from "../../components/ProductsPreview";
import { SearchBar } from "../../components/SearchBar";

const Home = () => {
    return (
        <>
            <SearchBar />  
            <Banner />
            <ProductsPreview />
            <About />
        </>
    )
}

export default Home;