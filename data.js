const bcrypt = require('bcryptjs');

const data = {

    users: [
      {
        name: 'Chinedum',
        email: 'admin@gmail.com',
        isAdmin: true,
        password: bcrypt.hashSync('aaa1', 12)
      },
      {
        name: 'John',
        email: 'john@gmail.com',
        isAdmin: false,
        password: bcrypt.hashSync('1234', 12)
      }
    ],
   
    products: [
      {
        name: 'Slim Shirt',
        category: 'Shirts',
        image: '/images/p1.jpg',
        price: 60,
        brand: ' Nike',
        rating: 4.5,
        numReviews: 10,
        countInStock: 12,
        description: 'A very nice slim shirt for body fitting'
      },
      {
        name: 'Fit Shirt',
        category: 'Shirts',
        image: '/images/p1.jpg',
        price: 50,
        brand: ' Nike',
        rating: 4.2,
        numReviews: 5,
        countInStock: 7,
        description: 'Great shirt with fittings'
      },
      {
        name: 'Best Pants',
        category: 'Pants',
        image: '/images/p1.jpg',
        price: 70,
        brand: ' Nike',
        rating: 4.5,
        numReviews: 8,
        countInStock: 0,
        description: 'Wonderful pants with design'
      },
       {
        name: 'Nike Shirts',
        category: 'Pants',
        image: '/images/p1.jpg',
        price: 70,
        brand: ' Nike',
        rating: 4.5,
        numReviews: 8,
        countInStock: 4,
        description: 'Top flexible sports pants'
      },
    ]
  }

  module.exports = data;