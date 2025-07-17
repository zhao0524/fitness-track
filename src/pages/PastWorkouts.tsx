import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, TrendingUp, Repeat } from "lucide-react";

export default function PastWorkouts() {
  const navigate = useNavigate();

  const pastWorkouts = [
    {
      id: 1,
      title: "Full Body Strength",
      date: "2024-01-15",
      duration: "45 min",
      calories: 320,
      exercises: 10,
      status: "Completed",
      notes: "Great session! Increased weight on squats."
    },
    {
      id: 2,
      title: "HIIT Cardio Blast",
      date: "2024-01-14",
      duration: "20 min",
      calories: 240,
      exercises: 6,
      status: "Completed",
      notes: "Challenging but felt amazing afterward."
    },
    {
      id: 3,
      title: "Upper Body Power",
      date: "2024-01-12",
      duration: "40 min",
      calories: 280,
      exercises: 8,
      status: "Completed",
      notes: "New PR on bench press!"
    },
    {
      id: 4,
      title: "Morning Yoga Flow",
      date: "2024-01-11",
      duration: "30 min",
      calories: 150,
      exercises: 12,
      status: "Completed",
      notes: "Perfect way to start the day."
    },
    {
      id: 5,
      title: "Core Crusher",
      date: "2024-01-10",
      duration: "15 min",
      calories: 120,
      exercises: 9,
      status: "Completed",
      notes: "Intense but effective core workout."
    },
    {
      id: 6,
      title: "Lower Body Strength",
      date: "2024-01-09",
      duration: "50 min",
      calories: 380,
      exercises: 11,
      status: "Partially Completed",
      notes: "Had to cut short due to time constraints."
    }
  ];

  const totalWorkouts = pastWorkouts.length;
  const totalCalories = pastWorkouts.reduce((sum, workout) => sum + workout.calories, 0);
  const totalDuration = pastWorkouts.reduce((sum, workout) => {
    const minutes = parseInt(workout.duration);
    return sum + minutes;
  }, 0);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
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
          <h1 className="text-3xl font-bold mb-2">Past Workouts</h1>
          <p className="text-muted-foreground text-lg">
            Track your progress and see how far you've come
          </p>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-slide-up">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Workouts</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalWorkouts}</div>
              <p className="text-xs text-muted-foreground">
                Sessions completed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Calories Burned</CardTitle>
              <Clock className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCalories.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Total calories
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Time Exercised</CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.floor(totalDuration / 60)}h {totalDuration % 60}m</div>
              <p className="text-xs text-muted-foreground">
                Total duration
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Workouts List */}
        <div className="space-y-4 animate-fade-in">
          {pastWorkouts.map((workout) => (
            <Card key={workout.id} className="hover:shadow-lg transition-all duration-200">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{workout.title}</CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(workout.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {workout.duration}
                      </span>
                    </CardDescription>
                  </div>
                  <Badge 
                    variant={workout.status === "Completed" ? "default" : "outline"}
                    className={workout.status === "Completed" ? "bg-success" : ""}
                  >
                    {workout.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Exercises:</span>
                    <div className="font-semibold">{workout.exercises}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Calories:</span>
                    <div className="font-semibold">{workout.calories}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Duration:</span>
                    <div className="font-semibold">{workout.duration}</div>
                  </div>
                  <div className="flex items-center">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="gap-1"
                      onClick={() => navigate("/recommendations")}
                    >
                      <Repeat className="h-3 w-3" />
                      Repeat
                    </Button>
                  </div>
                </div>
                {workout.notes && (
                  <div className="text-sm">
                    <span className="text-muted-foreground">Notes:</span>
                    <p className="mt-1 text-foreground">{workout.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}