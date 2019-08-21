###########
# Methods #
###########
clusterStrains <-function(dfc){
  set.seed(123)
  i<-1
  repeat {
    set.seed(123)
    i <- i + 1
    cluster1<-kmeans(dfc, i)
    cluster2<-kmeans(dfc, i+1)
    dsc<-((cluster1$tot.withinss-cluster2$tot.withinss)/cluster1$tot.withinss)
    if (dsc < 0.1) break
  }
  return(cluster1)
}

getUserStrains <- function(dfr, user){
  userRows <- subset(dfr, dfr$User==user, select=c('Strain', 'Rating'))
  cluster<-0
  userRatings <- data.frame(userRows, cluster)
  return(userRatings)
}

setUserStrainCluster<-function(dfc, strainCluster, userRatings){
  df1 <- data.frame(cbind(rownames(dfc), clusterNum = strainCluster$cluster))
  names(df1)<-c("id","cluster")
  userRatings$cluster <- df1[match(userRatings$Strain, df1$id), 2]
  return(userRatings)
}

getMeanClusterRating<-function(strainCluster, userRatings){
  like <- aggregate(userRatings$Rating, by=list(cluster=userRatings$cluster), mean)
  if(max(like$x)<3){
    like<-as.vector(0)
  } else{
    like <- like$cluster[which(like$x == max(like$x))]
  }
  return(like)
}

getGoodStrains<-function(like, strainCluster, dfc, max=100){
  df1 <- data.frame(cbind(rownames(dfc), clusterNum = strainCluster$cluster))
  names(df1)<-c("id", "cluster")
  if(like==0){
    recommend<-df[sample.int(n = dim(dfc)[1], size = max), 1]
  }else{
    recommend<-as.vector(t(subset(df1, cluster==like, select=id)))
  }
  return(recommend)
}

########
# Main #
########
getRecommendedStrains<-function(dfc, dfr, userId, select.new=T){
  strainCluster<-clusterStrains(dfc)
  userRatings<-getUserStrains(dfr, userId)
  userRatings<-setUserStrainCluster(dfc, strainCluster, userRatings)
  like<-getMeanClusterRating(strainCluster, userRatings)
  recommend<-getGoodStrains(like, strainCluster, dfc)
  if(select.new){
    idx <- sapply(recommend, function(rec){
      !any(userRatings == rec)
    })
    recommend <- recommend[idx]
  }
  return(recommend)
}

