import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetAlerts, useGetUpcomingExpirations, useListPolicies } from '../hooks/useQueries';
import { AlertTriangle, Bell, Calendar, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

export default function Alerts() {
  const { data: alerts, isLoading: alertsLoading } = useGetAlerts();
  const { data: upcomingExpirations, isLoading: expirationsLoading } = useGetUpcomingExpirations(30);
  const { data: policies } = useListPolicies();

  const getDaysUntilExpiry = (timestamp: bigint) => {
    const expiryDate = new Date(Number(timestamp) / 1000000);
    const now = new Date();
    const diffTime = expiryDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const roadTaxExpirations = policies
    ?.filter((p) => {
      if (p[1].roadTaxExpiry <= 0n) return false;
      const days = getDaysUntilExpiry(p[1].roadTaxExpiry);
      return days >= 0 && days <= 30;
    })
    .map((p) => p[1])
    .sort((a, b) => Number(a.roadTaxExpiry - b.roadTaxExpiry));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-insurance-primary mb-2">Alerts & Notifications</h1>
        <p className="text-muted-foreground">Stay informed about policy expirations and renewals</p>
      </div>

      <div className="grid gap-6">
        {/* Policy Expiration Alerts */}
        <Card className="border-alert-urgent/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-alert-urgent" />
              Policy Expiration Alerts
            </CardTitle>
            <CardDescription>Policies expiring in the next 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            {expirationsLoading ? (
              <div className="text-center py-8">
                <Loader2 className="h-8 w-8 animate-spin mx-auto text-insurance-primary" />
              </div>
            ) : !upcomingExpirations || upcomingExpirations.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <AlertTriangle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No policy expirations in the next 30 days</p>
              </div>
            ) : (
              <div className="space-y-3">
                {upcomingExpirations.map((policy) => {
                  const daysUntil = getDaysUntilExpiry(policy.validTo);
                  const isUrgent = daysUntil <= 7;
                  return (
                    <div
                      key={policy.policyNumber}
                      className={`p-4 border rounded-lg ${
                        isUrgent ? 'border-alert-urgent bg-alert-urgent/5' : 'border-alert-warning bg-alert-warning/5'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h4 className="font-semibold">{policy.policyNumber}</h4>
                            <Badge variant={isUrgent ? 'destructive' : 'secondary'}>
                              {isUrgent ? 'URGENT' : 'WARNING'}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{policy.insuranceCompany}</p>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${isUrgent ? 'text-alert-urgent' : 'text-alert-warning'}`}>
                            {daysUntil} days
                          </div>
                          <div className="text-xs text-muted-foreground">remaining</div>
                        </div>
                      </div>
                      <div className="text-sm space-y-1">
                        <p>
                          <span className="text-muted-foreground">Type:</span> {policy.policyType}
                        </p>
                        <p>
                          <span className="text-muted-foreground">Expires:</span>{' '}
                          {formatDistanceToNow(new Date(Number(policy.validTo) / 1000000), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Road Tax Expiry Alerts */}
        <Card className="border-alert-warning/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-alert-warning" />
              Road Tax Expiry Alerts
            </CardTitle>
            <CardDescription>Road tax expiring in the next 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            {!roadTaxExpirations || roadTaxExpirations.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No road tax expirations in the next 30 days</p>
              </div>
            ) : (
              <div className="space-y-3">
                {roadTaxExpirations.map((policy) => {
                  const daysUntil = getDaysUntilExpiry(policy.roadTaxExpiry);
                  const isUrgent = daysUntil <= 7;
                  return (
                    <div
                      key={policy.policyNumber}
                      className={`p-4 border rounded-lg ${
                        isUrgent ? 'border-alert-urgent bg-alert-urgent/5' : 'border-alert-warning bg-alert-warning/5'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h4 className="font-semibold">{policy.policyNumber}</h4>
                            <Badge variant={isUrgent ? 'destructive' : 'secondary'}>Road Tax</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{policy.insuranceCompany}</p>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${isUrgent ? 'text-alert-urgent' : 'text-alert-warning'}`}>
                            {daysUntil} days
                          </div>
                          <div className="text-xs text-muted-foreground">remaining</div>
                        </div>
                      </div>
                      <div className="text-sm">
                        <p>
                          <span className="text-muted-foreground">Road Tax Expires:</span>{' '}
                          {formatDistanceToNow(new Date(Number(policy.roadTaxExpiry) / 1000000), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* System Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-insurance-primary" />
              System Alerts
            </CardTitle>
            <CardDescription>All system-generated notifications</CardDescription>
          </CardHeader>
          <CardContent>
            {alertsLoading ? (
              <div className="text-center py-8">
                <Loader2 className="h-8 w-8 animate-spin mx-auto text-insurance-primary" />
              </div>
            ) : !alerts || alerts.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Bell className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No system alerts</p>
              </div>
            ) : (
              <div className="space-y-3">
                {alerts.map((alert) => (
                  <div key={alert.id.toString()} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <Badge variant="outline">{alert.alertType}</Badge>
                        </div>
                        <p className="text-sm">{alert.message}</p>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(Number(alert.timestamp) / 1000000), { addSuffix: true })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
