
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { LayoutDashboard, BookOpen, Settings, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const EditCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [course, setCourse] = useState({
    id: "",
    title: "",
    description: "",
    status: "draft",
    image: "",
    price: "",
    instructor: "",
    level: "beginner"
  });

  // Mock data for this demo
  const mockCourses = [
    { 
      id: "1", 
      title: "Introduction to Web Development", 
      description: "Learn HTML, CSS and JavaScript basics", 
      status: "published",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500&q=60",
      price: "49.99",
      instructor: "John Smith",
      level: "beginner",
      students: 45 
    },
    { 
      id: "2", 
      title: "Advanced React Patterns", 
      description: "Master complex React patterns and techniques", 
      status: "draft",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=500&q=60",
      price: "79.99",
      instructor: "Jane Doe",
      level: "advanced",
      students: 0 
    },
    { 
      id: "3", 
      title: "UI/UX Design Fundamentals", 
      description: "Principles and practices of good UI/UX design", 
      status: "published",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=500&q=60",
      price: "59.99",
      instructor: "Mike Johnson",
      level: "intermediate",
      students: 32 
    },
  ];

  useEffect(() => {
    // Fetch course data in a real application
    // For now, use mock data
    const foundCourse = mockCourses.find(c => c.id === courseId);
    
    if (foundCourse) {
      setCourse({
        id: foundCourse.id,
        title: foundCourse.title,
        description: foundCourse.description,
        status: foundCourse.status,
        image: foundCourse.image,
        price: foundCourse.price.toString(),
        instructor: foundCourse.instructor,
        level: foundCourse.level
      });
    }
    
    setIsLoading(false);
  }, [courseId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStatusChange = (value) => {
    setCourse(prev => ({
      ...prev,
      status: value
    }));
  };

  const handleLevelChange = (value) => {
    setCourse(prev => ({
      ...prev,
      level: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, save changes to backend
    toast({
      title: "Course updated",
      description: `"${course.title}" has been updated successfully`,
    });
    navigate("/dashboard/courses");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading course...</p>
      </div>
    );
  }

  if (!course.id) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Course Not Found</h1>
          <p className="text-muted-foreground mb-4">The course you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/dashboard/courses">Back to Courses</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/dashboard">
                        <LayoutDashboard />
                        <span>Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={true}>
                      <Link to="/dashboard/courses">
                        <BookOpen />
                        <span>Courses</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/dashboard/courses/new">
                        <Plus />
                        <span>Create Course</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/dashboard/settings">
                        <Settings />
                        <span>Settings</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Edit Course</h1>
            <p className="text-muted-foreground">Update course details and settings</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Course Title</Label>
                <Input 
                  id="title"
                  name="title"
                  value={course.title}
                  onChange={handleChange}
                  placeholder="Enter course title"
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description"
                  name="description"
                  value={course.description}
                  onChange={handleChange}
                  placeholder="Enter course description"
                  rows={4}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="image">Image URL</Label>
                <Input 
                  id="image"
                  name="image"
                  value={course.image}
                  onChange={handleChange}
                  placeholder="Enter image URL"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="price">Price</Label>
                  <Input 
                    id="price"
                    name="price"
                    value={course.price}
                    onChange={handleChange}
                    placeholder="Enter price"
                    type="number"
                    step="0.01"
                    min="0"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="instructor">Instructor</Label>
                  <Input 
                    id="instructor"
                    name="instructor"
                    value={course.instructor}
                    onChange={handleChange}
                    placeholder="Enter instructor name"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={course.status} onValueChange={handleStatusChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="level">Level</Label>
                  <Select value={course.level} onValueChange={handleLevelChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button type="submit">Save Changes</Button>
              <Button type="button" variant="outline" asChild>
                <Link to="/dashboard/courses">Cancel</Link>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default EditCourse;
