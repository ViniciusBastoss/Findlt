package com.elasticsearch.search.controller;

import com.elasticsearch.search.api.facade.SearchApi;
import com.elasticsearch.search.api.model.InlineResponse200;
import com.elasticsearch.search.service.SearchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.CompletableFuture;

@CrossOrigin
@RestController
public class SearchController implements SearchApi {

    private final SearchService searchService;

    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    @Override
    public CompletableFuture<ResponseEntity<InlineResponse200>> search(String query, Integer page, Boolean numResults) {
        var result = searchService.submitQuery(query, page, numResults);
        return CompletableFuture
            .supplyAsync(
                () -> ResponseEntity.ok((InlineResponse200) result)
            );
    }
}
