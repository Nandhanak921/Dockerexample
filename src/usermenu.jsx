
import React, { useEffect, useState } from 'react'
import axios from 'axios';

function UserMenu() {
  const [foods, setFoods] = useState([]);
  const [category, setCategory] = useState('Breakfast');

  const api_base='http://localhost:5000/api/food/';
  const fetchFoodsByCategory = async (cat) => {
    try {
      const response = await axios.get(`${api_base}category/${cat}`);


      setFoods(response.data)
    }
    catch (error) {
      console.error("Error fetching foods by category:", error);
    }
  }
  useEffect(()=>{
    fetchFoodsByCategory(category);
  }, [category])
  return (
    <div style={{ width: '500px', margin: 'auto', marginTop: '50px' }}>
      <h1>Menu</h1>

      <div style={{ padding: '20px', border: '1px solid grey', marginBottom: '20px' }}>
        <button onClick={() => setCategory('Breakfast')} style={{ marginRight: '1rem' }}>
          Breakfast
        </button>
        <button onClick={() => setCategory('Lunch')} style={{ marginRight: '1rem' }}>
          Lunch
        </button>
        <button onClick={() => setCategory('Snacks')} style={{ marginRight: '1rem' }}>
          Snacks
        </button>
        <button onClick={() => setCategory('Dinner')} style={{ marginRight: '1rem' }}>
          Dinner
        </button>
      </div>

      <h3>showing: {category}</h3>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {foods.map(food => (
          <div key={food._id} style={{ border: '1px solid #ddd', borderRadius: 8, padding: 8 }}>
            {food.fimage && (
              <img
                src={food.fimage}
                alt={food.fname}
                style={{ width: '200px', height: '200px', objectFit: 'cover' }}
              />
            )}
            <h3>{food.fname}</h3>
            <p style={{ color: '#666' }}>{food.fcategory}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserMenu
// ...existing code...