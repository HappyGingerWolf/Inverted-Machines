const invertedSiliconSmelter = extendContent(GenericSmelter, "inverted-silicon-smelter", {
  setStats(){
    this.super$setStats();
    
    this.stats.add(BlockStat.output, this.outputItems[0]);
    this.stats.add(BlockStat.output, this.outputItems[1]);
  },
  update(tile){
    entity = tile.ent();
    
    if(entity.cons.valid()){
      entity.progress += this.getProgressIncrease(entity, this.craftTime);
      entity.totalProgress += entity.delta();
      entity.warmup = Mathf.lerpDelta(entity.warmup, 1, 0.02);
    }
    else{
      entity.warmup = Mathf.lerp(entity.warmup, 0, 0.02);
    }
    
    if(entity.progress >= 1){
      entity.cons.trigger();
      
      for(var i = 0; i < 2; i++){
        this.offloadNear(tile, Items.sand);
      }
      this.offloadNear(tile, Items.coal);
      
      Effects.effect(this.craftEffect, tile.drawx(), tile.drawy());
      entity.progress = 0;
    }
    if(tile.entity.timer.get(this.timerDump, this.dumpTime)){
      if(entity.items.get(Items.coal) > 0 && entity.items.get(Items.sand) < 1){
        this.tryDump(tile, Items.coal);
      }
      if(entity.items.get(Items.sand) > 0 && entity.items.get(Items.coal) < 1){
        this.tryDump(tile, Items.coal);
      }
    }
  },
  outputsItems(){
    return true
  }
});
invertedSiliconSmelter.craftTime = 40;
invertedSiliconSmelter.outputItems = [ItemStack(Items.coal, 1), ItemStack(Items.sand, 2)];
invertedSiliconSmelter.craftEffect = Fx.smeltsmoke