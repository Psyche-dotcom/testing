import { Slide } from "../types"

export default  class SlideManger {
    content: Slide[];
    constructor() {
        this.content = [];
    }
    //sets slides
    set(slides: Slide[]) {
        this.content = slides;
    }
    get visible() {
        return this.content.filter(slide => !slide.hide);
    }
}
