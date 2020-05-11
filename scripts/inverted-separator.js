const invertedSeparator = extendContent(GenericCrafter, "inverted-separator", {
  load(){
    this.super$load();
    this.spinnerRegion = Core.atlas.find(this.name + "-spinner");
    this.liquidRegion = Core.atlas.find(this.name + "-liquid");
  },
	draw(tile){

    Draw.rect(this.region, tile.drawx(), tile.drawy());
    
    Draw.color(Color.clear, tile.entity.liquids.current().color, tile.entity.liquids.get(this.outputLiquid.liquid) / this.liquidCapacity);
    Draw.rect(this.liquidRegion, tile.drawx(), tile.drawy());
    Draw.color();
    
    Draw.rect(this.spinnerRegion, tile.drawx(), tile.drawy(), tile.entity.totalProgress * -3);
	},
	generateIcons(){
		return [
			Core.atlas.find(this.name),
			Core.atlas.find(this.name + "-spinner"),
		];
	}
});
invertedSeparator.liquidCapacity = 30;
invertedSeparator.outputLiquid = new LiquidStack(Liquids.slag, 30);