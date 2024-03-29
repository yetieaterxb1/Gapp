const range = (min,max,inc) => Array.from({length:(max-min)/inc}, (v,i) => i+min+inc-1)
const mean = (X) => X.reduce((acc,x) => acc + x) / X.length
const stdev = (X,u) => Math.sqrt( X.reduce((acc,x) => acc + Math.pow(x-u,2)) / X.length )

const norm = {
  minmax: ({ x,min,max }) => (x - min) / (max - min),
  mean: ({ x,mean,min,max }) => (x - mean) / (max - min),
  zscore: ({ x,mean,stdev }) => (x - mean) / stdev
}

const transpose = (mat) => {
  const t = []
  N = range(0,mat.length,1)
  ncol = mat.reduce((a,r) => acc = acc !== r.length ? r.length : acc)
  mat.map(n => {
    const M = range(0, r.length, 1)
    M.forEach(m => {
      t[m] = []
      t[m][n] = r[n][m]
    })
  })
}

export default class StrainData{
  constructor(data){
    this.data = data
  }

  static makeColNames(data){
    const colNames = []
    data.forEach((strain, idx) => {
      Object.keys(strain).forEach((key) => {
        if(idx === 0){
          colNames.push(key)
        }
      })
    })
    return colNames
  }

  static makeCleanData(data, normalize='mean', rescale=true, columns=['_id', '__v']){
    const cleanData = {}
    cleanData.data = []
    cleanData.rows = []
    cleanData.rowIds = []
    data.colNames = StrainData.makeColNames(data)
    cleanData.colNames = data.colNames.filter(item => !columns.includes(item))
    data.forEach((row, idx) => {
      cleanData.rowIds.push(row._id)
      cleanData.data[idx] = {}
      cleanData.rows[idx] = []
      Object.keys(row).forEach((key) => {
        if(!columns.includes(key)){
          const val = row[key]
          cleanData.rows[idx].push(val)
          cleanData.data[idx][key] = val
        }
      })
    })
    if(normalize){
      cleanData.normalized = StrainData.normalize(cleanData.data, normalize, false)
    }
    if(rescale){
      cleanData.normalized = StrainData.normalize(cleanData.normalized, 'minmax', true)
    }
    return cleanData
  }
    
  static makeSmartTableHeaders(data, opts={ sortable: true }){
    return data.colNames.map(function(cname){
      return {
        alias: cname,
        dataAlias: cname,
        ...opts
      }
    })
  }

  static makeSmartTableRatingsHeaders(opts={ sortable: true }){
    return [
      {
        alias: 'Rating',
        dataAlias: 'Rating',
        format: { type: 'rating' },
        ...opts
      },
      {
        alias: 'Name',
        dataAlias: 'Name',
        ...opts
      }
    ]
  }

  static makeSmartTableNormalizedHeaders(data, opts={ sortable: true, type:'percent', exclude:['Name'] }){
    return data.colNames.map(cname => {
      return opts.exclude.includes(cname) ?
        {
          alias: cname,
          dataAlias: cname,
          sortable: opts.sortable
        } : {
          alias: cname,
          dataAlias: cname,
          format: {
            type: opts.type
          },
          sortable: opts.sortable
        }
    })
  }

  static makeSmartTableRatings(data, ratings, columns=['_id', 'Name']){
    return data.map(row => {
      const newRow = {}
      Object.keys(row).forEach((key, idx) => {
        if(columns.includes(key)){
          newRow[key] = row[key]
          newRow.Rating = ratings ? ratings[idx] : 0
        }
      })
      return newRow
    })
  }

  static makeColRanges(strainData, opts={ names:true, mean:true, stdev:true }){
    const nranges = []
    const N = range(0, StrainData.nRows(strainData), 1)
    const M = range(0, StrainData.nCols(strainData), 1)
    const rows = strainData.map(row => Object.values(row))
    M.forEach((m)=>{
      nranges[m] = { min:0, max:0, mean:0 }
      N.forEach((n)=>{
        const cell = rows[n][m]
        if(nranges[m].max <= cell) nranges[m].max = cell
        if(nranges[m].min >= cell) nranges[m].min = cell     
        if(opts.mean) nranges[m].mean = (cell/N.length) + nranges[m].mean  
      })
    })
    if(opts.names){
      const colnames = strainData.colNames
      nranges.forEach((r,i) => { nranges[i].name = colnames[i] } )
    }
    if(opts.stdev){
      if(!opts.mean){
        M.forEach(m => {
          nranges[m].mean = mean( N.map(n => rows[n][m]) )
        })
      }
      M.forEach(m => {
        const u = nranges[m].mean
        const X = N.map(n => rows[n][m])
        nranges[m].stdev = stdev(X,u)
      })
    }
    strainData.colRanges = nranges
    return nranges
  }

  static normalize(data, method, round=true, factor=1, columns=['Name']){
    const normRows = []
    const strainData = data
    const colRanges = StrainData.makeColRanges(data, { mean: true, stdev: true })
    strainData.forEach((row, n) => {
      const newRow = {}
      Object.keys(row).forEach((key, m) => {
        const x = row[key]
        if(!columns.includes(key)){
          const xcr = colRanges[m]
          const mean = xcr.mean
          const max = xcr.max
          const min = xcr.min
          const stdev = xcr.stdev
          const normval = norm[method]({ x, mean, min, max, stdev}) * factor
          newRow[key] = round ? Math.round(normval) : normval 
        }else{
          newRow[key] = x
        }
      })
      normRows[n] = newRow
    })
    return normRows
  }

  static rows(strainData){
    const rows = []
    strainData.forEach(strain => {
      const row = []
      Object.keys(strain).forEach(key => {
        row.push(strain[key])
      })
      rows.push(row)
    })
    return rows
  }

  static rowNames(strainData){
    return Object.keys(strainData)
  }

  static nRows(strainData){
    return strainData.length
  }

  static nCols(strainData){
    return Object.keys(strainData[0]).length
  }

  get isLoading(){
    return !this.data
  }

  set isLoading(bool){
    this.isLoading = bool
  }

  get rows(){
    const rows = []
    this.data.forEach((strain, idx) => {
      const row = []
      Object.keys(strain).forEach(key => {
        row.push(strain[key])
      })
      rows.push(row)
    })
    return rows
  }

  get colNames(){
    const colNames = []
    this.data.forEach((strain, idx) => {
      Object.keys(strain).forEach(key => {
        if(idx === 0) colNames.push(key)
      })
    })
    return colNames
  }

  set colNames(colNames){
    this.colNames = colNames
  }

  set rows(rows){
    this.data.rows = rows
  }

  get rowNames(){
    return Object.keys(this.rows)
  }

  set rowNames(rowNames){
    this.rowNames = rowNames
  }
  
  get nRows(){
    return StrainData.nRows(this.data)
  }

  set nRows(nRows){
    this.nRows = nRows
  }

  get nCols(){
    return StrainData.nCols(this.data)
  }

  set nCols(nCols){
    this.nCols = nCols
  }

  get cleanData(){
    return StrainData.makeCleanData(this.data)
  }

  set cleanData(cleanData){
    this.cleanData = cleanData
  }

  get colRanges(){
    return StrainData.makeColRanges(this.data)
  }

  set colRanges(colRanges){
    this.colRanges = colRanges
  }

  get smartTableHeaders(){
    return StrainData.makeSmartTableHeaders(this.cleanData)
  }

  set smartTableHeaders(smartTableHeaders){
    this.smartTableHeaders = smartTableHeaders
  }

  set smartTableRatings(smartTableRatings){
    this.smartTableRatings = smartTableRatings
  }

  get smartTableRatings(){
    return StrainData.makeSmartTableRatings(this.data, this.ratings)
  }

  get smartTableRatingsHeaders(){
    return StrainData.makeSmartTableRatingsHeaders()
  }

  set smartTableRatingsHeaders(smartTableRatingHeaders){
    this.smartTableRatingHeaders = smartTableRatingHeaders
  }

  get smartTableNormalizedHeaders(){
    return StrainData.makeSmartTableNormalizedHeaders(this.cleanData)
  }

  set smartTableNormalizedHeaders(smartTableNormalizedHeaders){
    this.smartTableNormalizedHeaders = smartTableNormalizedHeaders
  }

  get smartTableRows(){
    return this.cleanData.rows
  }

  set smartTableRows(smartTableRows){
    this.smartTableRows = smartTableRows
  }

}