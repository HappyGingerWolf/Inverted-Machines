const invertedSiliconSmelter = extendContent(GenericSmelter, "inverted-silicon-smelter", {
  updateTile(){
    this.super$updateTile();
    
    if(progress >= 1){
      consume();

      useContent(sand);
      useContent(coal);
      for(int i = 0; i < 2; i++){
        offloadNear(sand);
      }
      offloadNear(Items.coal);
      
      craftEffect.at(x, y);
      progress = 0;
    }
    if(timer(timerDump, dumpTime)){
      dump(coal);
      dump(sand);
    }
  }
});