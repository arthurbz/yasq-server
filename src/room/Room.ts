class Room {
    private _isPlaying: boolean
    id: string

    constructor(id: string) {
        this.id = id
        this._isPlaying = false
    }

    get isPlaying(): boolean {
        return this._isPlaying
    }

    set isPlaying(isPlaying: boolean) {
        this._isPlaying = isPlaying
    }
}

export { Room }
