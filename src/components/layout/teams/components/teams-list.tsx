import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { Mail } from "../data";
import { useMail } from "../use-teams";

interface TeamsListProps {
  items: Mail[];
}

export function TeamsList({ items }: TeamsListProps) {
  const [mail, setMail] = useMail();

  return (
    <ScrollArea className="h-screen">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {items.map((item) => (
          <button
            key={item.id}
            className={cn(
              "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
              mail.selected === item.id && "bg-muted"
            )}
            onClick={() =>
              setMail({
                ...mail,
                selected: item.id,
              })
            }
          >
            <div className="flex w-full flex-row gap-2">
              <Avatar>
                <AvatarFallback>OG</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-2 text-left">
                <div className="flex flex-row items-center justify-between">
                  <div className="font-semibold">{item.name}</div>
                  {!item.read && (
                    <span className="mx-1 flex h-2 w-2 rounded-full bg-blue-600" />
                  )}
                  <div
                    className={cn(
                      "ml-auto text-xs",
                      mail.selected === item.id
                        ? "text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {formatDistanceToNow(new Date(item.date))}
                  </div>
                </div>
                <div className="line-clamp-1 text-xs text-muted-foreground">
                  {item.text.substring(0, 300)}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}
