import Header from "../components/Header";
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
import Swal from "sweetalert2";
import { deleteProduct } from "../utilities/api_products";
import { toast } from "sonner";
import { deleteItemFromCart } from "../utilities/cart";
import { useNavigate } from "react-router";

const CartPage = () => {
  const navigate = useNavigate();
  const productInCartLocalStorage = localStorage.getItem("cart");
  const [productIncart, setProductIncart] = useState(
    productInCartLocalStorage ? JSON.parse(productInCartLocalStorage) : []
  );

  let total = 0;
  productIncart.forEach((p) => {
    total += p.price * p.quantity;
  });
  total = total.toFixed(2);

  if (!productIncart) {
    return (
      <>
        <Header title="Welcome To My Store" />
        <Container sx={{ textAlign: "center" }} maxWidth="sm">
          <Typography variant="h3" align="center" mb={2} mt={2} color="error">
            {error}
          </Typography>
          <Button variant="contained" component={Link} to="/">
            Go back to home
          </Button>
        </Container>
      </>
    );
  }

  const handleProductInCartDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it.",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const updatedCart = await deleteItemFromCart(id);
        setProductIncart(updatedCart);
        toast.success("Product has been removed from cart.");
      }
    });
  };

  return (
    <>
      <Box
        sx={{
          mx: 3,
          marginBottom: 3,
        }}
      >
        <Header title="Cart" />
        <TableContainer sx={{ mt: 3 }} component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="right">Action</TableCell>
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
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {p.name}
                    </TableCell>
                    <TableCell align="right">${p.price}</TableCell>
                    <TableCell align="right">{p.quantity}</TableCell>
                    <TableCell align="right">${p.price * p.quantity}</TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={() => {
                          handleProductInCartDelete(p._id);
                        }}
                        variant="contained"
                        color="error"
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">${total}</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          sx={{ display: "flex", justifyContent: "center", mt: 3 }}
          variant="contained"
        >
          Checkout
        </Button>
      </Box>
    </>
  );
};

export default CartPage;
