import {Metadata} from "next";
import Image from "next/image";
import Logo from "@/app/icon/logo.png";
import HomeImage from "@/app/icon/home-image.jpg";
import {AuthSwitcher} from "../components/AuthSwitcher";
import {Footer} from "../components/Footer";
import {AuthDrawer} from "../components/AuthDrawer";

export const metadata: Metadata = {
  title: "TestBet",
  description: "Authentication forms built using the components.",
};

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header para Mobile */}
      <header className="lg:hidden fixed top-0 w-full z-50 px-0 py-4">
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image src={Logo} alt="TestBet Logo" width={25} height={25} />
            <span className="font-semibold text-xl text-white">TestBet</span>
          </div>
          <AuthDrawer />
        </div>
      </header>

      {/* Mobile Layout - Imagem de fundo com sobreposição */}
      <div className="lg:hidden flex flex-col flex-grow">
        <div className="relative w-full h-[calc(100vh-60px)]">
          <Image
            src={HomeImage}
            alt="Background"
            fill
            style={{objectFit: "cover"}}
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-60" />
          <div className="absolute inset-0 flex flex-col justify-end p-6 pb-20">
            <blockquote className="space-y-2 text-white">
              <p className="text-lg">
                &ldquo;Here you can improve your betting strategies without risk
                anything. Our platform operates exclusively with virtual money,
                allowing you to experience, learn and become have fun without
                financial worries.&rdquo;
              </p>
              <footer className="text-sm">Bet safely</footer>
            </blockquote>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="container relative hidden h-[calc(100vh-60px)] flex-col items-center justify-center lg:grid lg:max-w-none lg:grid-cols-10 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex overflow-hidden col-span-7">
          <div className="absolute inset-0">
            <Image
              src={HomeImage}
              alt="Background"
              fill
              style={{objectFit: "cover"}}
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-50" />
          </div>
          <div className="relative z-20 flex items-center text-2xl font-medium gap-2">
            <Image src={Logo} alt={""} width={35} height={35} />
            TestBet
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Here you can improve your betting strategies without risk
                anything. Our platform operates exclusively with virtual money,
                allowing you to experience, learn and become have fun without
                financial worries.&rdquo;
              </p>
              <footer className="text-sm">Bet safely</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8 col-span-3 lg:bg-transparent bg-white rounded-md">
          <AuthSwitcher />
        </div>
      </div>

      <Footer className="lg:h-[60px] mt-auto" />
    </div>
  );
}
