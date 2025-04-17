import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import FlipCard from "@/components/FlipCard";
import "./index.css";


const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center auth-gradient p-4">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold mb-4 tracking-tight text-blue-900">
          FlashLearn
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Your personal flashcard learning assistant. Master any subject with our intelligent flashcard system.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center ">
          <Button asChild size="lg" className="px-8 hover:bg-blue-900 hover:text-white">
            <Link to="/login">
              Sign In <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg" className="px-8 hover:bg-blue-900 hover:text-white">
            <Link to="/signup">
              Create Account
            </Link>
          </Button>

          <Button asChild variant="secondary" size="lg" className="px-8">
            <Link to="/dashboard">
              Go to Dashboard
            </Link>
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <FlipCard
            frontContent={
              <div className="bg-white/80 p-6 rounded-lg shadow-sm h-full">
                <h3 className="text-lg font-medium mb-2 text-blue-900">Create Flashcards</h3>
                <p className="text-muted-foreground">
                  Create custom flashcards with text, images, and formatting to help memorize any subject.
                </p>
              </div>
            }
            backContent={
              <div className="bg-primary/10 p-6 rounded-lg shadow-sm h-full">
                <h3 className="text-lg font-medium mb-2 text-blue-900">Getting Started</h3>
                <p className="text-muted-foreground">
                  Click the 'Create Account' button to start creating your own flashcards and begin your learning journey.
                </p>
              </div>
            }
          />

          <FlipCard
            frontContent={
              <div className="bg-white/80 p-6 rounded-lg shadow-sm h-full">
                <h3 className="text-lg font-medium mb-2 text-blue-900">Smart Learning</h3>
                <p className="text-muted-foreground ">
                  Our spaced repetition algorithm ensures you review cards at the optimal time for retention.
                </p>
              </div>
            }
            backContent={
              <div className="bg-primary/10 p-6 rounded-lg shadow-sm h-full">
                <h3 className="text-lg font-medium mb-2 text-blue-900">AI-Powered</h3>
                <p className="text-muted-foreground">
                  Our intelligent system adapts to your learning pace and helps you focus on what you need to review most.
                </p>
              </div>
            }
          />

          <FlipCard
            frontContent={
              <div className="bg-white/80 p-6 rounded-lg shadow-sm h-full">
                <h3 className="text-lg font-medium mb-2 text-blue-900">Track Progress</h3>
                <p className="text-muted-foreground">
                  Monitor your learning journey with detailed statistics and analytics.
                </p>
              </div>
            }
            backContent={
              <div className="bg-primary/10 p-6 rounded-lg shadow-sm h-full">
                <h3 className="text-lg font-medium mb-2 text-blue-900">Visualize Growth</h3>
                <p className="text-muted-foreground">
                  See your improvement over time with intuitive charts and progress tracking features.
                </p>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Index;