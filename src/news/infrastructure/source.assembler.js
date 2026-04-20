
import {Source} from "../domain/model/source.entity.js";
import {LogoDevApi} from "../../shared/infrastructure/logo-dev-api.js";


const logoApi = new LogoDevApi();

export class SourceAssembler {
    static toEntitiesFromResponse(response) {
        if (response.data.status !== "ok") {
            console.error(`${response.status},  ${response.code}, ${response.message}`);
            return [];
        }
        const sourcesResponse = response.data;
        return sourcesResponse.sources.map((source) => {
            return this.toEntityFromResource(source);
        });
    }

    static toEntityFromResource(resource) {
        let source = new Source({...resource});
        source.urlToLogo = source.url !== '' ? logoApi.getUrlToLogo(source) : '';
        return source;
    }
}