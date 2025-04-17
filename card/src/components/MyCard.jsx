
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Heart, MessageCircle, Trash } from "lucide-react";
import { useToast } from "../hooks/use-toast";

const MyCards = () => {
  const { toast } = useToast();
  
  const handleDelete = () => {
    toast({
      title: "Card Deleted",
      description: "The card has been successfully deleted.",
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Cards</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle>Card Title {i}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This is a sample card content. Click to flip and see the answer.
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex gap-4">
                <Button variant="ghost" size="icon">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </div>
              <Button variant="ghost" size="icon" onClick={handleDelete}>
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
