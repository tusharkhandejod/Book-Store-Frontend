import React from "react";
import "../displayBooks/displayBook.css";
import { makeStyles } from "@material-ui/core/styles";
import bookImg from "../../Assets/Image11.png";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Pagination from "../Pagination/pagination";
import { getBooks, addToCart, addToWishlist } from '../../Services/bookServices'


const useStyles = makeStyles((theme) => ({
    bookName: {
        fontSize: "13px",
        fontWeight: "bold",
    },
    bookAuthor: {
        fontSize: "12px",
    },
    bookQuantity: {
        fontSize: "12px",
    },
    bookPrize: {
        fontSize: "13px",
        fontWeight: "bold",
    },
    addToBagButton: {
        padding: "3px 4px 3px 4px",
        margin: "5px",
        width: "90px",
        height: "35px",
        fontSize: "11px",
        backgroundColor: "#A03037",
        color: "#ffff",
        borderRadius: "2px",
    },
    addedBagButton: {
        backgroundColor: "#1976D2",
        width: "170px",
        height: "40px",
        margin: "5px",
        color: "#ffff",
        borderRadius: "2px",
        fontSize: "13px",
    },
    ouOfStockButton: {
        backgroundColor: "#A9A9A9",
        width: "170px",
        height: "40px",
        margin: "5px",
        color: "black",
        borderRadius: "2px",
        fontSize: "13px",
    },
    wishListButton: {
        padding: "3px 4px 3px 4px",
        margin: "5px",
        width: "80px",
        height: "35px",
        fontSize: "13px",
        borderRadius: "2px",
        fontWeight: "bold",
    },

    optionSelect: {
        padding: "5px 5px",
    },
}));

export default function DisplayNotes(props) {
    const classes = useStyles();
    const [books, setBooks] = React.useState([]);
    const [data, setData] = React.useState(0);
    const [sort, setSort] = React.useState({ type: "" });
    const [postsPerPage] = React.useState(10);
    const [currentPage, setCurrentPage] = React.useState(1);


    React.useEffect(() => {
        getAllBooks();
    }, []);

    const getAllBooks = () => {
        getBooks().then((data) => {
            console.log('data from back end : ', data)
            setBooks(data.data.data);
            setData(data.data.data);
            books.map((data));
        })
            .catch((err) => {
                console.log(err);
            });
    };


    const handleChange = (event) => {
        const name = event.target.name;
        setSort({
            ...sort,
            [name]: event.target.value,
        });
        console.log(sort.type);
        switch (sort.type) {
            case "0":
                setBooks(data);
                break;
            case "1":
                console.log(1)
                setBooks(books.sort((a, b) => (a.price > b.price ? -1 : 1)));
                setBooks(data);
                break;
            case "2":
                console.log(2)
                setBooks(books.sort((a, b) => (a.price > b.price ? 1 : -1)));
                setBooks(data);
                break;


        }
    };

    const addedToCart = (e, data) => {
        e.stopPropagation();
        const id = data._id;
        data.isCart = true;

        addToCart(id).then((data) => {
            console.log(data);
            props.allCartItem();

        }).catch((err) => {
            console.log(err);
        });

    };


    const addedToWishList = (e, data) => {
        e.stopPropagation();
        console.log('data : ', data)
        const id = data._id;
        data.isWishlist = true;

        addToWishlist(id).then((data) => {
            console.log('data from add to wishlist backend : ', data);
            props.allCartItem();

        }).catch((err) => {
            console.log(err);
        });


    }

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastBook = currentPage * postsPerPage;
    const indexOfFirstBook = indexOfLastBook - postsPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);


    return (
        <div className="displayBook">
            <span className="topContent">
                <div>
                    Books <font className="bookSize"> ({books.length} items) </font>{" "}
                </div>
                <div>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <Select
                            className={classes.optionSelect}
                            native
                            value={sort.type}
                            onChange={handleChange}
                            inputProps={{
                                name: "type",
                            }}
                        >
                            <option value={0}>Sort by relevance</option>
                            <option value={1}>Price: low to high</option>
                            <option value={2}>Price: high to low</option>

                        </Select>
                    </FormControl>
                </div>
            </span>
            <div className="allBooks">
                {currentBooks.map((data) => (
                    <div className="bookContainer">
                        {props.cartBooks.map((cart) => {
                            if (cart._id === data._id) {
                                data.isCart = true;
                            }
                        })}
                        <div className="imageContainer">
                            <img className="bookImage" src={bookImg} alt="" />
                        </div>
                        <div className="infoContainer">
                            <Typography className={classes.bookName}>
                                {data.bookname}
                            </Typography>
                            <Typography className={classes.bookAuthor}>
                                {data.author}
                            </Typography>
                            <Typography className={classes.bookPrize}>
                                Rs. {data.price}
                            </Typography>
                        </div>
                        {data.isCart ? (
                            <Button variant="contained" className={classes.addedBagButton}>
                                Added To Cart
                            </Button>
                        ) : data.isWishlist ? (
                            <Button variant="contained" className={classes.addedBagButton}>
                                Added To Wishlist
                            </Button>
                        ) : data.quantity == 0 ? (
                            <Button variant="contained" className={classes.ouOfStockButton}>
                                Out of Stock
                            </Button>
                        ) :  (
                            <div className="buttonContainer">
                                <Button
                                    variant="contained"
                                    onClick={(e) => addedToCart(e, data)}
                                    className={classes.addToBagButton}
                                >
                                    Add to cart
                                </Button>
                                <Button variant="outlined"
                                    className={classes.wishListButton}
                                    onClick={(e) => { addedToWishList(e, data) }}
                                >
                                    WishList
                                </Button>
                            </div>

                        )}
                        <div className="descClass">
                            <Typography className={classes.bookName}>Book Details</Typography>
                            <Typography className={classes.bookName}>{data.bookname}</Typography>
                            {data.description}
                        </div>
                    </div>
                ))}
                <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={books.length}
                    paginate={paginate}
                ></Pagination>
            </div>
        </div>
    );
}