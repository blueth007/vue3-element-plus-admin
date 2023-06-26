import Clipboard from "clipboard";
import { ElMessage } from "element-plus";
function clipboardSuccess() {
  ElMessage({
    message: "Copy successfully",
    type: "success",
    duration: 1500,
  });
}

function clipboardError() {
  ElMessage({
    message: "Copy failed",
    type: "error",
  });
}

export default function handleClipboard(text: any, event: Event) {
  const clipboard = new Clipboard(event.target as HTMLElement, {
    text: () => text,
  }) as Clipboard & {
    onClick: (e: Event) => void;
  };
  clipboard.on("success", () => {
    clipboardSuccess();
    clipboard.destroy();
  });
  clipboard.on("error", () => {
    clipboardError();
    clipboard.destroy();
  });
  clipboard.onClick(event);
}
