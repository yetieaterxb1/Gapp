getNearestStrains <- function(dfc, userStrains, N=5){
  userStrains.rnames <- as.data.frame(userStrains)[,1]
  dfc.rnames <- as.data.frame(dfc)[,1]
  userStrains <- userStrains[,-1]
  rownames(userStrains) <- userStrains.rnames
  dfc <- dfc[,-1]
  rownames(dfc) <- dfc.rnames
  distances <- lapply(rownames(userStrains), function(uStrain){
    sapply(rownames(dfc), function(dStrain){
      dist(rbind(
        dfc[dStrain,],
        userStrains[uStrain,]
      ))
    })
  })
  names(distances) <- rownames(userStrains)
  lapply(distances, function(d){
    as.list(sort(d)[2:N])
  })
}
