type noop = (...p: any) => void;

interface EmiterType {
    eventName: string;
    eventPool: noop[];
    emit: (...p: unknown[]) => unknown;
}

class Eventer implements EmiterType {
    eventName;

    eventPool: EmiterType['eventPool'];

    constructor(eventName: string) {
        this.eventName = eventName;
        this.eventPool = [];
    }

    emit(...args: unknown[]) {
        for (let index = 0; index < this.eventPool.length; index += 1) {
            this.eventPool[index].apply(this, args);
        }
    }

    subcribe<T = noop>(callback: T) {
        this.eventPool.push(callback as unknown as noop);
    }
}

export default Eventer;
