"use client";

import { QrCode, Check } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { QRCodeCanvas } from "qrcode.react";
import { useState } from "react";

export default function EventQRCode({ eventId }: { eventId: string }) {
  const [isUrlCopied, setIsUrlCopied] = useState(false);
  const currentDomain =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setIsUrlCopied(true);
  }

  return (
    <Dialog onOpenChange={() => setIsUrlCopied(false)}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="cursor-pointer text-muted-foreground hover:text-accent"
        >
          <QrCode />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Event QR Code</DialogTitle>
        <QRCodeCanvas
          value={`${currentDomain}/event/${eventId}/attend`}
          size={256}
          className="mx-auto"
        />
        <p className="text-center mt-2">
          Right click and press <br />
          <code className="bg-muted text-muted-foreground p-1 rounded-md">
            Save image as...
          </code>
          <br />
          to download the QR code.
          <br />
        </p>
        <div className="flex justify-center">
          <p className="border-y border-white w-fit px-3">OR</p>
        </div>
        <Button onClick={() => copyUrl(`${currentDomain}/event/${eventId}/attend`)}>
          {isUrlCopied ? 
          <>URL Copied! <Check /></>
          :
          <>Copy the URL</>
          }
        </Button>
      </DialogContent>
    </Dialog>
  );
}
