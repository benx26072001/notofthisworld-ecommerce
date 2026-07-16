import { loadingContent } from "@/data/site";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black">
      <div className="editorial-frame grain flex w-full max-w-md flex-col items-center gap-5 rounded-[2rem] px-8 py-10 text-center">
        <span className="text-kicker">{loadingContent.label}</span>
        <div className="h-px w-full overflow-hidden rounded-full bg-white/10">
          <div className="loading-sweep h-full w-1/3 rounded-full bg-white/72" />
        </div>
        <p className="font-display text-[1.55rem] uppercase tracking-[0.34em] text-white/88">
          {loadingContent.title}
        </p>
      </div>
    </div>
  );
}
