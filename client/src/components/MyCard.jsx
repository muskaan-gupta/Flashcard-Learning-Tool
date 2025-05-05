import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Heart, Trash, User } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import axiosInstance from "../utils/axiosInstance";

const MyCards = () => {
  const { toast } = useToast();
  const [myCards, setMyCards] = useState([]);

  useEffect(() => {
    const fetchMyCards = async () => {
      try {
        const response = await axiosInstance.get("cards/my-cards");
        setMyCards(response.data);
      } catch (error) {
        console.error("Error fetching cards:", error);
        toast({
          title: "Error",
          description: "Failed to load your cards. Please try again later.",
          variant: "destructive",
        });
      }
    };

    fetchMyCards();
  }, []);

    const handleDelete = async (id) => {
      try {
        console.log("Deleting card with ID:", id);
        await axiosInstance.delete(`/cards/${id}`);
        setMyCards((prevCards) => prevCards.filter((card) => card._id !== id));
        toast({
          title: "Card Deleted",
          description: "The card has been successfully deleted.",
        });
      } catch (error) {
        console.error("Error deleting card:", error);
        toast({
          title: "Error",
          description: "Failed to delete the card. Please try again later.",
          variant: "destructive",
        });
      }
    };
    const handleLike = async (id) => {
      try {
        console.log("Liking or Unlike card with ID:", id);
        await axiosInstance.post(`/cards/${id}/like`);
        setMyCards((prevCards) =>
          prevCards.map((card) => (card._id === id ? { ...card, liked: !card.liked } : card))
        );
        toast({
          title: "Card Liked",
          description: "The card has been successfully liked.",
        });
      } catch (error) {
        console.error("Error liking card:", error);
        toast({
          title: "Error",
          description: "Failed to like the card. Please try again later.",
          variant: "destructive",
        });
      }
    };
    

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-blue-800">My Cards</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {myCards.map((card) => (
          <Card key={card._id} className="bg-gradient-to-b from-blue-200 to-purple-100 shadow-md rounded-lg">
            <CardHeader className="text-2xl font-semibold">
              <CardTitle>{card.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p  className="text-sm  font-medium text-lg"> Front Content: {card.frontContent}</p>
              <p  className="text-sm  font-medium text-lg"> Back Content: {card.backContent}</p>
            </CardContent>

            <CardFooter className="flex justify-between">
              <div className="flex gap-4">
                <Button variant="ghost" size="icon" onClick={() => handleLike(card._id)}>

                  {card.likes.includes(JSON.parse(localStorage.getItem("user"))?._id) ? (
                    <Heart className="h-4 w-4 text-bold  " fill="red" />
                  ) : (
                    <Heart className="h-4 w-4" />
                  )}
                </Button>
               
              </div>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(card._id)}>
                <Trash className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyCards;