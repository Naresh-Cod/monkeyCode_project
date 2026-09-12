export function Footer() {
  return (
    <footer className="px-4 pb-8 md:px-8">
      <div className="h-px w-full bg-void/20" />
      <div className="flex items-center justify-between py-6 font-mono text-[10px] tracking-[0.22em]">
        <span>CREATIVE ARCHIVE</span>
        <span>2026</span>
        <a href="#top" data-cursor="ENTER">
          BACK TO TOP ↑
        </a>
      </div>
      <div
        className="h-px w-full"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, #111110 0 8px, transparent 8px 16px)',
        }}
      />
    </footer>
  )
}
