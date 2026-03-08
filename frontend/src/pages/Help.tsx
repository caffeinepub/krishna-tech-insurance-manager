import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle, Users, FileText, Bell, Shield } from 'lucide-react';

export default function Help() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-insurance-primary mb-2">Help & Documentation</h1>
        <p className="text-muted-foreground">Learn how to use the insurance management system</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Frequently Asked Questions
            </CardTitle>
            <CardDescription>Common questions and answers about using the system</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  How do I add a new customer?
                </AccordionTrigger>
                <AccordionContent>
                  Navigate to the Customers page and click the "Add Customer" button. Fill in the required fields
                  including name, phone number, and address. Click "Add Customer" to save the information to the
                  system.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  How do I register a new policy?
                </AccordionTrigger>
                <AccordionContent>
                  Go to the Policies page and click "Add Policy". Enter all required policy details including policy
                  number, type, insurance company, and dates. Select the customer from the dropdown menu. You can also
                  upload policy documents and add an optional road tax expiry date.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  How do alerts work?
                </AccordionTrigger>
                <AccordionContent>
                  The system automatically generates alerts for policies expiring within 30 days. Urgent alerts (7 days
                  or less) are highlighted in red, while warnings (8-30 days) are shown in yellow. Road tax expiry
                  alerts are also tracked separately.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>What file formats are supported for policy documents?</AccordionTrigger>
                <AccordionContent>
                  The system supports PDF, DOC, DOCX, JPG, JPEG, and PNG file formats for policy documents. You can
                  upload multiple documents per policy.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>How do I search for customers or policies?</AccordionTrigger>
                <AccordionContent>
                  Use the search bar on the Customers page to filter by name, phone, or address. On the Policies page,
                  use the company filter dropdown to view policies from specific insurance companies.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  What is road tax expiry tracking?
                </AccordionTrigger>
                <AccordionContent>
                  Road tax expiry is an optional field when adding vehicle insurance policies. The system will track
                  this date separately and generate alerts when the road tax is approaching expiry, helping you remind
                  customers to renew their road tax on time.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>Quick guide to using the system</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">1. Add Customers</h3>
              <p className="text-sm text-muted-foreground">
                Start by adding your customers to the system. Navigate to the Customers page and register each customer
                with their contact details.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">2. Register Policies</h3>
              <p className="text-sm text-muted-foreground">
                Once customers are added, create policies and link them to the appropriate customers. Upload policy
                documents for easy reference.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">3. Monitor Alerts</h3>
              <p className="text-sm text-muted-foreground">
                Check the Dashboard and Alerts page regularly to stay informed about upcoming policy renewals and
                expirations.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">4. Track Renewals</h3>
              <p className="text-sm text-muted-foreground">
                Use the dashboard metrics to see policies expiring in 7, 30, and 90 days. Contact customers proactively
                to ensure timely renewals.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
