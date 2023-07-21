package com.elasticsearch.search.api.model;

import java.util.Objects;
import com.elasticsearch.search.api.model.Result;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.util.ArrayList;
import java.util.List;
import org.openapitools.jackson.nullable.JsonNullable;
import java.io.Serializable;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * InlineResponse200
 */
@javax.annotation.Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2023-07-21T17:25:53.721609472-03:00[America/Sao_Paulo]")

public class InlineResponse200  implements Serializable {
  private static final long serialVersionUID = 1L;

  @JsonProperty("numResults")
  private Integer numResults;

  @JsonProperty("results")
  @Valid
  private List<Result> results = null;

  public InlineResponse200 numResults(Integer numResults) {
    this.numResults = numResults;
    return this;
  }

  /**
   * Get numResults
   * @return numResults
  */
  @ApiModelProperty(value = "")


  public Integer getNumResults() {
    return numResults;
  }

  public void setNumResults(Integer numResults) {
    this.numResults = numResults;
  }

  public InlineResponse200 results(List<Result> results) {
    this.results = results;
    return this;
  }

  public InlineResponse200 addResultsItem(Result resultsItem) {
    if (this.results == null) {
      this.results = new ArrayList<>();
    }
    this.results.add(resultsItem);
    return this;
  }

  /**
   * Get results
   * @return results
  */
  @ApiModelProperty(value = "")

  @Valid

  public List<Result> getResults() {
    return results;
  }

  public void setResults(List<Result> results) {
    this.results = results;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    InlineResponse200 inlineResponse200 = (InlineResponse200) o;
    return Objects.equals(this.numResults, inlineResponse200.numResults) &&
        Objects.equals(this.results, inlineResponse200.results);
  }

  @Override
  public int hashCode() {
    return Objects.hash(numResults, results);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class InlineResponse200 {\n");
    
    sb.append("    numResults: ").append(toIndentedString(numResults)).append("\n");
    sb.append("    results: ").append(toIndentedString(results)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(java.lang.Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}

