"use client";

import { QrCode } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
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
        />
        <CopyBox value={`${currentDomain}/event/${eventId}/attend`} />
        <p className="text-center">
          Right click and press <br />
          <code className="bg-muted text-muted-foreground p-1 rounded-md">
            Save image as...
          </code>
          <br />
          to download the QR code.
          <br />
        </p>
      </DialogContent>
    </Dialog>
  );
}
