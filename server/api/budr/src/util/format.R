makeStrings <- function(l){
  paste0(paste0(paste0('"', paste0(l, collapse='"","')), collapse='"'), '"')
}

makeDistQuery <- function(projectIds){
  pids <- makeStrings(projectIds)
  paste('{ "_id": { "$in": [', paste( pids, collapse=','), ']}}')
}