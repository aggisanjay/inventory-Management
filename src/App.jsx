import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Apple', category: 'Fruits', quantity: 15 },
    { id: 2, name: 'Banana', category: 'Fruits', quantity: 8 },
    { id: 3, name: 'Carrot', category: 'Vegetables', quantity: 12 },
  ]);
  const [newItem, setNewItem] = useState({ name: '', category: '', quantity: '' });
  const [filterCategory, setFilterCategory] = useState('');

  const addItem = () => {
    if (newItem.name && newItem.category && newItem.quantity) {
      setInventory([
        ...inventory,
        { ...newItem, id: Date.now(), quantity: parseInt(newItem.quantity, 10) },
      ]);
      setNewItem({ name: '', category: '', quantity: '' });
    }
  };

  const editItem = (id) => {
    const updatedInventory = inventory.map((item) => {
      if (item.id === id) {
        const updatedName = prompt('Enter new name:', item.name) || item.name;
        const updatedCategory = prompt('Enter new category:', item.category) || item.category;
        const updatedQuantity =
          parseInt(prompt('Enter new quantity:', item.quantity), 10) || item.quantity;
        return { ...item, name: updatedName, category: updatedCategory, quantity: updatedQuantity };
      }
      return item;
    });
    setInventory(updatedInventory);
  };

  const deleteItem = (id) => {
    setInventory(inventory.filter((item) => item.id !== id));
  };

  const filteredInventory = filterCategory
    ? inventory.filter((item) => item.category === filterCategory)
    : inventory;

  const sortedInventory = [...filteredInventory].sort((a, b) => a.quantity - b.quantity);

  return (
    <div className="app-container">
      <h1>Inventory Management</h1>

      <div className="form-container">
        <input
          type="text"
          placeholder="Item Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Category"
          value={newItem.category}
          onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newItem.quantity}
          onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
        />
        <button onClick={addItem}>Add Item</button>
      </div>

      <div className="filter-container">
        <select onChange={(e) => setFilterCategory(e.target.value)} value={filterCategory}>
          <option value="">All Categories</option>
          <option value="Fruits">Fruits</option>
          <option value="Vegetables">Vegetables</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedInventory.map((item) => (
            <tr key={item.id} className={item.quantity < 10 ? 'low-stock' : ''}>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.quantity}</td>
              <td>
                <button onClick={() => editItem(item.id)}>Edit</button>
                <button  className="delete-btn" onClick={() => deleteItem(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;