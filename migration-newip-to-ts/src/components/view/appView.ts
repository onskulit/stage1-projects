import { INewsResponse, ISourcesResponse } from './../../Interfaces-api/index';
import News, { INews } from './news/news';
import Sources, { ISources } from './sources/sources';

export interface IAppView {
    news: INews;
    sources: ISources;
    drawNews(data?: INewsResponse): void;
    drawSources(data?: ISourcesResponse): void;
}

export class AppView implements IAppView {
    news: INews;
    sources: ISources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data?: INewsResponse) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data?: ISourcesResponse) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
