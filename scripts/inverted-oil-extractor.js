const invertedOilExtractor = extendContent(GenericCrafter, "inverted-oil-extractor", {

	draw(tile){

    Draw.rect(this.region, tile.drawx(), tile.drawy());

    Draw.rect(Core.atlas.find(this.name + "-rotator"), tile.drawx(), tile.drawy(), tile.entity.totalProgress * -2);
	},

	generateIcons: function(){
		return [
			Core.atlas.find(this.name),
			Core.atlas.find(this.name + "-rotator"),
		];
	},
	
});

invertedOilExtractor.layer = Layer.turret;;
