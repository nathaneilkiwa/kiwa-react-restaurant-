// seedMenu.js
const mongoose = require('mongoose');
const MenuItem = require('./models/MenuItem');
const connectDB = require('./config/db');
require('dotenv').config();

const menuItems = [
  {
    name: "Soup of the Day",
    description: "Chef's special seasonal soup prepared with fresh ingredients",
    price: 9.99,
    category: "starter"
  },
  {
    name: "Bread with Olive Oil & Balsamic Dip",
    description: "Fresh baked artisan bread with premium olive oil and balsamic reduction",
    price: 8.99,
    category: "starter"
  },
  {
    name: "Organic Spinach Salad",
    description: "Fresh organic spinach with cherry tomatoes, red onions, and house dressing",
    price: 12.99,
    category: "starter"
  },
  {
    name: "Crispy Calamari",
    description: "Lightly battered calamari served with lemon aioli",
    price: 14.99,
    category: "starter"
  },
  {
    name: "Melina's Burger",
    description: "Premium beef burger with special sauce, lettuce, tomato, and crispy fries",
    price: 16.99,
    category: "main"
  },
  {
    name: "Rosemary Chicken",
    description: "Grilled chicken breast with fresh rosemary, garlic, and seasonal vegetables",
    price: 18.99,
    category: "main"
  },
  {
    name: "Salmon in Black Butter",
    description: "Pan-seared salmon with black butter sauce and lemon herb rice",
    price: 22.99,
    category: "main"
  },
  {
    name: "Pumpkin Ravioli",
    description: "Homemade ravioli filled with roasted pumpkin and sage butter",
    price: 17.99,
    category: "main"
  },
  {
    name: "Four-Onion Tart",
    description: "Savory tart with caramelized onions and herb crust",
    price: 15.99,
    category: "main"
  },
  {
    name: "Moules Mariniere",
    description: "Fresh mussels in white wine and garlic broth",
    price: 19.99,
    category: "main"
  },
  {
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with molten center and vanilla ice cream",
    price: 8.99,
    category: "dessert"
  },
  {
    name: "Tiramisu",
    description: "Classic Italian dessert with coffee-soaked ladyfingers",
    price: 7.99,
    category: "dessert"
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();
    
    console.log('Clearing existing menu items...');
    await MenuItem.deleteMany({});
    
    console.log('Adding new menu items...');
    await MenuItem.insertMany(menuItems);
    
    console.log('✅ Menu items seeded successfully!');
    console.log(`📊 Added ${menuItems.length} menu items to the database`);
    
    // Display the added items
    const count = await MenuItem.countDocuments();
    console.log(`📈 Total menu items in database: ${count}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();