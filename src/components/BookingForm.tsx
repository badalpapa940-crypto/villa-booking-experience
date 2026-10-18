import { useState } from "react";
import { z } from "zod";
import { MessageCircle } from "lucide-react";
import { buildBookingMessage, whatsappUrl } from "@/lib/villas";

const schema = z
  .object({
    name: z.string().trim().min(1, "Please enter your name").max(100),
    phone: z.string().trim().regex(/^[+0-9 ()-]{7,20}$/, "Enter a valid phone number"),
    checkIn: z.string().min(1, "Choose a check-in date"),
    checkOut: z.string().min(1, "Choose a check-out date"),
    guests: z.coerce.number().int().min(1, "At least 1 guest").max(50),
    message: z.string().trim().max(1000).optional(),
  })
  .refine((d) => d.checkOut > d.checkIn, { message: "Check-out must be after check-in", path: ["checkOut"] });

const input = "w-full rounded-xl border bg-card px-4 py-3 outline-none focus:border-gold";

export function BookingForm({ villa, maxGuests }: { villa: string; maxGuests: number }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const today = new Date().toISOString().slice(0, 10);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = schema.safeParse(Object.fromEntries(new FormData(e.currentTarget)));
    if (!res.success) {
      const errs: Record<string, string> = {};
      res.error.issues.forEach((i) => (errs[String(i.path[0])] ??= i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    window.open(whatsappUrl(buildBookingMessage({ villa, ...res.data })), "_blank");
  }

  const err = (k: string) => errors[k] && <p className="mt-1 text-sm text-destructive">{errors[k]}</p>;

  return (
    <form onSubmit={onSubmit} className="rounded-3xl border bg-muted p-8" noValidate>
      <h2 className="text-center text-3xl font-bold">Book This Villa</h2>
      <p className="mt-2 text-center text-muted-foreground">Share your dates and we'll confirm on WhatsApp.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <label className="text-sm font-medium">Full name<input name="name" className={input} maxLength={100} />{err("name")}</label>
        <label className="text-sm font-medium">Phone<input name="phone" type="tel" className={input} maxLength={20} />{err("phone")}</label>
        <label className="text-sm font-medium">Check-in<input name="checkIn" type="date" min={today} className={input} />{err("checkIn")}</label>
        <label className="text-sm font-medium">Check-out<input name="checkOut" type="date" min={today} className={input} />{err("checkOut")}</label>
        <label className="text-sm font-medium">Guests<input name="guests" type="number" min={1} max={maxGuests} defaultValue={2} className={input} />{err("guests")}</label>
        <label className="text-sm font-medium md:col-span-2">Message (optional)<textarea name="message" rows={3} maxLength={1000} className={input} placeholder="Anything we should know?" />{err("message")}</label>
      </div>
      <button type="submit" className="mx-auto mt-6 flex items-center gap-2 rounded-xl bg-whatsapp px-8 py-3 font-semibold text-whatsapp-foreground">
        <MessageCircle className="h-5 w-5" /> Book on WhatsApp
      </button>
    </form>
  );
}
