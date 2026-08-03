import { Press_Start_2P } from "next/font/google"

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
})

export default function PixelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${pressStart.variable} ${pressStart.className}`}>
      {children}
    </div>
  )
}
