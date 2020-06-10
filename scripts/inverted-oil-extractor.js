const invertedOilExtractor = extendContent(GenericCrafter, "inverted-oil-extractor", {
  load(){
    this.super$load();
    this.rotatorRegion = Core.atlas.find(this.name + "-rotator");
    this.topRegion = Core.atlas.find(this.name + "-top");
    this.liquidRegion = Core.atlas.find(this.name + "-liquid");
  },
	draw(tile){
    this.super$draw(tile);
    const entity = tile.ent();
    
    Draw.color(this.outputLiquid.liquid.color);
    Draw.alpha(tile.entity.liquids.get(this.outputLiquid.liquid) / this.liquidCapacity);
    Draw.rect(this.liquidRegion, tile.drawx(), tile.drawy());
    
    Draw.reset();
    
    Draw.rect(this.rotatorRegion, tile.drawx(), tile.drawy(), tile.entity.totalProgress * -1);
    Draw.rect(this.topRegion, tile.drawx(), tile.drawy());
	},
	generateIcons(){
		return [
			Core.atlas.find(this.name),
			Core.atlas.find(this.name + "-rotator"),
			Core.atlas.find(this.name + "-top")
		];
	}
});
invertedOilExtractor.liquidCapacity = 30;