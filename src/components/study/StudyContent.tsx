import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText,
  Video,
  Link as LinkIcon,
  Highlighter,
  Search,
  Bookmark,
  Eye,
  Pencil,
  ExternalLink
} from "lucide-react";

interface StudyContentProps {
  materials: Array<{
    type: string;
    title: string;
    url: string;
    pages?: string;
    duration?: string;
  }>;
  notes: string;
  onNotesChange: (notes: string) => void;
}

export const StudyContent = ({ materials, notes, onNotesChange }: StudyContentProps) => {
  const [highlightedText, setHighlightedText] = useState<string[]>([]);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const addHighlight = () => {
    const selection = window.getSelection()?.toString();
    if (selection && !highlightedText.includes(selection)) {
      setHighlightedText([...highlightedText, selection]);
    }
  };

  const addBookmark = () => {
    const bookmark = `Page ${Math.floor(Math.random() * 50) + 1} - ${new Date().toLocaleTimeString()}`;
    setBookmarks([...bookmarks, bookmark]);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      default: return <LinkIcon className="h-4 w-4" />;
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'pdf': return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400';
      case 'video': return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400';
      default: return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Material Viewer */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Study Materials
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={addHighlight}>
                <Highlighter className="h-4 w-4 mr-1" />
                Highlight
              </Button>
              <Button variant="outline" size="sm" onClick={addBookmark}>
                <Bookmark className="h-4 w-4 mr-1" />
                Bookmark
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="content" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="materials">Materials</TabsTrigger>
              <TabsTrigger value="tools">Tools</TabsTrigger>
            </TabsList>
            
            <TabsContent value="content" className="space-y-4">
              {/* Search Bar */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search content..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              {/* PDF/Content Viewer Mock */}
              <div className="bg-muted/30 rounded-lg p-6 min-h-[400px] border-2 border-dashed border-muted-foreground/20">
                <div className="text-center space-y-4">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto" />
                  <div>
                    <h3 className="font-semibold text-lg">Data Structures Textbook - Chapter 3</h3>
                    <p className="text-muted-foreground">Linked Lists Implementation</p>
                    <Badge variant="outline" className="mt-2">Pages 45-67</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    This is where the PDF content would be displayed. In a real application, 
                    you would integrate a PDF viewer library like react-pdf or pdf.js.
                  </p>
                  <div className="space-y-2 text-left max-w-lg mx-auto">
                    <h4 className="font-medium">Sample Content:</h4>
                    <p className="text-sm bg-background p-3 rounded border">
                      <strong>3.1 Introduction to Linked Lists</strong><br/>
                      A linked list is a linear data structure where elements are stored in nodes, 
                      and each node contains data and a reference (or link) to the next node in the sequence...
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="materials" className="space-y-4">
              <div className="space-y-3">
                {materials.map((material, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      {getTypeIcon(material.type)}
                      <div>
                        <h4 className="font-medium">{material.title}</h4>
                        {material.pages && (
                          <p className="text-sm text-muted-foreground">Pages: {material.pages}</p>
                        )}
                        {material.duration && (
                          <p className="text-sm text-muted-foreground">Duration: {material.duration}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getTypeBadgeColor(material.type)}>
                        {material.type.toUpperCase()}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="tools" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Highlighter className="h-4 w-4" />
                      Highlights ({highlightedText.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {highlightedText.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No highlights yet</p>
                    ) : (
                      highlightedText.map((text, index) => (
                        <div key={index} className="text-xs bg-yellow-50 border border-yellow-200 rounded p-2 dark:bg-yellow-900/20 dark:border-yellow-800">
                          "{text}"
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Bookmark className="h-4 w-4" />
                      Bookmarks ({bookmarks.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {bookmarks.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No bookmarks yet</p>
                    ) : (
                      bookmarks.map((bookmark, index) => (
                        <div key={index} className="text-xs bg-blue-50 border border-blue-200 rounded p-2 dark:bg-blue-900/20 dark:border-blue-800">
                          {bookmark}
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Notes Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Pencil className="h-5 w-5" />
            Session Notes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Take notes during your study session..."
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
            className="min-h-[150px] resize-none"
          />
          <p className="text-xs text-muted-foreground mt-2">
            Your notes are automatically saved
          </p>
        </CardContent>
      </Card>
    </div>
  );
};