import { format } from "date-fns/format";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Mail } from "../data";

interface TeamsDisplayProps {
  mail: Mail | null;
}

export function TeamsDisplay({ mail }: TeamsDisplayProps) {
  return (
    <div className="flex h-full flex-col">
      <ChatHeader mail={mail} />
      <Separator />
      {mail ? (
        <div className="flex flex-1 flex-col">
          <Separator />
          <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
            {mail.text}
          </div>
          <Separator className="mt-auto" />
          <div className="p-4">
            <form>
              <div className="grid gap-4">
                <Textarea
                  className="p-4"
                  placeholder={`Reply ${mail.name}...`}
                />
                <div className="flex items-center">
                  <Label
                    htmlFor="mute"
                    className="flex items-center gap-2 text-xs font-normal"
                  >
                    <Switch id="mute" aria-label="Mute thread" /> Mute this
                    thread
                  </Label>
                  <Button
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                    className="ml-auto"
                  >
                    Send
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center text-muted-foreground">
          No message selected
        </div>
      )}
    </div>
  );
}

function ChatHeader({ mail }: { mail: Mail | null }) {
  return (
    <div className="p-2 flex items-center w-full">
      {mail && (
        <div className="flex items-start gap-4">
          <Avatar>
            <AvatarImage alt={mail.name} />
            <AvatarFallback>
              {mail.name
                .split(" ")
                .map((chunk) => chunk[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <div className="font-semibold">{mail.name}</div>
          </div>
          {mail.date && (
            <div className="justify-end text-xs text-muted-foreground">
              {format(new Date(mail.date), "PPpp")}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
