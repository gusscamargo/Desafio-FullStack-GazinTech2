export interface ErrorResponse {
    name: string
    parent: {
        errbi: number
        code: string
        syscall: string
        hostname: string
        fatal: boolean
    }
    original: {
        errbi: number
        code: string
        syscall: string
        hostname: string
        fatal: boolean
    }
}