import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

interface MarkAsPaidWithDateProps {
  invoiceId: string;
  status: string;
  onConfirm: (invoiceId: string, paidDate: Date) => void;
}

const MarkAsPaidWithDate = ({ invoiceId, status, onConfirm }: MarkAsPaidWithDateProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [open, setOpen] = useState(false);

  if (status !== "pending") return null;

  const handleConfirm = () => {
    if (selectedDate) {
      onConfirm(invoiceId, selectedDate); // ✅ send selected date
      setOpen(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="link" className="text-green-600 p-0 h-auto text-sm">
          Mark as Paid
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4" align="start">
        <div className="flex flex-col items-center gap-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              if (date && date <= new Date()) {
                setSelectedDate(date);
              }
            }}
            disabled={(date) => date > new Date()}
            className="rounded-md border"
          />
          <Button onClick={handleConfirm} className="w-full" disabled={!selectedDate}>
            Confirm
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default MarkAsPaidWithDate;
