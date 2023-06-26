interface ClassMap {
  [key: string]: string;
}
interface StyleMap {
  [key: string]: any;
}

function getDOMStylesToClassMap(DOM: HTMLElement) {
  let num: number = 0;
  const classList: ClassMap = {};
  const styleList: StyleMap = {};
  const html: string = DOM.innerHTML;
  // 查找所有的<style>标签
  const styles = html.match(/<style.*?>(.*?)<\/style>/gs);
  if (!styles) {
    return { classList, styleList };
  }
  styles.forEach((style) => {
    // 查找样式表中的所有类
    const classes = style.match(/\.(.*?){(.*?)}/gs);
    if (!classes) {
      return { classList, styleList };
    }

    classes.forEach((cls: string) => {
      const className = (cls.match(/(.*?)\{/s) as RegExpMatchArray)[1].trim().toLowerCase();
      const styles = cls
        .match(/\{(.*?)\}/s)?.[1]
        .trim()
        .replace(/[\t\n]/g, "")
        .toLowerCase() as string;
      if (className.includes(",")) {
        className.split(",").forEach((item: string) => {
          classList[num + "_" + item.trim()] = styles;
          styleList[item.trim()] = appStringToStyleMap(styles);
        });
      } else {
        classList[num + "_" + className] = styles;
        styleList[className] = appStringToStyleMap(styles);
      }

      num++;
    });
  });
  console.log("classList:", classList, styleList);
  return { classList, styleList };
}
function appStringToStyleMap(str: string) {
  const styleList: StyleMap = {};
  str.split(";").forEach((style) => {
    const [styleName, styleValue] = style.split(":");
    if (styleName && styleValue) {
      styleList[styleName.trim()] = styleValue.trim();
    }
  });
  return styleList;
}

export function applyStylesFromStyleTag(element: HTMLElement) {
  const { classList } = getDOMStylesToClassMap(element);
  const elements = element.querySelectorAll("article *");
  elements.forEach((element) => {
      const classNames = element.classList;
       for (let i = 0; i < classNames.length; i++) {
        const className = classNames[i];
         if (classList.hasOwnProperty(`.${className}`)) {

         }
       }
  })
  return element;
}
