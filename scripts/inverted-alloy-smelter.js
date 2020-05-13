const invertedAlloySmelter = extendContent(GenericSmelter, "inverted-alloy-smelter", {
  setStats(){
    this.super$setStats();
    
    this.stats.add(BlockStat.output, this.outputItems[0]);
    this.stats.add(BlockStat.output, this.outputItems[1]);
    this.stats.add(BlockStat.output, this.outputItems[2]);
    this.stats.add(BlockStat.output, this.outputItems[3]);
  },
  shouldConsume(tile){
    entity = tile.ent();
    if(tile.entity.items.get(Items.copper) >= 10 || tile.entity.items.get(Items.lead) >= 10 || tile.entity.items.get(Items.titanium) >= 10 || tile.entity.items.get(Items.silicon) >= 10){
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
      
      for(a = 0; a < 3; a++){
        this.offloadNear(tile, Items.copper);
      }
      for(b = 0; b < 4; b++){
        this.offloadNear(tile, Items.lead);
      }
      for(c = 0; c < 2; c++){
        this.offloadNear(tile, Items.titanium);
      }
      for(d = 0; d < 3; d++){
      this.offloadNear(tile, Items.silicon);
      }
      
      Effects.effect(this.craftEffect, tile.drawx(), tile.drawy());
      entity.progress = 0;
    }
    if(tile.entity.timer.get(this.timerDump, this.dumpTime)){
      for(a = 0; a < 3; a++){
        this.tryDump(tile, Items.copper);
      }
      for(b = 0; b < 4; b++){
        this.tryDump(tile, Items.lead);
      }
      for(c = 0; c < 2; c++){
        this.tryDump(tile, Items.titanium);
      }
      for(d = 0; d < 3; d++){
      this.tryDump(tile, Items.silicon);
      }
    }
  },
  outputsItems(){
    return true
  }
});
invertedAlloySmelter.craftTime = 40;
invertedAlloySmelter.outputItems = ItemStack.with(Items.copper, 3, Items.lead, 4, Items.titanium, 2, Items.silicon, 3);
invertedAlloySmelter.craftEffect = Fx.smeltsmoke
