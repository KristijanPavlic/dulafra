import Image from "next/image";
import loadingGif from "@/public/loading.gif";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="z-[999] w-full bg-[#FFF6EE]">
      <Image src={loadingGif} alt="Loading GIF" style={{ width: "100%" }} />
    </div>
  );
}
