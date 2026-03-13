"use client";

import { Suspense } from "react";
import AccessCardClient from "./AccessCardClient";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading access card...</div>}>
      <AccessCardClient />
    </Suspense>
  );
}