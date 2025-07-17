import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Target, Zap } from "lucide-react";

interface WorkoutCardProps {
  title: string;
  description: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  exercises: number;
  onAction?: () => void;
  actionLabel?: string;
  className?: string;
}

export function WorkoutCard({
  title,
  description,
  duration,
  difficulty,
  exercises,
  onAction,
  actionLabel = "Start Workout",
  className = ""
}: WorkoutCardProps) {
  const getDifficultyColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-success text-success-foreground";
      case "Intermediate": return "bg-warning text-warning-foreground";
      case "Advanced": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className={`hover:shadow-lg transition-all duration-200 hover:scale-105 ${className}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription className="mt-1">{description}</CardDescription>
          </div>
          <Badge className={getDifficultyColor(difficulty)}>
            {difficulty}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {duration}
          </div>
          <div className="flex items-center gap-1">
            <Target className="h-4 w-4" />
            {exercises} exercises
          </div>
          <div className="flex items-center gap-1">
            <Zap className="h-4 w-4" />
            High intensity
          </div>
        </div>
        {onAction && (
          <Button variant="energy" className="w-full" onClick={onAction}>
            {actionLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}