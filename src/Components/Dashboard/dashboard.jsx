import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "../AppBar/AppBar";
import Books from "../displayBooks/displayBook";
import { Switch, Route } from "react-router-dom";
import ProtectedRoutes from "../protectedRoutes/protectedRoutes";
import PlacedOrder from "../OrderPlaced/orderPlaced";
import Cart from "../Cart/cart";
import Wishlist from '../Wishlist/wishlist'
import Footer from '../Footer/footer'
import { getCartItem } from "../../Services/bookServices"


const useStyles = makeStyles((theme) => ({
  dashboardMain: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
  },

}));

export default function Dashboard(props) {
  const classes = useStyles();
  const [show, setShow] = React.useState(false);
  const [cartBooks, setCartBooks] = React.useState([]);
  const [orderPlaced, setOrderPlaced] = React.useState([]);

  React.useEffect(() => {
    allCartItem();
  }, []);

  const nextPath = (e, path) => {
    e.stopPropagation();
    props.history.push(path);
  };

  const allCartItem = () => {

    getCartItem()
      .then((data) => {
        console.log('We are inside of getCartItem : ',data)
        const dataArray = data.data.data 
        const dataShow = []
        dataArray.map((data)=>{
          if (data._id !== null) {
            dataShow.push(data);
          }
        })
        console.log('getcart : ',dataArray);
        console.log('dataShow : ',dataShow)
        setCartBooks(dataShow);
        
        
      })
      .catch((err) => {
        console.log(err);
      });

  };


  return (
    <div className={classes.dashboardMain}>
      <AppBar
        totalCartItem={cartBooks.length}
        nextPath={nextPath}
        setShow={setShow}
      />
      
      <Switch>
        <Route path="/dashboard" exact>
          <Books cartBooks={cartBooks} allCartItem={allCartItem} />
        </Route>
        <ProtectedRoutes path="/dashboard/cart" exact>
          <Cart
            cartBooks={cartBooks}
            allCartItem={allCartItem}
            nextPath={nextPath}
            setOrderPlaced={setOrderPlaced}
          />
        </ProtectedRoutes>
        <ProtectedRoutes path="/dashboard/wishlist" exact>
          <Wishlist  nextPath={nextPath} />
        </ProtectedRoutes>
        <ProtectedRoutes path="/dashboard/orderPlaced" exact>
          <PlacedOrder orderPlaced={orderPlaced} nextPath={nextPath} />
        </ProtectedRoutes>
      </Switch>
      <Footer />
    </div>
  );


}