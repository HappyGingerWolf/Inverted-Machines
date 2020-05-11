const invertedSeparator = extendContent(GenericCrafter, "inverted-separator", {
  load(){
    this.super$load();
    this.spinnerRegion = Core.atlas.find(this.name + "-spinner");
    this.liquidRegion = Core.atlas.find(this.name + "-liquid");
  },
  setStats(){
    this.super$setStats();
    
    for(yes = 0; yes < 3; yes++){
      this.stats.add(BlockStat.input, this.mixingItems[yes]);
      this.stats.add(BlockStat.input, "or", "or");
    }
    this.stats.add(BlockStat.input, this.mixingItems[3])
  },
	draw(tile){

    Draw.rect(this.region, tile.drawx(), tile.drawy());
    
    Draw.color(Color.clear, tile.entity.liquids.current().color, tile.entity.liquids.get(this.outputLiquid.liquid) / this.liquidCapacity);
    Draw.rect(this.liquidRegion, tile.drawx(), tile.drawy());
    Draw.color();
    
    Draw.rect(this.spinnerRegion, tile.drawx(), tile.drawy(), tile.entity.totalProgress * -3);
	},
  acceptItem(item,tile,source){
    const entity=tile.ent();
	  var inhale = false;
    for(no = 0; no < 4; no++){
	    inhale |= item == this.mixingItems[no].item ? true : false;
    }
	return true&&entity.items.get(item) < this.itemCapacity;
  },
  shouldConsume(tile){
    entity = tile.ent();
    if(tile.entity.items.get(Items.copper) < 1 || tile.entity.items.get(Items.lead) < 1 || tile.entity.items.get(Items.graphite) < 1 || tile.entity.items.get(Items.titanium) < 1 || tile.entity.liquids.get(Liquids.slag) >= this.liquidCapacity){
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
      this.eatingLol = Mathf.random(0, 12);
      if(this.eatingLol >= 0 && this.eatingLol < 5){
        entity.items.remove(this.mixingItems[0]);
      }
      if(this.eatingLol >= 5 && this.eatingLol < 8){
        entity.items.remove(this.mixingItems[1]);
      }
      if(this.eatingLol >= 8 && this.eatingLol < 10){
        entity.items.remove(this.mixingItems[2]);
      }
      if(this.eatingLol >= 10 && this.eatingLol < 12){
        entity.items.remove(this.mixingItems[3]);
      }
      
      this.handleLiquid(tile, tile, this.outputLiquid.liquid, this.outputLiquid.amount)
      
      Effects.effect(this.craftEffect, tile.drawx(), tile.drawy());
      entity.progress = 0;
    }
    this.tryDumpLiquid(tile, Liquids.slag);
  },
	generateIcons(){
		return [
			Core.atlas.find(this.name),
			Core.atlas.find(this.name + "-spinner"),
		];
	}
});
invertedSeparator.liquidCapacity = 10;
invertedSeparator.itemCapacity = 10;
invertedSeparator.mixingItems = ItemStack.with(Items.copper, 1, Items.lead, 1, Items.graphite, 1, Items.titanium, 1);
invertedSeparator.outputLiquid = LiquidStack(Liquids.slag, 2.5);
invertedSeparator.craftTime = 35;
invertedSeparator.eatingLol = 0;
