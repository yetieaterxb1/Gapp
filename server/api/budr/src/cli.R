needs(jsonlite)
needs(mongolite)
source('/Users/sethmartinez/Desktop/PRJ/WWW/Gapp/server/api/budr/src/util/format.R')
source('/Users/sethmartinez/Desktop/PRJ/WWW/Gapp/server/api/budr/src/util/aggregate.R')
source('/Users/sethmartinez/Desktop/PRJ/WWW/Gapp/server/api/budr/src/models/knn.R')
source('/Users/sethmartinez/Desktop/PRJ/WWW/Gapp/server/api/budr/src/models/recommender.R')
source('/Users/sethmartinez/Desktop/PRJ/WWW/Gapp/server/api/budr/src/models/autoencoder.R')
source('/Users/sethmartinez/Desktop/PRJ/WWW/Gapp/server/api/budr/src/models/distance.R')

if(exists('input')){
  attach(input[[1]])
}else{
  attach(args)
}

if(!exists('DB_URL')) DB_URL <- 'mongodb://localhost/Gapp'

Strain = mongo(collection='strains', url = DB_URL)
Rating = mongo(collection='ratings', url = DB_URL)

predictions <- list()
result <- NULL

if(exists('dist')){
  predictions$dist <- getNearestStrains(dfc, userStrains)
}

# if(args$knn){
#   predictions$knn <- NULL
# }

# if(args$kmr){
#   predictions$kmr <- getRecommendedStrains(Strain$find(), Rating$find(), userId, selectNew)
# }

# if(args$vae){
#   predictions$vae <- NULL
# }


if(!exists('N')) N <- 5
if(!exists('aggMethod')) aggMethod <- 'top'

# aggregatePredictions(predictions, N, aggMethod)

predictions$dist

