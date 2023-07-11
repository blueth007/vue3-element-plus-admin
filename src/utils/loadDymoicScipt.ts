let callbacks: Function[] | any = [];

const dynamicLoadScript = (windowArgs: any, src: string, callback: Function) => {
  const existingScript = document.getElementById(src);
  const cb = callback || function () {};

  if (!existingScript) {
    const script = document.createElement("script");
    script.src = src; // src url for the third-party library being loaded.
    script.id = src;
    document.body.appendChild(script);
    callbacks.push(cb);
    const onEnd = "onload" in script ? stdOnEnd : ieOnEnd;
    onEnd(script);
  }

  if (existingScript && cb) {
    if (windowArgs) {
      cb(null, existingScript);
    } else {
      callbacks.push(cb);
    }
  }

  function stdOnEnd(script: any) {
    script.onload = function () {
      // this.onload = null here is necessary
      // because even IE9 works not like others
      this.onerror = this.onload = null;
      for (const cb of callbacks) {
        cb(null, script);
      }
      callbacks = null;
    };
    script.onerror = function () {
      this.onerror = this.onload = null;
      cb(new Error("Failed to load " + src), script);
    };
  }

  function ieOnEnd(script: any) {
    script.onreadystatechange = function () {
      if (this.readyState !== "complete" && this.readyState !== "loaded") return;
      this.onreadystatechange = null;
      for (const cb of callbacks) {
        cb(null, script); // there is no way to catch loading errors in IE8
      }
      callbacks = null;
    };
  }
};

export default dynamicLoadScript;

export const dynamicLoadLink = (css: string) => {
  const existingScript = document.getElementById(css);
  if (!existingScript) {
    const linkTag = document.createElement("link");
    linkTag.rel = "stylesheet";
    linkTag.href = css; // css url for the third-party library being loaded.
    linkTag.id = css;
    document.head.appendChild(linkTag);
  }
};
