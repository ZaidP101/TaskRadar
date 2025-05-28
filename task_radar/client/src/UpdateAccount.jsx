import { useState, useEffect } from "react";
import { Box, Input, Button, FormControl, FormLabel, useToast } from "@chakra-ui/react";
import axios from "axios";

export default function UpdateAccount() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const toast = useToast();

  useEffect(() => {
    // Fetch current user details
    axios.get("/api/user/me", { withCredentials: true })
      .then(res => {
        setName(res.data.data.name);
        setEmail(res.data.data.email);
      })
      .catch(() => toast({ title: "Failed to load user data", status: "error" }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("/api/user/update-details", { name, email }, { withCredentials: true });
      toast({ title: "Account updated successfully", status: "success" });
    } catch (err) {
      toast({ title: err.response?.data?.message || "Update failed", status: "error" });
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} bg="gray.800" borderRadius="md">
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel color="white">Name</FormLabel>
          <Input value={name} onChange={e => setName(e.target.value)} color="white" bg="gray.700" />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel color="white">Email</FormLabel>
          <Input value={email} onChange={e => setEmail(e.target.value)} color="white" bg="gray.700" />
        </FormControl>
        <Button colorScheme="teal" type="submit" w="full">Update Account</Button>
      </form>
    </Box>
  );
}
