declare module "*.css";
declare module "*.js";
declare interface JQuery<TElement = HTMLElement, T = HTMLElement> {
  slide(options?: {
    type?: string;
    effect?: string;
    autoPlay?: boolean;
    delayTime?: number;
    interTime?: number;
    triggerTime?: number;
    defaultIndex?: number;
    titCell?: string;
    mainCell?: string;
    targetCell?: any;
    trigger?: string;
    scroll?: number;
    vis?: number;
    titOnClassName?: string;
    autoPage?: boolean;
    prevCell?: string;
    nextCell?: string;
    pageStateCell?: string;
    opp?: boolean;
    pnLoop?: boolean;
    easing?: string;
    startFun?: any;
    endFun?: any;
    switchLoad?: any;
    playStateCell?: string;
    mouseOverStop?: boolean;
    defaultPlay?: boolean;
    returnDefault?: boolean;
  }): JQuery<HTMLElement>;
}
