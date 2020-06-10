const invertedPyratiteMixer = extendContent(GenericCrafter, "j-inverted-pyratite-mixer", {
  setStats(){
    this.super$setStats();
    
    this.stats.add(BlockStat.output, this.outputItems[0]);
    this.stats.add(BlockStat.output, this.outputItems[1]);
    this.stats.add(BlockStat.output, this.outputItems[2]);
  },
  shouldConsume(tile){
    const entity = tile.ent();
    if(tile.entity.items.get(this.outputItems[1].item) >= 20 || tile.entity.items.get(this.outputItems[0].item) >= 10 || tile.entity.items.get(this.outputItems[2].item) >= 20){
      return false;
    }
    else{
      return true;
    }
  },
  update(tile){
    const entity = tile.ent();
    
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
      
      this.offloadNear(tile, this.outputItems[0].item);
      for(var i = 0; i < 2; i++){
        this.offloadNear(tile, this.outputItems[1].item);
      }
      for(var i = 0; i < 2; i++){
        this.offloadNear(tile, this.outputItems[2].item);
      }
      
      Effects.effect(this.craftEffect, tile.drawx(), tile.drawy());
      entity.progress = 0;
    }
    if(tile.entity.timer.get(this.timerDump, this.dumpTime)){
      this.tryDump(tile, this.outputItems[0].item);
      for(i = 0; i < 2; i++){
        this.tryDump(tile, this.outputItems[1].item);
      }
      for(i = 0; i < 2; i++){
        this.tryDump(tile, this.outputItems[2].item);
      }
    }
  },
  outputsItems(){
    return true
  }
});
invertedPyratiteMixer.craftTime = 80;
invertedPyratiteMixer.outputItems = ItemStack.with(Items.coal, 1, Items.sand, 2, Items.lead, 2);
