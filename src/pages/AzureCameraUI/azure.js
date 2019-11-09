import $ from "jquery";
export function process(data, callback) {
    var subscriptionKey = "afe6f1104bd44463a808439640ba056c";
    var uriBase = "https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/RecognizeText";

    var params = {
      "language": "unk",
      "detectOrientation ": "true",
    };

    $.ajax({
        url: uriBase + "?" + $.param(params),

        beforeSend: function(jqXHR) {
          jqXHR.setRequestHeader("Content-Type", "application/octet-stream");
          jqXHR.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
        },

        type: "POST",
        processData: false,
        data: data
      })

      .done(function(data, textStatus, jqXHR) {
        // Show progress.
        // $("#responseTextArea").val("Processing");
        setTimeout(function() {
          // The "Operation-Location" in the response contains the URI to retrieve the recognized text.
          var operationLocation = jqXHR.getResponseHeader("Operation-Location");

          $.ajax({
              url: operationLocation,
              beforeSend: function(jqXHR) {
                jqXHR.setRequestHeader("Content-Type", "application/json");
                jqXHR.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
              },
              type: "GET",
            })

            .done(function(data) {
              var text = "";
              // Show formatted JSON on webpage.
              for (i in data.recognitionResult.lines) {
                text += data.recognitionResult.lines[i].text + "\n";
              }
              var array = text.split("\n");
            //   $("#responseTextArea").val(text);
              callback(text);
            })

            .fail(function(jqXHR, textStatus, errorThrown) {
              // Display error message.
              var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
              errorString += (jqXHR.responseText === "") ? "" : ($.parseJSON(jqXHR.responseText).message) ?
                $.parseJSON(jqXHR.responseText).message : $.parseJSON(jqXHR.responseText).error.message;
              alert(errorString);
            });
        }, 2000);
      })

      .fail(function(jqXHR, textStatus, errorThrown) {
        // Put the JSON description into the text area.
        $("#responseTextArea").val(JSON.stringify(jqXHR, null, 2));

        // Display error message.
        var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
        errorString += (jqXHR.responseText === "") ? "" : ($.parseJSON(jqXHR.responseText).message) ?
          $.parseJSON(jqXHR.responseText).message : $.parseJSON(jqXHR.responseText).error.message;
        alert(errorString);
      })
  }
