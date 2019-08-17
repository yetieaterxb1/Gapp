const range = (min,max,inc) => Array.from({length:(max-min)/inc}, (v,i) => i+min+inc-1)
const mean = (X) => X.reduce((acc,x) => acc + x) / X.length
const stdev = (X,u) => Math.sqrt( X.reduce((acc,x) => acc + Math.pow(x-u,2)) / X.length )
const t = (obj) => {

}
const transpose = (mat) => {
  const usekeys = Array.isArray(mat)
  if(usekeys) return transobj(mat)
  const t = []
  N = range(0,mat.length,1)
  ncol = mat.reduce((a,r) => acc = acc !== r.length ? r.length : acc)
  mat.map((n) => {
    const M = range(0,r.length,1)
    M.forEach(m=>{
      t[m] = []
      t[m][n] = r[n][m]
    })
  })
}

export default class StrainData{
  constructor(data){
    this.data = data
    this.cleanData = this.isLoading ? false : StrainData.makeCleanData(this.data)
    this.colRanges = this.isLoading ? false : StrainData.makeColRanges(this.cleanData)
    this.smartTableHeaders = this.isLoading ? false : StrainData.makeSmartTableHeaders(this.cleanData)
  }

  static makeCleanData(strainData, columns=['_id', '_v'], omitKeys=[]){
    const cleanStrainData = {}
    cleanStrainData.rows = []
    cleanStrainData.rowIds = []
    const proceed = {
      colNames: true || !!strainData.colNames && !omitKeys.includes('colnames'),
      raw: true || !!strainData.raw && !omitKeys.includes('raw'),
      rows: true || !!strainData.raw && !omitKeys.includes('rows')
    }
    if(proceed.colNames){
      cleanStrainData.colNames = strainData.colNames.filter(function(item){ return !columns.includes(item) })
    }
    
    const raw = strainData.raw.map((row, idx) => {
      cleanStrainData.rowIds.push(row._id)
      cleanStrainData.rows[idx] = []
      return Object.keys(row).reduce((acc, key) => {
        if(columns.includes(key)){
          return {...acc}
        }else{
          if(proceed.rows) cleanStrainData.rows[idx].push(row[key])
          return {...acc, [key]: row[key]}
        }
      }, {})
    })
    if(proceed.raw){
      cleanStrainData.raw = raw
    }
    return cleanStrainData
  }
    
  static makeSmartTableHeaders(strainData, opts={ sortable: true }){
    return strainData.colNames.map(function(cname){
      return {
        alias: cname,
        dataAlias: cname,
        ...opts
      }
    })
  }

  static makeColRanges(strainData, opts={ names:true, zero:false, mean:true, stdev:true }){
    const nranges = []
    const N = range(0, StrainData.nRows(strainData), 1)
    const M = range(0, StrainData.nCols(strainData), 1)
    const rows = strainData.rows
    M.forEach((m)=>{
      nranges[m] = { min:0, max:0, mean:0 }
      N.forEach((n)=>{
        const cell = rows[n][m]
        if(nranges[m].max <= cell) nranges[m].max = cell
        if(nranges[m].min >= cell) nranges[m].min = cell     
        if(opts.mean) nranges[m].mean = (cell/N.length) + nranges[m].mean  
        if(opts.zero) return null // TODO:: 
      })
    })
    if(opts.names){
      const colnames = strainData.colNames
      nranges.forEach((r,i) => { nranges[i].name = colnames[i] } )
    }
    if(opts.stdev){
      if(!opts.mean){
        M.forEach(m => {
          nranges[m].mean = mean(N.map(n => rows[n][m]))
        })
      }
      M.forEach(m => {
        const u = nranges[m].mean
        const X = N.map(n => {
          return rows[n][m]
        })
        nranges[m].stdev = stdev(X,u)
      })
    }
    strainData.colRanges=nranges
    return nranges
  }

  static normalizeColumns(strainData, method='rescale'){
    switch(method){
      case 'rescale':{

      }
      case 'standardize':{

      }
    }
    const colRanges = StrainData.makeColRanges(strainData, { zero: false, mean: true, stdev: true})

  }

  static nRows(strainData){
    // TODO::
    // // - More robust check of length
    return strainData.rows.length
  }

  static nCols(strainData){
    // TODO::
    // // - More robust check of length
    return strainData.colNames.length
  }

  get isLoading(){
    return !this.data
  }

  set isLoading(bool){
    this.isLoading = bool
  }
  

  get nRows(){
    if(!this.data) return false
    return StrainData.nRows(this.data)
  }

  set nRows(nRows){
    this.nRows = nRows
  }

  get nCleanRows(){
    if(!this.cleanData) return false
    return StrainData.nRows(this.cleanData)
  }

  set nCleanRows(nCleanRows){
    this.nCleanRows = nCleanRows
  }

  get smartTableRows(){
    if(!this.data) return false
    return this.cleanData.rows
  }

  set smartTableRows(smartTableRows){
    this.smartTableRows = smartTableRows
  }


  makeCleanData(columns, omitKeys){
    this.cleanData = StrainData.makeCleanData(this.data, columns, omitKeys)
    return this.cleanData
  }

  makeSmartTableHeaders(opts){
    this.smartTableHeaders = StrainData.makeSmartTableHeaders(this.cleanData, opts)
    return this.smartTableHeaders
  }
}