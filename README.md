# webext-drag-drop — Drag & Drop for Chrome Extensions
> **Built by [Zovo](https://zovo.one)** | `npm i webext-drag-drop`

Sortable lists, file drop zones, drag handles, and order persistence.

```typescript
import { DragSortable, FileDropZone } from 'webext-drag-drop';
new DragSortable(listEl, (order) => console.log(order));
new FileDropZone(dropEl, (files) => handleFiles(files));
```
MIT License
