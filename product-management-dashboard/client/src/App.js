import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '' });
  const [editProduct, setEditProduct] = useState(null);

  // Termékek lekérése
  useEffect(() => {
      axios.get('http://localhost:5000/api/items')
          .then(response => setProducts(response.data))
          .catch(error => console.log(error));
  }, [products]);

  // Új termék hozzáadása
  const handleAddProduct = async (e) => {
      e.preventDefault();
      try {
          await axios.post('http://localhost:5000/api/items', newProduct);
          setNewProduct({ name: '', description: '', price: '' }); 
      } catch (error) {
          console.log(error);
      }
  };

  // Termék módosítása
  const handleEditProduct = async (id) => {
      try {
          await axios.put(`http://localhost:5000/api/items/${id}`, editProduct);
          setEditProduct(null); 
      } catch (error) {
          console.log(error);
      }
  };

  // Termék törlése
  const handleDeleteProduct = async (id) => {
      try {
          await axios.delete(`http://localhost:5000/api/items/${id}`);
      } catch (error) {
          console.log(error);
      }
  };

  return (
      <div className="App">
          

          {/* Új termék hozzáadása */}
          <div className="add-product-section">
              <h2>Új termék hozzáadása</h2>
              <form onSubmit={handleAddProduct}>
                  <input
                      type="text"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      placeholder="Termék neve"
                  />
                  <textarea
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                      placeholder="Termék leírása"
                  />
                  <input
                      type="number"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      placeholder="Termék ára"
                  />
                  <button type="submit">Hozzáad</button>
              </form>
          </div>
          {/* Termék módosítása */}
          {editProduct && (
              <div className="edit-product-section">
                  <h2>Termék módosítása</h2>
                  <form onSubmit={() => handleEditProduct(editProduct.id)}>
                      <input
                          type="text"
                          value={editProduct.name}
                          onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                          placeholder="Termék neve"
                      />
                      <textarea
                          value={editProduct.description}
                          onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
                          placeholder="Termék leírása"
                      />
                      <input
                          type="number"
                          value={editProduct.price}
                          onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
                          placeholder="Termék neve"
                      />
                      <button type="submit">Változtatások mentése</button>
                  </form>
              </div>
          )}

          {/* Meglévő termékek */}
          <div className="product-list">
              <h2>Meglévő termékek</h2>
              {products.map(product => (
                  <div key={product.id} className="product-item">
                      <p><strong>Név:</strong> {product.name}</p>
                      <p><strong>Leírás:</strong> {product.description}</p>
                      <p><strong>Ár:</strong> {product.price} Ft</p>
                      
                      <button onClick={() => setEditProduct(product)}>Módosít</button>
                      <button onClick={() => handleDeleteProduct(product.id)}>Törlés</button>
                  </div>
              ))}
          </div>
      </div>
  );
}

export default App;
