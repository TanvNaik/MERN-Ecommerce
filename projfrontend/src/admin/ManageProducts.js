import React, { useState, useEffect } from "react";
import Base from "../core/Base.js";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper/index.js";
import { deleteProduct, getAllProducts } from "./helper/adminapicall.js";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const { user, token } = isAuthenticated();
  const preload = () => {
    getAllProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteaProduct = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  return (
    <Base title='Welcome admin' description='Manage products here'>
      <Link className='btn btn-info' to={`/admin/dashboard`}>
        <span className=''>Admin Home</span>
      </Link>
      <h2 className='mb-4'>All products:</h2>

      <div className='row'>
        <div className='col-12'>
          <h2 className='text-center text-white my-3'>Total 3 products</h2>

          {products.map((product, index) => {
            return (
              <div key={index} className='row text-center mb-2 '>
                <div className='col-4'>
                  <h3 className='text-white text-left'>{product.name}</h3>
                </div>
                <div className='col-4'>
                  <Link
                    className='btn btn-success'
                    to={`/admin/product/update/${product._id}`}
                  >
                    <span className=''>Update</span>
                  </Link>
                </div>
                <div className='col-4'>
                  <button
                    onClick={() => {
                      deleteaProduct(product._id);
                    }}
                    className='btn btn-danger'
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
};

export default ManageProducts;
