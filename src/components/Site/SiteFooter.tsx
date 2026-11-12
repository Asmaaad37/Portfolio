export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <span>© {new Date().getFullYear()} Asmaad Saeed</span>
        <span>32.08° N, 72.67° E · Sargodha, PK</span>
        <a
          href="https://github.com/Asmaaad37/Portfolio"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source ↗
        </a>
      </div>
    </footer>
  );
}
