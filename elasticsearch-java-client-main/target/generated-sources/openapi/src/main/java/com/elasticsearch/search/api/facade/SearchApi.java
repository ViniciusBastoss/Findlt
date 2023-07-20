/**
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech) (4.3.1).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
package com.elasticsearch.search.api.facade;

import com.elasticsearch.search.api.model.Error;
import com.elasticsearch.search.api.model.InlineResponse200;
import io.swagger.annotations.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.*;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;
@javax.annotation.Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2023-07-20T19:15:14.108435509-03:00[America/Sao_Paulo]")

@Validated
@Api(value = "search", description = "the search API")
public interface SearchApi {

    default Optional<NativeWebRequest> getRequest() {
        return Optional.empty();
    }

    /**
     * GET /search : Submits a query to Elasticsearch
     *
     * @param query Query to be submitted (optional)
     * @param page Page number (optional)
     * @param numResults Include the total number of results in the response (optional, default to false)
     * @return OK (status code 200)
     *         or Unexpected error (status code 500)
     */
    @ApiOperation(value = "Submits a query to Elasticsearch", nickname = "search", notes = "", response = InlineResponse200.class, tags={ "search", })
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "OK", response = InlineResponse200.class),
        @ApiResponse(code = 500, message = "Unexpected error", response = Error.class) })
    @RequestMapping(value = "/search",
        produces = { "application/json" }, 
        method = RequestMethod.GET)
    default CompletableFuture<ResponseEntity<InlineResponse200>> search(@ApiParam(value = "Query to be submitted") @Valid @RequestParam(value = "query", required = false) String query,@ApiParam(value = "Page number") @Valid @RequestParam(value = "page", required = false) Integer page,@ApiParam(value = "Include the total number of results in the response", defaultValue = "false") @Valid @RequestParam(value = "numResults", required = false, defaultValue="false") Boolean numResults) {
        return CompletableFuture.supplyAsync(()-> {
            getRequest().ifPresent(request -> {
                for (MediaType mediaType: MediaType.parseMediaTypes(request.getHeader("Accept"))) {
                    if (mediaType.isCompatibleWith(MediaType.valueOf("application/json"))) {
                        String exampleString = "{ \"numResults\" : 0, \"results\" : [ { \"abs\" : \"abs\", \"title\" : \"title\", \"url\" : \"url\" }, { \"abs\" : \"abs\", \"title\" : \"title\", \"url\" : \"url\" } ] }";
                        ApiUtil.setExampleResponse(request, "application/json", exampleString);
                        break;
                    }
                }
            });
            return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);
        }, Runnable::run);

    }

}
