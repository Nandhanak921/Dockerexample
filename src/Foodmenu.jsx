import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Foodmenu() {

    const [fname, setfname] = useState("");
    const [fcategory, setfcategory] = useState("");
    const [fprice, setfprice] = useState("");
    const [fimage, setfimage] = useState("");
    const [Foods, setFoods] = useState([]);

    const serverURL = "http://localhost:5000";

    // Fetch all foods
    const fetchFoods = async () => {
        try {
            const res = await axios.get(`${serverURL}/api/food/getallfood`);
            setFoods(res.data);
        } catch (err) {
            console.log("Error fetching food items:", err);
        }
    };

    useEffect(() => {
        fetchFoods();
    }, []);

    // Add new food item
    const handleadd = async (e) => {
        e.preventDefault();

        if (!fname || !fcategory || !fprice || !fimage) {
            alert("Please fill all fields");
            return;
        }

        try {
            await axios.post(`${serverURL}/api/food/createfood`, {
                fname,
                fcategory,
                fprice,
                fimage
            });
            alert("Food item added successfully!");

            setfname("");
            setfcategory("");
            setfprice("");
            setfimage("");

            fetchFoods(); // refresh list

        } catch (err) {
            alert("Failed to add food item");
            console.log("Error adding food item:", err);
        }
    };

    return (
        <div>
            <h1 style={{ fontFamily: "sans-serif", textAlign: "center" }}>
                Admin Panel - Add Food Menu
            </h1>

            {/* ADD FOOD FORM */}
            <form
                onSubmit={handleadd}
                style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "60%",
                    margin: "20px auto",
                    gap: "10px",
                    padding: "20px",
                    border: "1px solid black",
                    borderRadius: "10px"
                }}
            >
                <input
                    style={{ width: "170px", height: "35px" }}
                    type="text"
                    placeholder="Food Name"
                    value={fname}
                    onChange={(e) => setfname(e.target.value)}
                />

                <select
                    style={{ width: "170px", height: "40px" }}
                    value={fcategory}
                    onChange={(e) => setfcategory(e.target.value)}
                >
                    <option value="">Select Category</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Snacks">Snacks</option>
                </select>

                <input
                    style={{ width: "170px", height: "35px" }}
                    type="number"
                    placeholder="Price"
                    value={fprice}
                    onChange={(e) => setfprice(e.target.value)}
                />

                <input
                    style={{ width: "170px", height: "35px" }}
                    type="url"
                    placeholder="Paste Image URL"
                    value={fimage}
                    onChange={(e) => setfimage(e.target.value)}
                />

                <button
                    style={{
                        width: "80px",
                        height: "40px",
                        backgroundColor: "black",
                        color: "white"
                    }}
                    type="submit"
                >
                    Add
                </button>
            </form>

            {/* FOOD ITEMS LIST */}
            <div style={{ width: "60%", margin: "auto" }}>
                <h2 style={{ fontFamily: "sans-serif" }}>Food Menu Items</h2>

                {Foods.length === 0 ? (
                    <p>No food items found</p>
                ) : (
                    Foods.map((item) => (
                        <div
                            key={item._id}
                            style={{
                                border: "1px solid gray",
                                padding: "10px",
                                borderRadius: "8px",
                                margin: "10px 0",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between"
                            }}
                        >
                            <div>
                                <h3>{item.fname}</h3>
                                <p>Category: {item.fcategory}</p>
                                <p>Price: ₹{item.fprice}</p>
                            </div>

                            <img
                                src={item.fimage}
                                alt={item.fname}
                                style={{ width: "100px", height: "80px", borderRadius: "5px" }}
                            />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Foodmenu;
