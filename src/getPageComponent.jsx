export default function getPageComponent(pagePath,chunkName){
  console.log('pagepath'+pagePath)
  return (nextState,callback) => {
    require.ensure([],function(require){
      callback(null, require(pagePath).default)
    },chunkName)
  }
}