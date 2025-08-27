import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { verifyPayment } from "../utilities/api_payment";

const PaymentVerify = () => {
  const navigate = useNavigate();
  // 1. call the search params hook
  const [searchParams] = useSearchParams(); // extract value from url string
  const billplz_id = searchParams.get("billplz[id]");
  const billplz_paid = searchParams.get("billplz[paid]");
  const billplz_paid_at = searchParams.get("billplz[paid_at]");
  const billplz_x_signature = searchParams.get("billplz[x_signature]");

  useEffect(() => {
    verifyPayment(
      billplz_id,
      billplz_paid,
      billplz_paid_at,
      billplz_x_signature
    )
      .then((updatedOrder) => {
        // clear the cart
        localStorage.removeItem("cart");
        // redirect the users to order page
        navigate("/orders");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      Please wait while we verify your transaction. Please dont click the go
      back button or close the browser.
    </>
  );
};

export default PaymentVerify;
