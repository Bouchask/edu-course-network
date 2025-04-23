
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Mock featured courses data
const featuredCourses = [
  {
    id: "1",
    title: "Introduction to Web Development",
    description: "Learn HTML, CSS and JavaScript basics",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500&q=60",
    price: "$49.99",
    instructor: "John Smith",
    level: "Beginner"
  },
  {
    id: "2",
    title: "Advanced React Patterns",
    description: "Master complex React patterns and techniques",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=500&q=60",
    price: "$79.99",
    instructor: "Jane Doe",
    level: "Advanced"
  },
  {
    id: "3",
    title: "UI/UX Design Fundamentals",
    description: "Principles and practices of good UI/UX design",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=500&q=60",
    price: "$59.99",
    instructor: "Mike Johnson",
    level: "Intermediate"
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Learn Skills for Your Future</h1>
              <p className="text-xl mb-8">Discover high-quality courses taught by industry experts. Advance your career with practical skills and knowledge.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link to="/courses">Explore Courses</Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10" asChild>
                  <Link to="/dashboard">Instructor Dashboard</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80" 
                alt="Online Learning" 
                className="rounded-lg shadow-lg" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Featured Courses */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-2 text-center">Featured Courses</h2>
        <p className="text-muted-foreground text-center mb-10">Explore our most popular courses</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-semibold">{course.title}</h2>
                  <span className="bg-primary/10 text-primary font-semibold px-2 py-1 rounded text-sm">{course.price}</span>
                </div>
                <p className="text-muted-foreground mb-4">{course.description}</p>
                <div className="flex justify-between items-center text-sm mb-4">
                  <span>Instructor: {course.instructor}</span>
                  <span className="px-2 py-1 bg-gray-100 rounded-full">{course.level}</span>
                </div>
                <Button asChild className="w-full">
                  <Link to={`/courses/${course.id}`}>View Course</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Button size="lg" variant="outline" asChild>
            <Link to="/courses">View All Courses</Link>
          </Button>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2 text-center">Why Choose Us</h2>
          <p className="text-muted-foreground text-center mb-12">Our commitment to quality education</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Expert Instructors",
                description: "Learn from industry professionals with years of experience in their fields.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                )
              },
              {
                title: "Flexible Learning",
                description: "Study at your own pace with lifetime access to course content.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                )
              },
              {
                title: "Practical Skills",
                description: "Focus on hands-on projects that build real-world, applicable skills.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                )
              }
            ].map((benefit, index) => (
              <div key={index} className="text-center p-6">
                <div className="flex justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-2 text-center">What Our Students Say</h2>
        <p className="text-muted-foreground text-center mb-12">Success stories from our community</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              name: "Alex Johnson",
              role: "Web Developer",
              image: "https://ui-avatars.com/api/?name=Alex+Johnson",
              testimonial: "The web development course was exactly what I needed to switch careers. Within 3 months of completing it, I landed my first dev job."
            },
            {
              name: "Sarah Miller",
              role: "UX Designer",
              image: "https://ui-avatars.com/api/?name=Sarah+Miller",
              testimonial: "The UI/UX design course gave me both theoretical knowledge and practical skills. The instructor feedback was invaluable."
            },
            {
              name: "Michael Chen",
              role: "Product Manager",
              image: "https://ui-avatars.com/api/?name=Michael+Chen",
              testimonial: "I've taken several courses here, and they've all been exceptional. The React patterns course in particular helped me level up my skills."
            }
          ].map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg border shadow-sm">
              <div className="flex items-center mb-4">
                <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <p className="italic">"{testimonial.testimonial}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Join thousands of students already learning on our platform. Take the next step in your career today.</p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/courses">Browse All Courses</Link>
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
