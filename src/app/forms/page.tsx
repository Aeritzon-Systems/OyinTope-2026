import Container from "@/components/Container";
import Card from "@/components/Card";
import ButtonLink from "@/components/ButtonLink";
import { weddingConfig } from "@/lib/config";
import Link from "next/link";

export default function FormsPage() {
  const c = weddingConfig;

  return (
    <Container>
      <div className="flex flex-col gap-6">
        <div className="flex item-center justify-between">
          <h1 className="text-2xl font-bold">Wedding Forms</h1>
          <Link className="text-sm text-zinc-600 hover:text-zinc-900 underline" href="/">
            Home
          </Link>
        </div>

        <Card title="Rules">
          <ul className="list-disc pl-5 space-y-2">
            <li>Anyone who buys cloth automatically gets an access card.</li>
            <li>
              If access cards remain, they will be allocated to guests who requested access-only.
            </li>
            <li>
              Deadline: <span className="font-semibold">{c.deadline}</span>
            </li>
          </ul>
        </Card>

        <Card title="Payment Details">
          <div className="grid gap-2">
            <p>
              <span className="font-semibold">Account Name:</span> {c.payment.accountName}
            </p>
            <p>
              <span className="font-semibold">Bank:</span> {c.payment.bankName}
            </p>
            <p>
              <span className="font-semibold">Account Number:</span> {c.payment.accountNumber}
            </p>

            <p className="mt-2 text-xs text-zinc-500">
              After payment, submit the form and upload proof of payment.
            </p>
          </div>
        </Card>

        <Card title="Cloth Options">
          <ul className="space-y-2">
            {c.attireOptions.map((o) => (
              <li key={o.name} className="flex items-center justify-between gap-4">
                <span>{o.name}</span>
                <span className="text-xs font-semibold text-zinc-900">{o.price}</span>
              </li>
            ))} 
          </ul>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2">
          <Card title="Groom's Link">
            <p className="text-sm text-zinc-600">Slots: {c.forms.groomSlots}</p>
            <div className="mt-4">
              <ButtonLink href={c.forms.groomFormUrl} label="Open Groom Form" external />
            </div>
          </Card>

          <Card title="Bride's Link">
            <p className="text-sm text-zinc-600">Slots: {c.forms.brideSlots}</p>
            <div className="mt-4">
              <ButtonLink href={c.forms.brideFormUrl} label="Open Bride Form" external />
            </div>
          </Card>
        </div>
      </div>
    </Container>
  );
}