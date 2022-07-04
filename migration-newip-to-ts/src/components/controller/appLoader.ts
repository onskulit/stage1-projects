import Loader, { ILoader } from './loader';

class AppLoader extends Loader implements ILoader {
    constructor() {
        super('https://nodenews.herokuapp.com/', {
            apiKey: '145a3d7de4f242a6ba17b7bc2e18f6f2',
        });
    }
}

export default AppLoader;
