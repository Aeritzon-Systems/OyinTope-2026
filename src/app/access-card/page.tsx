"use client";

import { useMemo, useState } from "react";
import QRCode from "qrcode";
import Container from "@/components/Container";
import Card from "@/components/Card";
import { weddingConfig } from "@/lib/config";
import Link from "next/link";
import Image from "next/image";

type Side = "groom" | "bride";

function buildPayload(args: { side: Side; accessId: string; name: string }) {
  return `aeritzon-wed:v1|side=${args.side}|id=${args.accessId}|name=${args.name.trim()}`;
}

export default function AccessCardPage() {
  const [side, setSide] = useState<Side>("groom");
  const [accessId, setAccessId] = useState("");
  const [name, setName] = useState("");
  const [qrDataUrl, setQrDataUrl] = useState<string>("");

  const canGenerate = useMemo(() => {
    return accessId.trim().length >= 3 && name.trim().length >= 2;
  }, [accessId, name]);

  const onGenerate = async () => {
    const payload = buildPayload({ side, accessId: accessId.trim(), name });
    const url = await QRCode.toDataURL(payload, {
      margin: 2,
      width: 520,
      errorCorrectionLevel: "M",
    });
    setQrDataUrl(url);
  };

  return (
    <Container>
      <div className="flex flex-col gap-6">
        <div className="flex item-center justify-between">
          <h1 className="text-2xl font-bold">Access Card QR</h1>

          <Link
            className="text-sm text-zinc-600 hover:text-zinc-900 underline"
            href="/"
          >
            Home
          </Link>
        </div>

        <Card title="Instructions">
          <ul className="list-disc pl-5 space-y-2">
            <li>Enter your Access ID (example: G-0012 / B-0007).</li>
            <li>Enter your full name exactly as you submitted.</li>
            <li>Generate and save your QR code for check-in.</li>
          </ul>
          <p className="mt-3 text-xs text-zinc-500">
            This QR encodes only your Access ID + name + side (groom/bride) and
            is used solely for event check-in. It does not contain any payment
            or order information.
          </p>
        </Card>

        <Card title="Generate QR Code">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold text-zinc-600">Side</p>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => setSide("groom")}
                  className={`rounded-xl px-3 py-2 text-sm border ${
                    side === "groom"
                      ? "bg-zinc-900 text-white border-zinc-900"
                      : "bg-white text-zinc-800 border-zinc-200 hover:bg-zinc-50"
                  }`}
                >
                  Groom
                </button>
                <button
                  onClick={() => setSide("bride")}
                  className={`rounded-xl px-3 py-2 text-sm border ${
                    side === "bride"
                      ? "bg-zinc-900 text-white border-zinc-900"
                      : "bg-white text-zinc-800 border-zinc-200 hover:bg-zinc-50"
                  }`}
                >
                  Bride
                </button>
              </div>

              <p className="mt-2 text-xs text-zinc-500">
                Slots:{" "}
                {side === "groom"
                  ? weddingConfig.forms.groomSlots
                  : weddingConfig.forms.brideSlots}
              </p>
            </div>

            <div className="grid gap-3">
              <div>
                <label className="text-xs font-semibold text-zinc-600">
                  Full Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., John Adeyemi"
                  className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-400"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-600">
                  Access ID
                </label>
                <input
                  value={accessId}
                  onChange={(e) => setAccessId(e.target.value)}
                  placeholder="e.g., G-0012"
                  className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-400"
                />
              </div>

              <button
                onClick={onGenerate}
                disabled={!canGenerate}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                  canGenerate
                    ? "bg-zinc-900 text-white hover:bg-zinc-800 active:bg-zinc-800"
                    : "bg-zinc-200 text-zinc-500 cursor-not-allowed"
                }`}
              >
                Generate QR
              </button>
            </div>
          </div>

          {qrDataUrl && (
            <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
              <p className="text-sm font-semibold">Your QR Code</p>
              <Image
                src={qrDataUrl}
                alt="Access QR"
                width={320}
                height={320}
                className="mt-4 w-full max-w-[320px] rounded-xl border border-zinc-200 bg-white p-3"
              />
              <p className="mt-3 text-xs text-zinc-600">Tip: Save the image.</p>
            </div>
          )}
        </Card>
      </div>
    </Container>
  );
}
