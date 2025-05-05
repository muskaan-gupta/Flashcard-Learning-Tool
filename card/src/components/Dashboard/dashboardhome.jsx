import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import FlipCard from "../FlipCard";
import axiosInstance from "@/utils/axiosInstance";
import { Link } from "react-router-dom";

const DashboardHome = () => {
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
        
        const recentCardsResponse = await axiosInstance.get("cards/my-cards");
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
    <div className="space-y-6 pb-20 ">
      <div className="bg-gradient-to-r from-blue-500 to-purple-300 text-white p-6 rounded-lg shadow-md transform transition-transform hover:scale-100 hover:shadow-[0_0_20px_5px_rgba(59,130,246,0.7)]">
  <h1 className="text-4xl font-bold">Welcome Back!</h1>
  <p className="text-lg mt-2">Keep learning and growing every day!</p>
</div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
        <Card className="bg-gradient-to-r from-blue-500 to-purple-300 shadow-md transform transition-transform hover:scale-105 hover:shadow-[0_0_20px_5px_rgba(59,130,246,0.7)] " >
          <CardHeader>
            <CardTitle>My Cards</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{dashboardData.cardCount}</p>
          </CardContent>
        </Card>

        

      </div>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Recent Cards</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 gap-y-20 mt-5 ">
        {dashboardData.recentCards.slice(0,3).map((card) => (
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

export default DashboardHome;