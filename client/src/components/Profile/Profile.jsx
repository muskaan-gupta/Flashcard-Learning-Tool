import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useToast } from "../../hooks/use-toast";
import axiosInstance from "@/utils/axiosInstance";

const Profile = () => {
  const { toast } = useToast();
  const [profileData, setProfileData] = useState({
    username: "",
    fullname: "",
    email: "",
    bio: "",
  });

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {

        const accessToken = localStorage.getItem("accessToken");
        console.log("Access Token:", accessToken); // Log the access token for debugging
        if (!accessToken) {
          throw new Error("Access token is missing");
        }
        const response = await axiosInstance.get("/users/getCurrentUser", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        // Populate the profileData state with the user's data
        const userData = response.data.data;
        setProfileData({
          username: userData.username || "",
          fullname: userData.fullname || "",
          email: userData.email || "",
          bio: userData.bio || "",
        });
      }
      catch (error) {
        console.error("Error fetching user data:", error);
        toast({
          title: "Error",
          description: "Failed to fetch user data.",
          variant: "destructive",
        });
      }
    };

    fetchUserData();
  }, [toast]);

  const handleSave = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axiosInstance.patch(
        "/users/updateOtherDetails",
        {
          username: profileData.username,
          email: profileData.email,
          bio: profileData.bio,
          fullname: profileData.fullname || "", // Include fullname in the request body
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Update local storage with the new profile data
      localStorage.setItem("user", JSON.stringify(response.data.data));
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8 bg-white shadow-lg rounded-lg p-6 md:p-12">
      <h1 className="text-4xl font-bold">Profile Settings</h1>

      <Card className="bg-gradient-to-b from-purple-200 to-blue-200">
        <CardHeader>
          <CardTitle>Profile Picture</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://png.pngtree.com/png-clipart/20230102/original/pngtree-girl-with-headphones-png-image_8855192.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Button className="bg-blue-800 text-white hover:bg-blue-100">Upload New Picture</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-b from-blue-200 to-white-200">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2 hover:bg-white ">
            <Label htmlFor="username">UserName</Label>
            <Input
              id="username"
              value={profileData.username}
              onChange={(e) =>
                setProfileData({ ...profileData, username: e.target.value })
              }
              // disabled // Disable editing for username
            />
          </div>
          <div className="space-y-2 hover:bg-white">
            <Label htmlFor="fullname">Full Name</Label>
            <Input
              id="fullname"
              value={profileData.fullname}
              onChange={(e) =>
                setProfileData({ ...profileData, fullname: e.target.value })
              }
            />
          </div>

          <div className="space-y-2 hover:bg-white">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={profileData.email}
              onChange={(e) =>
                setProfileData({ ...profileData, email: e.target.value })
              }
              // disabled // Disable editing for email
            />
          </div>

          <div className="space-y-2 hover:bg-white">
            <Label htmlFor="bio">Bio</Label>
            <Input
              id="bio"
              value={profileData.bio}
              onChange={(e) =>
                setProfileData({ ...profileData, bio: e.target.value })
              }
            />
          </div>

          <Button onClick={handleSave} className="w-full bg-blue-800 text-white hover:bg-blue-100">
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </div>
    </div>
  );
};

export default Profile;