
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface List {
  id: string;
  name: string;
  user_id: string;
}

interface AddToListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToList: (selectedContacts: string[], listId: string) => void;
  userId: string;
}

export function AddToListModal({
  isOpen,
  onClose,
  onAddToList,
  userId,
}: AddToListModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedList, setSelectedList] = useState<string>("");

  // Mock lists data
  const lists: List[] = [
    { id: "1", name: "Wedding Clients", user_id: userId },
    { id: "2", name: "Corporate Events", user_id: userId },
    { id: "3", name: "Birthday Parties", user_id: userId },
  ];

  const filteredLists = lists.filter((list) =>
    list.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToList = () => {
    if (selectedList) {
      onAddToList([], selectedList); // You'll need to pass the actual selected contacts
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add to List</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Search lists..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="space-y-2">
            {filteredLists.map((list) => (
              <div
                key={list.id}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedList === list.id
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent"
                }`}
                onClick={() => setSelectedList(list.id)}
              >
                {list.name}
              </div>
            ))}
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleAddToList} disabled={!selectedList}>
              Add to List
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
