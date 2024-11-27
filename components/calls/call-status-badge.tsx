import { Badge } from "@/components/ui/badge";

type CallStatus = "completed" | "failed" | "busy" | "no-answer" | "in-progress";

interface CallStatusBadgeProps {
  status: CallStatus;
}

const statusStyles = {
  completed: "bg-green-100 text-green-800 hover:bg-green-100",
  failed: "bg-red-100 text-red-800 hover:bg-red-100",
  busy: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  "no-answer": "bg-gray-100 text-gray-800 hover:bg-gray-100",
  "in-progress": "bg-blue-100 text-blue-800 hover:bg-blue-100",
};

export function CallStatusBadge({ status }: CallStatusBadgeProps) {
  return (
    <Badge className={statusStyles[status]} variant="outline">
      {status.replace("-", " ")}
    </Badge>
  );
}