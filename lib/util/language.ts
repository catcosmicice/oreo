import { AkairoHandler, AkairoModule } from 'discord-akairo';
import { Oreo } from '@oreo/lib/Oreo';
import { join } from 'path';

export class LanguageHandler extends AkairoHandler {
    constructor(client: Oreo, {
        directory = join(__dirname, '../../src/languages'),
        classToHandle = Language,
        extensions = [".js", ".ts"],
        automateCategories = false,
        loadFilter = () => true
    }) {
        super(client, {
            directory,
            classToHandle,
            extensions,
            automateCategories,
            loadFilter
        })
    }
}

export class Language extends AkairoModule {
    language: any;
    enabled: boolean;
    client: Oreo;

    constructor(id: string, options = {
        language: {},
        enabled: true
    }) {
        super(id, {})

        const { language, enabled } = options;
        this.language = language;
        this.enabled = enabled;
    }

    has(id: string) {
        return this.language.hasOwnProperty(id);
    }

    get(id: string, ...args: any[]): string | object {
        const lang = this.id == 'en-GB' ? this : (this.client.languages.modules.get('en-GB') as Language);
        const message = this.has(id) ? this.language[id] : lang.has(id) ? lang.get(id, ...args) : lang.get('DEFAULT', id);
        return typeof message == 'function' ? message(...args) : message;
    }
}