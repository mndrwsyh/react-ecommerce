import Header from "../components/Header";
import { Link } from "react-router";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useState, useEffect, use } from "react";
import { updateProduct, getProduct } from "../utilities/api_products";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { Toaster, toast } from "sonner";
import TextField from "@mui/material/TextField";
import { useNavigate, useParams } from "react-router";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { uploadImage } from "../utilities/api_image";
import { API_URL } from "../utilities/constants";
import { getCategories } from "../utilities/api_categories";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const ProductEdit = () => {
  const { id } = useParams(); // retrieve the id from the url
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);

  // load the product data from the backend api and assign it to the state
  useEffect(() => {
    getProduct(id)
      .then((productData) => {
        // check if product data is empty or not
        if (productData) {
          // update state with product data
          setName(productData ? productData.name : "");
          setDescription(productData ? productData.description : "");
          setPrice(productData ? productData.price : 0);
          setCategory(productData ? productData.category : "");
          setImage(productData ? productData.image : null);
        } else {
          // if not available, set error message
          setError("Product not found");
        }
      })
      .catch((error) => {
        // catch the api error
        setError("Product not Found");
      });
  }, [id]);

  useEffect(() => {
    getCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleFormSubmit = async (event) => {
    // event.preventDefault();
    // 1. check for error
    if (!name || !price || !category) {
      toast.error("Please fill up the required fields.");
    }

    try {
      // 2. trigger the api to create new product
      await updateProduct(id, name, description, price, category, image);
      // 3. if successfull, redirect user back to homepage and show success message
      navigate("/");
      toast.success("Product has been updated.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (error) {
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

  return (
    <>
      <Header />
      <Container maxWidth="md">
        <Typography
          sx={{ fontWeight: "bold", pt: 2, mb: 3 }}
          variant="h3"
          align="center"
        >
          Edit Product
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
              {categories.map((c) => (
                <MenuItem value={c._id}>{c.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box mb={2} sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {image ? (
            <>
              <img src={API_URL + image} width="150px" />
              <Button
                color="info"
                variant="contained"
                size="small"
                onClick={() => {
                  setImage(null);
                }}
              >
                Remove
              </Button>
            </>
          ) : (
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload image
              <VisuallyHiddenInput
                type="file"
                onChange={async (event) => {
                  const data = await uploadImage(event.target.files[0]);
                  // {image_url : "uploads/image.jpg"}
                  // set image url into state
                  setImage(data.image_url);
                }}
                accept="image/*"
              />
            </Button>
          )}
        </Box>
        <Box mb={2}>
          <Button variant="contained" fullWidth onClick={handleFormSubmit}>
            Update
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default ProductEdit;
