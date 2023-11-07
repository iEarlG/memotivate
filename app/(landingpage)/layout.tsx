
import { Navbar } from "@/components/landingpage/Navbar";

const LandingPageLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return ( 
        <div className="h-full dark:bg-[#0F0F0F]">
            <Navbar />
            <main className="h-full pt-40">
                {children}
            </main>
        </div>
    );
}
 
export default LandingPageLayout;