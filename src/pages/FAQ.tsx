
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Mock FAQ data
const faqItems = [
  {
    question: "How do I enroll in a course?",
    answer: "To enroll in a course, navigate to the course page and click the 'Enroll Now' button. You'll be guided through the payment process (if applicable) and then gain immediate access to the course materials."
  },
  {
    question: "Can I access the courses on mobile devices?",
    answer: "Yes, all our courses are fully responsive and can be accessed on any device including smartphones, tablets, laptops, and desktop computers."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and bank transfers for course payments. All transactions are secure and encrypted."
  },
  {
    question: "Are there any prerequisites for the courses?",
    answer: "Prerequisites vary by course. Please check the course description page for specific requirements. Beginner courses typically have no prerequisites."
  },
  {
    question: "How long do I have access to a course after purchasing?",
    answer: "Once you purchase a course, you get lifetime access to the course materials, updates, and community forums associated with that course."
  },
  {
    question: "Can I get a refund if I'm not satisfied?",
    answer: "Yes, we offer a 30-day money-back guarantee. If you're not satisfied with the course, contact our support team within 30 days of purchase for a full refund."
  },
  {
    question: "How do I get help if I'm stuck on a lesson?",
    answer: "Each course has a discussion forum where you can ask questions and get help from instructors and fellow students. You can also contact our support team directly."
  },
  {
    question: "Do you provide certificates upon completion?",
    answer: "Yes, you'll receive a certificate of completion after finishing all the required lessons and assignments in a course."
  }
];

const FAQ = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our courses and platform
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6">
          <div className="divide-y">
            {faqItems.map((item, index) => (
              <div key={index} className="py-6">
                <h3 className="text-lg font-semibold mb-2">{item.question}</h3>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t text-center">
            <p className="mb-4">Didn't find what you're looking for?</p>
            <Link to="/contact" className="inline-block bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors">
              Contact Support
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FAQ;
