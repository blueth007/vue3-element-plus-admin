<template>
  <div>
    <div>
      <input
        ref="excelUploadInput"
        class="excel-upload-input"
        type="file"
        accept=".xlsx, .xls"
        @change="handleClick"
      />
      <div
        class="drop"
        @drop="handleDrop"
        @dragover="handleDragover"
        @dragenter="handleDragover"
      >
        Drop excel file here or
        <el-button
          :loading="loading"
          style="margin-left: 16px"
          size="small"
          type="primary"
          @click="handleUpload"
        >
          Browse
        </el-button>
      </div>
    </div>
    <div id="excelhtmlcontainer"></div>
  </div>
</template>

<script setup lang="ts">
import * as XLSX from "xlsx";
import { toRefs, reactive, ref } from "vue";
import { ElMessage, ElButton } from "element-plus";

const props = defineProps({
  beforeUpload: Function,
  onSuccess: Function,
});
const excelUploadInput = ref<HTMLInputElement | null>();
const data = reactive({
  loading: false,
  excelData: {
    header: [] as string[],
    results: [] as any[],
  },
});
const { loading } = toRefs(data);
function generateData({
  header,
  results,
}: {
  header: string[];
  results: any[];
}) {
  data.excelData.header = header;
  data.excelData.results = results;
  props.onSuccess && props.onSuccess(data.excelData);
}

function handleDrop(e: Event | any) {
  e.stopPropagation();
  e.preventDefault();
  if (data.loading) return;
  const files = e.dataTransfer.files;
  if (files.length !== 1) {
    ElMessage.error("Only support uploading one file!");
    return;
  }
  const rawFile = files[0]; // only use files[0]

  if (!isExcel(rawFile)) {
    ElMessage.error("Only supports upload .xlsx, .xls, .csv suffix files");
    return false;
  }
  upload(rawFile);
  e.stopPropagation();
  e.preventDefault();
}

function handleDragover(e: DragEvent) {
  e.stopPropagation();
  e.preventDefault();
  e.dataTransfer!.dropEffect = "copy";
}

function handleUpload() {
  excelUploadInput.value?.click();
}

function handleClick(e: Event) {
  const files = (e.target as HTMLInputElement).files as FileList;
  const rawFile = files[0]; // only use files[0]
  if (!rawFile) return;
  upload(rawFile);
}

function upload(rawFile: File) {
  /* Warn: Cannot find refs name */
  excelUploadInput.value = null; // fix can't select the same excel

  if (!props.beforeUpload) {
    readerData(rawFile);
    return;
  }
  const before = props.beforeUpload(rawFile);
  if (before) {
    readerData(rawFile);
  }
}

function readerData(rawFile: File) {
  data.loading = true;
  return new Promise<void>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e: Event) => {
      const result = (e.target as FileReader).result;
      const workbook = XLSX.read(result, { type: "array" });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const header = getHeaderRow(worksheet);
      //update excel header, replace cell is undefined or empty string
      XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: "A1" });
      const results = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
      generateData({ header, results });
      data.loading = false;
      resolve();
    };
    reader.readAsArrayBuffer(rawFile);
  });
}

function getHeaderRow(sheet: any) {
  const headers = [];
  const range = XLSX.utils.decode_range(sheet["!ref"]);
  let C;
  const R = range.s.r;
  /* start in the first row */
  for (C = range.s.c; C <= range.e.c; ++C) {
    /* walk every column in the range */
    const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })];
    /* find the cell in the first row */
    let hdr = "UNKNOWN " + C; // <-- replace with your desired default
    if (cell && cell.t) {
      hdr = XLSX.utils.format_cell(cell);
    }
    headers.push(hdr);
  }
  return headers;
}

function isExcel(file: any) {
  return /\.(xlsx|xls|csv)$/.test(file.name);
}
</script>

<style scoped>
.excel-upload-input {
  display: none;
  z-index: -9999;
}

.drop {
  border: 2px dashed #bbb;
  width: 600px;
  height: 160px;
  line-height: 160px;
  margin: 0 auto;
  font-size: 24px;
  border-radius: 5px;
  text-align: center;
  color: #bbb;
  position: relative;
}
</style>
