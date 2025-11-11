import { useState } from "react";
import { Search, Send, MoreVertical, Archive, Trash2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mockChats = [
  {
    id: 1,
    type: "event",
    name: "Hackathon 2024 - Team Alpha",
    lastMessage: "We just completed the frontend!",
    time: "2m ago",
    unread: 3,
    participants: 4,
    status: "active"
  },
  {
    id: 2,
    type: "mentorship",
    name: "Mentorship: John Doe",
    lastMessage: "Thank you for the guidance on React hooks",
    time: "15m ago",
    unread: 0,
    participants: 2,
    status: "active"
  },
  {
    id: 3,
    type: "event",
    name: "AI Workshop - Team Beta",
    lastMessage: "Can we get help with the ML model?",
    time: "1h ago",
    unread: 5,
    participants: 5,
    status: "active"
  },
  {
    id: 4,
    type: "general",
    name: "Course Q&A: Advanced JavaScript",
    lastMessage: "What's the difference between let and const?",
    time: "3h ago",
    unread: 0,
    participants: 12,
    status: "active"
  },
  {
    id: 5,
    type: "event",
    name: "Design Sprint - Team Gamma",
    lastMessage: "Final prototype is ready for review",
    time: "5h ago",
    unread: 2,
    participants: 3,
    status: "archived"
  },
];

const mockMessages = [
  { id: 1, sender: "Alex Chen", message: "Hey team, how's the progress?", time: "10:30 AM", isAdmin: false },
  { id: 2, sender: "You", message: "Great! What component are you working on?", time: "10:32 AM", isAdmin: true },
  { id: 3, sender: "Alex Chen", message: "We just completed the frontend!", time: "10:35 AM", isAdmin: false },
  { id: 4, sender: "Sarah Kim", message: "Backend API integration is almost done", time: "10:36 AM", isAdmin: false },
];

const AdminChat = () => {
  const [selectedChat, setSelectedChat] = useState(mockChats[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredChats = mockChats.filter(chat => {
    const matchesSearch = chat.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" || chat.type === activeTab;
    return matchesSearch && matchesTab;
  });

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      console.log("Sending message:", messageInput);
      setMessageInput("");
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Chat Center</h1>
        <p className="text-muted-foreground">Manage all conversations across events, mentorship, and courses</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Chat List Sidebar */}
        <Card className="lg:col-span-1 p-4 flex flex-col">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="event">Events</TabsTrigger>
              <TabsTrigger value="mentorship">Mentor</TabsTrigger>
              <TabsTrigger value="general">General</TabsTrigger>
            </TabsList>
          </Tabs>

          <ScrollArea className="flex-1">
            <div className="space-y-2">
              {filteredChats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setSelectedChat(chat)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedChat.id === chat.id
                      ? "bg-secondary"
                      : "hover:bg-secondary/50"
                  }`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium text-sm">{chat.name}</span>
                    </div>
                    {chat.unread > 0 && (
                      <Badge variant="destructive" className="h-5 px-1.5 text-xs">
                        {chat.unread}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground truncate mb-1">
                    {chat.lastMessage}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{chat.time}</span>
                    <Badge variant="outline" className="text-xs">
                      {chat.participants} members
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>

        {/* Chat Window */}
        <Card className="lg:col-span-2 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div>
              <h3 className="font-semibold">{selectedChat.name}</h3>
              <p className="text-xs text-muted-foreground">
                {selectedChat.participants} participants • Active now
              </p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Users className="mr-2 h-4 w-4" />
                  View Participants
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Archive className="mr-2 h-4 w-4" />
                  Archive Chat
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Chat
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {mockMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isAdmin ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex gap-2 max-w-[70%] ${msg.isAdmin ? "flex-row-reverse" : ""}`}>
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">
                        {msg.sender.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium">{msg.sender}</span>
                        <span className="text-xs text-muted-foreground">{msg.time}</span>
                      </div>
                      <div
                        className={`p-3 rounded-lg ${
                          msg.isAdmin
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary"
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminChat;
