import Slide from "./component/Slide.vue"
import SlideItem from "./component/SlideItem.vue"
export const VueSlidePlugin = {
    install: function(app:any){
        app.component("Slide", Slide)
        app.component("SlideItem",SlideItem)
    }
}