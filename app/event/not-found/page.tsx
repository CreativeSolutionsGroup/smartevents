import Image from "next/image";
import Stinger from "@/images/stinger.png";

export default function NotFoundPage() {
  return (
    <div className="h-full flex flex-col justify-center items-center p-4">
      <Image
        className="mb-4"
        src={Stinger}
        alt="Cedarville Stinger"
        width={250}
        height={250}
      />
      <h1 className="text-3xl font-bold mb-4">Event Not Found</h1>
      <p className="text-lg text-center max-w-md">
        The event you are looking for does not exist. Please check the link or
        contact the event organizer for more information.
      </p>
    </div>
  );
}
