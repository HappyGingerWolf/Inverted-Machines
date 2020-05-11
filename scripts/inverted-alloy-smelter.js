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
    if(tile.entity.items.get(Items.copper) >= 10 || tile.entity.items.get(Items.lead) >= 10) || tile.entity.items.get(Items.titanium) >= 10) || tile.entity.items.get(Items.silicon) >= 10){
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
      
      this.offloadNear(tile, Items.copper);
      this.offloadNear(tile, Items.lead);
      this.offloadNear(tile, Items.titanium);
      this.offloadNear(tile, Items.silicon);
      
      Effects.effect(this.craftEffect, tile.drawx(), tile.drawy());
      entity.progress = 0;
    }
    if(tile.entity.timer.get(this.timerDump, this.dumpTime)){
      this.tryDump(tile, Items.copper);
      this.tryDump(tile, Items.copper);
      this.tryDump(tile, Items.copper);
      this.tryDump(tile, Items.lead);
      this.tryDump(tile, Items.lead);
      this.tryDump(tile, Items.lead);
      this.tryDump(tile, Items.lead);
      this.tryDump(tile, Items.titanium);
      this.tryDump(tile, Items.titanium);
      this.tryDump(tile, Items.silicon);
      this.tryDump(tile, Items.silicon);
      this.tryDump(tile, Items.silicon);
    }
  },
  outputsItems(){
    return true
  }
});
invertedAlloySmelter.craftTime = 40;
invertedAlloySmelter.outputItems = [ItemStack(Items.copper, 3), ItemStack(Items.lead, 4), ItemStack(Items.titanium, 2), ItemStack(Items.silicon, 3)];
invertedAlloySmelter.craftEffect = Fx.smeltsmoke
