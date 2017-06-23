namespace Graphics {
    export class App {
        private canvas: HTMLCanvasElement;
        private ctx: CanvasRenderingContext2D;

        private animation: Animation;
        private walkers: RandomWalker[] = [];
        private state: boolean[][] = [];

        private controls: Controls;

        constructor () {
            this.controls = new Controls(this);

            this.canvas = <HTMLCanvasElement> document.createElement('canvas');
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            document.body.insertAdjacentElement('beforeBegin', this.canvas);
            this.ctx = this.canvas.getContext('2d');

            this.animation = new Graphics.Animation((duration) => {
                this.step(duration);
            });

            this.run();
        }

        public run (): void {
            let color: string[][] = [
                ['#a00', '#d66'],
                ['#000', '#aaa'],
                ['#06a', '#69d'],
                ['#06a', '#69d'],
                ['#06a', '#69d'],
                ['#06a', '#69d']
            ];

            for (let i = 0; i < this.controls.getCount(); i++) {
                let n = Math.floor(Math.random() * color.length)
                this.walkers.push(new RandomWalker(this.canvas.width, this.canvas.height, this.state, color[n][1], color[n][0]));
            }

            this.animation.animate();
        }

        public stop (): void {
            this.animation.stop();
        }

        public reset (): void {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.walkers = [];
            this.state = [];
        }

        private step (duration: number): void {
            for (let walker of this.walkers) {
                let point = walker.step();
                walker.renderPoint(point, this.ctx);
            }
        }
    }
}
