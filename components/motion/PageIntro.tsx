/**
 * First-visit intro (< 800 ms): the "FJS" logo traces itself in the centre,
 * then flies to the navbar logo's position while the overlay fades.
 *
 * Pure CSS so it starts on first paint without waiting for hydration. The
 * inline script runs before the overlay is parsed and only sets
 * `data-intro` on <html> once per session and never with reduced motion;
 * without that attribute the overlay is `display: none`. The overlay has
 * `pointer-events: none`, so the page is usable underneath the whole time.
 */
const script = `try{var d=document.documentElement;if(!sessionStorage.getItem("fjs-intro")&&!matchMedia("(prefers-reduced-motion: reduce)").matches){d.setAttribute("data-intro","");sessionStorage.setItem("fjs-intro","1");setTimeout(function(){d.removeAttribute("data-intro")},1200)}}catch(e){}`;

export default function PageIntro() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: script }} />
      <div aria-hidden className="page-intro">
        <div className="container-page flex h-16 items-center">
          <svg className="page-intro-logo" viewBox="0 0 40 24" width="40" height="24">
            <defs>
              <linearGradient id="intro-gradient" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="60%" stopColor="#818cf8" />
                <stop offset="100%" stopColor="#c084fc" />
              </linearGradient>
            </defs>
            <text x="0" y="18.5">
              FJS
            </text>
          </svg>
        </div>
      </div>
    </>
  );
}
