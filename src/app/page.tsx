import Container from "@/components/Container";
import Card from "@/components/Card";
import ButtonLink from "@/components/ButtonLink";
import { weddingConfig } from "@/lib/config";

export default function Home() {
  const c = weddingConfig;

  return (
    <Container>
      <div className="flex flex-col gap-6">
        <header className="rounded-3xl bg-white border border-zinc-200 p-8 shadow-sm">
          <p className="text-xs uppercase tracking-widest text-zinc-500">
            It's Wedding O'clock!
          </p>

          <h1 className="mt-2 text 3xl font-bold tracking-tight">{c.couple}</h1>

          <div className="mt-4 grid gap-2 text-sm text-zinc-700">
            <p>
              <span className="font-semibold">Date:</span> {c.date}
            </p>
            <p>
              <span className="font-semibold">Time:</span> {c.time}
            </p>
            <p>
              <span className="font-semibold">Venue:</span> {c.venue}
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {c.colourCode.map((x) => (
              <span
                key={x}
                className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs text-zinc-700"
              >
                {x}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href="/forms" label="Groom & Bride Forms" />
            <ButtonLink href="access-card" label="Generate Access QR" />
          </div>

          <p className="mt-4 text-xs text-zinc-500">
            Deadline for submissions:{" "}
            <span className="font-semibold">{c.deadline}</span>
          </p>
        </header>

        <Card title="Attires">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Men: Off-white Cashmere, Lilac cap.
            </li>
            <li>
              Ladies: Beaded lilac lace, Lilac Sego Gele
            </li>
          </ul>
        </Card>

        <Card title="Important Notes">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Anyone who buys cloth authomatically receives an access card (while stock lasts).
            </li>
            <li>
              If there are access cards left, they will be allocated to guests who requested access-only.
            </li>
            <li>
              Please submit correct details so we can confirm quickly.
            </li>
          </ul>
        </Card>
      </div>
    </Container>
  );
}