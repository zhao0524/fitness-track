import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { WorkoutCard } from "@/components/WorkoutCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, Plus, Edit } from "lucide-react";

export default function FuturePlans() {
  const navigate = useNavigate();

  const scheduledWorkouts = [
    {
      id: 1,
      title: "Lower Body Strength",
      description: "Focus on legs and glutes with compound movements",
      date: "2024-01-17",
      time: "07:00",
      duration: "50 min",
      difficulty: "Intermediate" as const,
      exercises: 12,
      type: "Scheduled"
    },
    {
      id: 2,
      title: "HIIT Cardio",
      description: "High-intensity interval training session",
      date: "2024-01-18",
      time: "18:30",
      duration: "25 min",
      difficulty: "Advanced" as const,
      exercises: 8,
      type: "Scheduled"
    },
    {
      id: 3,
      title: "Yoga & Flexibility",
      description: "Relaxing yoga flow for recovery",
      date: "2024-01-19",
      time: "09:00",
      duration: "35 min",
      difficulty: "Beginner" as const,
      exercises: 15,
      type: "Scheduled"
    }
  ];

  const workoutPlans = [
    {
      id: 1,
      title: "4-Week Strength Building",
      description: "Progressive strength training program",
      duration: "4 weeks",
      workoutsPerWeek: 4,
      status: "Active"
    },
    {
      id: 2,
      title: "Cardio Endurance Challenge",
      description: "Build cardiovascular fitness over 6 weeks",
      duration: "6 weeks", 
      workoutsPerWeek: 3,
      status: "Starting Soon"
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minutes} ${period}`;
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
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Future Workout Plans</h1>
              <p className="text-muted-foreground text-lg">
                Plan ahead and stay committed to your fitness goals
              </p>
            </div>
            <Button variant="energy" className="gap-2">
              <Plus className="h-4 w-4" />
              Schedule Workout
            </Button>
          </div>
        </div>

        {/* Scheduled Workouts */}
        <div className="mb-8 animate-slide-up">
          <h2 className="text-2xl font-semibold mb-4">Upcoming Workouts</h2>
          <div className="space-y-4">
            {scheduledWorkouts.map((workout) => (
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
                          {formatTime(workout.time)}
                        </span>
                      </CardDescription>
                    </div>
                    <Badge variant="outline">
                      {workout.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{workout.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{workout.duration}</span>
                      <span>{workout.exercises} exercises</span>
                      <Badge variant="outline">{workout.difficulty}</Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-1">
                        <Edit className="h-3 w-3" />
                        Edit
                      </Button>
                      <Button variant="default" size="sm">
                        Start Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Workout Plans */}
        <div className="animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Workout Plans</h2>
            <Button variant="outline" className="gap-2">
              <Plus className="h-4 w-4" />
              Create Plan
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {workoutPlans.map((plan) => (
              <Card key={plan.id} className="hover:shadow-lg transition-all duration-200">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{plan.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {plan.description}
                      </CardDescription>
                    </div>
                    <Badge 
                      variant={plan.status === "Active" ? "default" : "outline"}
                      className={plan.status === "Active" ? "bg-success" : ""}
                    >
                      {plan.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Duration:</span>
                      <div className="font-semibold">{plan.duration}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Frequency:</span>
                      <div className="font-semibold">{plan.workoutsPerWeek}x/week</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      View Details
                    </Button>
                    <Button 
                      variant={plan.status === "Active" ? "default" : "energy"} 
                      size="sm" 
                      className="flex-1"
                    >
                      {plan.status === "Active" ? "Continue" : "Start Plan"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Weekly Schedule Preview */}
        <div className="mt-8 animate-slide-up">
          <Card>
            <CardHeader>
              <CardTitle>This Week's Schedule</CardTitle>
              <CardDescription>
                Quick overview of your planned workouts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 text-center text-sm">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                  <div key={day} className="p-2">
                    <div className="font-medium mb-1">{day}</div>
                    <div className={`h-8 rounded ${index === 1 || index === 3 || index === 5 ? 'bg-primary/20 text-primary' : 'bg-muted'} flex items-center justify-center text-xs`}>
                      {index === 1 ? 'Strength' : index === 3 ? 'HIIT' : index === 5 ? 'Yoga' : 'Rest'}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}