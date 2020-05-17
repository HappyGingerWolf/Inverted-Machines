const invertedBlastMixer = extendContent(GenericCrafter, "i-inverted-blast-mixer", {
  setStats(){
    this.super$setStats();
    
    this.stats.add(BlockStat.output, this.outputItems[0]);
    this.stats.add(BlockStat.output, this.outputItems[1]);
  },
  shouldConsume(tile){
    entity = tile.ent();
    if(tile.entity.items.get(this.outputItems[0].item) >= 10 || tile.entity.items.get(this.outputItems[1].item) >= 10){
      return false;
    }
    else{
      return true;
    }
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
      
      this.offloadNear(tile, this.outputItems[0].item);
      this.offloadNear(tile, this.outputItems[1].item);
      
      Effects.effect(this.craftEffect, tile.drawx(), tile.drawy());
      entity.progress = 0;
    }
    if(tile.entity.timer.get(this.timerDump, this.dumpTime)){
      this.tryDump(tile, this.outputItems[0].item);
      this.tryDump(tile, this.outputItems[1].item);
    }
  },
  outputsItems(){
    return true
  }
});
invertedBlastMixer.craftTime = 80;
invertedBlastMixer.outputItems = ItemStack.with(Items.pyratite, 1, Items.sporePod, 1);
