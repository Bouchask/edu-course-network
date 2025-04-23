
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

// Mock course data
const coursesData = {
  "1": {
    id: "1",
    title: "Introduction to Web Development",
    description: "This comprehensive course will teach you everything you need to know about web development. Starting from the basics of HTML and CSS, you'll progress to JavaScript and learn how to build interactive websites. By the end of this course, you'll have the skills to create responsive, modern web applications.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&q=80",
    price: "$49.99",
    instructor: "John Smith",
    instructorBio: "Senior Web Developer with 10+ years of experience in teaching and building websites.",
    level: "Beginner",
    duration: "10 weeks",
    totalLectures: 42,
    totalHours: 24,
    rating: 4.8,
    reviews: 325,
    students: 1250,
    lastUpdated: "March 2025",
    topics: [
      "HTML fundamentals",
      "CSS styling and layouts",
      "JavaScript basics",
      "DOM manipulation",
      "Responsive design principles",
      "Introduction to web frameworks"
    ],
    modules: [
      {
        title: "Getting Started with HTML",
        lectures: [
          "Introduction to HTML",
          "HTML Document Structure",
          "Working with Text Elements",
          "Adding Links and Images"
        ]
      },
      {
        title: "CSS Styling",
        lectures: [
          "CSS Selectors and Properties",
          "Box Model and Layout",
          "Flexbox and Grid",
          "Responsive Design"
        ]
      },
      {
        title: "JavaScript Basics",
        lectures: [
          "Variables and Data Types",
          "Functions and Control Flow",
          "Arrays and Objects",
          "DOM Manipulation"
        ]
      }
    ]
  },
  "2": {
    id: "2",
    title: "Advanced React Patterns",
    description: "Take your React skills to the next level with advanced patterns and best practices. This course covers complex state management, hooks, context API, and performance optimization techniques.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
    price: "$79.99",
    instructor: "Jane Doe",
    instructorBio: "React Expert and Software Architect at a leading tech company.",
    level: "Advanced",
    duration: "8 weeks",
    totalLectures: 36,
    totalHours: 20,
    rating: 4.9,
    reviews: 187,
    students: 750,
    lastUpdated: "April 2025",
    topics: [
      "Advanced component patterns",
      "Performance optimization",
      "State management architectures",
      "Custom hooks",
      "Testing React applications",
      "Animations and transitions"
    ],
    modules: [
      {
        title: "Component Patterns",
        lectures: [
          "Higher-Order Components",
          "Render Props Pattern",
          "Compound Components",
          "Custom Hooks"
        ]
      },
      {
        title: "State Management",
        lectures: [
          "Context API Deep Dive",
          "Reducers and Actions",
          "Global State Solutions",
          "Performance Considerations"
        ]
      },
      {
        title: "Advanced React Techniques",
        lectures: [
          "Suspense and Concurrent Mode",
          "Server Components",
          "Code Splitting Strategies",
          "Memoization Techniques"
        ]
      }
    ]
  }
};

const CourseDetail = () => {
  const { courseId } = useParams();
  const course = coursesData[courseId] || coursesData["1"]; // Fallback to first course if ID not found

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Navigation */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-primary">EduCourse Network</Link>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/" className={navigationMenuTriggerStyle()}>
                    Home
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/courses" className={navigationMenuTriggerStyle()}>
                    Courses
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-purple-500 to-purple-900 p-6 no-underline outline-none focus:shadow-md"
                            href="#"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium text-white">
                              Learning Hub
                            </div>
                            <p className="text-sm leading-tight text-white/90">
                              Free resources, tutorials and articles to help you learn
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <Link
                          to="/blog"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Blog</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Educational articles and industry news
                          </p>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/faq"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">FAQ</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Answers to frequently asked questions
                          </p>
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/about" className={navigationMenuTriggerStyle()}>
                    About Us
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <div className="flex gap-4">
              <Button variant="outline" asChild>
                <Link to="/login">Log In</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Course Hero Section */}
      <div className="bg-gradient-to-br from-purple-900 to-indigo-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col md:flex-row gap-10">
            <div className="md:w-2/3 space-y-6">
              <h1 className="text-4xl font-bold">{course.title}</h1>
              <p className="text-lg">{course.description}</p>
              <div className="flex flex-wrap gap-4 items-center">
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {course.rating} ({course.reviews} reviews)
                </span>
                <span>|</span>
                <span>{course.students} students</span>
                <span>|</span>
                <span>Last updated: {course.lastUpdated}</span>
              </div>
              <div className="flex items-center">
                <img src="https://ui-avatars.com/api/?name=John+Doe" className="h-10 w-10 rounded-full mr-3" alt="Instructor" />
                <span>Created by <strong>{course.instructor}</strong></span>
              </div>
            </div>
            <div className="md:w-1/3 bg-white p-6 rounded-lg shadow-lg text-gray-900">
              <div className="relative aspect-video mb-4 overflow-hidden rounded-md">
                <img src={course.image} alt={course.title} className="object-cover w-full h-full" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <button className="bg-white/90 rounded-full p-4 hover:bg-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="text-3xl font-bold mb-4">{course.price}</div>
              <Button size="lg" className="w-full mb-4">Enroll Now</Button>
              <Button size="lg" variant="outline" className="w-full mb-6">Add to Wishlist</Button>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span className="font-semibold">{course.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span>Lectures:</span>
                  <span className="font-semibold">{course.totalLectures}</span>
                </div>
                <div className="flex justify-between">
                  <span>Level:</span>
                  <span className="font-semibold">{course.level}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Hours:</span>
                  <span className="font-semibold">{course.totalHours} hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-12">
            {/* What You'll Learn */}
            <div>
              <h2 className="text-2xl font-bold mb-6">What You'll Learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.topics.map((topic, index) => (
                  <div key={index} className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Course Curriculum */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Course Curriculum</h2>
              <div className="space-y-4">
                {course.modules.map((module, index) => (
                  <div key={index} className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-100 p-4 font-semibold flex justify-between items-center">
                      <span>{module.title}</span>
                      <span className="text-sm text-muted-foreground">{module.lectures.length} lectures</span>
                    </div>
                    <div className="p-4 divide-y">
                      {module.lectures.map((lecture, lIndex) => (
                        <div key={lIndex} className="py-3 flex justify-between items-center">
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-primary" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            </svg>
                            <span>{lecture}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">Preview</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Instructor */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Your Instructor</h2>
              <div className="flex items-start space-x-4">
                <img src="https://ui-avatars.com/api/?name=John+Doe&size=64" className="rounded-full" alt="Instructor" />
                <div>
                  <h3 className="text-xl font-semibold">{course.instructor}</h3>
                  <p className="text-muted-foreground mb-4">{course.instructorBio}</p>
                  <div className="flex space-x-4">
                    <div className="text-center">
                      <div className="text-lg font-semibold">{course.rating}</div>
                      <div className="text-sm text-muted-foreground">Instructor Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold">{course.reviews}</div>
                      <div className="text-sm text-muted-foreground">Reviews</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold">{course.students}</div>
                      <div className="text-sm text-muted-foreground">Students</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold">{course.totalLectures}</div>
                      <div className="text-sm text-muted-foreground">Lectures</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            {/* Progress Tracker */}
            <div className="bg-white p-6 rounded-lg border mb-8">
              <h3 className="text-lg font-semibold mb-4">Course Progress</h3>
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm">0% Complete</span>
                  <span className="text-sm">0/{course.totalLectures} Lectures</span>
                </div>
                <Progress value={0} />
              </div>
              <Button className="w-full">Continue Learning</Button>
            </div>
            
            {/* Related Courses */}
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-lg font-semibold mb-4">Related Courses</h3>
              <div className="space-y-4">
                {Object.values(coursesData)
                  .filter(c => c.id !== course.id)
                  .map(relatedCourse => (
                    <Link key={relatedCourse.id} to={`/courses/${relatedCourse.id}`} className="block">
                      <div className="flex gap-3 group">
                        <img 
                          src={relatedCourse.image} 
                          alt={relatedCourse.title} 
                          className="w-20 h-16 object-cover rounded" 
                        />
                        <div>
                          <h4 className="font-medium group-hover:text-primary transition-colors">{relatedCourse.title}</h4>
                          <div className="text-sm text-muted-foreground">{relatedCourse.instructor}</div>
                          <div className="text-sm font-semibold">{relatedCourse.price}</div>
                        </div>
                      </div>
                    </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">EduCourse Network</h3>
              <p>Empowering learners worldwide with quality education and practical skills.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:text-white">Home</Link></li>
                <li><Link to="/courses" className="hover:text-white">Courses</Link></li>
                <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Connect With Us</h4>
              <p className="mb-4">Sign up for our newsletter to get the latest updates.</p>
              <div className="flex">
                <Input 
                  type="email" 
                  placeholder="Your email" 
                  className="rounded-r-none bg-gray-800 border-gray-700 text-white"
                />
                <Button className="rounded-l-none">Subscribe</Button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-6 text-center">
            <p>&copy; 2025 EduCourse Network. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CourseDetail;
