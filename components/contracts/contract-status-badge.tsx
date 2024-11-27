import { Badge } from "@/components/ui/badge";

type ContractStatus = "Draft" | "Sent" | "Signed";

interface ContractStatusBadgeProps {
  status: ContractStatus;
}

const statusStyles = {
  Draft: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  Sent: "bg-blue-100 text-blue-800 hover:bg-blue-100",
  Signed: "bg-green-100 text-green-800 hover:bg-green-100",
};

export function ContractStatusBadge({ status }: ContractStatusBadgeProps) {
  return (
    <Badge className={statusStyles[status]} variant="outline">
      {status}
    </Badge>
  );
}