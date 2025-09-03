import Header from "../components/Header";
import Box from "@mui/material/Box";
import { Card, TextField, Button, Container, Typography } from "@mui/material";
import { login } from "../utilities/api_users";
import { useState } from "react";
import { toast } from "sonner";
import validator from "email-validator";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please fill up all the fields.");
    } else if (!validator.validate(email)) {
      // 2. make sure the email is valid
      toast.error("Please use a valid email address.");
    } else {
      try {
        const loginData = await login(email, password);
        console.log(loginData);
        toast.success("Successfully logged in!");
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
        <Header current="login" title="Login to Your Account" />
        <Container maxWidth={"md"}>
          <Card sx={{ m: 5, p: 3 }}>
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
                type="password"
                label="Password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></TextField>
            </Box>
            <Box mb={2} mt={3}>
              <Button fullWidth variant="contained" onClick={handleLogin}>
                Login
              </Button>
            </Box>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default LoginPage;
