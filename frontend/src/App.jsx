import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [activeTab, setActiveTab] = useState('ACHIEVEMENT');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('ACHIEVEMENT');

  const API_URL = 'http://localhost:8081/api/items';

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const currentItems = items.filter(item => item.category === activeTab);

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setTitle(item.title);
      setDescription(item.description);
      setCategory(item.category);
    } else {
      setEditingItem(null);
      setTitle('');
      setDescription('');
      setCategory(activeTab); // Default to current tab
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setTitle('');
    setDescription('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const itemData = { title, description, category };

    try {
      if (editingItem) {
        // Update
        const response = await fetch(`${API_URL}/${editingItem.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(itemData),
        });
        if (response.ok) fetchItems();
      } else {
        // Create
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(itemData),
        });
        if (response.ok) fetchItems();
      }
      handleCloseModal();
    } catch (error) {
      console.error("Error saving item:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) fetchItems();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Life Tracker</h1>
        <button className="add-btn" onClick={() => handleOpenModal()}>
          + Add New
        </button>
      </header>

      <div className="content-area">
        {['ACHIEVEMENT', 'MISSED', 'BUCKETLIST'].map(categoryGroup => {
          const categoryItems = items.filter(item => item.category === categoryGroup);
          if (categoryItems.length === 0) return null;

          return (
            <div key={categoryGroup} className="category-section">
              <h2 className="category-title">
                {categoryGroup === 'ACHIEVEMENT' && 'Achievements'}
                {categoryGroup === 'MISSED' && 'Missed Achievements'}
                {categoryGroup === 'BUCKETLIST' && 'Bucket List'}
              </h2>
              <div className="grid">
                {categoryItems.map(item => (
                  <div key={item.id} className="card">
                    <div className="card-header">
                      <h3>{item.title}</h3>
                      <div className="card-actions">
                        <button onClick={() => handleOpenModal(item)} className="icon-btn edit">✎</button>
                        <button onClick={() => handleDelete(item.id)} className="icon-btn delete">🗑</button>
                      </div>
                    </div>
                    {item.description && <p>{item.description}</p>}
                    <span className={`badge ${item.category.toLowerCase()}`}>
                      {item.category.replace('_', ' ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        {items.length === 0 && (
          <div className="empty-state">No items found. Start by adding a new one!</div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{editingItem ? 'Edit Item' : 'New Entry'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  required
                  placeholder="e.g., Run a Marathon"
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select value={category} onChange={e => setCategory(e.target.value)}>
                  <option value="ACHIEVEMENT">Achievement</option>
                  <option value="MISSED">Missed Achievement</option>
                  <option value="BUCKETLIST">Bucket List</option>
                </select>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Details about this item..."
                  rows={4}
                />
              </div>
              <div className="modal-actions">
                <button type="button" onClick={handleCloseModal} className="cancel-btn">Cancel</button>
                <button type="submit" className="save-btn">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
