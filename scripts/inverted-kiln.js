const invertedKiln = extendContent(GenericSmelter, "inverted-kiln", {
  setStats(){
    this.super$setStats();
    
    this.stats.add(BlockStat.output, this.outputItems[0]);
    this.stats.add(BlockStat.output, this.outputItems[1]);
  },
  shouldConsume(tile){
    entity = tile.ent();
    if(tile.entity.items.get(Items.sand) >= 10 || tile.entity.items.get(Items.lead) >= 10){
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
      
      this.offloadNear(tile, Items.lead);
      this.offloadNear(tile, Items.sand);
      
      Effects.effect(this.craftEffect, tile.drawx(), tile.drawy());
      entity.progress = 0;
    }
    if(tile.entity.timer.get(this.timerDump, this.dumpTime)){
      this.tryDump(tile, Items.coal);
      this.tryDump(tile, Items.sand);
      this.tryDump(tile, Items.sand);
    }
  },
  outputsItems(){
    return true
  }
});
invertedKiln.craftTime = 40;
invertedKiln.outputItems = [ItemStack(Items.lead, 1), ItemStack(Items.sand, 1)];
invertedKiln.craftEffect = Fx.smeltsmoke
