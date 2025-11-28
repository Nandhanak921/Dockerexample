import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'

function Productshow() {
  const [product, setproduct] = useState([])
  const [newproductname, setnewproductname] = useState('')
  const [newproductprice, setnewproductprice] = useState('')
  const [editproductId, seteditproductId] = useState(null)
  const [editproductname, seteditproductname] = useState('')
  const [editproductprice, seteditproductprice] = useState('')

  const serverURL = 'http://localhost:5000'

  useEffect(() => {
    getproducts()
  }, [])

  const getproducts = async () => {
    try {
      const response = await axios.get(`${serverURL}/api/product/get`)
      setproduct(response.data)
    }
    catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  const addproduct = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${serverURL}/api/product/add`, {
        name: newproductname,
        price: newproductprice
      })
      console.log('Product added:', response)
      setnewproductname('')
      setnewproductprice('')
      getproducts()
    } catch (error) {
      console.error('Error adding product:', error)
      if (error.response) {
        console.error('Server responded with:', error.response.status, error.response.data)
      } else if (error.request) {
        console.error('No response received, request was:', error.request)
      } else {
        console.error('Request setup error:', error.message)
      }
    }
  }

  const updateproduct = async (e, id) => {
    e.preventDefault()
    try {
      await axios.put(`${serverURL}/api/product/update/${id}`, {
        name: editproductname,
        price: editproductprice
      })
      getproducts()
      cancelp()

    } catch (error) {
      console.error('Error updating product:', error)
    }
  }

  const deleteproduct = async (id) => {
    try {
      await axios.delete(`${serverURL}/api/product/delete/${id}`)
      getproducts()
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  const startEditprod = (product) => {
    seteditproductId(product._id)
    seteditproductname(product.name)
    seteditproductprice(product.price)
  }




  const cancelp = () => {
    seteditproductId(null)
    seteditproductname('')
    seteditproductprice('')
  }

  console.log("products:", product);

  return (
    <div>
      <h1> PRODUCT MANAGEMENT SYSTEM</h1>
      <div>
        <h2>Add New Product</h2>
        <form onSubmit={addproduct}>
          Name:<input type='text' placeholder='add product name' value={newproductname} onChange={(e) => setnewproductname(e.target.value)}></input>&nbsp;&nbsp;
          Price:<input type='text' placeholder='add product price' value={newproductprice} onChange={(e) => setnewproductprice(e.target.value)}></input>&nbsp;&nbsp;
          <button type='submit'>Add Product</button>
        </form>
      </div>
      <h2>products</h2>
      <div style={{ marginLeft: "550px" }}>
        <ul style={{ display: "flex", gap: "6%" }}>
          {
            product.map((product) => (
              <li key={product._id} style={{ listStyle: "square" }}>
                <div>
                  {
                    editproductId === product._id ? (
                      <form onSubmit={(e) => updateproduct(e, product._id)}>
                        Name:<input type='text' value={editproductname} onChange={(e) => seteditproductname(e.target.value)}></input>&nbsp;&nbsp;
                        Price:<input type='text' value={editproductprice} onChange={(e) => seteditproductprice(e.target.value)}></input>&nbsp;&nbsp;
                        <button style={{ marginLeft: "15%" }} type='submit'>Update</button>
                        <button style={{ marginLeft: "15%" }} onClick={cancelp}>Cancel</button>
                      </form>

                    ) : (
                      <div style={{ alignContent: "center", alignItems: "center" }}>
                        <h3>Name: {product.name}</h3>
                        <h4>Price: {product.price}</h4>
                        <button onClick={() => startEditprod(product)}>Edit</button>&nbsp;&nbsp;
                        <button onClick={() => deleteproduct(product._id)}>Delete</button>
                      </div>
                    )}

                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Productshow
