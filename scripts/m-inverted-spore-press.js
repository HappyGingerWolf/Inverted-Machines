const invertedSporePress = extendContent(GenericCrafter, "m-inverted-spore-press", {
  load(){
    this.super$load();
    this.topRegion = Core.atlas.find(this.name + "-top");
    this.liquidRegion = Core.atlas.find(this.name + "-liquid");
    for(i = 0; i < 4; i++){
      this.unsquishRegions[i] = Core.atlas.find(this.name + "-squishy-" + i);
    }
  },
	draw(tile){
    this.super$draw(tile);
    const entity = tile.ent();
    
    Draw.rect(this.unsquishRegions[Mathf.round(Mathf.absin(entity.totalProgress, 5.0, 2.999))], tile.drawx(), tile.drawy());
    
    Draw.color(Color.clear, tile.entity.liquids.current().color, tile.entity.liquids.total() / this.liquidCapacity);
    Draw.rect(this.liquidRegion, tile.drawx(), tile.drawy());
    Draw.color();
    
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
invertedSporePress.unsquishRegions = [];
