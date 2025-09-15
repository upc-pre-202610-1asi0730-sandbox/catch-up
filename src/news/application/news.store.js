import {computed, reactive, ref} from "vue";
import {Source} from "../domain/model/source.entity.js";
import {NewsApi} from "../infrastructure/news-api.js";
import {SourceAssembler} from "../infrastructure/source.assembler.js";
import {ArticleAssembler} from "../infrastructure/article.assembler.js";

const newsApi = new NewsApi();
export const newsStore = reactive({
        sources: [],
        articles: [],
        errors: [],
        currentSource: null,
        setCurrentSource(source) {
            console.log('Entering setCurrentSource');
            if (source instanceof Source) {
                console.log('Current source is: ', source);
                this.currentSource = source;
                console.log(this.currentSource);
                this.loadArticlesForCurrentSource();
            }
        },
        loadSources() {
            console.log('Entering loadSources');
            this.errors = [];
            newsApi.getSources().then(response => {
                console.log('Response: ',response);
                this.sources = SourceAssembler.toEntitiesFromResponse(response);
                console.log(this.sources);
                if (this.sources.length > 0) {
                    console.log('Sources loaded');
                    this.setCurrentSource(this.sources[0]);
                    this.loadArticlesForCurrentSource();
                }
            }).catch(error => {
                this.errors.push(error);
                this.sources = [];
            });
        },
        loadArticlesForCurrentSource() {
            console.log('Entering loadArticlesForCurrentSource');
            if (this.currentSource === null) return;
            console.log('Current source is: ', this.currentSource);
            newsApi.getArticlesForSourceId(this.currentSource.id).then(response => {
                console.log(response);
                this.articles = ArticleAssembler.withSource(this.currentSource).toEntitiesFromResponse(response);
                console.log(this.articles);
            }).catch(error => {
                this.errors.push(error);
                this.articles = [];
            });
        }
    })
;