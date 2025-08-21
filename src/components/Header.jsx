import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router";

const Header = (props) => {
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
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography sx={{ fontWeight: "bold" }} variant="h4">
          {props.title}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2, gap: 2 }}>
        <Button component={Link} to="/" variant="outlined">
          Home
        </Button>
        <Button component={Link} to="/cart" variant="contained">
          Cart
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
