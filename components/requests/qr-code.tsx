"use client";

import { QRCodeSVG } from "qrcode.react";

interface QRCodeProps {
  phoneNumber: string;
}

export function RequestQRCode({ phoneNumber }: QRCodeProps) {
  // Format phone number for SMS link
  const formattedNumber = phoneNumber.replace(/\D/g, "");
  const smsLink = `sms:${formattedNumber}`;

  return (
    <div data-qr-code className="flex flex-col items-center justify-center p-8 bg-white rounded-lg">
      <QRCodeSVG
        value={smsLink}
        size={200}
        level="H"
        includeMargin
        imageSettings={{
          src: "/dj-icon.png",
          x: undefined,
          y: undefined,
          height: 40,
          width: 40,
          excavate: true,
        }}
      />
      <div className="mt-4 text-center">
        <p className="text-lg font-medium">Text your requests to:</p>
        <p className="text-2xl font-bold">{phoneNumber}</p>
      </div>
    </div>
  );
}