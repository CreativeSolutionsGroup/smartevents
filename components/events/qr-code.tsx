"use client";

import { QrCode } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { QRCodeCanvas } from "qrcode.react";

export default function EventQRCode({ eventId }: { eventId: string }) {
  const currentDomain =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="ml-auto cursor-pointer text-muted-foreground hover:text-accent"
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
        </p>
      </DialogContent>
    </Dialog>
  );
}
