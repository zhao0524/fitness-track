import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { WorkoutCard } from "@/components/WorkoutCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Search, Filter } from "lucide-react";

export default function Recommendations() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Strength", "Cardio", "HIIT", "Yoga", "Flexibility"];

  const workouts = [
    {
      title: "Full Body Strength",
      description: "Build muscle and strength with compound movements",
      duration: "45 min",
      difficulty: "Intermediate" as const,
      exercises: 10,
      category: "Strength"
    },
    {
      title: "HIIT Cardio Blast",
      description: "High-intensity intervals for maximum calorie burn",
      duration: "20 min",
      difficulty: "Advanced" as const,
      exercises: 6,
      category: "HIIT"
    },
    {
      title: "Beginner Yoga Flow",
      description: "Gentle introduction to yoga poses and breathing",
      duration: "30 min",
      difficulty: "Beginner" as const,
      exercises: 12,
      category: "Yoga"
    },
    {
      title: "Upper Body Power",
      description: "Target chest, shoulders, and arms with focused training",
      duration: "40 min",
      difficulty: "Intermediate" as const,
      exercises: 8,
      category: "Strength"
    },
    {
      title: "Morning Cardio",
      description: "Start your day with energizing cardiovascular exercise",
      duration: "25 min",
      difficulty: "Beginner" as const,
      exercises: 7,
      category: "Cardio"
    },
    {
      title: "Core Crusher",
      description: "Intense core workout to build a strong foundation",
      duration: "15 min",
      difficulty: "Advanced" as const,
      exercises: 9,
      category: "Strength"
    }
  ];

  const filteredWorkouts = workouts.filter(workout => {
    const matchesSearch = workout.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         workout.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || workout.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
  };

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuthenticated");
    if (!isAuth) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Header isAuthenticated={true} onLogout={handleLogout} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-2">Workout Recommendations</h1>
          <p className="text-muted-foreground text-lg">
            Discover workouts tailored to your fitness level and goals
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4 animate-slide-up">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search workouts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>

          {/* Category Tags */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer hover:shadow-md transition-all"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Workouts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {filteredWorkouts.map((workout, index) => (
            <WorkoutCard
              key={index}
              {...workout}
              onAction={() => {
                // In a real app, this would start the workout or show details
                console.log(`Starting workout: ${workout.title}`);
              }}
              actionLabel="Start Workout"
            />
          ))}
        </div>

        {/* No Results */}
        {filteredWorkouts.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <p className="text-muted-foreground text-lg mb-4">
              No workouts found matching your criteria
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}