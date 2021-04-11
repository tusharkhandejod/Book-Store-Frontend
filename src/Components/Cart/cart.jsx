import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import bookImg from "../../Assets/Image11.png";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import "./cart.css";
import { deleteCartItem, addOrder, addCustomersDetails, addQuantity } from '../../Services/bookServices'


const useStyles = makeStyles((theme) => ({
  bookName: {
    fontSize: "13px",
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
    height: "50px",
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
    minHeight: "80px",
    minWidth: "200px",
  },
  radioGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));

export default function Cart(props) {
  const classes = useStyles();
  const [books, setBooks] = React.useState();
  const [detailForm, setDetailForm] = React.useState(false);
  const [summaryField, setSummaryField] = React.useState(false);
  const [value, setValue] = React.useState("Home");

  const [name, setName] = React.useState();
  const [nameFlag, setNameFlag] = React.useState(false);
  const [nameError, setNameError] = React.useState("");
  const [mobile, setMobile] = React.useState();
  const [mobileFlag, setMobileFlag] = React.useState(false);
  const [mobileError, setMobileError] = React.useState("");
  const [pincode, setPincode] = React.useState();
  const [pincodeFlag, setPincodeFlag] = React.useState(false);
  const [pincodeError, setPincodeError] = React.useState("");
  const [locality, setLocality] = React.useState();
  const [localityFlag, setLocalityFlag] = React.useState(false);
  const [localityError, setLocalityError] = React.useState("");
  const [address, setAddress] = React.useState();
  const [addressFlag, setAddressFlag] = React.useState(false);
  const [addressError, setAddressError] = React.useState("");
  const [city, setCity] = React.useState();
  const [cityFlag, setCityFlag] = React.useState(false);
  const [cityError, setCityError] = React.useState("");
  const [state, setState] = React.useState();
  const [stateFlag, setStateFlag] = React.useState(false);
  const [stateError, setStateError] = React.useState("");
  const [count, setCount] = React.useState(1);


  const makeInitial = () => {
    setNameFlag(false);
    setNameError("");
    setMobileFlag(false);
    setMobileError("");
    setPincodeFlag(false);
    setPincodeError("");
    setLocalityFlag(false);
    setLocalityError("");
    setAddressFlag(false);
    setAddressError("");
    setCityFlag(false);
    setCityError("");
    setStateFlag(false);
    setStateError("");
  };



  const patternCheck = () => {
    makeInitial();
    const namePattern = /[a-zA-Z][a-zA-Z ]*/;
    const mobilePattern = /^[0-9]{10}$/;
    const pincodePattern = /^[0-9]{6}$/
    const localityPattern = /[a-zA-Z][a-zA-Z ]*/;
    const addressPattern = /[a-zA-Z][a-zA-Z ]*/;
    const cityPattern = /^[A-Za-z ]{3,}$/;
    const statePattern = /^[A-Za-z ]{3,}$/;

    let isError = false;

    if (!namePattern.test(name) || name == undefined) {
      setNameFlag(true);
      setNameError("Please provide valid full name");
      isError = true;
    }
    if (!mobilePattern.test(mobile)) {
      setMobileFlag(true);
      setMobileError("Please provide valid mobile number");
      isError = true;
    }
    if (!pincodePattern.test(pincode)) {
      console.log('Pinncode not matched with pattern')
      setPincodeFlag(true);
      setPincodeError("Please provide valid pincode");
      isError = true;
    }
    if (!localityPattern.test(locality) || locality == undefined) {
      setLocalityFlag(true);
      setLocalityError("Please provide valid locality");
      isError = true;
    }
    if (!addressPattern.test(address) || address == undefined) {
      setAddressFlag(true);
      setAddressError("Please provide valid address");
      isError = true;
    }
    if (!cityPattern.test(city) || city == undefined) {
      setCityFlag(true);
      setCityError("Please provide valid city name");
      isError = true;
    }
    if (!statePattern.test(state) || state == undefined) {
      setStateFlag(true);
      setStateError("Please provide valid state name");
      isError = true;
    }
    console.log(
      "fullname : " + name + "\n"
      + " mobile : " + mobile + "\n"
      + " pincode : " + pincode + "\n"
      + " locality : " + locality + "\n"
      + " address : " + address + "\n"
      + " state : " + state + "\n"
      + " city : " + city + "\n"
    );
    return isError;
  };

  const Continue = () => {
    if (patternCheck()) {
      console.log("Error Occured");
    } else {
      console.log("Success");
      setSummaryField(true);

    }
  };

  const removeItem = (e, data) => {

    e.stopPropagation();
    deleteCartItem(data._id).then((data) => {
      console.log("Successfully deleted" + JSON.stringify(data));
      props.allCartItem();
    }).catch((err) => {
      console.log("Error while removing" + err)
    })

  }

  const handleChange = (event) => {
    setValue(event.target.value);
  };


  const AddCartQuantity = (data) => {

    console.log('data : ', data)
    console.log("cart item ID", data._id)
    console.log("quantity", count)

    let quantityToBuy = {
      "quantity": count
    }
    addQuantity(quantityToBuy, data._id).then((data) => {
      console.log('data recceived from backend of addQuantity : ', JSON.stringify(data))
      console.log("Successfully added cart item quantity");
      //  props.allCartItem();
    })
      .catch((err) => {
        console.log("Error while adding the quantity" + err)
      })
  }


  const handleIncrement = (data) => {
    console.log('data in handleIncrement : ', data)
    setCount(count => count + 1);
    AddCartQuantity(data)

  };


  const handleDecrement = (data) => {
    console.log('data in handleIncrement : ', data)
    setCount(count => count - 1);
    AddCartQuantity(data)
  };

  const CartBooks = () => {
    return (
      <div className="cartItem">
        {props.cartBooks.map((data) => (
          <div className="cartBookItem">
            <img className="cartBookImage" src={bookImg} alt="" />
            <div className="infoContainer">
              <Typography className={classes.bookName}>
                {data.book_ID.bookname}
              </Typography>
              <Typography className={classes.bookAuthor}>
                {data.book_ID.author}
              </Typography>
              <Typography className={classes.bookPrize}>
                Rs. {data.book_ID.price}
              </Typography>
              <div className="countItem">
                <IconButton
                  className={classes.countButton}
                  onClick={(e) => { handleDecrement(data) }}>-</IconButton>
                <h4>{count}</h4>
                <IconButton
                  className={classes.countButton}
                  onClick={(e) => { handleIncrement(data) }}>+</IconButton>
                <Button onClick={(e) => { removeItem(e, data) }}>Remove</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const CheckoutItem = () => {
    return (
      <div className="cartItem">
        {props.cartBooks.map((data) => (
          <div className="cartBookItem">
            <img className="cartBookImage" src={bookImg} alt="" />
            <div className="infoContainer">
              <Typography className={classes.bookName}>
                {data.book_ID.bookname}
              </Typography>
              <Typography className={classes.bookAuthor}>
                {data.book_ID.author}
              </Typography>
              <Typography className={classes.bookPrize}>
                Rs. {data.book_ID.price * data.quantity}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const checkout = (e) => {

    let customersData = {
      fullname: name,
      mobile: mobile,
      pincode: pincode,
      locality: locality,
      address: address,
      city: city,
      state: state,
      addresstype: value
    }

    console.log('customersData : ', customersData)
    addCustomersDetails(customersData).then(data => {
      console.log('data from add customer details backend : ', data)
    }).catch(err => {
      console.log('Error occured : ', err)
    })







    let order = [];
    props.cartBooks.map((data) => {
      console.log('cartBooks data : ', data)
      let order_ID = numeric_unique()
      console.log('order_ID : ', order_ID)
      localStorage.setItem("order_ID", order_ID);
      let same = {
        book_ID: data.book_ID._id,
        quantity: data.quantity,
        order_ID: order_ID
      };
      console.log('same : ', same)
      order.push(same);
    });
    let orderData = {
      orders: order,
    };
    console.log('orderData : ', orderData);

    addOrder(orderData).then((data) => {
      console.log("Successfully order Placed" + JSON.stringify(data));
      props.setOrderPlaced(data);
      props.nextPath(e, "../dashboard/orderPlaced");
    })
      .catch((err) => {
        console.log("Error occured while placing order" + err);
      });

    props.cartBooks.map((book) => removeItem(e, book));
  };


  function numeric_unique() {
    let uniqueNumber = Math.floor(Math.random() * 10000000000);
    var str1 = "Order_ID(";
    var str2 = uniqueNumber;
    var str3 = ")";
    var res = str1.concat(str2, str3);
    console.log('res : ', res)
    return res;
  }

  return (
    <div className="cartBody">
      <div className="cartContainer">
        My Cart ({props.cartBooks.length})
        <CartBooks />
        {detailForm ? (
          ""
        ) : (
          <div className="blockButton">
            <Button
              variant="contained"
              color="primary"
              className={classes.placeButton}
              onClick={() => setDetailForm(true)}
            >
              PLACE ORDER
            </Button>
          </div>
        )}
      </div>
      <div className="cartContainer">
        Customer Details
        {detailForm ? (
          <>
            <span className="inlineField">
              <div className="inputField">

                <TextField
                  value={name}
                  variant="outlined"
                  onChange={(e) => setName(e.target.value)}
                  error={nameFlag}
                  helperText={nameError}
                  fullWidth
                  className={classes.input}
                  label="Full Name"
                />
              </div>
              <div className="inputField">

                <TextField
                  value={mobile}
                  variant="outlined"
                  onChange={(e) => setMobile(e.target.value)}
                  error={mobileFlag}
                  helperText={mobileError}
                  fullWidth
                  className={classes.input}
                  type="number"
                  label="Mobile Number"
                />
              </div>
            </span>
            <span className="inlineField">
              <div className="inputField">

                <TextField
                  value={pincode}
                  variant="outlined"
                  onChange={(e) => setPincode(e.target.value)}
                  error={pincodeFlag}
                  helperText={pincodeError}
                  fullWidth
                  className={classes.input}
                  type="number"
                  label="Pincode"
                />
              </div>
              <div className="inputField">

                <TextField
                  value={locality}
                  variant="outlined"
                  onChange={(e) => setLocality(e.target.value)}
                  error={localityFlag}
                  helperText={localityError}
                  fullWidth
                  className={classes.input}
                  label="Locality"
                />
              </div>
            </span>
            <span className="inlineField">
              <div className="inputAdderssField">

                <TextField
                  value={address}
                  variant="outlined"
                  onChange={(e) => setAddress(e.target.value)}
                  error={addressFlag}
                  helperText={addressError}
                  fullWidth
                  multiline
                  className={classes.inputAddress}
                  label="Address"
                />
              </div>
            </span>
            <span className="inlineField">
              <div className="inputField">

                <TextField
                  value={city}
                  variant="outlined"
                  onChange={(e) => setCity(e.target.value)}
                  error={cityFlag}
                  helperText={cityError}
                  fullWidth
                  className={classes.input}
                  label="City/Town"
                />
              </div>
              <div className="inputField">

                <TextField
                  value={state}
                  variant="outlined"
                  onChange={(e) => setState(e.target.value)}
                  error={stateFlag}
                  helperText={stateError}
                  fullWidth
                  className={classes.input}
                  label="State"
                />
              </div>
            </span>
            <span className="inlineField">
              <div className="inputField">
                Type
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="gender"
                    name="gender1"
                    value={value}
                    onChange={handleChange}
                    className={classes.radioGroup}
                  >
                    <FormControlLabel
                      value="Home"
                      control={<Radio />}
                      label="Home"
                    />
                    <FormControlLabel
                      value="Work"
                      control={<Radio />}
                      label="Work"
                    />
                    <FormControlLabel
                      value="Other"
                      control={<Radio />}
                      label="Other"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </span>
            {summaryField ? (
              ""
            ) : (
              <div className="blockButton">
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.placeButton}
                  onClick={Continue}
                >
                  CONTINUE
                </Button>
              </div>
            )}
          </>
        ) : (
          ""
        )}
      </div>

      <div className="cartContainer">
        Order Summary
        {summaryField ? (
          <>
            <CheckoutItem />
            <div className="blockButton">
              <Button
                variant="contained"
                color="primary"
                onClick={checkout}
                className={classes.placeButton}
              >
                CHECKOUT
              </Button>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}