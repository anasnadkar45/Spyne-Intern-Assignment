import { ScrollArea } from "@/components/ui/scroll-area";
import { Sidebar } from "../components/global/Sidebar";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="w-screen h-screen flex custom-scrollbar scroll-smooth">
            <div className="m-[0.75rem] bg-card mr-0 rounded-md border hidden md:flex">
                <Sidebar />
            </div>
            <div className="m-[0.75rem] rounded-md border w-full bg-secondary/40">
                <ScrollArea className="h-[calc(100vh-1.65rem)]">
                    {children}
                </ScrollArea>
            </div>
        </div>
    );
}