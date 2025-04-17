
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import  FlipCard  from "../FlipCard";

const DashboardHome = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome Back!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>My Cards</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">12</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Likes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">48</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Comments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">24</p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Recent Cards</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-[200px]">
            <FlipCard
              frontContent={
                <div className="bg-white p-6 rounded-lg shadow-sm h-full">
                  <h3 className="font-medium mb-2">Card Title {i}</h3>
                  <p className="text-muted-foreground">Front content...</p>
                </div>
              }
              backContent={
                <div className="bg-primary/10 p-6 rounded-lg shadow-sm h-full">
                  <h3 className="font-medium mb-2">Answer</h3>
                  <p className="text-muted-foreground">Back content...</p>
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