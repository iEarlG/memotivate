
import { Footer } from "@/components/landingpage/Footer";
import { Heading } from "@/components/landingpage/Heading";
import { Heroes } from "@/components/landingpage/Heroes";

const LandingPage = () => {
  return (
    <div className="min-h-full flex flex-col dark:bg-[#0F0F0F]">
      <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
        <Heading />
        <Heroes />
      </div>
      <Footer />
    </div>
  );
}
 
export default LandingPage;