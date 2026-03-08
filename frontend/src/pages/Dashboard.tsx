import { Shield, Users, FileText, AlertTriangle, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useListCustomers, useListPolicies, useGetUpcomingExpirations } from '../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';
import { formatDistanceToNow } from 'date-fns';

export default function Dashboard() {
  const navigate = useNavigate();
  const { data: customers, isLoading: customersLoading } = useListCustomers();
  const { data: policies, isLoading: policiesLoading } = useListPolicies();
  const { data: expiringIn7Days } = useGetUpcomingExpirations(7);
  const { data: expiringIn30Days } = useGetUpcomingExpirations(30);
  const { data: expiringIn90Days } = useGetUpcomingExpirations(90);

  const getDaysUntilExpiry = (timestamp: bigint) => {
    const expiryDate = new Date(Number(timestamp) / 1000000);
    const now = new Date();
    const diffTime = expiryDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getUrgencyColor = (days: number) => {
    if (days <= 7) return 'urgent';
    if (days <= 30) return 'warning';
    return 'upcoming';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="mb-8 text-center">
        <div className="flex justify-center mb-4">
          <img
            src="/assets/generated/logo.dim_200x200.png"
            alt="KRISHNA TECH AND SOLUTIONS"
            className="h-24 w-24"
          />
        </div>
        <h1 className="text-4xl font-bold text-insurance-primary mb-2">KRISHNA TECH AND SOLUTIONS</h1>
        <p className="text-lg text-muted-foreground mb-1">IRDAI Registered Insurance Partner</p>
        <p className="text-sm text-muted-foreground">Insurance | CA | Legal</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border-insurance-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-insurance-primary" />
          </CardHeader>
          <CardContent>
            {customersLoading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <div className="text-2xl font-bold">{customers?.length || 0}</div>
            )}
          </CardContent>
        </Card>

        <Card className="border-insurance-accent/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Policies</CardTitle>
            <FileText className="h-4 w-4 text-insurance-accent" />
          </CardHeader>
          <CardContent>
            {policiesLoading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <div className="text-2xl font-bold">{policies?.length || 0}</div>
            )}
          </CardContent>
        </Card>

        <Card className="border-alert-urgent/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expiring in 7 Days</CardTitle>
            <AlertTriangle className="h-4 w-4 text-alert-urgent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-alert-urgent">{expiringIn7Days?.length || 0}</div>
          </CardContent>
        </Card>

        <Card className="border-alert-warning/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expiring in 30 Days</CardTitle>
            <TrendingUp className="h-4 w-4 text-alert-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-alert-warning">{expiringIn30Days?.length || 0}</div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Renewals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-insurance-primary" />
            Upcoming Policy Renewals
          </CardTitle>
          <CardDescription>Policies requiring attention in the next 90 days</CardDescription>
        </CardHeader>
        <CardContent>
          {!expiringIn90Days || expiringIn90Days.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Shield className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No upcoming renewals in the next 90 days</p>
            </div>
          ) : (
            <div className="space-y-4">
              {expiringIn90Days.slice(0, 5).map((policy) => {
                const daysUntil = getDaysUntilExpiry(policy.validTo);
                const urgency = getUrgencyColor(daysUntil);
                return (
                  <div
                    key={policy.policyNumber}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-semibold">{policy.policyNumber}</h4>
                        <Badge variant={urgency === 'urgent' ? 'destructive' : 'secondary'}>
                          {daysUntil} days left
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{policy.insuranceCompany}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Type: {policy.policyType} | Expires:{' '}
                        {formatDistanceToNow(new Date(Number(policy.validTo) / 1000000), { addSuffix: true })}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => navigate({ to: '/policies' })}>
                      View Details
                    </Button>
                  </div>
                );
              })}
              {expiringIn90Days.length > 5 && (
                <Button variant="outline" className="w-full" onClick={() => navigate({ to: '/alerts' })}>
                  View All {expiringIn90Days.length} Upcoming Renewals
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
