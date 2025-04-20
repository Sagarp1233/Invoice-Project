
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    content:
      "InvoiceGenie has transformed how I handle invoicing. It's intuitive, fast, and professional - exactly what my small business needed!",
    author: "Sarah Johnson",
    role: "Freelance Designer",
    rating: 5,
  },
  {
    content:
      "The templates are beautiful and I can create invoices in under a minute. My clients are impressed with the professional look.",
    author: "Michael Chen",
    role: "Marketing Consultant",
    rating: 5,
  },
  {
    content:
      "I've tried many invoicing tools, but this one has the perfect balance of features without being overwhelming. Highly recommended!",
    author: "Alex Rodriguez",
    role: "Web Developer",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <div className="py-24 bg-invoice-lightGrey">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold gradient-heading mb-4">
            Loved by Freelancers & Businesses
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it - see what our users have to say
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <Card key={i} className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {Array(testimonial.rating)
                    .fill(null)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-invoice-purple text-invoice-purple"
                      />
                    ))}
                </div>
                <p className="mb-6 text-foreground">{testimonial.content}</p>
                <div>
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
