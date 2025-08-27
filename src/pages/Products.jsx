import Box from "@mui/material/Box";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import { deleteProduct, getProducts } from "../utilities/api_products";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Header from "../components/Header";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { AddToCart } from "../utilities/cart";
import { useNavigate } from "react-router";

export default function Products() {
  const navigate = useNavigate();
  // to store data from /products API
  const [products, setProducts] = useState([]);
  // to track what page the user is in
  const [page, setPage] = useState(1);
  // to store what category to filter
  const [category, setCategory] = useState("All");

  useEffect(() => {
    // get products from API
    getProducts(category, page).then((data) => {
      setProducts(data);
    });
  }, [category, page]);

  const handleProductDelete = (id) => {
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
        await deleteProduct(id);
        // delete product from the state
        // method 1
        // delete manually from the state
        // setProducts(products.filter((p) => p._id !== id));

        // method 2
        // get new data from backend
        const updatedProducts = await getProducts(category, page);
        setProducts(updatedProducts);
        toast.success("Product has been deleted.");
      }
    });
  };

  const handleAddToCart = async (product) => {
    try {
      await AddToCart(product);
      // navigate("/cart");
      toast.success(`"${product.name}" has been added to cart.`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // sir's version in product page
  const addToCart = (product) => {
    // 1. get the current cart data from local storage
    const cartInLocalStorage = localStorage.getItem("cart");
    const cartData = cartInLocalStorage ? JSON.parse(cartInLocalStorage) : [];
    // 2. find out if selected id product already exist or not
    const selected = cartData.find((item) => item._id === product._id);
    if (selected) {
      selected.quantity += 1;
      // 3. if product already exists, just inccrease quantity
    } else {
      // 4. if not exist, add product to cart
      cartData.push({ ...product, quantity: 1 });
    }

    // update the cart in localstorage with latest data
    localStorage.setItem("cart", JSON.parse(cartData));
  };

  return (
    <>
      <Box
        sx={{
          mx: 3,
          marginBottom: 3,
        }}
      >
        {/* heaaaaaaaderr */}
        <Header current="home" title="Welcome To My Store" />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            // px: 2,
            py: 3,
          }}
        >
          <Typography sx={{ fontWeight: "bold" }} variant="h5">
            Products
          </Typography>
          <Box sx={{ display: "flex", gap: "10px" }}>
            <Button
              sx={{ textTransform: "none" }}
              color="success"
              variant="contained"
              component={Link}
              to="/products/new"
            >
              Add New
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            // px: 2,
          }}
        >
          <FormControl sx={{ minWidth: "250px" }}>
            <InputLabel
              id="demo-simple-select-label"
              sx={{ backgroundColor: "white", paddingRight: "10px" }}
            >
              Filter By Genre
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Genre"
              onChange={(event) => {
                setCategory(event.target.value);
                // reset the page back to one
                setPage(1);
              }}
            >
              <MenuItem value="All">All Categories</MenuItem>
              <MenuItem value="Accessories">Accessories</MenuItem>
              <MenuItem value="Games">Games</MenuItem>
              <MenuItem value="Consoles">Consoles</MenuItem>
              <MenuItem value="Subscriptions">Subscriptions</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Products table */}
        <Box sx={{ width: "100%", paddingTop: 3 }}>
          <Grid
            container
            rowSpacing={3}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {products.map((product) => (
              <Grid key={product._id} size={{ sm: 12, md: 6, lg: 4 }}>
                <Card sx={{ padding: 1 }}>
                  <CardContent>
                    <Typography
                      gutterBottom
                      sx={{
                        fontWeight: "bold",
                        fontSize: 18,
                        minHeight: "64px",
                      }}
                    >
                      {product.name}
                    </Typography>
                    <Box
                      sx={{
                        my: 2,
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Chip
                        variant="outlined"
                        color="success"
                        label={`$${product.price}`}
                      />
                      <Chip
                        variant="outlined"
                        color="warning"
                        label={product.category}
                      />
                    </Box>
                    <Button
                      sx={{ width: "100%", textTransform: "none" }}
                      color="primary"
                      variant="contained"
                      onClick={() => {
                        handleAddToCart(product);
                      }}
                    >
                      Add To Cart
                    </Button>
                    <Box
                      sx={{
                        width: "100%",
                        paddingTop: 2,
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Button
                        sx={{ textTransform: "none", borderRadius: "20px" }}
                        variant="contained"
                        size="small"
                        component={Link}
                        to={`/products/${product._id}/edit`}
                      >
                        Edit
                      </Button>
                      <Button
                        sx={{ textTransform: "none", borderRadius: "20px" }}
                        variant="contained"
                        size="small"
                        color="error"
                        onClick={() => {
                          handleProductDelete(product._id);
                        }}
                      >
                        Delete
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
        {products.length === 0 ? (
          <Typography variant="h5" align="center" py={3}>
            No more products found.
          </Typography>
        ) : null}
        <Box
          sx={{
            pt: 2,
            pb: 2,
            display: "flex",
            justifyContent: "center",
            gap: 2,
            alignItems: "center",
          }}
        >
          <Button
            disabled={page === 1}
            variant="contained"
            onClick={() => setPage(page - 1)}
          >
            Previous
          </Button>
          <span>Page: {page}</span>
          <Button
            disabled={products.length === 0} // the button will be disabled if nomore product
            variant="contained"
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </Box>
      </Box>
    </>
  );
}
