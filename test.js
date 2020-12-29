const cartItems = [
                    {
                        "name":"Slim Shirt",
                        "image":"/images/p1.jpg",
                        "price":60,
                        "product":"1",
                        "qty":8
                    },

                    {
                        "name":"Fit Shirt",
                        "image":"/images/p1.jpg",
                        "price":50,
                        "product":"2",
                        "qty":1
                    },

                    {
                        "name":"Best Pants",
                        "image":"/images/p1.jpg",
                        "price":70,
                        "product":"4",
                        "qty":2
                    }
                ]


const red = [ cartItems.reduce((acc, val) => acc + val.qty, 0) ].concat([4, 7]).slice()
//console.log(red)

//const obj = { name: 'edu', age: 32};
const obj = {};
//const test = Object.entries(obj).length
const test = Object.keys(obj)
console.log(test, 'tet')




