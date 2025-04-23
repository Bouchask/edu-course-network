
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Mock blog posts
const blogPosts = [
  {
    id: 1,
    title: "Getting Started with Web Development",
    excerpt: "Learn the basics of HTML, CSS, and JavaScript to kickstart your web development journey.",
    date: "April 15, 2025",
    author: "John Smith",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    title: "Advanced React Patterns Every Developer Should Know",
    excerpt: "Explore powerful React patterns to make your components more reusable and maintainable.",
    date: "April 10, 2025",
    author: "Jane Doe",
    image: "https://images.unsplash.com/photo-1516116412548-65ca1b4eea4b?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    title: "The Future of Online Learning",
    excerpt: "Discover how technology is transforming education and what to expect in the coming years.",
    date: "April 5, 2025",
    author: "Michael Johnson",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=600&q=80"
  }
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">EduCourse Blog</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Latest insights, tutorials, and news about online education and web development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <span>{post.author}</span>
                </div>
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                <Link 
                  to={`/blog/${post.id}`}
                  className="text-primary font-medium hover:underline"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
