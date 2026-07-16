import Link from "next/link";

import { brand, navigation } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-white/8 bg-black/36">
      <div className="container-shell space-y-5 py-7 md:py-8">
        <div className="grid gap-6 md:grid-cols-[1.2fr_0.55fr_0.55fr_0.6fr]">
          <div className="space-y-3">
            <p className="text-kicker">{brand.collection}</p>
            <p className="font-display text-[1.55rem] uppercase tracking-[0.18em] text-white/92">
              {brand.name}
            </p>
            <p className="max-w-lg text-sm leading-6 text-white/54">
              {brand.footerNote}
            </p>
          </div>
          <div className="space-y-2.5">
            <p className="text-kicker">Navigate</p>
            <div className="space-y-1.5">
              {navigation.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block text-[0.74rem] uppercase tracking-[0.3em] text-white/64 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/faq"
                className="block text-[0.74rem] uppercase tracking-[0.3em] text-white/64 hover:text-white"
              >
                FAQ
              </Link>
            </div>
          </div>
          <div className="space-y-2.5">
            <p className="text-kicker">Support</p>
            <a
              href={`mailto:${brand.supportEmail}`}
              className="block text-[0.74rem] uppercase tracking-[0.3em] text-white/64 hover:text-white"
            >
              {brand.supportEmail}
            </a>
            <p className="text-[0.74rem] uppercase tracking-[0.3em] text-white/44">
              {brand.supportWindow}
            </p>
          </div>
          <div className="space-y-2.5">
            <p className="text-kicker">Elsewhere</p>
            {brand.socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="block text-[0.74rem] uppercase tracking-[0.3em] text-white/64 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 border-t border-white/8 pt-4 text-[0.64rem] uppercase tracking-[0.34em] text-white/40 md:flex-row md:items-center md:justify-between">
          <p>{brand.name}</p>
          <p>{brand.collection}</p>
          <p>Minimal garments. Clear signal.</p>
        </div>
      </div>
    </footer>
  );
}
