import { useState, useEffect } from "react";
import { Container, Select, Typography } from "@mui/material";
import Header from "../components/Header";
import { getOrders } from "../utilities/api_orders";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Swal from "sweetalert2";
import MenuItem from "@mui/material/MenuItem";
import { updateOrder } from "../utilities/api_orders";
import { deleteOrder } from "../utilities/api_orders";
import { toast } from "sonner";

const OrdersPage = () => {
  // store orders data from api
  const [orders, setOrders] = useState([]);

  // call the api
  useEffect(() => {
    getOrders()
      .then((data) => {
        setOrders(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); // call only once when the page load

  console.log(orders);

  const handleDeleteOrder = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it.",
    }).then(async (result) => {
      // once user delete, then we get the product
      if (result.isConfirmed) {
        // delete product via api
        await deleteOrder(id);
        // delete product from the state
        // method 1
        // delete manually from the state
        setOrders(orders.filter((o) => o._id !== id));

        // method 2
        // get new data from backend
        // const updatedOrder = await getOrders(category, page);
        // setProducts(updatedOrder);
        toast.success("Order has been deleted.");
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
        <Header current="orders" title="My Orders" />
        <TableContainer sx={{ mt: 3 }} component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Customer</TableCell>
                <TableCell align="left">Product</TableCell>
                <TableCell align="left">Total Amount</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Payment Date</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No orders yet.
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((o) => (
                  <TableRow
                    key={o._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Typography>{o.customerName}</Typography>
                      <Typography>{o.customerEmail}</Typography>
                    </TableCell>
                    <TableCell align="left">
                      {o.products.map((p) => (
                        <Typography key={p._id}>{p.name}</Typography>
                      ))}
                    </TableCell>
                    <TableCell align="left">${o.totalPrice}</TableCell>
                    <TableCell align="left">
                      <Select
                        sx={{ minWidth: "200px" }}
                        disabled={o.status === "pending"}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        defaultValue={o.status}
                        onChange={async (event) => {
                          await updateOrder(o._id, event.target.value);
                        }}
                      >
                        <MenuItem
                          disabled={o.status !== "pending"}
                          value="pending"
                        >
                          Pending
                        </MenuItem>
                        <MenuItem value="paid">Paid</MenuItem>
                        <MenuItem value="failed">Failed</MenuItem>
                        <MenuItem value="completed">Completed</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell align="left">{o.paid_at}</TableCell>
                    <TableCell align="left">
                      <Button
                        onClick={() => {
                          handleDeleteOrder(o._id);
                        }}
                        variant="outlined"
                        color="error"
                        sx={{
                          display: o.status === "pending" ? "block" : "none",
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell colSpan={3}></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {/* <Container maxWidth="lg">Orders Page</Container> */}
    </>
  );
};

export default OrdersPage;
