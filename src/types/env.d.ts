/// <reference types="vite/client" />
/// <reference types="@dcloudio/types/index" />

declare module '*.vue' {
    import { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}

declare module 'uview-plus'

interface Uni {
    $u: any
    $util: {
        goToPage({ url, mode = 'navigateTo', params = {} }: goToPageInt): void
        formatTime(time: number, format?: string): string
        debounce<T extends (...args: any[]) => any>(fn: T, wait: number = 1000): (...args: Parameters<T>) => void
        throttle<T extends (...args: any[]) => any>(fn: T, wait: number = 1000): (...args: Parameters<T>) => void
        fileUrl(fileName: string, filePath: string = 'images'): string
    }
}
