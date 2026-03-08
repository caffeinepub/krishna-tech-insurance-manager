import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useListPolicies, useAddPolicy, useListCustomers } from '../hooks/useQueries';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Filter, Upload, Loader2, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Principal } from '@icp-sdk/core/principal';
import { Badge } from '@/components/ui/badge';
import { ExternalBlob } from '../backend';

export default function Policies() {
  const [filterCompany, setFilterCompany] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [newPolicy, setNewPolicy] = useState({
    policyNumber: '',
    policyType: '',
    insuranceCompany: '',
    customerId: '',
    validFrom: '',
    validTo: '',
    roadTaxExpiry: '',
  });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const { data: policies, isLoading } = useListPolicies();
  const { data: customers } = useListCustomers();
  const addPolicyMutation = useAddPolicy();

  const companies = Array.from(new Set(policies?.map((p) => p[1].insuranceCompany) || []));

  const filteredPolicies = policies?.filter((policy) => {
    if (filterCompany === 'all') return true;
    return policy[1].insuranceCompany === filterCompany;
  });

  const getDaysUntilExpiry = (timestamp: bigint) => {
    const expiryDate = new Date(Number(timestamp) / 1000000);
    const now = new Date();
    const diffTime = expiryDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getExpiryBadge = (validTo: bigint) => {
    const days = getDaysUntilExpiry(validTo);
    if (days < 0) return <Badge variant="destructive">Expired</Badge>;
    if (days <= 7) return <Badge variant="destructive">{days} days left</Badge>;
    if (days <= 30) return <Badge className="bg-alert-warning text-white">{days} days left</Badge>;
    return <Badge variant="secondary">{days} days left</Badge>;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleAddPolicy = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !newPolicy.policyNumber ||
      !newPolicy.policyType ||
      !newPolicy.insuranceCompany ||
      !newPolicy.customerId ||
      !newPolicy.validFrom ||
      !newPolicy.validTo
    ) {
      toast.error('Please fill in all required fields');
      return;
    }

    const validFromDate = new Date(newPolicy.validFrom);
    const validToDate = new Date(newPolicy.validTo);

    if (validToDate <= validFromDate) {
      toast.error('Expiry date must be after start date');
      return;
    }

    try {
      const documents: ExternalBlob[] = [];
      for (const file of selectedFiles) {
        const arrayBuffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        const blob = ExternalBlob.fromBytes(uint8Array).withUploadProgress((percentage) => {
          setUploadProgress(percentage);
        });
        documents.push(blob);
      }

      await addPolicyMutation.mutateAsync({
        policyNumber: newPolicy.policyNumber,
        policyType: newPolicy.policyType,
        insuranceCompany: newPolicy.insuranceCompany,
        customerId: Principal.fromText(newPolicy.customerId),
        validFrom: BigInt(validFromDate.getTime() * 1000000),
        validTo: BigInt(validToDate.getTime() * 1000000),
        roadTaxExpiry: newPolicy.roadTaxExpiry
          ? BigInt(new Date(newPolicy.roadTaxExpiry).getTime() * 1000000)
          : BigInt(0),
        documents,
      });

      toast.success('Policy added successfully');
      setNewPolicy({
        policyNumber: '',
        policyType: '',
        insuranceCompany: '',
        customerId: '',
        validFrom: '',
        validTo: '',
        roadTaxExpiry: '',
      });
      setSelectedFiles([]);
      setUploadProgress(0);
      setIsAddDialogOpen(false);
    } catch (error) {
      toast.error('Failed to add policy');
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-insurance-primary mb-2">Policy Management</h1>
        <p className="text-muted-foreground">Manage insurance policies and track renewals</p>
      </div>

      <div className="grid gap-6">
        {/* Add Policy Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Add New Policy
            </CardTitle>
            <CardDescription>Register a new insurance policy</CardDescription>
          </CardHeader>
          <CardContent>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <FileText className="h-4 w-4" />
                  Add Policy
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Policy</DialogTitle>
                  <DialogDescription>Enter the policy details below</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddPolicy} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="policyNumber">Policy Number *</Label>
                      <Input
                        id="policyNumber"
                        value={newPolicy.policyNumber}
                        onChange={(e) => setNewPolicy({ ...newPolicy, policyNumber: e.target.value })}
                        placeholder="Enter policy number"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="policyType">Policy Type *</Label>
                      <Input
                        id="policyType"
                        value={newPolicy.policyType}
                        onChange={(e) => setNewPolicy({ ...newPolicy, policyType: e.target.value })}
                        placeholder="e.g., Life, Health, Vehicle"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="insuranceCompany">Insurance Company *</Label>
                    <Input
                      id="insuranceCompany"
                      value={newPolicy.insuranceCompany}
                      onChange={(e) => setNewPolicy({ ...newPolicy, insuranceCompany: e.target.value })}
                      placeholder="Enter company name"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="customerId">Customer *</Label>
                    <Select value={newPolicy.customerId} onValueChange={(value) => setNewPolicy({ ...newPolicy, customerId: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select customer" />
                      </SelectTrigger>
                      <SelectContent>
                        {customers?.map(([id, customer]) => (
                          <SelectItem key={id.toString()} value={id.toString()}>
                            {customer.name} - {customer.phone}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="validFrom">Start Date *</Label>
                      <Input
                        id="validFrom"
                        type="date"
                        value={newPolicy.validFrom}
                        onChange={(e) => setNewPolicy({ ...newPolicy, validFrom: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="validTo">Expiry Date *</Label>
                      <Input
                        id="validTo"
                        type="date"
                        value={newPolicy.validTo}
                        onChange={(e) => setNewPolicy({ ...newPolicy, validTo: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="roadTaxExpiry">Road Tax Expiry (Optional)</Label>
                    <Input
                      id="roadTaxExpiry"
                      type="date"
                      value={newPolicy.roadTaxExpiry}
                      onChange={(e) => setNewPolicy({ ...newPolicy, roadTaxExpiry: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="documents">Policy Documents</Label>
                    <div className="mt-2">
                      <Input
                        id="documents"
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                      />
                      {selectedFiles.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {selectedFiles.map((file, index) => (
                            <div key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                              {file.name}
                            </div>
                          ))}
                        </div>
                      )}
                      {uploadProgress > 0 && uploadProgress < 100 && (
                        <div className="mt-2">
                          <div className="text-sm text-muted-foreground mb-1">Uploading: {uploadProgress}%</div>
                          <div className="w-full bg-secondary rounded-full h-2">
                            <div
                              className="bg-insurance-primary h-2 rounded-full transition-all"
                              style={{ width: `${uploadProgress}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={addPolicyMutation.isPending}>
                    {addPolicyMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Adding Policy...
                      </>
                    ) : (
                      'Add Policy'
                    )}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* Policy List */}
        <Card>
          <CardHeader>
            <CardTitle>Policy List</CardTitle>
            <CardDescription>View and filter all insurance policies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center gap-3">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={filterCompany} onValueChange={setFilterCompany}>
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Filter by company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Companies</SelectItem>
                  {companies.map((company) => (
                    <SelectItem key={company} value={company}>
                      {company}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {isLoading ? (
              <div className="text-center py-8">
                <Loader2 className="h-8 w-8 animate-spin mx-auto text-insurance-primary" />
              </div>
            ) : !filteredPolicies || filteredPolicies.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>{filterCompany !== 'all' ? 'No policies found for this company' : 'No policies registered yet'}</p>
              </div>
            ) : (
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Policy Number</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Valid From</TableHead>
                      <TableHead>Expiry</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Documents</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPolicies.map(([policyNumber, policy]) => (
                      <TableRow key={policyNumber}>
                        <TableCell className="font-medium">{policy.policyNumber}</TableCell>
                        <TableCell>{policy.policyType}</TableCell>
                        <TableCell>{policy.insuranceCompany}</TableCell>
                        <TableCell>{new Date(Number(policy.validFrom) / 1000000).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(Number(policy.validTo) / 1000000).toLocaleDateString()}</TableCell>
                        <TableCell>{getExpiryBadge(policy.validTo)}</TableCell>
                        <TableCell>
                          {policy.documents.length > 0 ? (
                            <Badge variant="outline" className="gap-1">
                              <FileText className="h-3 w-3" />
                              {policy.documents.length}
                            </Badge>
                          ) : (
                            <span className="text-muted-foreground text-sm">None</span>
                          )}
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
