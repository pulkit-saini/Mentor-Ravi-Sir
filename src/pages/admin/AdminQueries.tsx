import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ContactQuery {
  id: string;
  full_name: string;
  email: string;
  mobile_number: string;
  query_type: string;
  message: string;
  status: string;
  created_at: string;
}

const AdminQueries = () => {
  const { toast } = useToast();
  const [queries, setQueries] = useState<ContactQuery[]>([]);
  const [selectedQuery, setSelectedQuery] = useState<ContactQuery | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);

  useEffect(() => {
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    const { data, error } = await supabase
      .from('contact_queries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({ title: "Error fetching queries", variant: "destructive" });
    } else {
      setQueries(data || []);
    }
  };

  const markAsResolved = async (id: string) => {
    const { error } = await supabase
      .from('contact_queries')
      .update({ status: 'resolved' })
      .eq('id', id);

    if (error) {
      toast({ title: "Error updating status", variant: "destructive" });
    } else {
      toast({ title: "Query marked as resolved" });
      fetchQueries();
    }
  };

  const viewDetails = (query: ContactQuery) => {
    setSelectedQuery(query);
    setShowDetailsDialog(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Contact Queries</h1>
        <p className="text-muted-foreground">Manage and respond to user inquiries</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Queries ({queries.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {queries.map((query) => (
                <TableRow key={query.id}>
                  <TableCell className="font-medium">{query.full_name}</TableCell>
                  <TableCell>{query.email}</TableCell>
                  <TableCell>{query.mobile_number}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{query.query_type}</Badge>
                  </TableCell>
                  <TableCell>{new Date(query.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge className={query.status === 'resolved' ? 'bg-green-500' : 'bg-yellow-500'}>
                      {query.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline" onClick={() => viewDetails(query)}>
                        View
                      </Button>
                      {query.status !== 'resolved' && (
                        <Button size="sm" variant="default" onClick={() => markAsResolved(query.id)}>
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Resolve
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Query Details</DialogTitle>
            <DialogDescription>Full query information</DialogDescription>
          </DialogHeader>
          {selectedQuery && (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Name</p>
                <p className="text-base">{selectedQuery.full_name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p className="text-base">{selectedQuery.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Phone</p>
                <p className="text-base">{selectedQuery.mobile_number}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Query Type</p>
                <Badge variant="outline">{selectedQuery.query_type}</Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Message</p>
                <p className="text-base">{selectedQuery.message}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Date Submitted</p>
                <p className="text-base">{new Date(selectedQuery.created_at).toLocaleString()}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminQueries;
