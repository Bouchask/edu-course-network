
import { Link } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { LayoutDashboard, BookOpen, Settings, Plus } from "lucide-react";

const Dashboard = () => {
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
                    <SidebarMenuButton asChild>
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
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your courses and platform settings</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DashboardCard 
              title="Manage Courses" 
              description="Add, edit and delete courses"
              icon={<BookOpen className="h-6 w-6" />}
              linkTo="/dashboard/courses"
            />
            <DashboardCard 
              title="Create Course" 
              description="Add a new course to your platform"
              icon={<Plus className="h-6 w-6" />}
              linkTo="/dashboard/courses/new"
            />
            <DashboardCard 
              title="Settings" 
              description="Configure your platform settings"
              icon={<Settings className="h-6 w-6" />}
              linkTo="/dashboard/settings"
            />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

const DashboardCard = ({ title, description, icon, linkTo }) => {
  return (
    <div className="bg-card text-card-foreground border rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <Link to={linkTo} className="block p-6">
        <div className="flex items-center space-x-4">
          <div className="bg-primary/10 p-2 rounded-full text-primary">
            {icon}
          </div>
          <div>
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Dashboard;
