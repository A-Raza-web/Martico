import SideBar from "../../components/List_SideBar";
import ContentRight from "../../components/List-content_right"
 
const Listing = () => {
  return(
    <>
      <section className="product_listing_page">
        <div className="container">
          <div className="productListing d-flex">
              <SideBar/>
              <ContentRight/>
          </div>
        </div>
      </section>  
    </>
  )
 }
 export default Listing;