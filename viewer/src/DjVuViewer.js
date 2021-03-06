import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import App from './components/App.jsx';
import Actions from './actions/actions';
import configureStore from './store';
import { loadFile } from './utils';

export default class DjVuViewer {

    static VERSION = '0.2.4';

    constructor() {
        this.store = configureStore();
    }

    render(element) {
        ReactDOM.render(
            <Provider store={this.store}>
                <App />
            </Provider>
            , element
        );
    }

    configure(config = {}) {
        if (config.pageRotation) {
            this.store.dispatch(Actions.setPageRotationAction(config.pageRotation));
        }
        return this;
    }

    loadDocument(buffer, name = "***", config = {}) {
        return new Promise(resolve => {
            this.store.dispatch(Actions.setApiCallbackAction('document_created', () => {
                config && this.configure(config);
                resolve();
            }));
            this.store.dispatch(Actions.createDocumentFromArrayBufferAction(buffer, config.djvuOptions, name));
        });
    }

    async loadDocumentByUrl(url, config = null) {
        config = config || {};
        try {
            var a = document.createElement('a');
            a.href = url;
            url = a.href; // converting of a relative url to an absolute one
            this.store.dispatch(Actions.startFileLoadingAction());
            var buffer = await loadFile(url, (e) => {
                this.store.dispatch(Actions.fileLoadingProgressAction(e.loaded, e.total));
            });
            var res = /[^/]*$/.exec(url.trim());
            var baseUrl = new URL('./', url).href;
            config.djvuOptions = { baseUrl: baseUrl };
            await this.loadDocument(buffer, res ? res[0] : '***', config);
        } catch (e) {
            this.store.dispatch(Actions.errorAction(e));
        } finally {
            this.store.dispatch(Actions.endFileLoadingAction());
        }
    }
}
