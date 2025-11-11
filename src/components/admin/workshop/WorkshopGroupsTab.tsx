import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2, Copy, Download, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Group {
  id: string;
  group_name: string;
  group_code: string;
  slogan: string | null;
  logo_url: string | null;
}

const WorkshopGroupsTab = ({ workshopId }: { workshopId: string }) => {
  const { toast } = useToast();
  const [groups, setGroups] = useState<Group[]>([]);
  const [groupMembers, setGroupMembers] = useState<Record<string, number>>({});
  const [showDialog, setShowDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingGroup, setEditingGroup] = useState<Group | null>(null);
  const [bulkCount, setBulkCount] = useState(5);
  const [formData, setFormData] = useState({
    group_name: "",
  });

  useEffect(() => {
    fetchGroups();

    // Real-time subscriptions
    const groupsChannel = supabase
      .channel('workshop-groups-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'workshop_groups', filter: `workshop_id=eq.${workshopId}` }, () => fetchGroups())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'group_members' }, () => fetchGroupMembers())
      .subscribe();

    return () => {
      supabase.removeChannel(groupsChannel);
    };
  }, [workshopId]);

  useEffect(() => {
    if (groups.length > 0) {
      fetchGroupMembers();
    }
  }, [groups]);

  const fetchGroups = async () => {
    const { data, error } = await supabase
      .from('workshop_groups')
      .select('*')
      .eq('workshop_id', workshopId)
      .order('created_at', { ascending: true });

    if (!error && data) {
      setGroups(data);
    }
  };

  const fetchGroupMembers = async () => {
    const members: Record<string, number> = {};
    
    for (const group of groups) {
      const { count } = await supabase
        .from('group_members')
        .select('id', { count: 'exact', head: true })
        .eq('group_id', group.id);
      
      members[group.id] = count || 0;
    }
    
    setGroupMembers(members);
  };

  const generateCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const handleCreateGroup = async () => {
    if (!formData.group_name) {
      toast({ title: "Group name is required", variant: "destructive" });
      return;
    }

    const { error } = await supabase
      .from('workshop_groups')
      .insert([{
        workshop_id: workshopId,
        group_name: formData.group_name,
        group_code: generateCode(),
      }]);

    if (error) {
      toast({ title: "Error creating group", variant: "destructive" });
    } else {
      toast({ title: "Group created successfully" });
      fetchGroups();
      setFormData({ group_name: "" });
      setShowDialog(false);
    }
  };

  const handleBulkCreate = async () => {
    const groups = Array.from({ length: bulkCount }, (_, i) => ({
      workshop_id: workshopId,
      group_name: `Team ${i + 1}`,
      group_code: generateCode(),
    }));

    const { error } = await supabase
      .from('workshop_groups')
      .insert(groups);

    if (error) {
      toast({ title: "Error creating groups", variant: "destructive" });
    } else {
      toast({ title: `${bulkCount} groups created successfully` });
      fetchGroups();
    }
  };

  const handleEditGroup = (group: Group) => {
    setEditingGroup(group);
    setFormData({ group_name: group.group_name });
    setShowEditDialog(true);
  };

  const handleUpdateGroup = async () => {
    if (!editingGroup || !formData.group_name) {
      toast({ title: "Group name is required", variant: "destructive" });
      return;
    }

    const { error } = await supabase
      .from('workshop_groups')
      .update({ group_name: formData.group_name })
      .eq('id', editingGroup.id);

    if (error) {
      toast({ title: "Error updating group", variant: "destructive" });
    } else {
      toast({ title: "Group updated successfully" });
      fetchGroups();
      setShowEditDialog(false);
      setEditingGroup(null);
      setFormData({ group_name: "" });
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure? This will remove all members from this group.')) {
      const { error } = await supabase
        .from('workshop_groups')
        .delete()
        .eq('id', id);

      if (error) {
        toast({ title: "Error deleting group", variant: "destructive" });
      } else {
        toast({ title: "Group deleted successfully" });
        fetchGroups();
      }
    }
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({ title: "Code copied to clipboard" });
  };

  const exportCodes = () => {
    const csv = groups.map(g => `${g.group_name},${g.group_code}`).join('\n');
    const blob = new Blob(['Group Name,Join Code\n' + csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'workshop-group-codes.csv';
    a.click();
    toast({ title: "Codes exported" });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Groups & Codes</h2>
          <p className="text-muted-foreground">Manage workshop groups and join codes</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportCodes}>
            <Download className="h-4 w-4 mr-2" />
            Export Codes
          </Button>
          <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Group
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Group</DialogTitle>
                <DialogDescription>Add a new workshop group</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Group Name</Label>
                  <Input
                    value={formData.group_name}
                    onChange={(e) => setFormData({ group_name: e.target.value })}
                    placeholder="e.g., Team Alpha"
                  />
                </div>
                <Button onClick={handleCreateGroup} className="w-full">
                  Create Group
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Group</DialogTitle>
                <DialogDescription>Update group details</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Group Name</Label>
                  <Input
                    value={formData.group_name}
                    onChange={(e) => setFormData({ group_name: e.target.value })}
                    placeholder="e.g., Team Alpha"
                  />
                </div>
                <Button onClick={handleUpdateGroup} className="w-full">
                  Update Group
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bulk Generate Groups</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <Label>Number of Groups</Label>
              <Input
                type="number"
                value={bulkCount}
                onChange={(e) => setBulkCount(parseInt(e.target.value))}
                min={1}
                max={50}
              />
            </div>
            <Button onClick={handleBulkCreate}>
              Generate {bulkCount} Groups
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Groups ({groups.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Group Name</TableHead>
                <TableHead>Join Code</TableHead>
                <TableHead>Members</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {groups.map((group) => (
                <TableRow key={group.id}>
                  <TableCell className="font-medium">{group.group_name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <code className="bg-muted px-2 py-1 rounded">{group.group_code}</code>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyCode(group.group_code)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      {groupMembers[group.id] || 0} members
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEditGroup(group)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(group.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkshopGroupsTab;
