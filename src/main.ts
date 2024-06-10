import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { allComponents, provideFluentDesignSystem } from '@fluentui/web-components';

provideFluentDesignSystem().register(allComponents);
platformBrowserDynamic().bootstrapModule(AppModule, {
    ngZoneEventCoalescing: true
    })
    .catch(err => console.error(err));
    

