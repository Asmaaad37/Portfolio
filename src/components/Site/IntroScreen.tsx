/**
 * First-load intro: "LOADING" fills with blue while the page loads, with
 * the name signed in the bottom-right corner; then the screen slides up and
 * the hero's own intro plays.
 *
 * Everything here is in the HTML itself (inline style + inline script in
 * <head>), so it paints before any stylesheet, font or JavaScript bundle.
 * It shows once per tab session, at least MIN_MS and at most MAX_MS, and
 * never appears without JavaScript (the script is what turns it on).
 */

const MIN_MS = 1000;
const MAX_MS = 3000;

/** Runs in <head> before first paint. Also sets the `js` flag. */
export const INTRO_SCRIPT = `(function(){var d=document.documentElement;d.classList.add('js');try{if(sessionStorage.getItem('intro-seen')){return}sessionStorage.setItem('intro-seen','1')}catch(e){}d.classList.add('intro-on');var done=false;function finish(){if(done)return;done=true;d.classList.add('intro-done')}window.addEventListener('load',function(){setTimeout(finish,Math.max(0,${MIN_MS}-performance.now()))});setTimeout(finish,${MAX_MS})})();`;

/** Critical styles, inlined so the intro (and the paper background) paint immediately. */
export const INTRO_CSS = `
html{background:#EDECE7}
.intro{display:none;position:fixed;inset:0;z-index:10000;background:#EDECE7;color:#121212;pointer-events:none;overflow:hidden}
html.intro-on .intro{display:block}
html.intro-done .intro{transform:translateY(-100%);visibility:hidden;transition:transform .9s cubic-bezier(.7,0,.2,1),visibility 0s .9s}
.intro-word{position:absolute;left:50%;top:50%;margin:0;transform:translate(-50%,-50%);font:800 clamp(56px,14vw,210px)/.9 var(--font-anybody,'Arial Narrow'),'Arial Narrow',Arial,sans-serif;font-variation-settings:'wdth' 70;letter-spacing:-.03em;white-space:nowrap}
.intro-word::after{content:attr(data-text);position:absolute;inset:0;color:#1E2BD1;clip-path:inset(0 100% 0 0);animation:intro-fill ${MIN_MS}ms cubic-bezier(.6,0,.2,1) forwards}
.intro-sign{position:absolute;right:max(24px,env(safe-area-inset-right,0px));bottom:max(24px,env(safe-area-inset-bottom,0px));margin:0;padding-bottom:18px;text-align:right;font:600 clamp(18px,2.2vw,26px)/1.2 var(--font-anybody,'Arial Narrow'),'Arial Narrow',Arial,sans-serif;letter-spacing:-.01em}
.intro-sign svg{position:absolute;left:0;right:0;bottom:0;width:100%;height:16px;overflow:visible}
.intro-sign path{fill:none;stroke:#1E2BD1;stroke-width:2.5;stroke-linecap:round;stroke-dasharray:260;stroke-dashoffset:260;animation:intro-draw .9s .2s cubic-bezier(.6,0,.2,1) forwards}
@keyframes intro-fill{to{clip-path:inset(0 0 0 0)}}
@keyframes intro-draw{to{stroke-dashoffset:0}}
@media (prefers-reduced-motion:reduce){
.intro-word::after,.intro-sign path{animation:none}
.intro-word::after{clip-path:none}
.intro-sign path{stroke-dashoffset:0}
html.intro-done .intro{transform:none;opacity:0;transition:opacity .3s,visibility 0s .3s}
}
`;

export default function IntroScreen() {
  return (
    <div className="intro" aria-hidden="true">
      <p className="intro-word" data-text="LOADING">
        LOADING
      </p>
      <p className="intro-sign">
        Asmaad Saeed
        <svg viewBox="0 0 200 16" preserveAspectRatio="none" focusable="false">
          <path d="M2 11 C 34 2, 62 15, 96 8 S 160 3, 198 9" />
        </svg>
      </p>
    </div>
  );
}
