normalize <- function(predictions){
  names(predictions)
}

aggregatePredictions <- function(predictions, n, method='top') {
  dist <- sapply(predictions$dist, function(p) names(p))
  kmr <- sapply(predictions$kmr, function(p) names(p))
  # return(aggregate(preds, list(unique(preds)), length))
  predictions
}