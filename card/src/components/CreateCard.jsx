import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useToast } from "../hooks/use-toast";
import axiosInstance from "@/utils/axiosInstance";

const CreateCard = () => {
  const { toast } = useToast();
  const [cardData, setCardData] = useState({
    title: "",
    frontContent: "",
    backContent: "",
  });

  const handleCreate = async () => {
    try {
      const response = await axiosInstance.post("/cards/", {
        title: cardData.title,
        frontContent: cardData.frontContent,
        backContent: cardData.backContent,
      image: null, // Add image handling if needed
      tags: [], // Add tag handling if needed
      isPublic: true, // Set to true or false based on your requirements
      });
      toast({
        title: "Card Created",
        description: "Your new card has been created successfully.",
      });
      setCardData({ title: "", frontContent: "", backContent: "" });
    } catch (error) {
      console.error("Error creating card:", error);
      toast({
        title: "Error",
        description: "Failed to create the card.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Create New Card</h1>

      {/* Flip Preview */}
      <div className="flex justify-center">
        <div className="group w-64 h-40 perspective">
          <div className="relative w-full h-full duration-700 transform-style preserve-3d ">
            {/* Front Side */}
            <div className="absolute w-full h-full bg-white border rounded-xl shadow-md p-4 backface-hidden flex flex-col justify-center">
              <h2 className="text-lg font-semibold text-center">{cardData.title || "Title"}</h2>
              <p className="text-sm text-gray-700 text-center mt-2">{cardData.frontContent || "Front content..."}</p>
            </div>

            {/* Back Side */}
            <div className="absolute w-full h-full bg-gray-100 border rounded-xl shadow-md p-4 rotate-y-180 backface-hidden flex flex-col justify-center">
              <h2 className="text-lg font-semibold text-center">Back</h2>
              <p className="text-sm text-gray-700 text-center mt-2">{cardData.backContent || "Back content..."}</p>
            </div>
          </div>
        </div>
      </div>


      {/* Card Form */}
      <Card>
        <CardHeader>
          <CardTitle>Card Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={cardData.title}
              onChange={(e) => setCardData({ ...cardData, title: e.target.value })}
              placeholder="Enter card title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="frontContent">Front Content</Label>
            <Input
              id="frontContent"
              value={cardData.frontContent}
              onChange={(e) => setCardData({ ...cardData, frontContent: e.target.value })}
              placeholder="Enter front content"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="backContent">Back Content</Label>
            <Input
              id="backContent"
              value={cardData.backContent}
              onChange={(e) => setCardData({ ...cardData, backContent: e.target.value })}
              placeholder="Enter back content"
            />
          </div>

          <Button onClick={handleCreate} className="w-full bg-blue-600 hover-bg-blue-100">
            Create Card
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateCard;
