import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Target, TrendingUp, Calendar, Users } from "lucide-react";
import heroImage from "@/assets/gym-hero.jpg";

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Target,
      title: "Smart Workout Plans",
      description: "AI-powered workout recommendations tailored to your fitness level and goals."
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Monitor your fitness journey with detailed analytics and progress charts."
    },
    {
      icon: Calendar,
      title: "Schedule Workouts",
      description: "Plan your workouts in advance and never miss a training session."
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Connect with other fitness enthusiasts and share your achievements."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-background/80" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Transform Your
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {" "}Fitness Journey
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Track workouts, monitor progress, and achieve your fitness goals with our comprehensive workout tracking platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="energy" 
                size="lg" 
                onClick={() => navigate("/register")}
                className="text-lg px-8 py-6"
              >
                Start Your Journey
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => navigate("/login")}
                className="text-lg px-8 py-6"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to
              <span className="text-primary"> Succeed</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform provides all the tools you need to build a sustainable fitness routine and achieve lasting results.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 animate-slide-up">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}