import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useListCustomers, useAddCustomer, useGetCustomerPolicies } from '../hooks/useQueries';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, UserPlus, FileText, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Principal } from '@icp-sdk/core/principal';
import { Badge } from '@/components/ui/badge';

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<Principal | null>(null);
  const [newCustomer, setNewCustomer] = useState({ name: '', phone: '', address: '' });

  const { data: customers, isLoading } = useListCustomers();
  const { data: customerPolicies } = useGetCustomerPolicies(selectedCustomerId);
  const addCustomerMutation = useAddCustomer();

  const filteredCustomers = customers?.filter((customer) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      customer[1].name.toLowerCase().includes(searchLower) ||
      customer[1].phone.toLowerCase().includes(searchLower) ||
      customer[1].address.toLowerCase().includes(searchLower)
    );
  });

  const handleAddCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomer.name || !newCustomer.phone || !newCustomer.address) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await addCustomerMutation.mutateAsync(newCustomer);
      toast.success('Customer added successfully');
      setNewCustomer({ name: '', phone: '', address: '' });
      setIsAddDialogOpen(false);
    } catch (error) {
      toast.error('Failed to add customer');
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-insurance-primary mb-2">Customer Management</h1>
        <p className="text-muted-foreground">Manage your customer database and view their policies</p>
      </div>

      <div className="grid gap-6">
        {/* Add Customer Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Add New Customer
            </CardTitle>
            <CardDescription>Register a new customer in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <UserPlus className="h-4 w-4" />
                  Add Customer
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Customer</DialogTitle>
                  <DialogDescription>Enter the customer details below</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddCustomer} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={newCustomer.name}
                      onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                      placeholder="Enter customer name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={newCustomer.phone}
                      onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                      placeholder="Enter phone number"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      value={newCustomer.address}
                      onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
                      placeholder="Enter address"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={addCustomerMutation.isPending}>
                    {addCustomerMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Adding...
                      </>
                    ) : (
                      'Add Customer'
                    )}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* Customer List */}
        <Card>
          <CardHeader>
            <CardTitle>Customer List</CardTitle>
            <CardDescription>Search and view all registered customers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, phone, or address..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {isLoading ? (
              <div className="text-center py-8">
                <Loader2 className="h-8 w-8 animate-spin mx-auto text-insurance-primary" />
              </div>
            ) : !filteredCustomers || filteredCustomers.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <UserPlus className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>{searchTerm ? 'No customers found matching your search' : 'No customers registered yet'}</p>
              </div>
            ) : (
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Address</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCustomers.map(([id, customer]) => (
                      <TableRow key={id.toString()}>
                        <TableCell className="font-medium">{customer.name}</TableCell>
                        <TableCell>{customer.phone}</TableCell>
                        <TableCell>{customer.address}</TableCell>
                        <TableCell className="text-right">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedCustomerId(id)}
                                className="gap-2"
                              >
                                <FileText className="h-4 w-4" />
                                View Policies
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>{customer.name}'s Policies</DialogTitle>
                                <DialogDescription>View all policies associated with this customer</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-3 max-h-96 overflow-y-auto">
                                {!customerPolicies || customerPolicies.length === 0 ? (
                                  <p className="text-center py-8 text-muted-foreground">No policies found</p>
                                ) : (
                                  customerPolicies.map((policy) => (
                                    <div key={policy.policyNumber} className="p-4 border rounded-lg">
                                      <div className="flex items-start justify-between mb-2">
                                        <div>
                                          <h4 className="font-semibold">{policy.policyNumber}</h4>
                                          <p className="text-sm text-muted-foreground">{policy.insuranceCompany}</p>
                                        </div>
                                        <Badge>{policy.policyType}</Badge>
                                      </div>
                                      <div className="text-xs text-muted-foreground space-y-1">
                                        <p>
                                          Valid: {new Date(Number(policy.validFrom) / 1000000).toLocaleDateString()} -{' '}
                                          {new Date(Number(policy.validTo) / 1000000).toLocaleDateString()}
                                        </p>
                                        {policy.roadTaxExpiry > 0n && (
                                          <p>
                                            Road Tax Expires:{' '}
                                            {new Date(Number(policy.roadTaxExpiry) / 1000000).toLocaleDateString()}
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  ))
                                )}
                              </div>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
