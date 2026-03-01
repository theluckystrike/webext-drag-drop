/**
 * File Drop Zone — Drag and drop file upload
 */
export class FileDropZone {
    private zone: HTMLElement; private onFiles?: (files: File[]) => void;

    constructor(zone: HTMLElement, onFiles?: (files: File[]) => void, accept?: string[]) {
        this.zone = zone; this.onFiles = onFiles;
        this.zone.addEventListener('dragover', (e) => { e.preventDefault(); this.zone.classList.add('dragover'); });
        this.zone.addEventListener('dragleave', () => { this.zone.classList.remove('dragover'); });
        this.zone.addEventListener('drop', (e) => {
            e.preventDefault(); this.zone.classList.remove('dragover');
            const files = Array.from((e as DragEvent).dataTransfer?.files || []);
            const filtered = accept ? files.filter((f) => accept.some((a) => f.name.endsWith(a) || f.type.includes(a))) : files;
            this.onFiles?.(filtered);
        });
    }

    /** Read dropped file as text */
    static readAsText(file: File): Promise<string> { return file.text(); }

    /** Read as data URL */
    static readAsDataURL(file: File): Promise<string> {
        return new Promise((resolve) => { const r = new FileReader(); r.onload = () => resolve(r.result as string); r.readAsDataURL(file); });
    }

    /** Read as JSON */
    static async readAsJSON<T>(file: File): Promise<T> { return JSON.parse(await file.text()); }
}
