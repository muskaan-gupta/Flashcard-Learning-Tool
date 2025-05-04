import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import FlipCard from "../FlipCard";
import axiosInstance from "@/utils/axiosInstance";

const DashboardHome = () => {
  const [dashboardData, setDashboardData] = useState({
    cardCount: 0,
    likes: 0,
    comments: 0,
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
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome Back!</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>My Cards</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{dashboardData.cardCount}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Likes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{dashboardData.likes}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Comments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{dashboardData.comments}</p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Recent Cards</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

export default DashboardHome;