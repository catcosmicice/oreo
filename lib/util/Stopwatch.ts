/**
 * @author Dirigeants, cosmicice
 * @description Klasa's Stopwatch class, uses native node to replicate/extend previous performance now dependency, rewritten in TypeScript by cosmicice.
 */

import { performance } from 'perf_hooks';

export class Stopwatch {
    digits: number;
    _start: number;
    _end: any;


    constructor(digits = 2) {
        this.digits = digits;
        this._start = performance.now();
        this._end = null;
    }

    get duration() {
        return this._end ? this._end - this._start : performance.now() - this._start;
    }

    get running(): boolean {
        return Boolean(!this._end);
    }

    restart() {
        this._start = performance.now();
        this._end = null;
        return this;
    }

    reset() {
        this._start = performance.now();
        this._end = this._start;
        return this;
    }

    start() {
        if (!this.running) {
            this._start = performance.now() - this.duration;
            this._end = null;
        }
        return this;
    }

    stop() {
        if (this.running) this._end = performance.now();
        return this;
    }

    toString() {
        const time = this.duration;
        if (time >= 1000) return `${(time / 1000).toFixed(this.digits)}s`
        if (time >= 1)  return `${time.toFixed(this.digits)}ms`
        return `${(time / 1000).toFixed(this.digits)}μs`
    }
}