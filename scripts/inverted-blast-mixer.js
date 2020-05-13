const invertedBlastMixer = extendContent(GenericSmelter, "inverted-blast-mixer", {
  setStats(){
    this.super$setStats();
    
    this.stats.add(BlockStat.output, this.outputItems[0]);
    this.stats.add(BlockStat.output, this.outputItems[1]);
  },
  shouldConsume(tile){
    entity = tile.ent();
    if(tile.entity.items.get(Items.spore-pod) >= 10 || tile.entity.items.get(Items.pyratite) >= 10){
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
      
      this.offloadNear(tile, Items.pyratite);
      this.offloadNear(tile, Items.spore-pod);
      
      Effects.effect(this.craftEffect, tile.drawx(), tile.drawy());
      entity.progress = 0;
    }
    if(tile.entity.timer.get(this.timerDump, this.dumpTime)){
      this.tryDump(tile, Items.pyratite);
      this.tryDump(tile, Items.spore-pod);
    }
  },
  outputsItems(){
    return true
  }
});
invertedBlastMixer.craftTime = 80;
invertedBlastMixer.outputItems = [new ItemStack(Items.pyratite, 1), new ItemStack(Items.spore-pod, 1)];
