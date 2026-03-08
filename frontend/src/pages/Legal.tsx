import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Scale, Shield, FileText, Lock } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function Legal() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-insurance-primary mb-2">Legal Information</h1>
        <p className="text-muted-foreground">Terms, privacy, and regulatory compliance</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scale className="h-5 w-5 text-insurance-primary" />
              Terms of Service
            </CardTitle>
            <CardDescription>Last updated: {new Date().toLocaleDateString()}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold mb-2">1. Acceptance of Terms</h3>
              <p className="text-muted-foreground">
                By accessing and using this insurance management system, you accept and agree to be bound by the terms
                and provision of this agreement. KRISHNA TECH AND SOLUTIONS reserves the right to modify these terms at
                any time.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold mb-2">2. Use of Service</h3>
              <p className="text-muted-foreground">
                This system is provided for the management of insurance policies and customer information. Users must
                ensure all information entered is accurate and up-to-date. Misuse of the system or entry of false
                information is prohibited.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold mb-2">3. Data Accuracy</h3>
              <p className="text-muted-foreground">
                While we strive to maintain accurate records, users are responsible for verifying all policy details
                and customer information. KRISHNA TECH AND SOLUTIONS is not liable for errors or omissions in data
                entry.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold mb-2">4. Limitation of Liability</h3>
              <p className="text-muted-foreground">
                KRISHNA TECH AND SOLUTIONS shall not be liable for any indirect, incidental, special, consequential, or
                punitive damages resulting from your use of or inability to use the service.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-insurance-primary" />
              Privacy Policy
            </CardTitle>
            <CardDescription>How we protect your information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold mb-2">Information Collection</h3>
              <p className="text-muted-foreground">
                We collect customer information including names, contact details, and policy information solely for the
                purpose of insurance management and customer service. All data is stored securely on the Internet
                Computer blockchain.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold mb-2">Data Security</h3>
              <p className="text-muted-foreground">
                We implement industry-standard security measures to protect your data. All information is encrypted and
                stored on a decentralized blockchain infrastructure, ensuring data integrity and security.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold mb-2">Data Usage</h3>
              <p className="text-muted-foreground">
                Your information is used exclusively for insurance policy management, renewal reminders, and customer
                service. We do not sell, trade, or transfer your personal information to third parties without your
                consent.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold mb-2">Your Rights</h3>
              <p className="text-muted-foreground">
                You have the right to access, correct, or request deletion of your personal information. Contact us at
                krishnatechandsolutions@gmail.com for any privacy-related inquiries.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-insurance-primary" />
              Regulatory Compliance
            </CardTitle>
            <CardDescription>IRDAI registration and compliance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold mb-2">IRDAI Registration</h3>
              <p className="text-muted-foreground">
                KRISHNA TECH AND SOLUTIONS is a registered insurance partner with the Insurance Regulatory and
                Development Authority of India (IRDAI). We operate in full compliance with IRDAI regulations and
                guidelines.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold mb-2">Professional Standards</h3>
              <p className="text-muted-foreground">
                We adhere to the highest professional standards in insurance services, chartered accountancy, and legal
                consultation. Our team is committed to ethical practices and regulatory compliance.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold mb-2">Customer Protection</h3>
              <p className="text-muted-foreground">
                All insurance policies are subject to the terms and conditions of the respective insurance companies. We
                act as intermediaries and advisors, ensuring customers receive appropriate coverage and timely service.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-insurance-primary" />
              Contact for Legal Matters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p className="text-muted-foreground">
              For any legal inquiries, compliance questions, or concerns regarding these terms:
            </p>
            <div className="space-y-1 mt-4">
              <p>
                <span className="font-semibold">Email:</span> krishnatechandsolutions@gmail.com
              </p>
              <p>
                <span className="font-semibold">Phone:</span> 6290932283
              </p>
              <p>
                <span className="font-semibold">Company:</span> KRISHNA TECH AND SOLUTIONS
              </p>
              <p>
                <span className="font-semibold">Status:</span> IRDAI Registered Insurance Partner
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
