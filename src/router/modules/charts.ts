/** When your routing table is too long, you can split it into small modules**/

import Layout from "@/layout/index.vue";

const chartsRouter = {
  path: "/charts",
  component: Layout,
  redirect: "noRedirect",
  name: "Charts",
  meta: {
    title: "Charts",
    icon: "chart",
  },
  children: [
    {
      path: "keyboard",
      component: () => import("@/views/charts/keyboardView.vue"),
      name: "KeyboardChart",
      meta: { title: "Keyboard Chart", noCache: true },
    },
    {
      path: "line",
      component: () => import("@/views/charts/lineView.vue"),
      name: "LineChart",
      meta: { title: "Line Chart", noCache: true },
    },
    {
      path: "mix-chart",
      component: () => import("@/views/charts/mixChartView.vue"),
      name: "MixChart",
      meta: { title: "Mix Chart", noCache: true },
    },
  ],
};

export default chartsRouter;
