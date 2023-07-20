package com.elasticsearch.search.service;
import java.util.concurrent.atomic.AtomicInteger;

import co.elastic.clients.elasticsearch.core.search.Hit;
import com.elasticsearch.search.api.model.Result;
import com.elasticsearch.search.api.model.InlineResponse200;
import com.elasticsearch.search.domain.EsClient;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static java.util.Objects.*;

@Service
public class SearchService {

    private final EsClient esClient;
    private final AtomicInteger pages = new AtomicInteger(0);

    public AtomicInteger getPages() {
        return pages;
    }

    public SearchService(EsClient esClient) {
        this.esClient = esClient;
    }

    public InlineResponse200 submitQuery(String query, Integer page, Boolean numResults) {
        InlineResponse200 resultF = new InlineResponse200();
        if(isNull(query) || query.isBlank()){
            return new InlineResponse200();
        }
        if(isNull(page) || page <= 0){
            page = 1;
        }

        var searchResponse = esClient.search(query, page, numResults, pages);

        List<Hit<ObjectNode>> hits = searchResponse.hits().hits();

        var resultsList = hits
            .stream()
            .map(
                h ->
                    new Result()
                        .abs(treatContent(h.highlight().get("content").get(0)))
                        .title(h.source().get("title").asText())
                        .url(h.source().get("url").asText())
                ).collect(Collectors.toList());
        resultF.setNumResults(pages.get());
        resultF.setResults(resultsList);
        return resultF;
    }

    private String treatContent(String content) {
        content = content.replaceAll("</?(som|math)\\d*>", " ");
        content = content.replaceAll("[^A-Za-z\\s</>]+", " ");
        content = content.replaceAll("\\s+", " ");
        content = content.replaceAll("^\\s+", "");
        return content;
    }
}
