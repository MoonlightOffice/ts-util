export class Context {
    #data: Map<string, unknown>

    constructor(param?: { [key: string]: unknown }) {
        this.#data = new Map<string, unknown>()
        if (param) {
            for (const key of Object.keys(param)) {
                this.#data.set(key, param[key])
            }
        }
    }

    set(key: string, value: unknown) {
        this.#data.set(key, value)
    }

    get(key: string): unknown | null {
        if (!this.#data.has(key)) {
            return null
        }
        return this.#data.get(key)
    }

    delete(key: string) {
        this.#data.delete(key)
    }
}
