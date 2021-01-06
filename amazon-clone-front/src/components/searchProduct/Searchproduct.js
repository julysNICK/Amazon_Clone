import React, { useEffect, useState } from "react";
import Product from "../Product/Product";
import axios from "axios";
import { useParams } from "react-router-dom";
import api from "../../services/api.js";
import "./Searchproduct.css";
function Searchproduct(props) {
  const { search } = useParams();
  const [products, setproducts] = useState([]);
  const [categories, setcategories] = useState([]);
  const [errorr, seterror] = useState(null);
  useEffect(() => {
    async function load() {
      try {
        const apiSearch = `/productsSearch/search=${search.toLowerCase()}`;
        await api
          .get(apiSearch)
          .then((response) => {
            setproducts(response.data.data);
            getCategories();
            // eslint-disable-next-line
            if ((response.data.data == 0) === true) {
              seterror(true)
            }else{
              seterror(false)
            }
          })
          .catch((err) => {});
      } catch (error) {
      }
    }
    load();
  }, [search]);
  async function getCategories() {
    const api_categories = "/categories";
    await api
      .get(api_categories)
      .then((res) => {
        setcategories(res.data.categories);
      })
      .catch((error) => {});
  }

  return (
    <div className="search_Product">
      <div className="category_section">
        <h2 className="">categories</h2>
        {categories.map((category) => (
          <div className="category_single">
            <input type="checkbox" /> {category.name_category}
          </div>
        ))}
      </div>
      <div className="product_section">
        {errorr ?  <h1>Product not found 😭</h1> :products.map((product) => (
          <div className="single_product">
            <Product
              id={product.product_id}
              title={product.title}
              image={product.imageUrl}
              price={parseFloat(product.price)}
              rating={product.rating}
            />
          </div> 
        )) }
      </div>
    </div>
  );
}

export default Searchproduct;
