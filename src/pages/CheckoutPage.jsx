import Header from "../components/Header";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { toast } from "sonner";
import { getCart } from "../utilities/cart";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import validator from "email-validator";
import { createOrder } from "../utilities/api_orders";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const CheckoutPage = () => {
  //   const navigate = useNavigate();
  // const productInCartLocalStorage = localStorage.getItem("cart");
  const [productIncart, setProductIncart] = useState(getCart);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const getCartTotal = () => {
    let total = 0;
    productIncart.forEach((p) => {
      total += p.price * p.quantity;
    });
    total = total.toFixed(2);
    return total;
  };

  const handleCheckout = async () => {
    // 1. make sure name and email field is not empty
    if (!name || !email) {
      toast.error("Please fill up all the fields.");
    } else if (!validator.validate(email)) {
      // 2. make sure the email is valid
      toast.error("Please use a valid email address.");
    } else {
      // 3. do checkout
      try {
        // open loading backdrop
        setLoading(true);
        // 3.1 get total price
        const totalPrice = getCartTotal();
        // 3.2 create order
        const response = await createOrder(
          name,
          email,
          productIncart,
          totalPrice
        );
        // 3.3 get the billpls url from the response
        const billplz_url = response.billplz_url;
        // 3.4 redirect the user to billpls payment page
        window.location.href = billplz_url;
      } catch (error) {
        toast.error(error.message);
        // close the loading backdrop
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Box
        sx={{
          mx: 3,
          marginBottom: 3,
        }}
      >
        <Header current="checkout" title="Checkout" />
        <Grid container spacing={2} mt={3} textAlign={"center"}>
          <Grid item size={{ xs: 12, md: 6, lg: 6 }}>
            <Typography variant="h5" mb={4}>
              Contact Information
            </Typography>
            <Box mb={2}>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></TextField>
            </Box>
            <Box mb={2}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></TextField>
            </Box>
            <Box mb={2}>
              <Button fullWidth variant="contained" onClick={handleCheckout}>
                Pay ${getCartTotal()}
              </Button>
            </Box>
          </Grid>
          <Grid item size={{ xs: 12, md: 6, lg: 6 }}>
            <Typography variant="h5">Your Order Summary</Typography>
            <TableContainer sx={{ mt: 3 }} component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {productIncart.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        No items in cart yet.
                      </TableCell>
                    </TableRow>
                  ) : (
                    productIncart.map((p) => (
                      <TableRow
                        key={p._id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {p.name} ({p.quantity})
                        </TableCell>
                        <TableCell align="right">
                          ${p.price * p.quantity}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell colSpan={1}></TableCell>
                    <TableCell align="right">${getCartTotal()}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default CheckoutPage;
