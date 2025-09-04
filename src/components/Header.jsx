import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";

const Header = (props) => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["currentuser"]);
  const { current, title } = props;
  const { currentuser } = cookies;
  return (
    <Box
      sx={{
        py: 3,
        // mx: 2,
        display: "flex-column",
        justifyContent: "center",
        alignItems: "center",
        borderBottom: "1px solid lightgrey",
      }}
    >
      <Box
        sx={{
          display: "flex-column",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Typography sx={{ fontWeight: "bold" }} variant="h4">
          {title}
        </Typography>
        {currentuser && (
          <Typography sx={{ mt: 0 }} variant="h6">
            Hello, {currentuser.name}!<br /> ({currentuser.email})
          </Typography>
        )}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2, gap: 2 }}>
        <Button
          component={Link}
          to="/"
          variant={current === "home" ? "contained" : "outlined"}
          // disabled={current === "checkout"}
        >
          Home
        </Button>
        <Button
          component={Link}
          to="/cart"
          variant={current === "cart" ? "contained" : "outlined"}
          // disabled={current === "checkout"}
        >
          Cart
        </Button>
        <Button
          component={Link}
          to="/orders"
          variant={current === "orders" ? "contained" : "outlined"}
          // disabled={current === "checkout"}
        >
          My Orders
        </Button>
        <Button
          component={Link}
          to="/categories"
          variant={current === "categories" ? "contained" : "outlined"}
          // disabled={current === "checkout"}
        >
          Categories
        </Button>
        {currentuser ? (
          <>
            <Button
              variant="outlined"
              onClick={() => {
                removeCookie("currentuser");
                navigate("/");
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button
              component={Link}
              to="/login"
              variant={current === "login" ? "contained" : "outlined"}
              // disabled={current === "checkout"}
            >
              Login
            </Button>
            <Button
              component={Link}
              to="/signup"
              variant={current === "signup" ? "contained" : "outlined"}
              // disabled={current === "checkout"}
            >
              Signup
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Header;
