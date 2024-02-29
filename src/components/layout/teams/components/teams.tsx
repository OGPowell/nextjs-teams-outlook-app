"use client";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  Bell,
  Calendar,
  Edit,
  MessageCircle,
  Phone,
  Search,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { mails } from "../data";
import { useMail } from "../use-teams";
import { TeamsDisplay } from "./teams-display";
import { TeamsList } from "./teams-list";
import { TeamsNav } from "./teams-nav";

export function Teams() {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [mail] = useMail();

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes
          )}`;
        }}
        className="h-full max-h-[800px] items-stretch"
      >
        <ResizablePanel
          collapsible={true}
          minSize={15}
          maxSize={20}
          //   @ts-ignore
          onCollapse={(collapsed) => {
            setIsCollapsed(collapsed);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              collapsed
            )}`;
          }}
          className={cn(
            isCollapsed &&
              "min-w-[50px] transition-all duration-300 ease-in-out"
          )}
        >
          <Separator />
          <TeamsNav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Chat",
                label: "128",
                icon: MessageCircle,
                variant: "default",
              },
              {
                title: "Activity",
                label: "9",
                icon: Bell,
                variant: "ghost",
              },
              {
                title: "Teams",
                label: "",
                icon: Users,
                variant: "ghost",
              },
              {
                title: "Calendar",
                label: "23",
                icon: Calendar,
                variant: "ghost",
              },
              {
                title: "Calls",
                label: "",
                icon: Phone,
                variant: "ghost",
              },
            ]}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel minSize={30}>
          <Tabs defaultValue="all">
            <div className="flex items-center px-4 py-2 justify-between">
              <h1 className="text-xl font-bold">Chat</h1>
              <Link
                href={`/teams`}
                className={buttonVariants({ variant: "outline", size: "icon" })}
              >
                <Edit />
              </Link>
            </div>
            <Separator />
            <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <form>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search" className="pl-8" />
                </div>
              </form>
            </div>
            <TabsContent value="all" className="m-0">
              <TeamsList items={mails} />
            </TabsContent>
            <TabsContent value="unread" className="m-0">
              <TeamsList items={mails.filter((item) => !item.read)} />
            </TabsContent>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>
          <TeamsDisplay
            mail={mails.find((item) => item.id === mail.selected) || null}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
