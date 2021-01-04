const cartItems = [
                    {
                        "name":"Slim Shirt",
                        "image":"/images/p1.jpg",
                        "price":20,
                        "product":"1",
                        "qty":3
                    },

                    {
                        "name":"Fit Shirt",
                        "image":"/images/p1.jpg",
                        "price":45,
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


const red = [ cartItems.reduce((acc, val) => acc + val.qty, 0) ].concat([4, 2])
console.log(red)

const tot = cartItems.reduce((acc, val) => acc + (val.qty * val.price), 0)
console.log(tot)




