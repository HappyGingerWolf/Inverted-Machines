const invertedPhaseWeaver = extendContent(GenericCrafter, "f-inverted-phase-weaver", {
  setStats(){
    this.super$setStats();
    
    this.stats.add(BlockStat.output, this.outputItems[0]);
    this.stats.add(BlockStat.output, this.outputItems[1]);
  },
  shouldConsume(tile){
    const entity = tile.ent();
    if(tile.entity.items.get(this.outputItems[1].item) >= 20 || tile.entity.items.get(this.outputItems[0].item) >= 20){
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
      
      for(var i = 0; i < 4; i++){
        this.offloadNear(tile, this.outputItems[0].item);
      }
      for(var i = 0; i < 10; i++){
        this.offloadNear(tile, this.outputItems[1].item);
      }
      
      Effects.effect(this.craftEffect, tile.drawx(), tile.drawy());
      entity.progress = 0;
    }
    if(tile.entity.timer.get(this.timerDump, this.dumpTime)){
      for(a = 0; a < 4; a++){
        this.tryDump(tile, this.outputItems[0].item);
      }
      for(b = 0; b < 10; b++){
        this.tryDump(tile, this.outputItems[1].item);
      }
    }
  },
  outputsItems(){
    return true
  }
});
invertedPhaseWeaver.craftTime = 120;
invertedPhaseWeaver.outputItems = ItemStack.with(Items.thorium, 4, Items.sand, 10);
invertedPhaseWeaver.craftEffect = Fx.smeltsmoke
