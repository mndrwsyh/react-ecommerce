import Header from "../components/Header";
import Box from "@mui/material/Box";
import { Card, TextField, Button, Container, Typography } from "@mui/material";
import { signup } from "../utilities/api_users";
import { useState } from "react";
import { toast } from "sonner";

import validator from "email-validator";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill up all the fields.");
    } else if (!validator.validate(email)) {
      // 2. make sure the email is valid
      toast.error("Please use a valid email address.");
    } else if (password !== confirmPassword) {
      toast.error("Password does not match.");
    } else {
      try {
        const signUpData = await signup(name, email, password);
        console.log(signUpData);
        toast.success("Successfully created a new account!");
      } catch (error) {
        toast.error("Invalid Email or Password.");
      }
    }
  };
  return (
    <>
      <Box
        sx={{
          mx: 3,
          marginBottom: 3,
        }}
      >
        <Header current="signup" title="Create a New Account" />
        <Container maxWidth={"md"}>
          <Card sx={{ m: 5, p: 3 }}>
            <Typography mt={2}>Name</Typography>
            <Box mb={2} mt={1}>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></TextField>
            </Box>
            <Typography mt={2}>Email</Typography>
            <Box mb={2} mt={1}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></TextField>
            </Box>
            <Typography mt={2}>Password</Typography>
            <Box mb={2} mt={1}>
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></TextField>
            </Box>
            <Typography mt={2}>Confirm Password</Typography>
            <Box mb={2} mt={1}>
              <TextField
                fullWidth
                label="Confirm Password"
                variant="outlined"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></TextField>
            </Box>
            <Box mb={2} mt={3}>
              <Button fullWidth variant="contained" onClick={handleSignup}>
                Signup
              </Button>
            </Box>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default SignupPage;
