package com.elasticsearch.search.domain;
import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch._types.query_dsl.MatchQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import co.elastic.clients.elasticsearch.core.search.Highlight;
import co.elastic.clients.elasticsearch.core.search.HighlightField;
import co.elastic.clients.elasticsearch.core.search.HighlighterType;
import co.elastic.clients.elasticsearch.core.search.Hit;
import co.elastic.clients.json.jackson.JacksonJsonpMapper;
import co.elastic.clients.transport.ElasticsearchTransport;
import co.elastic.clients.transport.rest_client.RestClientTransport;
import com.fasterxml.jackson.databind.node.ObjectNode;
import nl.altindag.ssl.SSLFactory;
import org.apache.http.HttpHost;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.impl.nio.client.HttpAsyncClientBuilder;
import org.elasticsearch.client.RestClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;


@Component
public class EsClient {
    private String user;
    private String pwd;
    private static final int PAGE_SIZE = 10;

    private ElasticsearchClient elasticsearchClient;

    public EsClient(@Value("${elasticsearch.connection.username}") String user,
                    @Value("${elasticsearch.connection.password}") String pwd) {
        this.user = user;
        this.pwd = pwd;
        createConnection();
    }

    private void createConnection() {
        CredentialsProvider credentialsProvider = new BasicCredentialsProvider();
        credentialsProvider.setCredentials(AuthScope.ANY,
            new UsernamePasswordCredentials(user, pwd));

        SSLFactory sslFactory = SSLFactory.builder()
            .withUnsafeTrustMaterial()
            .withUnsafeHostnameVerifier()
            .build();

        RestClient restClient = RestClient.builder(
                new HttpHost("localhost", 9200, "https"))
            .setHttpClientConfigCallback((HttpAsyncClientBuilder httpClientBuilder) -> httpClientBuilder
                .setDefaultCredentialsProvider(credentialsProvider)
                .setSSLContext(sslFactory.getSslContext())
                .setSSLHostnameVerifier(sslFactory.getHostnameVerifier())
            ).build();

        ElasticsearchTransport transport = new RestClientTransport(
            restClient,
            new JacksonJsonpMapper()
        );

        elasticsearchClient = new ElasticsearchClient(transport);
    }

    public SearchResponse search(String query, Integer page, Boolean numResults, AtomicInteger totalResults) {
        //Highlight
        Map<String, HighlightField> map = new HashMap<>();
        map.put("content", HighlightField.of(hf -> hf.numberOfFragments(1).fragmentSize(300)));
        Highlight highlight = Highlight.of(
            h -> h.type(HighlighterType.Unified)
                .fields(map)
        );

        //Query
        Query matchQuery = MatchQuery.of(
                q -> q.field("content").query(query))
            ._toQuery();

        SearchResponse<ObjectNode> response;
        SearchResponse<ObjectNode> response2;
        try {
            if(numResults){
                response2 = elasticsearchClient.search(s -> s
                        .index("wikipedia").from(0).size(10000)
                        .query(matchQuery).highlight(highlight), ObjectNode.class
                );
                totalResults.set(response2.hits().hits().size());

            }
            response = elasticsearchClient.search(s -> s
                .index("wikipedia").from(PAGE_SIZE * (page - 1)).size(PAGE_SIZE)
                .query(matchQuery).highlight(highlight), ObjectNode.class
            );
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return response;
    }
}
