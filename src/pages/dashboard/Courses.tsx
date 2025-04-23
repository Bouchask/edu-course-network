
import { Link } from "react-router-dom";
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { LayoutDashboard, BookOpen, Settings, Plus, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

// Mock data for courses
const mockCourses = [
  { 
    id: "1", 
    title: "Introduction to Web Development", 
    description: "Learn HTML, CSS and JavaScript basics", 
    status: "Published",
    students: 45 
  },
  { 
    id: "2", 
    title: "Advanced React Patterns", 
    description: "Master complex React patterns and techniques", 
    status: "Draft",
    students: 0 
  },
  { 
    id: "3", 
    title: "UI/UX Design Fundamentals", 
    description: "Principles and practices of good UI/UX design", 
    status: "Published",
    students: 32 
  },
];

const Courses = () => {
  const handleDeleteCourse = (id) => {
    // In a real application, this would call an API to delete the course
    toast({
      title: "Course deleted",
      description: `Course ID: ${id} has been removed`,
    });
  };

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
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Courses</h1>
              <p className="text-muted-foreground">Manage your educational content</p>
            </div>
            <Button asChild>
              <Link to="/dashboard/courses/new">
                <Plus className="mr-2 h-4 w-4" />
                Create New Course
              </Link>
            </Button>
          </div>

          <div className="bg-white rounded-lg border shadow">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left p-4">Title</th>
                    <th className="text-left p-4">Description</th>
                    <th className="text-left p-4">Status</th>
                    <th className="text-left p-4">Students</th>
                    <th className="text-right p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockCourses.map((course) => (
                    <tr key={course.id} className="border-b">
                      <td className="p-4 font-medium">{course.title}</td>
                      <td className="p-4 text-muted-foreground">{course.description}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          course.status === "Published" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-amber-100 text-amber-800"
                        }`}>
                          {course.status}
                        </span>
                      </td>
                      <td className="p-4">{course.students}</td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="ghost" asChild>
                            <Link to={`/dashboard/courses/edit/${course.id}`}>
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Link>
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => handleDeleteCourse(course.id)}
                          >
                            <Trash className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Courses;
