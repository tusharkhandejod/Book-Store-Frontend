import React from "react";
import "./orderPlaced.css";
import placed from "../../Assets/orderplaced.jpg";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  text: {
    fontSize: "17px",
  },
  shopingButton: {
    marginTop: "1%",
    backgroundColor: "",
  },
}));

export default function OrderPlaced(props) {
  const classes = useStyles();
  const random = localStorage.getItem("order_ID");
  return (
    <div className="placedBody">
      <img className="successfulImage" src={placed} alt="" />
      <Typography className={classes.text}>
        hurry!!!your order is confirmed{" "}
      </Typography>
      <Typography className={classes.text}>
        {" "}
        the order id is #{random} save the order id for
      </Typography>
      <Typography className={classes.text}>future communication </Typography>

      <table className="orderTable">
        <tr>
          <th>Email Us</th>
          <th>Contact Us</th>
          <th>Address</th>
        </tr>
        <tr>
          <td>admin@bookstore.com</td>
          <td>+91 9158331575</td>
          <td>
            Mumbai Maharastra
          </td>
        </tr>
      </table>
      <Button
        className={classes.shopingButton}
        onClick={(e) => {
          props.nextPath(e, "../dashboard");
        }}
        variant="contained"
        color="primary"
      >
        CONTINUE SHOPPING
      </Button>
    </div>
  );
}