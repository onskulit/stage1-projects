import AppController, { IController } from '../controller/controller';
import { AppView, IAppView } from '../view/appView';

interface IApp {
    controller: IController;
    view: IAppView;
    start(): void;
}

class App implements IApp {
    controller: IController;
    view: IAppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        (document.querySelector('.sources') as HTMLElement).addEventListener('click', (e) =>
            this.controller.getNews(e, (data) => this.view.drawNews(data))
        );
        this.controller.getSources((data) => this.view.drawSources(data));
    }
}

export default App;
