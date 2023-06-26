// vite 下没有require.context的版本。
// const req = require.context("../../icons/svg", false, /\.svg$/);
// const requireAll = (requireContext) => requireContext.keys();
// console.log("ICONS:", req, requireAll);
// const re = /\.\/(.*)\.svg/;

// const svgIcons = requireAll(req).map((i) => {
//   return i.match(re)[1];
// });
// console.log(svgIcons);
// export default svgIcons;

const files = import.meta.glob("../../icons/svg/*.svg", { eager: true });
const svgIcons: string[] = [];
for (let i in files) {
  svgIcons.push((i.match(/\.*svg\/(.*)\.svg/) as RegExpMatchArray)[1]);
}
export default svgIcons;
