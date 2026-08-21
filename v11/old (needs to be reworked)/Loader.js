// Used to make loading everything more centralized and avoid duplication
// when used, different tasks are added to the loader. then each is completed in sequence


export default class Loader {
    constructor() {
        this.tasks = [];
        this.completed = 0;
    }

    add(task) {
        this.tasks.push(task);
    }

    async run(onProgress) {
        const total = this.tasks.length;
        for (const task of this.tasks) {
            await task();
            this.completed++;
            if (onProgress) {
                onProgress(this.completed / total);
            }

            // await new Promise(resolve => setTimeout(resolve, 2000));    // for debugging loading
        }
    }
}
