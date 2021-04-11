import React from "react";
import bookImg from "../../Assets/Image11.png";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import AppBar from "../AppBar/AppBar";
import "../Wishlist/wishlist.css";
import { getWishListBooks, deleteWishList } from '../../Services/bookServices'


const useStyles = makeStyles((theme) => ({
  bookName: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  bookAuthor: {
    fontSize: "12px",
  },
  bookPrize: {
    fontSize: "13px",
    fontWeight: "bold",
  },
  countInput: {
    border: "1px lightgray solid",
    width: "15%",
    height: "30px",
  },
  countButton: {
    height: "5px",
    margin: "5px",
    border: "1px solid lightgray",
    width: "5px",
  },
  placeButton: {
    height: "40px",
    position: "relative",
  },
  inputField: {
    border: "1px solid lightgray",
    borderRadius: "5px",
    padding: "5px",
  },
  inputAdderss: {
    border: "1px solid lightgray",
    borderRadius: "5px",
    padding: "5px",
    minHeight: "43px",
  },
  radioGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));
export default function CartBooks(props) {
  const [books, setBooks] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState(0);
  const [postsPerPage] = React.useState(11);
  const [currentPage, setCurrentPage] = React.useState(1);
  const classes = useStyles();

  React.useEffect(() => {
    getWishList();
  }, []);

  const getWishList = () => {
    getWishListBooks()
      .then((data) => {
        console.log("get wishlist ", data);
        setData(data.data.result);
        const dataArray = data.data.data;
        const datashow = [];
        dataArray.map((data) => {
          if (data.product_id !== null) {
            datashow.push(data);
          }
        });
        console.log(datashow);
        setBooks(datashow);
        books.map((data) => (data.isCart = false));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeFromWishList = (e, data) => {
    console.log(data);
    e.stopPropagation();
    
      deleteWishList(data._id)
      .then((data) => {
        console.log("Successfully deleted" + JSON.stringify(data));
        getWishList();
      })
      .catch((err) => {
        console.log("Error while removing" + err);
      });
  };
  

  const indexOfLastBook = currentPage * postsPerPage;
  const indexOfFirstBook = indexOfLastBook - postsPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  return (
    <div>
      <div className="wishBody">
      <div className="wishContainer">
        <div className="header">
          WishList Books{" "}
          <font className="booksize"> ({books.length} items) </font>{" "}
        </div>
        {currentBooks.map((data) => (
          <div className="wishItem">
            <div className="wishBookItem">
              <img className="wishBookImage" src={bookImg} alt="" />
              <div className="wishinfoContainer">
                <Typography className={classes.bookName}>
                {data.book_ID.bookname}
                </Typography>
                <Typography className={classes.bookAuthor}>
                {data.book_ID.author}
                </Typography>
                <Typography className={classes.bookAuthor}>
                Rs. {data.book_ID.price}
                </Typography>
                <Typography className={classes.bookAuthor}>
                  {data.quantity}
                </Typography>
                <Typography className={classes.bookPrize}>
                  Rs.{data.book_ID.price}
                </Typography>
              </div>
            
            </div>
            <div className="deleteicon">
            <DeleteIcon
              onClick={(e) => {
                removeFromWishList(e, data);
              }}
            />
          </div>
          </div> 
        ))}
      </div>
    </div>
    </div>
  );
}
