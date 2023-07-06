<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddRole">New Role</el-button>
    <el-table :data="rolesList" style="width: 100%; margin-top: 30px" border>
      <el-table-column align="center" label="Role Key" width="220">
        <template #default="scope"> {{ scope.row.key }} </template>
      </el-table-column>
      <el-table-column align="center" label="Role Name" width="220">
        <template #default="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="Description">
        <template #default="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Operations">
        <template #default="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)"
            >Edit</el-button
          >
          <el-button type="danger" size="small" @click="handleDelete(scope)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      v-model="dialogVisible"
      :title="dialogType === 'edit' ? 'Edit Role' : 'New Role'"
    >
      <el-form :model="role" label-width="80px" label-position="left">
        <el-form-item label="Name">
          <el-input v-model="role.name" placeholder="Role Name" />
        </el-form-item>
        <el-form-item label="Desc">
          <el-input
            v-model="role.description"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
            placeholder="Role Description"
          />
        </el-form-item>
        <el-form-item label="Menus">
          <el-tree
            ref="treeRef"
            :check-strictly="checkStrictly"
            :data="routesData"
            :props="defaultProps"
            show-checkbox
            node-key="path"
            class="permission-tree"
          />
        </el-form-item>
      </el-form>
      <div style="text-align: right">
        <el-button type="danger" @click="dialogVisible = false"
          >Cancel</el-button
        >
        <el-button type="primary" @click="confirmRole">Confirm</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import path from "path-browserify";
import { deepClone } from "@/utils";
import {
  getRoutes,
  getRoles,
  addRole,
  deleteRole,
  updateRole,
} from "@/api/role";
import {
  computed,
  nextTick,
  onBeforeMount,
  onMounted,
  reactive,
  ref,
  toRefs,
} from "vue";
import type { RouteItem, RouterItem } from "@/router";
import type { RoleType } from "mock/role";
import {
  ElMessage,
  ElMessageBox,
  ElTree,
  ElNotification,
  ElTable,
  ElTableColumn,
  ElButton,
  ElDialog,
  ElForm,
  ElFormItem,
  ElInput,
} from "element-plus";
import type { Action } from "element-plus";
import type Node from "element-plus/es/components/tree/src/model/node";

const defaultRole: RoleType = {
  key: "",
  name: "",
  description: "",
  routes: [],
};
type Data_Type = { path: string; title: string; children?: Array<Data_Type> };

const data: any = reactive({
  role: Object.assign({}, defaultRole),
  routes: [] as Array<Data_Type>,
  rolesList: [],
  dialogVisible: false,
  dialogType: "new",
  checkStrictly: false,
  defaultProps: {
    children: "children",
    label: "title",
  },
  defaultCheckedKeys: [],
});
const {
  dialogVisible,
  role,
  checkStrictly,
  defaultProps,
  dialogType,
  rolesList,
  defaultCheckedKeys,
} = toRefs(data);
const treeRef = ref<InstanceType<typeof ElTree>>();

const routesData = computed(() => {
  return data.routes;
});

onBeforeMount(() => {
  handleGetRoutes();
  handelGetRoles();
});
let serviceRoutes: any = []; // duiying vue2中 this.serviceRoutes

async function handleGetRoutes() {
  const res = await getRoutes();
  serviceRoutes = res.data;
  data.routes = generateRoutes(res.data);
}
async function handelGetRoles() {
  const res = await getRoles();
  data.rolesList = res.data;
}

const generateRoutes = (routes: Array<RouterItem>, basePath = "/") => {
  const res: Array<Data_Type> = [];
  for (let route of routes) {
    // skip some route
    if (route.hidden) {
      continue;
    }
    const onlyOneShowingChild_result = onlyOneShowingChild(
      route.children,
      route
    );

    if (route.children && onlyOneShowingChild_result && !route.alwaysShow) {
      route = onlyOneShowingChild_result;
    }

    const data: Data_Type = {
      path: path_reslove(basePath, route.path as string),
      title: (route.meta && (route.meta.title as string)) || "default Title",
    };
    // recursive child routes
    if (route.children) {
      data.children = generateRoutes(route.children, data.path);
    }
    res.push(data);
  }
  return res;
};
// reference: src/view/layout/components/Sidebar/SidebarItem.vue
function onlyOneShowingChild(
  children: Array<RouterItem> = [],
  parent: RouterItem
) {
  let onlyOneChild: RouterItem = {};
  const showingChildren = children.filter((item: RouterItem) => !item.hidden);

  // When there is only one child route, the child route is displayed by default
  if (showingChildren.length === 1) {
    onlyOneChild = showingChildren[0];
    onlyOneChild.path = path_reslove(
      parent.path as string,
      onlyOneChild.path as string
    );
    return onlyOneChild;
  }

  // Show parent if there are no child route to display
  if (showingChildren.length === 0) {
    onlyOneChild = { ...parent, path: "", noShowingChildren: true };
    return onlyOneChild;
  }

  return false;
}
function generateArr(routes: Array<RouterItem>) {
  let data: Array<RouterItem> = [];
  routes.forEach((route) => {
    data.push(route);
    if (route.children) {
      const temp = generateArr(route.children);
      if (temp.length > 0) {
        data = [...data, ...temp];
      }
    }
  });
  return data;
}

const handleAddRole = () => {
  data.role = Object.assign({}, defaultRole);
  if (treeRef) {
    treeRef.value?.setCheckedNodes([]);
  }
  data.dialogType = "new";
  data.dialogVisible = true;
};
const handleEdit = (scope: any) => {
  data.dialogType = "edit";
  data.dialogVisible = true;
  data.checkStrictly = true;
  data.role = deepClone(scope.row);
  nextTick(() => {
    const routes = generateRoutes(data.role.routes);
    treeRef.value?.setCheckedNodes(generateArr(routes) as Array<Node>);
    //  treeRef.value!.setCheckedKeys(generateArr(routes).map((node: RouterItem) => node.path as string));
    // set checked state of a node not affects its father and child nodes
    data.checkStrictly = false;
  });
};

const handleDelete = ({ $index, row }: { $index: number; row: RoleType }) => {
  ElMessageBox.alert("Confirm to remove the role?", "Warning", {
    // if you want to disable its autofocus
    // autofocus: false,
    confirmButtonText: "Confirm",
    cancelButtonText: "Cancel",
    type: "warning",
    callback: async (action: Action) => {
      data.rolesList.splice($index, 1);
      await deleteRole(row.key);
      ElMessage({
        type: "success",
        message: "Delete succed! callback masseage:" + action,
      });
    },
  }).catch((err: any) => {
    console.error("psersiion role erros : ", err);
  });
  return;
};

const generateTree = (
  routes: Array<RouterItem>,
  basePath = "/",
  checkedKeys: string[]
) => {
  const res = [];
  for (const route of routes) {
    const routePath = path_reslove(basePath, route.path as string);
    // recursive child routes
    if (route.children) {
      route.children = generateTree(route.children, routePath, checkedKeys);
    }

    if (
      checkedKeys.includes(routePath) ||
      (route.children && route.children.length >= 1)
    ) {
      res.push(route);
    }
  }
  return res;
};

const confirmRole = async () => {
  const isEdit = data.dialogType === "edit";
  const checkedKeys = treeRef.value!.getCheckedKeys() as Array<string>;
  data.role.routes = generateTree(deepClone(serviceRoutes), "/", checkedKeys);

  if (isEdit) {
    await updateRole(data.role.key, data.role);
    for (let index = 0; index < data.rolesList.length; index++) {
      if (data.rolesList[index].key === data.role.key) {
        data.rolesList.splice(index, 1, Object.assign({}, data.role));
        break;
      }
    }
  } else {
    const res = await addRole(data.role);
    data.role.key = res.data.key;
    data.rolesList.push(data.role);
  }

  const { description, key, name } = data.role;
  data.dialogVisible = false;

  ElNotification({
    title: "Success",
    dangerouslyUseHTMLString: true,
    message: `
            <div>Role Key: ${key}</div>
            <div>Role Name: ${name}</div>
            <div>Description: ${description}</div>
          `,
    type: "success",
  });
};

function path_reslove(a: string, b: string) {
  let b_ar = ("/" + b).replace(/\/+/g, "/").split("/");
  let a_str = a.replace(/\W+/, "");
  if (b_ar.length > 1 && b_ar[1] == a_str) {
    return ("/" + a + "/" + b_ar.slice(2).join("/")).replace(/\/+/g, "/");
  }
  return ("/" + a + "/" + b).replace(/\/+/g, "/");
  // return path.resolve(a, b);
}
</script>

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>
