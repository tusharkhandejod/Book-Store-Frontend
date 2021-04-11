import axios from "axios";


export function getBooks() {

    try {
        console.log("This is the getBooks part");
        let data3 = axios.get(`http://localhost:5000/api/bookstore_user/book/getAllBooks`, { headers: { token: localStorage.getItem('bookStoreToken') } });
        return data3;
    } catch (error) {
        return error;
    }

};


export function getCartItem() {

    let data4 = axios.get(`http://localhost:5000/api/book/get_cart_items`, { headers: { token: localStorage.getItem('bookStoreToken') } })
    return data4;
}



export function addToCart(id) {
    console.log('We are inside the bookServices addToCart function : ', id)
    const user = localStorage.getItem("bookStoreToken")
    console.log('user : ', user)
    let data5 = axios.post(`http://localhost:5000/api/book/add_to_cart/${id}`, false, {
        headers: {
            "token": `${user}`,
        },
    });
    console.log('data5 in addToCart : ', data5)
    return data5;
}


export function addCustomersDetails(data) {
    console.log('We are inside the bookServices addCustomersDetails function : ', data)
    let data8 = axios.post(`http://localhost:5000/api/bookstore_user/getting_customer_details`, data, { headers: { token: localStorage.getItem('bookStoreToken') } })
    return data8;
}


export function addOrder(data) {
    console.log('We are inside the bookServices addOrder function : ', data)
    let data6 = axios.post(`http://localhost:5000/api/add/order_details`, data, { headers: { token: localStorage.getItem('bookStoreToken') } })
    return data6;
}

export function deleteCartItem(id) {
    console.log('We are inside the bookServices deleteCartItem function : ', id)
    return axios.delete(`http://localhost:5000/api/book/remove_cart_item/${id}`, { headers: { token: localStorage.getItem('bookStoreToken') } })

}

export function searchItem(inputfield) {
    console.log('We are inside the bookServices searchItem function : ', inputfield)
    let data7 = axios.get(`http://localhost:5000/api/bookstore_user/books?input=${inputfield}`)
    console.log('data7 : ', data7)
    return data7;
}


// export function SortedBy() {
//     console.log('We are inside the bookServices SortedByArrival function : ')
//     let data9 = axios.get(`http://localhost:5000/api/bookstore_user/books/sort_by_newest_first`)
//     return data9;
// }


export function addToWishlist(id) {
    console.log('We are inside the bookServices addToWishlist function : ', id)
    const user = localStorage.getItem("bookStoreToken")
    console.log('user : ', user)
    let data10 = axios.post(`http://localhost:5000/api/book/add_to_wishlist/${id}`, false, {
        headers: {
            "token": `${user}`,
        },
    });

    return data10;
}


export function getWishListBooks() {
    console.log('We are inside the bookServices getWishListBooks function')
    let data11 = axios.get(`http://localhost:5000/api/book/get_wishlist_items`, { headers: { token: localStorage.getItem('bookStoreToken') } })
    return data11;
}


export function deleteWishList(id) {
    console.log('We are inside the bookServices deleteWishList function : ', id)
    return axios.delete(`http://localhost:5000/api/book/remove_wishlist_item/${id}`, { headers: { token: localStorage.getItem('bookStoreToken') } })

}


export function addQuantity(data, cartItem_id) {
    const user = localStorage.getItem("bookStoreToken")
    console.log('data : ', data);
    console.log(user)
    console.log('cartItem_id : ',cartItem_id);
    return axios.put(`http://localhost:5000/api/book/cart_item_quantity/${cartItem_id}`, data, {
        headers: {
            "token": `${user}`,
        },
    });
};
