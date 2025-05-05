import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import axiosInstance from "../utils/axiosInstance";
import FlipCard from "./FlipCard";

const Explore = () => {
  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axiosInstance.get("/cards/");
        setCards(response.data);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };


    fetchCards();
  }, []);

    const [dashboardData, setDashboardData] = useState({
      cardCount: 0,
      recentCards: [],
    });
  
    useEffect(() => {
      const fetchDashboardData = async () => {
        try {
          // Fetch user's cards
          const response = await axiosInstance.get("cards/my-cards");
          const myCards = response.data;
          
          const recentCardsResponse = await axiosInstance.get("cards/");
          const recentCards = recentCardsResponse.data;
  
          setDashboardData({
            ...dashboardData,
            recentCards: recentCards, 
            cardCount: myCards.length
          })
        } catch (error) {
          console.error("Error fetching dashboard data:", error);
          toast({
            title: "Error",
            description: "Failed to load dashboard data. Please try again later.",
            variant: "destructive",
          });
      }
    };
  
      fetchDashboardData();
    }, []);
  

  return (
    <div className="space-y-6 pb-20">
      <h1 className="text-3xl font-bold text-blue-800">Explore Cards</h1>

      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search cards..."
          className="w-full max-w-md p-2 border rounded-md shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 gap-y-20 mt-5 ">
        {dashboardData.recentCards.map((card) => (
          <div key={card._id} className="h-[200px]">
            <FlipCard
              frontContent={
                <div className="bg-white p-6 rounded-lg shadow-sm h-full">
                  <h3 className="font-medium mb-2">{card.title}</h3>
                  <p className="text-muted-foreground">{card.frontContent}</p>
                </div>
              }
              backContent={
                <div className="bg-primary/10 p-6 rounded-lg shadow-sm h-full">
                  <h3 className="font-medium mb-2">Answer</h3>
                  <p className="text-muted-foreground">{card.backContent}</p>
                </div>
              }
            />
          </div>
        ))}
      </div>
    </div>  
  );
};

export default Explore;