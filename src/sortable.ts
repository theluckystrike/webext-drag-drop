/**
 * Drag Sortable — Sortable list with drag and drop
 */
export class DragSortable {
    private container: HTMLElement;
    private onReorder?: (order: string[]) => void;

    constructor(container: HTMLElement, onReorder?: (order: string[]) => void) {
        this.container = container; this.onReorder = onReorder;
        this.init();
    }

    private init(): void {
        this.container.querySelectorAll('[data-sortable]').forEach((el) => {
            const item = el as HTMLElement;
            item.draggable = true;
            item.addEventListener('dragstart', (e) => { (e as DragEvent).dataTransfer?.setData('text/plain', item.dataset.sortable || ''); item.classList.add('dragging'); });
            item.addEventListener('dragend', () => { item.classList.remove('dragging'); this.emitOrder(); });
            item.addEventListener('dragover', (e) => { e.preventDefault(); const dragging = this.container.querySelector('.dragging'); if (dragging && dragging !== item) { const rect = item.getBoundingClientRect(); const mid = rect.top + rect.height / 2; if ((e as DragEvent).clientY < mid) item.before(dragging); else item.after(dragging); } });
        });
    }

    /** Get current order */
    getOrder(): string[] {
        return Array.from(this.container.querySelectorAll('[data-sortable]')).map((el) => (el as HTMLElement).dataset.sortable || '');
    }

    /** Save order to storage */
    async saveOrder(key: string): Promise<void> { await chrome.storage.local.set({ [key]: this.getOrder() }); }

    /** Restore order from storage */
    async restoreOrder(key: string): Promise<void> {
        const result = await chrome.storage.local.get(key);
        const order = result[key] as string[] | undefined;
        if (!order) return;
        order.forEach((id) => { const el = this.container.querySelector(`[data-sortable="${id}"]`); if (el) this.container.appendChild(el); });
    }

    private emitOrder(): void { this.onReorder?.(this.getOrder()); }
}
