// const req = require.context("./svg", false, /\.svg$/);
// const requireAll = (requireContext) => requireContext.keys().map(requireContext);
// requireAll(req);

const utilFuns: any = {};
const files: any = import.meta.glob("./*.svg");
Object.keys(files).forEach((fileName: string) => {
  const name = fileName.replace(/\.\/|\.svg/g, "");
  utilFuns[name] = files[fileName].default;
});
export default utilFuns;
