import Header from "../components/Header";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useState, useEffect, use } from "react";
import { addProduct } from "../utilities/api_products";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { Toaster, toast } from "sonner";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router";

const ProductAdd = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");

  const handleFormSubmit = async (event) => {
    // event.preventDefault();
    // 1. check for error
    if (!name || !price || !category) {
      toast.error("Please fill up the required fields.");
    }

    try {
      // 2. trigger the api to create new product
      await addProduct(name, description, price, category);

      // 3. if successfull, redirect user back to homepage and show success message
      navigate("/");
      toast.success("New product has been added!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Header title="Welcome To My Store" />
      <Container maxWidth="md">
        <Typography
          sx={{ fontWeight: "bold", pt: 2, mb: 3 }}
          variant="h3"
          align="center"
        >
          Add New Product
        </Typography>
        <Box mb={2}>
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Name"
            fullWidth
          />
        </Box>
        <Box mb={2}>
          <TextField
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            label="Description"
            fullWidth
          />
        </Box>
        <Box mb={2}>
          <TextField
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            label="Price"
            fullWidth
          />
        </Box>
        <Box mb={2}>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel
              id="demo-simple-select-label"
              sx={{ backgroundColor: "white", paddingRight: "10px" }}
            >
              Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Category"
              onChange={(event) => {
                setCategory(event.target.value);
                // reset the page back to one
                // setPage(1);
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
        <Box mb={2}>
          <Button variant="contained" fullWidth onClick={handleFormSubmit}>
            Submit
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default ProductAdd;
