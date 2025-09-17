"use client";

import { toPng } from "html-to-image";
import { QrCode } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { useRef } from "react";
import { Button } from "../ui/button";
import CopyBox from "../ui/copy-box";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export default function EventQRCode({ eventId }: { eventId: string }) {
  const currentDomain =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const qrCodeRef = useRef<HTMLCanvasElement>(null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <QrCode />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Event QR Code</DialogTitle>
        <QRCodeCanvas
          value={`${currentDomain}/event/${eventId}/attend`}
          size={256}
          className="mx-auto"
          ref={qrCodeRef}
        />
        <div className="mx-auto">
          <Button
            onClick={() => {
              if (qrCodeRef.current) {
                toPng(qrCodeRef.current).then((dataUrl) => {
                  const link = document.createElement("a");
                  link.href = dataUrl;
                  link.download = `event-${eventId}-qrcode.png`;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                });
              }
            }}
          >
            Download QR Code
          </Button>
        </div>
        <CopyBox value={`${currentDomain}/event/${eventId}/attend`} />
      </DialogContent>
    </Dialog>
  );
}
