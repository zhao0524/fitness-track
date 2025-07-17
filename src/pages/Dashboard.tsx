import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { WorkoutCard } from "@/components/WorkoutCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { TrendingUp, Target, Calendar, Award } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [userName] = useState(" "); // Mock user data

  const stats = [
    {
      title: "Workouts This Week",
      value: "4",
      description: "2 more than last week",
      icon: Target,
      trend: "+12%"
    },
    {
      title: "Total Sessions",
      value: "67",
      description: "Since you started",
      icon: TrendingUp,
      trend: "+23%"
    },
    {
      title: "Next Workout",
      value: "Tomorrow",
      description: "Upper Body Strength",
      icon: Calendar,
      trend: ""
    },
    {
      title: "Streak",
      value: "12 days",
      description: "Personal best!",
      icon: Award,
      trend: "🔥"
    }
  ];

  const todayWorkouts = [
    {
      title: "Morning HIIT",
      description: "High-intensity interval training to boost your metabolism",
      duration: "25 min",
      difficulty: "Intermediate" as const,
      exercises: 8
    },
    {
      title: "Strength Training",
      description: "Focus on major muscle groups with compound movements",
      duration: "45 min", 
      difficulty: "Advanced" as const,
      exercises: 12
    }
  ];

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
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, <span className="text-primary">{userName}</span>! 💪
          </h1>
          <p className="text-muted-foreground text-lg">
            Ready to crush your fitness goals today?
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-slide-up">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                  {stat.trend && (
                    <span className="text-xs font-medium text-success">
                      {stat.trend}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2 animate-fade-in">
            <CardHeader>
              <CardTitle>Today's Recommended Workouts</CardTitle>
              <CardDescription>
                Personalized workout suggestions based on your goals
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {todayWorkouts.map((workout, index) => (
                <WorkoutCard 
                  key={index} 
                  {...workout} 
                  onAction={() => navigate("/recommendations")}
                  className="mb-0"
                />
              ))}
            </CardContent>
          </Card>

          <Card className="animate-slide-up">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Jump right into your fitness routine
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="energy" 
                className="w-full justify-start" 
                onClick={() => navigate("/recommendations")}
              >
                <Target className="mr-2 h-4 w-4" />
                Browse Workouts
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => navigate("/past-workouts")}
              >
                <TrendingUp className="mr-2 h-4 w-4" />
                View Progress
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => navigate("/future-plans")}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Plan Workouts
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}