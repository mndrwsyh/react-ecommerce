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
import { getProducts } from "../utilities/api";
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

export default function Products() {
  // to store data from /movies API
  const [products, setProducts] = useState([]);
  // to store what genre to filter
  const [category, setCategory] = useState("All");

  useEffect(() => {
    // get movies from API
    getProducts(category).then((data) => {
      setProducts(data);
    });
  }, [category]);
  return (
    <>
      <Box
        sx={{
          mx: 3,
          marginBottom: 3,
        }}
      >
        {/* heaaaaaaaderr */}
        <Box
          sx={{
            py: 3,
            // mx: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderBottom: "1px solid lightgrey",
          }}
        >
          <Typography sx={{ fontWeight: "bold" }} variant="h4">
            Welcome to My Store
          </Typography>
        </Box>
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
                      sx={{ fontWeight: "bold", fontSize: 18 }}
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
                      >
                        Edit
                      </Button>
                      <Button
                        sx={{ textTransform: "none", borderRadius: "20px" }}
                        variant="contained"
                        size="small"
                        color="error"
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

        {/* <TableContainer sx={{ marginBottom: 5 }} component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="right">Genre</TableCell>
                <TableCell align="right">Rating</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {movies.map((movie) => (
                <TableRow
                  key={movie._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="movie">
                    {movie.title}
                  </TableCell>
                  <TableCell align="right">{movie.genre}</TableCell>
                  <TableCell align="right">{movie.rating}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer> */}
      </Box>
    </>
  );
}
