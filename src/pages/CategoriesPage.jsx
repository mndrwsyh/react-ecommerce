import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import ListItemText from "@mui/material/ListItemText";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Header from "../components/Header";
import { TextField } from "@mui/material";
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../utilities/api_categories";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const CategoriesPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [label, setLabel] = useState("");

  useEffect(() => {
    getCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleAddCategory = async (event) => {
    // event.preventDefault();
    // 1. check for error
    if (!label) {
      toast.error("Please fill up the field.");
    }

    try {
      // 2. trigger the api to create new category
      await addCategory(label);
      const updatedCategory = await getCategories();
      setCategories(updatedCategory);
      setLabel("");
      toast.success("New category has been added!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEditCategory = async (id, label) => {
    Swal.fire({
      title: "Edit your category label.",
      text: "Please dont leave a blank field.",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Update",
      input: "text",
      inputPlaceholder: `${label}`,
      showCancelButton: true,
      preConfirm: (value) => {
        if (!value) {
          Swal.showValidationMessage("Please enter a label!");
        }
      },
    }).then(async (result) => {
      // once user delete, then we get the product
      if (result.isConfirmed) {
        // delete product via api
        await updateCategory(id, result.value);

        const updatedCategory = await getCategories();
        setCategories(updatedCategory);

        toast.success("Category has been updated.");
      }
    });
  };

  const handleDeleteCategory = (id) => {
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
        await deleteCategory(id);
        // delete product from the state
        // method 1
        // delete manually from the state
        // setProducts(products.filter((p) => p._id !== id));

        // method 2
        // get new data from backend
        const updatedCategory = await getCategories();
        setCategories(updatedCategory);
        toast.success("Category has been deleted.");
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
        <Header current="categories" title="Categories" />
        <Typography variant="h4" fontWeight={"bold"} mt={2} mb={1}>
          Categories
        </Typography>
        <Card
          sx={{
            p: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
              mt: "5px",
            }}
          >
            <TextField
              fullWidth
              label="Course"
              variant="outlined"
              value={label}
              onChange={(event) => setLabel(event.target.value)}
            />
            <Button variant="contained" onClick={handleAddCategory}>
              Add
            </Button>
          </Box>
          <Box sx={{ mt: "25px" }}>
            <InputLabel>Existing Categories ({categories.length})</InputLabel>
            <List sx={{ width: "100%" }}>
              {categories.map((category) => {
                // const courseInGroup = groups.some((g) =>
                //   g.selectedCourse.includes(course.id)
                // );
                return (
                  <ListItem
                    key={category.id}
                    disableGutters
                    divider
                    secondaryAction={
                      <Box sx={{ display: "flex", gap: "10px" }}>
                        <Button
                          sx={{ textTransform: "none" }}
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            handleEditCategory(category._id, category.label);
                          }}
                        >
                          Edit
                        </Button>

                        <Button
                          sx={{ textTransform: "none" }}
                          variant="contained"
                          color="error"
                          onClick={() => {
                            handleDeleteCategory(category._id);
                          }}
                        >
                          Delete
                        </Button>
                      </Box>
                    }
                  >
                    <ListItemText primary={`${category.label}`} />
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Card>
      </Box>
    </>
  );
};

export default CategoriesPage;
