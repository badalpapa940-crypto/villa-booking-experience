import data from "@/data/villas.json";

export type Villa = {
  slug: string;
  name: string;
  location: string;
  bedrooms: number;
  guests: number;
  price: number;
  rating: number;
  images: string[];
  categories: string[];
};

export const villas = data as Villa[];

export const CATEGORIES = [
  { id: "private-pool", label: "Private Pool" },
  { id: "luxury", label: "Luxury Villas" },
  { id: "gated-community", label: "Gated Community" },
  { id: "pet-friendly", label: "Pet-Friendly" },
  { id: "wellness", label: "Wellness Retreats" },
  { id: "event-friendly", label: "Event-Friendly" },
] as const;

export const categoryLabel = (id: string) =>
  CATEGORIES.find((c) => c.id === id)?.label ?? id;

export const WHATSAPP_NUMBER = "918287840116";
export const PHONE_DISPLAY = "+91 82878 40116";
export const PHONE_TEL = "+918287840116";

export const formatINR = (n: number) => "₹" + n.toLocaleString("en-IN");

export type BookingDetails = {
  villa: string;
  name: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  message?: string | undefined;
};

export function buildBookingMessage(b: BookingDetails) {
  const lines = [
    "Hello Malina Holidays, I would like to book a villa.",
    "",
    `Villa: ${b.villa}`,
    `Name: ${b.name}`,
    `Phone: ${b.phone}`,
    `Check-in: ${b.checkIn}`,
    `Check-out: ${b.checkOut}`,
    `Guests: ${b.guests}`,
  ];
  if (b.message?.trim()) lines.push(`Message: ${b.message.trim()}`);
  return lines.join("\n");
}

export function whatsappUrl(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
