import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Support() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-insurance-primary mb-2">Support & Contact</h1>
        <p className="text-muted-foreground">Get in touch with KRISHNA TECH AND SOLUTIONS</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-insurance-primary" />
              Phone Support
            </CardTitle>
            <CardDescription>Call us for immediate assistance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-2xl font-bold text-insurance-primary">6290932283</p>
                <p className="text-sm text-muted-foreground mt-1">Available during business hours</p>
              </div>
              <Button className="w-full" asChild>
                <a href="tel:6290932283">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Now
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-insurance-primary" />
              Email Support
            </CardTitle>
            <CardDescription>Send us an email for detailed inquiries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-lg font-semibold break-all">krishnatechandsolutions@gmail.com</p>
                <p className="text-sm text-muted-foreground mt-1">We typically respond within 24 hours</p>
              </div>
              <Button className="w-full" variant="outline" asChild>
                <a href="mailto:krishnatechandsolutions@gmail.com">
                  <Mail className="mr-2 h-4 w-4" />
                  Send Email
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-insurance-primary" />
              Business Hours
            </CardTitle>
            <CardDescription>When we're available to help</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Monday - Friday:</span>
                <span className="font-medium">9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Saturday:</span>
                <span className="font-medium">10:00 AM - 4:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sunday:</span>
                <span className="font-medium">Closed</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-insurance-primary" />
              Our Services
            </CardTitle>
            <CardDescription>What we offer</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-insurance-primary mt-1">•</span>
                <span>Insurance Policy Management</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-insurance-primary mt-1">•</span>
                <span>CA (Chartered Accountant) Services</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-insurance-primary mt-1">•</span>
                <span>Legal Consultation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-insurance-primary mt-1">•</span>
                <span>Policy Renewal Reminders</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-insurance-primary mt-1">•</span>
                <span>Document Management</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>About KRISHNA TECH AND SOLUTIONS</CardTitle>
          <CardDescription>IRDAI Registered Insurance Partner</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-4">
            <img
              src="/assets/generated/logo.dim_200x200.png"
              alt="KRISHNA TECH AND SOLUTIONS"
              className="h-20 w-20"
            />
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-4">
                KRISHNA TECH AND SOLUTIONS is a trusted IRDAI registered insurance partner providing comprehensive
                insurance solutions, chartered accountant services, and legal consultation. We are committed to helping
                our clients protect their assets and plan for the future with confidence.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-insurance-primary/10 text-insurance-primary rounded-full text-xs font-medium">
                  Insurance
                </span>
                <span className="px-3 py-1 bg-insurance-accent/10 text-insurance-accent rounded-full text-xs font-medium">
                  CA Services
                </span>
                <span className="px-3 py-1 bg-insurance-primary/10 text-insurance-primary rounded-full text-xs font-medium">
                  Legal
                </span>
                <span className="px-3 py-1 bg-insurance-accent/10 text-insurance-accent rounded-full text-xs font-medium">
                  IRDAI Registered
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
