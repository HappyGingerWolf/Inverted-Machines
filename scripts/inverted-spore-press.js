const invertedSporePress = extendContent(GenericCrafter, "inverted-spore-press", {
  load(){
    this.super$load();
    this.topRegion = Core.atlas.find(this.name + "-top");
    this.liquidRegion = Core.atlas.find(this.name + "-liquid");
    for(i = 0; i < 3; i++){
      this.unsquishRegions[i] = Core.atlas.find(this.name + "-squishy-" + i);
    }
  },
	draw(tile){
    this.super$draw(tile);
    entity = tile.ent();
    
    Draw.color(tile.entity.liquids.current().color);
    Draw.alpha(tile.entity.liquids.total() / this.liquidCapacity);
    Draw.rect(this.liquidRegion, tile.drawx(), tile.drawy());
    
    Draw.reset();
    
    Draw.rect(this.unsquishRegions[Mathf.round(Mathf.absin(entity.totalProgress, 5, 2.999))], tile.drawx(), tile.drawy());
    Draw.rect(this.topRegion, tile.drawx(), tile.drawy());
	},
	generateIcons(){
		return [
			Core.atlas.find(this.name),
			Core.atlas.find(this.name + "-top")
		];
	}
});
invertedSporePress.liquidCapacity = 60;