import { useState } from "react";
import { Box, Input, Button, FormControl, FormLabel, useToast } from "@chakra-ui/react";
import axios from "axios";

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("/api/user/change-password", { oldPassword, newPassword }, { withCredentials: true });
      toast({ title: "Password changed successfully", status: "success" });
      setOldPassword(""); setNewPassword("");
    } catch (err) {
      toast({ title: err.response?.data?.message || "Change failed", status: "error" });
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} bg="gray.800" borderRadius="md">
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel color="white">Old Password</FormLabel>
          <Input type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} color="white" bg="gray.700" />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel color="white">New Password</FormLabel>
          <Input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} color="white" bg="gray.700" />
        </FormControl>
        <Button colorScheme="teal" type="submit" w="full">Change Password</Button>
      </form>
    </Box>
  );
}
