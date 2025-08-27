import { Container } from "@mui/material";
import Header from "../components/Header";

const OrdersPage = () => {
  return (
    <>
      <Header current="orders" title="My Orders" />
      <Container maxWidth="lg">Orders Page</Container>
    </>
  );
};

export default OrdersPage;
