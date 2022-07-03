import Loader, { ILoader } from './loader';

class AppLoader extends Loader implements ILoader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '145a3d7de4f242a6ba17b7bc2e18f6f2',
        });
    }
}

export default AppLoader;
