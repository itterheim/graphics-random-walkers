namespace Graphics {
    export class RandomWalker {
        protected location: Point;

        constructor (protected width: number, protected height: number, protected path: boolean[][], public onColour: string = '#000', public offColour: string = '#aaa') {
            this.location = { x: Math.floor(Math.random() * width), y: Math.floor(Math.random() * height) };


            this.setState(this.location, true);
        }

        public step(): Point {
            let direction = Math.floor(Math.random() * 4);

            let x = 0;
            let y = 0;

            if (direction === 0) {
                x = 1;
            } else if (direction === 1) {
                x = -1;
            } else if (direction === 2) {
                y = 1;
            } else if (direction === 3) {
                y = -1;
            }

            this.location.x += x;
            this.location.y += y;

            if (this.location.x >= this.width) this.location.x -= 2;
            if (this.location.x <= 0) this.location.x += 2;
            if (this.location.y >= this.height) this.location.y -= 2;
            if (this.location.y <= 0) this.location.y += 2;

            this.toggleState(this.location);
            return this.location;
        }

        public renderPoint (location: Point, ctx: CanvasRenderingContext2D): void {
            if (!this.path[location.y]) this.path[location.y] = [];

            if (this.path[location.y][location.x]) {
                ctx.fillStyle = this.onColour;
            } else {
                ctx.fillStyle = this.offColour;
            }
            ctx.fillRect(location.x, location.y, 1, 1);
        }

        public getState (location: Point): boolean {
            if (!this.path[location.y]) this.path[location.y] = [];

            return this.path[location.y][location.x];
        }

        private toggleState (location: Point): boolean {
            if (!this.path[location.y]) this.path[location.y] = [];

            return this.path[location.y][location.x] = !this.path[location.y][location.x];
        }

        private setState (location: Point, state: boolean): boolean {
            if (!this.path[location.y]) this.path[location.y] = [];

            return this.path[location.y][location.x] = state;
        }
    }
}
